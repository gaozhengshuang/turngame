package network
import (
	_"fmt"
	"time"
	"sync/atomic"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
)

type WsConnector struct {
	conf		WsConnectConf
	running		bool						// 断开连接仍然true，只有Shutdown设置false
	interval	int							// 重连间隔
	ticker		*util.GameTicker			// 重连定时器
	conn		*WsConnTask					// 连接对象
	netcore		*NetWork					// 网络框架
	parser		IBaseParser					// 解析器
}

func newWsConnector(conf WsConnectConf, parser IBaseParser, netcore *NetWork) *WsConnector {
	connector := &WsConnector{}
	connector.parser = parser;
	connector.conf = conf
	connector.interval = conf.Interval
	connector.running = true
	connector.netcore = netcore
	if connector.interval <= 0 { connector.interval = 1 }
	ip , port, name := conf.Host.Ip, conf.Host.Port, conf.Name
	var w_queuelen int32 = kDafaultWriteQueueSize
	//if isServer == true { w_queuelen = kServerWriteQueueSize }
	if conf.SvrChannel { w_queuelen = kServerWriteQueueSize }
	connector.conn = newWsConnTask(ip, port, name, conn_connect, w_queuelen, nil, false, conf.SvrChannel)
	connector.conn.Init(parser, netcore)
	connector.ticker = util.NewGameTicker(time.Second * time.Duration(connector.interval), connector.tickReconnect)
	connector.ticker.Start()
	connector.Init()
	return connector
}


// --------------------------------------------------------------------------
/// @brief 公用接口
// --------------------------------------------------------------------------
func (this* WsConnector) Init() {
}

func (this* WsConnector) Start() bool {
	go this.TcpConnMonitorLoop()
	return true
}

// connector 结束清理task
func (this* WsConnector) shutdown() {
	this.running = false
	stat := atomic.LoadInt32(&this.conn.state)
	if stat == closed || stat == closing {
		return
	}
	this.conn.quit()
}

func (this* WsConnector) ID() int {
	return this.conn.id
}

func (this* WsConnector) Name() string {
	return this.conf.Name
}

// 禁用重连
func (this *WsConnector) IsCanReconnect() bool {
	if this.running == true && this.conf.DisReconnect == 0 {
		return true
	}
	return false
}

// --------------------------------------------------------------------------
/// @brief 非导出接口
// --------------------------------------------------------------------------
func (this* WsConnector) tickReconnect(now int64) {
	if atomic.LoadInt32(&this.conn.state) == unconnected { 
		this.reconnect() 
	}
}

func (this* WsConnector) reconnect() {
	if atomic.LoadInt32(&this.conn.state) == connected {
		log.Error("已经连接成功了")
		return
	}

	//log.Info("sid[%d] 重连中[%s]...", this.ID(), this.conf.Host.String())
	if this.conn.connect() {
		this.onEstablished()
		return
	}

	// 可能第一次就连接失败，禁用重连就不需要在进行连接了
	if this.IsCanReconnect() == false {
		this.shutdown()
	}
}

func (this* WsConnector) TcpConnMonitorLoop()	{
	defer log.Info("sid[%d] '%s' TcpConnMonitorLoop Quit Done", this.ID(), this.Name())
	defer this.ticker.Stop()
	for {
		time.Sleep(time.Millisecond * 20)

		stat := atomic.LoadInt32(&this.conn.state)
		if stat == closed || stat == closing {
			if ( stat == closing ) {
				this.conn.cleanup() 
			}

			if this.IsCanReconnect() == false { 	// 如果禁用重连，断开后删除connector，并退出
				this.netcore.delWsConnector(this.Name())
				return
			}

			this.conn.reset()
			log.Info("sid[%d] '%s' Start Reconnect... ", this.ID(), this.Name())
		}

		this.ticker.Run(util.CURTIMEMS())
	}
}

// 回调
func (this* WsConnector) onEstablished() {
	log.Info("sid[%d] 连接成功[%s] w_qlen[%d]", this.ID(), this.conf.Host.String(), this.conn.ch_writelen)
	//this.conn.On_Connect()
	this.netcore.onSessionEstablished(this.conn)
}


