package network
import (
	"net"
	_"fmt"
	"time"
	"sync"
	"sync/atomic"
	"strings"
	"gitee.com/jntse/gotoolkit/log"
)


type TcpListener struct {
	conf		TcpListenConf
	running		bool
	locker		sync.Mutex
	//listener	net.Listener		// interface
	listener	*net.TCPListener	// 
	tcpConnSet  map[int]*TcpConnTask
	parser		IBaseParser
	blacklist	map[string]int		// 黑名单
	netcore     *NetWork
}

func newTcpListener(conf TcpListenConf, parser IBaseParser, netcore* NetWork) *TcpListener {
	info := new(TcpListener)
	info.conf = conf
	info.running = false
	info.listener = nil;
	info.tcpConnSet = make(map[int]*TcpConnTask)
	info.parser = parser
	info.netcore = netcore
	return info
}


// --------------------------------------------------------------------------
/// @brief 导出函数
// --------------------------------------------------------------------------
func (this* TcpListener) Init() {

}

func (this* TcpListener) Start() bool {
	this.running = true
	if this.listen() == false {
		log.Error("TcpListener'%s' listen'%s' fail", this.Name(), this.Host().String())
		return false
	}
	log.Info("TcpListener'%s' listen'%s' ok", this.Name(), this.Host().String())
	go this.run()
	return true
}

// Listener 结束
func (this* TcpListener) shutdown() {
	if this.running == false { return }
	this.running = false
	this.listener.SetDeadline(time.Now())	// accept立刻超时，退出阻塞状态
	//this.listener.Close()					// 可以让accept报错超时，退出阻塞状态
}

func (this* TcpListener) Name() string {
	return this.conf.Name
}

func (this* TcpListener) Host() *NetHost {
	return &this.conf.Host
}

// --------------------------------------------------------------------------
/// @brief 非导出函数
// --------------------------------------------------------------------------
func (this* TcpListener) lock() {
	this.locker.Lock()
}

func (this* TcpListener) unlock() {
	this.locker.Unlock()
}

func (this* TcpListener) listen() bool {

	//*/ 使用TcpListener，可以设置accpet超时
	tcpAddr, err_resolve := net.ResolveTCPAddr("tcp", this.Host().String())
	if err_resolve != nil {
		log.Error("'%s' ResolveTCPAddr error:%v", this.Name(), err_resolve)
		return false
	}
	listener, err := net.ListenTCP("tcp", tcpAddr)
	/*/
	listener, err := net.Listen("tcp", this.Host().String())
	//*/
	if err != nil {
		log.Error("'%s' error listening:%s", this.Name(), err.Error())
		return false //终止程序
	}
	this.listener = listener
	return true
}

// accpet 协程
func (this* TcpListener) run() {
	defer this.cleanListener()
	for ;; {
		time.Sleep(time.Millisecond*1)

		if this.running == false {
			log.Info("Listener'%s'准备退出...", this.Name())
			break;
		}

		tcplistener := this.listener
		//tcplistener.SetDeadline(time.Now().Add(time.Millisecond * 1))	// 设置超时，'accept' will nonblock
		conn, err := tcplistener.AcceptTCP()	// use block mode
		if err != nil {
			if nerr, convertok := err.(net.Error); convertok && nerr.Timeout() { continue }
			log.Error("Listener'%s' error accept:%v", this.Name(), err.Error())
			continue
		}

		this.onAccept(conn)
	}
}


// TcpConnTask监视协程, 非Loop
func (this* TcpListener) TcpConnMonitorLoop(tcpconn *TcpConnTask) {
	defer log.Info("sid[%d] '%s' quit TcpConnMonitorLoop", tcpconn.id, tcpconn.name)
	ticker100ms := time.NewTicker(time.Millisecond * 100)
	defer ticker100ms.Stop()
	for ;; {
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
func (this *TcpListener) ConnTaskLegalityCheck(tcpconn* TcpConnTask) {
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
func (this* TcpListener) onAccept(conn net.Conn) {

	// TCPConn专属设置接口
	tcpcon, ok := conn.(*net.TCPConn)
	tcpcon.File()
	if ok == true {
		tcpcon.SetKeepAlive(true)
		tcpcon.SetKeepAlivePeriod(kTcpKeepAlivePeriod)	// 不要太长
		tcpcon.SetNoDelay(true)
		tcpcon.SetWriteBuffer(kWriteBufferSize)
		tcpcon.SetReadBuffer(kReadBufferSize)
	}

	// 作为玩家task发送队列大小1000，作为服务器task发送队列要大的多
	var w_queuelen int32 = kDafaultWriteQueueSize
	if this.conf.SvrChannel { w_queuelen = kServerWriteQueueSize }

	// make a new name
	name := "Task" + strings.TrimSuffix(this.conf.Name, "Listener")
	tcpconn := newTcpConnTask("", 0, name, conn_accept , w_queuelen, tcpcon, this.conf.Verify != 0, this.conf.SvrChannel)
	tcpconn.Init(this.parser, this.netcore)
	log.Info("Listener'%s' accept new conn sid[%d] '%s' w_qlen'%d'", this.Name(), tcpconn.id, tcpconn.remoteAddr(), w_queuelen)
	tcpconn.accpeted()
	go this.TcpConnMonitorLoop(tcpconn)
	this.addConn(tcpconn)
	//tcpconn.On_Connect()
	tcpconn.netcore.onSessionEstablished(tcpconn)
}


// 清理Listener
func (this* TcpListener) cleanListener() {

	// 关闭监听
	if (this.listener != nil) {
		this.listener.Close()
		this.listener = nil
	}


	// 清理所有task
	for _, tcpconn := range this.tcpConnSet {
		tcpconn.quit()
	}

	log.Info("Listener '%s' 清理完毕", this.Name())
}


func (this* TcpListener) addConn(tcpconn* TcpConnTask) {
	this.lock()
	this.tcpConnSet[tcpconn.id] = tcpconn
	this.unlock()
}


func (this* TcpListener) delConn(tcpconn* TcpConnTask) {
	this.lock()
	delete(this.tcpConnSet, tcpconn.id)
	this.unlock()
}


