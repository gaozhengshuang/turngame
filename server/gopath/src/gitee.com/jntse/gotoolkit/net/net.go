package network
import (
	"time"
	"fmt"
	"sync"
	"gitee.com/jntse/gotoolkit/log"
)

const (
	kCmdRMaxSize    	= 4096			// 单次收包大小 4k
	kCmdWMaxSize    	= 1024			// 单次发包大小 1k
	kCmdRBufMaxSize		= 128 * 1024	// 接收缓冲区初始容量, 128k
	kCmdWBufMaxSize		= 128 * 1024	// 发送缓冲区初始容量, 128k
	kKilobyteSize		= 1024			// 1K Bytes
	kMegabyteSize		= 1048576		// 1M Bytes
	kEventQueueMaxSize 	= 100000		// 要足够大，否则主线程消息处理效率很低
	kSlowRbufSize		= 1048576		// 1M Bytes，rbuf大于这个大小，减速readloop
	kTcpKeepAlivePeriod	= 30 * time.Second	// Tcp内部心跳间隔,秒
)

type NetWork struct {
	netconf			NetConf
	tcplisteners	map[string]*TcpListener
	tcpconnectors	map[string]*TcpConnector
	tcplocker 		sync.Mutex
	httplisteners 	map[string]*HttpListener
	wslisteners		map[string]*WsListener
	wsconnectors	map[string]*WsConnector
	wslocker 		sync.Mutex
	ch_main			chan string
	running			bool
	initflag		bool
	cb				IBaseNetCallback
	ch_netevent		chan ISessionEvent
	cb_http			HttpResponseHandle
	NetSessionPool
}

func init() {
	fmt.Println("jntse/gotoolkit/net.init()")
}

// --------------------------------------------------------------------------
/// @brief 导出函数
///
/// @param 
// --------------------------------------------------------------------------

//// NetWork 是Singleton单实例对象
//var g_pNetWorkIns *NetWork = nil
//func NetWorkIns() *NetWork {
//	if g_pNetWorkIns == nil { g_pNetWorkIns = newNetWork() }
//	return g_pNetWorkIns
//}

func NewNetWork() *NetWork {
	server := new(NetWork)
	server.netconf = NetConf{}
	server.running = false
	server.initflag= false
	server.ch_main = make(chan string, 1)	// 非阻塞
	server.tcplisteners = make(map[string]*TcpListener)
	server.tcpconnectors = make(map[string]*TcpConnector)
	server.wslisteners = make(map[string]*WsListener)
	server.wsconnectors= make(map[string]*WsConnector)
	server.httplisteners = make(map[string]*HttpListener)
	server.cb_http = nil
	return server
}

func (this* NetWork) Init(netconf *NetConf, cb IBaseNetCallback) {
	this.netconf = *netconf
	this.cb = cb
	queue_size := kEventQueueMaxSize
	if netconf.EventQueueSize != 0 { queue_size = netconf.EventQueueSize }	// 优先使用配置
	this.ch_netevent = make(chan ISessionEvent, queue_size)  // TODO: 要足够大，否则队列满后阻塞导致效率大幅降低
	this.initflag = true
	this.NetSessionPool.Init()
}

func (this* NetWork) Start() bool {
	if !this.initflag {
		log.Error("NetWork should init first")
		return false
	}

	this.running = true
	if this.startTcpListener() == false {
		return false
	}

	if this.startHttpListener() == false {
		return false
	}

	if this.startWsListener() == false {

		return false
	}

	if this.startTcpConnector() == false {
		return  false
	}

	if this.startWsConnector() == false {
		return  false
	}

	return true
}

func (this* NetWork) Shutdown() {
	this.running = false
	for _, listener := range this.tcplisteners {
		listener.shutdown()
	}

	for _, connector := range this.tcpconnectors {
		connector.shutdown()
	}

	for _, listener := range this.httplisteners {
		listener.shutdown()
	}

	for _, listener := range this.wslisteners {
		listener.shutdown()
	}

	for _, connector := range this.wsconnectors {
		connector.shutdown()
	}


	time.Sleep(time.Millisecond*10)
}

func (this* NetWork) IsClosed() bool {
	return !this.running
}


// --------------------------------------------------------------------------
/// @brief 非导出函数
///
/// @param 
// --------------------------------------------------------------------------
func (this* NetWork) startHttpListener() bool {
	for _ , l_conf := range this.netconf.HttpListeners {
		listener := NewHttpListener(l_conf)
		listener.Init(this.cb_http)		// 通用http response handler func
		if listener.Start() == false {
			return false
		}
		this.httplisteners[listener.Name()] = listener
	}

	return true
}

func (this* NetWork) startTcpListener() bool {
	for _ , l_conf := range this.netconf.TcpListeners {
		parser := getParser(l_conf.Parser)
		if parser == nil {
			log.Error("NetWork start listener fail not found Parser'%s'", l_conf.Parser)
			return false
		}

		listener := newTcpListener(l_conf, parser, this)
		listener.Init()
		if listener.Start() == false {
			return false
		}
		this.tcplisteners[listener.Name()] = listener
		//log.Info("NetWork startTcpListener '%s' ok", l_conf.Name)
	}

	return true
}

func (this* NetWork) startTcpConnector() bool {
	for _, c_conf := range this.netconf.TcpConnectors {
		parser := getParser(c_conf.Parser)
		if parser == nil {
			log.Error("NetWork start connector fail not found Parser'%s'", c_conf.Parser)
			return false
		}

		// 配置是否被禁用
		if c_conf.Disable == 1 {
			continue	
		}

		// IsServer: 自己是服务器
		connector := newTcpConnector(c_conf, parser, this)
		connector.Init()
		if connector.Start() == false {
			return false
		}
		this.tcpconnectors[connector.Name()] = connector
		log.Info("NetWork startTcpConnector '%s' ok", c_conf.Name)
	}
	return true
}


func (this* NetWork) startWsListener() bool {
	for _ , l_conf := range this.netconf.WsListeners {
		parser := getParser(l_conf.Parser)
		if parser == nil {
			log.Error("NetWork start wslistener fail not found Parser'%s'", l_conf.Parser)
			return false
		}

		listener := newWsListener(l_conf, parser, this)
		listener.Init()
		if listener.Start() == false {
			return false
		}
		this.wslisteners[listener.Name()] = listener
		//log.Info("NetWork startWsListener '%s' ok", l_conf.Name)
	}

	return true
}

func (this* NetWork) startWsConnector() bool {
	for _, c_conf := range this.netconf.WsConnectors {
		parser := getParser(c_conf.Parser)
		if parser == nil {
			log.Error("NetWork start wsconnector fail not found Parser'%s'", c_conf.Parser)
			return false
		}

		// 配置是否被禁用
		if c_conf.Disable == 1 {
			continue	
		}

		// IsServer: 自己是服务器
		connector := newWsConnector(c_conf, parser, this)
		connector.Init()
		if connector.Start() == false {
			return false
		}
		this.wsconnectors[connector.Name()] = connector
		log.Info("NetWork startWsConnector '%s' ok", c_conf.Name)
	}
	return true
}


// 断开并删除一个TcpConnector
func (this *NetWork) delTcpConnector(name string) {
	this.tcplocker.Lock()
	//connector, ok := this.tcpconnectors[name]
	_, ok := this.tcpconnectors[name]
	if ok == true {
		delete(this.tcpconnectors, name)
		this.tcplocker.Unlock()
		//connector.shutdown()
		log.Info("NetWork DelTcpConnector '%s' ok", name)
		return
	}
	this.tcplocker.Unlock()

	if ok == false {
		log.Info("NetWork DelTcpConnector not found'%s' ", name)
		return
	}
}


// 增加一个新TcpConnector，线程安全
//func (this *NetWork) AddTcpConnector(conf TcpConnectConf, cb IBaseNetCallback) bool {
func (this *NetWork) AddTcpConnector(conf TcpConnectConf) bool {
	parser := getParser(conf.Parser)
	if parser == nil {
		log.Error("NetWork AddTcpConnector fail not find Parser'%s'", conf.Parser)
		return false
	}

	this.tcplocker.Lock()
	if _, ok := this.tcpconnectors[conf.Name]; ok == true {
		this.tcplocker.Unlock()
		log.Error("NetWork AddTcpConnector fail connector exist conf[%s]", conf.Name)
		return false
	}
	this.tcplocker.Unlock()

	// IsServer: 自己是服务器
	connector := newTcpConnector(conf, parser, this)
	connector.Init()
	if connector.Start() == false {
		return false
	}
	this.tcplocker.Lock()
	this.tcpconnectors[connector.Name()] = connector
	this.tcplocker.Unlock()
	log.Info("NetWork AddTcpConnector '%s' ok", conf.Name)
	return true
}



// 断开并删除一个WsConnector
func (this *NetWork) delWsConnector(name string) {
	this.wslocker.Lock()
	//connector, ok := this.wsconnectors[name]
	_, ok := this.wsconnectors[name]
	if ok == true {
		delete(this.wsconnectors, name)
		this.wslocker.Unlock()
		//connector.shutdown()
		log.Info("NetWork DelWsConnector '%s' ok", name)
		return
	}
	this.wslocker.Unlock()

	if ok == false {
		log.Info("NetWork DelWsConnector not found'%s' ", name)
		return
	}
}


// 增加一个新WsConnector
func (this *NetWork) AddWsConnector(conf WsConnectConf) bool {
	parser := getParser(conf.Parser)
	if parser == nil {
		log.Error("NetWork AddWsConnector fail not find Parser'%s'", conf.Parser)
		return false
	}

	this.wslocker.Lock()
	if _, ok := this.wsconnectors[conf.Name]; ok == true {
		this.wslocker.Unlock()
		log.Error("NetWork AddWsConnector fail connector exist conf[%s]", conf.Name)
		return false
	}
	this.wslocker.Unlock()

	// IsServer: 自己是服务器
	connector := newWsConnector(conf, parser, this)
	connector.Init()
	if connector.Start() == false {
		return false
	}

	this.wslocker.Lock()
	this.wsconnectors[connector.Name()] = connector
	this.wslocker.Unlock()
	log.Info("NetWork AddWsConnector '%s' ok", conf.Name)

	return true
}


func (this *NetWork) SetHttpResponseHandler(cb_http HttpResponseHandle) {
	this.cb_http = cb_http
}

// 退出条件：处理指定num事件或者队列为空
func (this *NetWork) Dispatch(num int) {
	for i:= 0; i < num; i++ {
		select {
		case event, open := <-this.ch_netevent:
			if open == false {
				panic("ch_netevent is closed")
				return
			}
			event.Process()
		default:
			return
		}
	}
}

func (this *NetWork) EventQueueSize() int {
	return len(this.ch_netevent)
}

func (this *NetWork) EventQueueCapacity() int {
	return cap(this.ch_netevent)
}

func (this *NetWork) SessionSize() int32 {
	return this.NetSessionPool.Size()
}
