package network
import (
	"net"
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"time"
	"sync"
	"sync/atomic"
	_"encoding/binary"
	"reflect"
	"net/url"
	"github.com/gorilla/websocket"
)



// --------------------------------------------------------------------------
/// @brief websocket连接对象
/// @TODO WsConnTask golang是强类型语言，protobuf中的int是int32
/// 导致代码中很多地方需要强制类型装换 int->int32, int32->int，有时间将代码中的int使用int32代替
/// @TODO 全部梳理一遍代码，所有的chan都要在一个协程中关闭清理，多线程下极容易产生隐藏bug
// --------------------------------------------------------------------------
type WsConnTask struct {
	ip				string
	port			int
	id				int
	name			string
	state			int32
	behavior 		int32
	svrchannel		bool
	conn			*websocket.Conn	// net core
	netcore			*NetWork
	msgtype			int32			// websocket message types are defined in RFC 6455
	session			IBaseNetSession	// *WsSession 暴露外部使用
	parser			IBaseParser		// 消息解析器
	rbuf			[]byte			// read buffer
	ch_writelen		int32			// 发送队列大小
	ch_write		chan interface{}// TODO: send buffer, send/monitor/外部都会访问(需要加锁)
	ch_quitwloop 	chan int		// 通知退出 write loop
	ch_quitrloop 	chan int		// 通知退出 read loop
	syn_wloop		sync.WaitGroup	// 等待write协程退出
	syn_rloop		sync.WaitGroup	// 等待Read协程退出
	userdata		interface{}		// 用户自定义数据
	cb				IBaseNetCallback
	ch_netevent 	chan ISessionEvent
	legality		TcpConnLegality
}

// --------------------------------------------------------------------------
/// @brief 导出方法
/// @brief 按照设计WsConnTask不对外，没有导出接口
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
/// @brief 非导出方法
// --------------------------------------------------------------------------

// 新建实例
func newWsConnTask(ip string, port int, name string, behavior int32, w_queuelen int32, conn *websocket.Conn, verify bool, svrchannel bool) (*WsConnTask) {
	objconn := new(WsConnTask)
	objconn.ip = ip
	objconn.port = port
	objconn.name = name
	objconn.id = 0
	objconn.state = unconnected
	objconn.conn = conn
	objconn.msgtype = websocket.BinaryMessage
	objconn.behavior = behavior 
	objconn.ch_writelen = w_queuelen					// TODO: ch_write len 太小很快就会写满, 导致阻塞 
	objconn.ch_write = make(chan interface{}, w_queuelen)
	objconn.rbuf = make([]byte, 0, kCmdRBufMaxSize)
	objconn.ch_quitwloop = make(chan int, 1)
	objconn.ch_quitrloop = make(chan int, 1)
	objconn.legality.Init()
	if verify == true {
		objconn.legality.timeout = time.Now().Unix() + kLegalityVerifyTimeOut
		objconn.legality.verifystate = ConnVerifying
	}
	objconn.session = newWsSession(objconn)
	objconn.svrchannel = svrchannel
	return objconn
}

func (this *WsConnTask) Init(parser IBaseParser, netcore *NetWork) {
	this.parser = parser
	this.netcore = netcore
	this.id = int(netcore.GenerateTaskId())
	this.cb = netcore.cb
	this.ch_netevent = netcore.ch_netevent
}

// 绑定用户数据，以函数指针方式暴露接口
func (this *WsConnTask) setUserDefdata(udata interface{})	{
	this.userdata = udata
}


// LocalAddr 获取本地地址
func (this *WsConnTask) localAddr() net.Addr {
	if this.conn != nil { return (this.conn).LocalAddr() }
	return nil
}


// RemoteAddr 获取远端地址
func (this *WsConnTask) remoteAddr() net.Addr {
	if this.conn != nil { return (this.conn).RemoteAddr() }
	return nil
}

func (this *WsConnTask) rbufsize() int {
	return len(this.rbuf)
}

// 关闭退出 TODO: 有可能此时Read和Write报错通知MonitorLoop开始走清理，导致chan monitorloop被清理掉
// 解决方案: 不使用 chan monitorloop，改为使用closing状态来结束task
func (this *WsConnTask) quit() {
	stat := atomic.LoadInt32(&this.state)
	if stat == closed || stat == closing {
		//log.Error("sid[%d] is 'closed' or 'closing' stat[%d]", this.id, stat)
		return
	}

	atomic.StoreInt32(&this.state, closing)
}

// 最后调用，释放所有协程和资源
func (this *WsConnTask) cleanup() {
	this.quitWriteLoop()	// 退出wloop
	this.waitWloopQuit()	// 等待wloop
	this.quitReadLoop()		// 退出rloop
	this.waitRloopQuit()	// 等待rloop
	//this.On_Close()
	this.netcore.onSessionClose(this)

	//
	atomic.StoreInt32(&this.state, closed)
	//if this.conn != nil { this.conn.Close() }
	this.conn = nil
	this.rbuf = nil
	this.session = nil

	close(this.ch_write)
	this.ch_write = nil
	close(this.ch_quitwloop)
	this.ch_quitwloop = nil
	close(this.ch_quitrloop)
	this.ch_quitrloop = nil

}


// 重置状态准备重连
// TODO: 不一定需要重新make变量，频繁断开可能会导致内存爆炸,频繁GC等问题
func (this *WsConnTask) reset() {
	this.conn = nil
	atomic.StoreInt32(&this.state, unconnected)

	this.ch_write = make(chan interface{}, this.ch_writelen)
	this.rbuf = make([]byte, 0, kCmdRBufMaxSize)
	this.ch_quitwloop = make(chan int, 1)
	this.ch_quitrloop = make(chan int, 1)
}


// 验证通过
func (this *WsConnTask) verifyOk() {
	if atomic.LoadInt32(&this.legality.verifystate) == ConnVerifying {
		atomic.StoreInt32(&this.legality.verifystate, ConnVerifyOk)
		//log.Info("sid[%d] conn verify ok", this.id)
	}
}

func (this *WsConnTask) eventChan() chan<- ISessionEvent {
	return this.ch_netevent
}

func (this *WsConnTask) getSession() IBaseNetSession {
	return this.session
}

func (this *WsConnTask) isNilSession() bool {
	if this.session == nil || reflect.ValueOf(this.session).IsNil() {
		return true
	}
	return false
}


// 连接
func (this *WsConnTask) connect() bool {
	host := fmt.Sprintf("%s:%d",this.ip, this.port)

	url_server := url.URL{Scheme: "ws", Host: host, Path:"/ws_handler"} 
	conn, _, err := websocket.DefaultDialer.Dial(url_server.String(), nil)
	if err != nil {
		log.Error("sid[%d] can't connect to [%s] err=%s", this.id, host, err.Error())
		return false
	}

	this.conn = conn
	atomic.StoreInt32(&this.state, connected)
	this.syn_wloop.Add(1)
	this.syn_rloop.Add(1)
	this.startWriteReadLoop()
	this.session = newWsSession(this)
	return true
}

// accept一个连接
func (this *WsConnTask) accpeted() {
	atomic.StoreInt32(&this.state, connected)
	this.syn_wloop.Add(1)
	this.syn_rloop.Add(1)
	this.session = newWsSession(this)
	this.startWriteReadLoop()
}

// --------------------------------------------------------------------------
/// @brief OnConnect和OnClose有2中方式回调 
//	1.在MonitorLoop协程直接回调(多线程)
//	2.通过事件发送到主逻辑协程处理
// --------------------------------------------------------------------------
func (this *WsConnTask) On_Close() {
	if this.isNilSession() {
		return
	}
	/*/
	this.cb.OnClose(this.session)
	/*/
	// 连接成功才需要回调OnClose接口
	msgEvent := &NetCloseEvent{this.session, this.cb.OnClose}
	this.ch_netevent <- msgEvent
	//*/
}

func (this *WsConnTask) On_Connect() {
	if this.isNilSession() {
		return
	}
	/*/
	this.cb.OnConnect(this.session)
	/*/
	msgEvent := &NetConnectEvent{this.session, this.cb.OnConnect}
	this.ch_netevent <- msgEvent
	//*/
}

// TODO: 	使用通道来作为发送缓冲区，和传统缓冲区有差别
// 			0.外部协程访问
// 			1.以包作为单位，而非连续内存
//			2.致命问题: 如果ch_write通道满了，会阻塞发送操作所在协程，例如主线程
//			3.一般来说一个玩家发送队列不会积累太多消息包，发生了2情况说明这个玩家网络已经延迟很长了
//			4.致命问题: 例如发送一个1024byte包没有一次性发送完毕，不支持把剩下未发送的内容加入到发送队列最前面
//			5.最终结论: 添加一个传统的发送缓冲区
func (this *WsConnTask) sendCmd(msg interface{}) bool {
	if atomic.LoadInt32(&this.state) != connected {
		log.Error("sid[%d] conn is 'closed' and 'send' fail", this.id)
		return false
	}

	msgnum := int32(len(this.ch_write))
	if msgnum >= this.ch_writelen {
		//panic(fmt.Sprintf("sid:'%d' ch_write is full, force close!!!", this.id))
		log.Error("sid:'%d' ch_write is full, force close!!!", this.id)
		this.quit()
		return false
	}

	this.ch_write <- msg
	return true
}

func (this* WsConnTask) processRecvData() {

	for i:=0; i < 10; i++ {
		//if this.rbufsize() != 0 { log.Info("sid[%d] process data rbufsize=%d", this.id, this.rbufsize()) }
		if this.parser.UnPackMsg(&this.rbuf, this) == false {
			return
		}
	}
}

func (this *WsConnTask) waitRloopQuit() {
	this.syn_rloop.Wait()
}

func (this *WsConnTask) waitWloopQuit() {
	this.syn_wloop.Wait()
}

// 启动收发Loop
func (this *WsConnTask) startWriteReadLoop() {
	go this.WriteLoop()
	go this.ReadLoop()
}


func (this* WsConnTask) quitReadLoop() {
	if this.conn != nil { this.conn.Close(); }	// 使用阻塞Read需要Close()来触发Read内部报错解除阻塞状态，退出readloop
	this.ch_quitrloop <- 1
}


func (this* WsConnTask) quitWriteLoop() {
	this.ch_quitwloop <- 1
}


func (this *WsConnTask) WriteLoop()	{
	defer util.RecoverPanic(this.ProcessPanic, nil)
	defer this.syn_wloop.Done()
	//defer log.Info("sid[%d] WriteLoop quit", this.id)
	//log.Info("enter WriteLoop[%d]", util.GetRoutineID())

	// TODO: 这里不使用原子读应该也ok，担心影响效率
	for this.state == connected {
		time.Sleep(time.Millisecond*1)
		select {
		case <-this.ch_quitwloop:
			return
		case msg, open := <-this.ch_write:
			if open == false {
				log.Info("sid[%d] ch_write has been Closed", this.id)
				return
			}

			data , ok := this.parser.PackMsg(msg)
			if ok == false {
				panic("ProtoMsg PackMsg Fail")
				return
			}

			//this.wbuf = append(this.wbuf, data...)
			_, err := this.Write(data)
			if err != nil {
				log.Error("sid[%d] WriteError:'%s'", this.id, err)
				return
			}
		}
	}
}

func (this* WsConnTask) ReadLoop() {
	defer this.syn_rloop.Done()
	//defer log.Info("sid[%d] ReadLoop quit", this.id)
	//log.Info("enter ReadLoop[%d]", util.GetRoutineID())
	defer util.RecoverPanic(this.ProcessPanic, nil)

	// TODO: 这里不使用原子读应该也ok，担心影响效率
	for this.state == connected {
		time.Sleep(time.Millisecond*1)
		select {
		case <-this.ch_quitrloop:
			return
		default:
			_, err := this.Read()
			if err != nil	{
				log.Error("sid[%d] ReadError:%s", this.id, err)
				return
			}
			//this.processRecvData()
		}
	}
}

func (this *WsConnTask) Read()  (bool, error) {
	
	for i:=0; i < 10; i++ {
		//this.conn.SetReadDeadline(time.Now().Add(time.Millisecond * 1))	// 设置读超时, nonblock read
		msgtype, msg, err := this.conn.ReadMessage()		// 如果conn已经时效了，多次调用会"panic: repeated read on failed websocket connection"
		if err != nil || this.msgtype != int32(msgtype) {
			if nerr, convertok := err.(net.Error); convertok && nerr.Timeout() {  return true , nil }
			this.quit()
			return false, err
		}

		// TODO: rbuf无限增大，有风险导致内存耗尽
		this.rbuf = append(this.rbuf, msg...)
		//if this.rbufsize() > kSlowRbufSize { time.Sleep(time.Millisecond * 10); break; }

		// all unpack done
		for ;; {
			if this.parser.UnPackMsg(&this.rbuf, this) == false {
				break
			}
		}
	}
	
	return true, nil
}

func (this *WsConnTask) Write(data []byte) (bool, error) {
	
	//this.conn.SetWriteDeadline(time.Now().Add(time.Millisecond * 10))	// 设置写超时, Nonblock write
	err := this.conn.WriteMessage(int(this.msgtype), data)
	if err != nil {
		this.quit()
		return false, err
	}

	//log.Info("sid[%d] real send data len=%d", this.id, len_write)
	return true, nil
}

func (this *WsConnTask) ProcessPanic(data interface{}) {
	log.Fatal("taskid=%d state=%d", this.id, this.state)
	this.quit()
}
