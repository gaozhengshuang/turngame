package network
import (
	_"net"
	_"fmt"
	"time"
	"sync"
	"sync/atomic"
	"strings"
	"gitee.com/jntse/gotoolkit/log"
	"net/http"
	"github.com/gorilla/websocket"
	"context"
)

type WsListener struct {
	conf		WsListenConf
	running		bool
	locker		sync.Mutex
	server  	*http.Server		// http service
	handler 	http.Handler		// http 路由控制
	upgrader	*websocket.Upgrader	// 升级器，升级http到websocket
	tcpConnSet  map[int]*WsConnTask
	parser		IBaseParser
	blacklist	map[string]int		// 黑名单
	ch_listenserv chan int			// ListenAndServe 退出通知
	netcore		*NetWork
	//cb        	IBaseNetCallback
	//ch_netevent	chan ISessionEvent
}

func newWsListener(conf WsListenConf, parser IBaseParser, netcore *NetWork) *WsListener {
	info := new(WsListener)
	info.conf = conf
	info.running = false
	info.server = nil
	info.handler = nil
	info.upgrader = nil
	info.tcpConnSet = make(map[int]*WsConnTask)
	info.parser = parser
	info.netcore = netcore
	info.ch_listenserv = make(chan int, 1)
	return info
}

type WsRootHandler struct {}
func (this* WsRootHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	log.Error("This is WebSocket RootHandler，请使用子handler:'/ws_handler'")
}


// --------------------------------------------------------------------------
/// @brief 导出函数
// --------------------------------------------------------------------------
func (this* WsListener) Init() {

	// use default options
	this.upgrader = &websocket.Upgrader{}
	this.upgrader.CheckOrigin = func(r *http.Request) bool {
		// TODO: allow all connections by default，否则白鹭客户端检查跨域会失败，不知道为何
		return true
	}

	// 路由handler (不同的URL可以由不同的handler处理)
	mux := &http.ServeMux{}
	this.handler = mux
	mux.Handle("/ws_handler", this)
	mux.Handle("/", new (WsRootHandler))

	// new httpserver
	this.server  = &http.Server {
		Addr:           this.Host().String(),
		Handler:        this.handler,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
}

func (this* WsListener) Start() bool {
	this.running = true
	if this.listen() == false {
		return false
	}
	return true
}

// WsListener 结束
func (this* WsListener) shutdown() {
	this.running = false
	this.server.Shutdown(context.Background())

	<-this.ch_listenserv
	close(this.ch_listenserv)
	this.cleanListener()
}

func (this* WsListener) Name() string {
	return this.conf.Name
}

func (this* WsListener) Host() *NetHost {
	return &this.conf.Host
}

// Http 底层回调
func (this* WsListener) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	if this.running == false	{
		return
	}

	// 将Http升级为webscoket
	conn, err := this.upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Error("升级Http协议到webscoket失败:%v", err)
		return
	}

	this.onAccept(conn)
}

// --------------------------------------------------------------------------
/// @brief 非导出函数
// --------------------------------------------------------------------------
func (this* WsListener) lock() {
	this.locker.Lock()
}

func (this* WsListener) unlock() {
	this.locker.Unlock()
}

func (this* WsListener) listen() bool {
	go this.listenCoroutine()

	// 等待ListenAndServe是否成功
	timerwait := time.NewTimer(time.Millisecond * 100)
	select {
	case <-this.ch_listenserv:
		log.Error("WsListener'%s' listen'%s' fail", this.Name(), this.Host().String())
		panic("WsListener listen fail")
		return false
	case <-timerwait.C:
		log.Info("WsListener '%s' listen'%s' ok", this.Name(), this.Host().String())
		break
	}

	return true
}

// --------------------------------------------------------------------------
/// @brief TODO: ListenAndServe 被动退出，Listener不会被清理
// --------------------------------------------------------------------------
func (this* WsListener) listenCoroutine() {
	re := this.server.ListenAndServe()
	this.ch_listenserv <- 1
	log.Info("WsListener'%s' Quit ListenAndServe [%v]...", this.Name(), re)
}

// WsConnTask监视协程, 非Loop
func (this* WsListener) TcpConnMonitorLoop(tcpconn *WsConnTask) {
	defer log.Trace("sid[%d] '%s' quit TcpConnMonitorLoop", tcpconn.id, tcpconn.name)
	ticker100ms := time.NewTicker(time.Millisecond * 100)
	defer ticker100ms.Stop()
	for ;; {
		
		// 状态检查
		stat := atomic.LoadInt32(&tcpconn.state)
		if stat == closed || stat == closing {
			if ( stat == closing ) {
				this.delConn(tcpconn); 
				tcpconn.cleanup() 
			}
			return
		}
		
		// 'select chan' 起到Sleep作用
		select {
		case <-ticker100ms.C:
			if stat == connected { this.ConnTaskLegalityCheck(tcpconn) }	// 连接合法性验证
			break
		}
	}
}


// 验证 socket 合法性(only accept socket)
func (this *WsListener) ConnTaskLegalityCheck(tcpconn* WsConnTask) {
	if tcpconn.behavior != conn_accept {
		return 
	}

	if tcpconn.legality.verifystate == ConnVerifyOk || tcpconn.legality.verifystate == ConnVerifyExclude {
		return 
	}

	if tcpconn.legality.timeout <= time.Now().Unix() {
		log.Info("sid[%d] unverified in [%d] seconds", tcpconn.id, kLegalityVerifyTimeOut)
		atomic.StoreInt32(&tcpconn.legality.verifystate, ConnVerifyFailed)
		tcpconn.quit()
		return 
	}
}


// 建立新连接回调
func (this* WsListener) onAccept(conn* websocket.Conn) {

	// 作为玩家task发送队列大小1000，作为服务器task发送队列要大的多
	var w_queuelen int32 = kDafaultWriteQueueSize
	if this.conf.SvrChannel	{ w_queuelen = kServerWriteQueueSize }
	name := "Task" + strings.TrimSuffix(this.conf.Name, "Listener")	// construct task name
	tcpconn := newWsConnTask("", 0, name, conn_accept , w_queuelen, conn, this.conf.Verify != 0, this.conf.SvrChannel)
	tcpconn.Init(this.parser, this.netcore)
	tcpconn.accpeted()
	log.Info("WsListener'%s' accept new conn sid[%d] '%s' w_qlen'%d'", this.Name(), tcpconn.id, tcpconn.remoteAddr(), w_queuelen)
	go this.TcpConnMonitorLoop(tcpconn)
	this.addConn(tcpconn)
	//tcpconn.On_Connect()
	tcpconn.netcore.onSessionEstablished(tcpconn)

}


// 清理WsListener
func (this* WsListener) cleanListener() {

	// 关闭监听
	if (this.server != nil) {
		//this.server.Close()
		this.server = nil
	}

	// 清理所有task
	for _, tcpconn := range this.tcpConnSet {
		tcpconn.quit()
	}

	log.Info("WsListener '%s' 清理完毕", this.Name())
}


func (this* WsListener) addConn(tcpconn* WsConnTask) {
	this.lock()
	this.tcpConnSet[tcpconn.id] = tcpconn
	this.unlock()
}


func (this* WsListener) delConn(tcpconn* WsConnTask) {
	this.lock()
	delete(this.tcpConnSet, tcpconn.id)
	this.unlock()
}


