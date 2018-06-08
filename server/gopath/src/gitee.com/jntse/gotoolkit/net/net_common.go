package network
import (
	"fmt"
	"strings"
	_"sync/atomic"
)

// --------------------------------------------------------------------------
/// @brief Net Session 基础接口
// --------------------------------------------------------------------------
type IBaseNetSession interface {
	Init()
	Id() int
	Name() string
	SendCmd(msg interface{}) bool
	Close()
	SetUserDefData(udata interface{})
	UserDefData() interface{}
	DelayClose(delay int64)
	LocalIp() string
	LocalPort() int
	RemoteIp() string
	RemotePort() int
}

// UdpConn的简单封装，暴露给外部使用
type UdpSession struct {
}
func (this* UdpSession) Init() {
}


type HttpSession struct {
}
func (this* HttpSession) Init() {
}


// --------------------------------------------------------------------------
/// @brief Host
// --------------------------------------------------------------------------
type NetHost struct {
	Ip      string  `json:"ip"`
	Port    int     `json:"port"`
}

func NewNetHost(host string) *NetHost {
	ip , port, newhost := "", 0, strings.Replace(host, ":", " ", -1)
	fmt.Sscanf(newhost, "%s %d", &ip, &port)
	return &NetHost{ip, port}
}

func (this *NetHost) String() string {
	return fmt.Sprintf("%s:%d" ,this.Ip ,this.Port)
}

func IpPortKey(ip string, port int) string {
	return fmt.Sprintf("%s:%d", ip, port)
}


// --------------------------------------------------------------------------
/// @brief 网络库配置，需要导出的字段要首字母大写
// --------------------------------------------------------------------------
type TcpListenConf struct {
	Name    string  `json:"name"`				// Listener名字
	Parser  string  `json:"parser"`				// 协议解析器
	Host    NetHost	`json:"host"`				// 监听host
	Verify	int		`json:"verify"`				// 是否校验身份
	SvrChannel bool `json:"svrchannel"`			// 服务器通道(监听服务器/客户端)

}

type TcpConnectConf struct {
	Name		string  `json:"name"`			// connector名字
	Parser		string  `json:"parser"`			// 协议解析器
	Host		NetHost	`json:"host"`			// 连接host
	Interval	int 	`json:"interval"`		// 重连间隔
	SvrChannel	bool 	`json:"svrchannel"`		// 服务器通道(自己是服务器/客户端)
	Disable		int `json:"disable"`			// 禁用配置
	DisReconnect	int	`json:"disreconnect"`	// 禁用重连
}

type HttpListenConf struct {
	Name    string  `json:"name"`				// Listener名字
	Host    NetHost	`json:"host"`				// 监听host
}

type WsListenConf struct {
	Name    string  `json:"name"`				// Listener名字
	Parser  string  `json:"parser"`				// 协议解析器
	Host    NetHost	`json:"host"`				// 监听host
	Verify	int		`json:"verify"`				// 是否校验身份
	SvrChannel bool	`json:"svrchannel"`			// 服务器通道(监听服务器/客户端)
}

type WsConnectConf struct {
	Name		string  `json:"name"`			// connector名字
	Parser		string  `json:"parser"`			// 协议解析器
	Host		NetHost	`json:"host"`			// 连接host
	Interval	int 	`json:"interval"`		// 重连间隔
	SvrChannel 	bool 	`json:"svrchannel"`		// 服务器通道(监听服务器/客户端)
	Disable		int `json:"disable"`			// 禁用配置
	DisReconnect	int	`json:"disreconnect"`	// 禁用重连
}

func (this* TcpConnectConf) SetHost(ip string, port int) {
	this.Host = NetHost{ip, port}
}

func (this* WsConnectConf) SetHost(ip string, port int) {
	this.Host = NetHost{ip, port}
}


type NetRedisConf struct {
	Passwd		string	`json:"passwd"`
	DB			int		`json:"db"`
	Host		NetHost	`json:"host"`
}

type TablePathConf struct {
	Excel	string	`json:"excel"`
	Json	string	`json:"json"`
	Xml		string	`json:"xml"`
}

type NetConf struct {
	Name        	string	`json:"name"`					// 配置名
	TblPath			TablePathConf `json:"tblpath"`			// 表格配置
	EventQueueSize	int `json:"event_queuesize"`			// 事件队列大小
	//IsServer		bool `json:"isserver"`					// 是否是服务器配置
	TcpListeners   	[]TcpListenConf  `json:"listens"`		// 监听配置
	TcpConnectors  	[]TcpConnectConf `json:"connects"`		// 连接配置
	HttpListeners 	[]HttpListenConf `json:"httplistens"`	// http服务
	WsListeners   	[]WsListenConf  `json:"wslistens"`		// 监听配置
	WsConnectors  	[]WsConnectConf `json:"wsconnects"`		// 连接配置
	Redis			NetRedisConf `json:"redis"`				// redis配置
}

func (this *NetConf) FindTcpConnectConf(name string) (TcpConnectConf, bool) {
	for _, conf := range this.TcpConnectors {
		if conf.Name == name	{
			return conf, true
		}
	}
	return TcpConnectConf{}, false
}

func (this *NetConf) FindTcpListenConf(name string) (TcpListenConf, bool) {
	for _, conf := range this.TcpListeners {
		if conf.Name == name	{
			return conf, true
		}
	}
	return TcpListenConf{}, false
}


func (this *NetConf) FindWsConnectConf(name string) (WsConnectConf, bool) {
	for _, conf := range this.WsConnectors {
		if conf.Name == name	{
			return conf, true
		}
	}
	return WsConnectConf{}, false
}

func (this *NetConf) FindWsListenConf(name string) (WsListenConf, bool) {
	for _, conf := range this.WsListeners {
		if conf.Name == name	{
			return conf, true
		}
	}
	return WsListenConf{}, false
}


// --------------------------------------------------------------------------
/// @brief 连接合法性 枚举
// --------------------------------------------------------------------------
const (
	ConnVerifying = 1		// 验证中
	ConnVerifyFailed = 2	// 验证失败
	ConnVerifyOk = 3		// 验证完成
	ConnVerifyExclude = 4	// 不用验证
	)

type TcpConnLegality struct {
	verifystate int32
	timeout int64
}

func (t* TcpConnLegality) Init() {
	t.verifystate = ConnVerifyExclude
	t.timeout = 0
}

//func (t *TcpConnLegality) Check(task IBaseConnTask) {
//	if task.getBehavior() != conn_accept {
//		return 
//	}
//
//	if t.verifystate == ConnVerifyOk || t.verifystate == ConnVerifyExclude {
//		return 
//	}
//
//	if t.timeout <= time.Now().Unix() {
//		log.Info("sid[%d] unverified in [%d] seconds", task.Id(), kLegalityVerifyTimeOut)
//		atomic.StoreInt32(&t.verifystate, ConnVerifyFailed)
//		task.quit()
//		return 
//	}
//}


// --------------------------------------------------------------------------
/// @brief 通用定义, 首字母大写导出，小写network内部使用
// --------------------------------------------------------------------------
const (
	kDafaultWriteQueueSize = 1000
	kServerWriteQueueSize  = 100000
	kReadBufferSize 	= 128 * 1024
	kWriteBufferSize 	= 128 * 1024
	KFrameDispatchNum	= 1000
	kLegalityVerifyTimeOut = 10
)


/// --------------------------------------------------------------------------
/// @brief 连接状态
// --------------------------------------------------------------------------
const (
	unconnected = 1	// 未连接
	connectting = 2	// 正在连接 -- not used
	connected = 3	// 连接成功
	closing = 4		// 正在关闭
	closed = 5		// 完全关闭
)

/// --------------------------------------------------------------------------
/// @brief Task behavior -- 连接行为 
// --------------------------------------------------------------------------
const (
	conn_uninitialized 	= 0	// uninitialized conn
	conn_accept 	= 1		// accpet  conn
	conn_connect	= 2		// connect conn
)

type IBaseConnTask interface {
	quit()
	verifyOk()
	eventChan() chan<- ISessionEvent
	getSession() IBaseNetSession
	On_Connect()
	On_Close()
}

type sendHandler			func(msg interface{}) bool
//type onCloseHandler		func(userdata interface{})
//type onEstablishedHandler	func(func(userdata interface{}))

