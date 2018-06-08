package network
import "time"
import "net"

// WsConnTask的简单封装，暴露给外部使用
type WsSession struct {
	conn		*WsConnTask 		// 小写不暴露给外部使用
	id 			int
	name 		string
	setUserDefData func(data interface{})
	sendCmd		sendHandler
}

func newWsSession(conn *WsConnTask) *WsSession {
	session := &WsSession{conn, conn.id, conn.name, conn.setUserDefdata, conn.sendCmd}
	return session
}

func (this *WsSession) Init() {
}

func (this *WsSession) Id() int {
	return this.id
}

func (this *WsSession) Name() string {
	return this.name
}

func (this *WsSession) SendCmd(msg interface{}) bool {
	return this.sendCmd(msg)
}


// 关闭Session(外部调用)
func (this *WsSession) Close() {
	this.conn.quit()
}

func (this *WsSession) DelayClose(delay int64) {
	go func(session* WsSession, delay int64) {
		time.Sleep(time.Second * time.Duration(delay))
		session.Close()
	}(this, delay)
}

func (this *WsSession) SetUserDefData(udata interface{}) {
	this.setUserDefData(udata)
}

func (this *WsSession) UserDefData() interface{} {
	return this.conn.userdata
}

func (this *WsSession) LocalIp() string {
	var addr net.Addr = this.conn.localAddr()
	if addr == nil { return "" }
	return NewNetHost(addr.String()).Ip
}

func (this *WsSession) LocalPort() int {
	var addr net.Addr = this.conn.localAddr()
	if addr == nil { return 0 }
	return NewNetHost(addr.String()).Port
}

func (this *WsSession) RemoteIp() string {
	var addr net.Addr = this.conn.remoteAddr()
	if addr == nil { return "" }
	return NewNetHost(addr.String()).Ip
}

func (this *WsSession) RemotePort() int {
	var addr net.Addr = this.conn.remoteAddr()
	if addr == nil { return 0 }
	return NewNetHost(addr.String()).Port
}


