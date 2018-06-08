package network
import "time"
import "net"

// TcpConnTask的简单封装，暴露给外部使用
type TcpSession struct {
	conn		*TcpConnTask 		// 小写不暴露给外部使用
	id 			int
	name 		string
	setUserDefData func(data interface{})
	sendCmd		sendHandler
}

func newTcpSession(conn *TcpConnTask) *TcpSession {
	session := &TcpSession{conn, conn.id, conn.name, conn.setUserDefdata, conn.sendCmd}
	return session
}

func (this *TcpSession) Init() {
}

func (this *TcpSession) Id() int {
	return this.id
}

func (this *TcpSession) Name() string {
	return this.name
}

func (this *TcpSession) SendCmd(msg interface{}) bool {
	return this.sendCmd(msg)
}

// 关闭Session(外部调用)
func (this *TcpSession) Close() {
	this.conn.quit()
}

func (this *TcpSession) DelayClose(delay int64) {
	go func(session* TcpSession, delay int64) {
		time.Sleep(time.Second * time.Duration(delay))
		session.Close()
	}(this, delay)
}

func (this *TcpSession) SetUserDefData(udata interface{}) {
	this.setUserDefData(udata)
}

func (this *TcpSession) UserDefData() interface{} {
	return this.conn.userdata
}

func (this *TcpSession) LocalIp() string {
	var addr net.Addr = this.conn.localAddr()
	if addr == nil { return "" }
	return NewNetHost(addr.String()).Ip
}

func (this *TcpSession) LocalPort() int {
	var addr net.Addr = this.conn.localAddr()
	if addr == nil { return 0 }
	return NewNetHost(addr.String()).Port
}

func (this *TcpSession) RemoteIp() string {
	var addr net.Addr = this.conn.remoteAddr()
	if addr == nil { return "" }
	return NewNetHost(addr.String()).Ip
}

func (this *TcpSession) RemotePort() int {
	var addr net.Addr = this.conn.remoteAddr()
	if addr == nil { return 0 }
	return NewNetHost(addr.String()).Port
}


