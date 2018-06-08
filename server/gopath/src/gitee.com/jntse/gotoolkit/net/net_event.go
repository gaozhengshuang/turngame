package network

type IBaseNetCallback interface {
	OnClose(session IBaseNetSession)
	OnConnect(session IBaseNetSession)
}


type ISessionEvent interface {
	InitEvent()
	Process()
}


// --------------------------------------------------------------------------
/// @brief 网络 OnConnect 事件
/// @brief Session用接口虽然很通用但是类型断言有性能损失，目前暂时使用具体类型吧
// --------------------------------------------------------------------------
type NetConnectEvent struct {
	Session		IBaseNetSession
	Handler 	func(session IBaseNetSession)
}
func (this *NetConnectEvent) InitEvent() {
}

func (this *NetConnectEvent) Process() {
	this.Handler(this.Session)
}


// --------------------------------------------------------------------------
/// @brief 网络 OnClose 事件
/// @brief 
// --------------------------------------------------------------------------
type NetCloseEvent struct {
	Session		IBaseNetSession
	Handler     func(session IBaseNetSession)
}
func (this *NetCloseEvent) InitEvent() {
}

func (this *NetCloseEvent) Process() {
	this.Handler(this.Session)
}


// --------------------------------------------------------------------------
/// @brief 网络 OnError 事件
/// @brief 
// --------------------------------------------------------------------------
type NetErrorEvent struct {
	Session		IBaseNetSession
	Handler     func(session IBaseNetSession)
}
func (this *NetErrorEvent) InitEvent() {
}

func (this *NetErrorEvent) Process() {
	this.Handler(this.Session)
}

// --------------------------------------------------------------------------
/// @brief 消息派发处理事件
/// @brief Session用接口虽然很通用但是类型断言有性能损失，目前暂时使用具体类型吧
// --------------------------------------------------------------------------
type MsgDispatchEvent struct {
	Session 	IBaseNetSession
	Msg  		interface{}
	Handler 	MsgHandle
}
func (this *MsgDispatchEvent) InitEvent() {
}

func (this *MsgDispatchEvent) Process() {
	this.Handler(this.Session, this.Msg)
}


// --------------------------------------------------------------------------
/// @brief http 应答事件
// --------------------------------------------------------------------------
type HttpResponseEvent struct {
	Msg interface{}
	Handler func(msg interface{})
}

func (this *HttpResponseEvent) InitEvent() {
}

func (this *HttpResponseEvent) Process() {
	this.Handler(this.Msg)
}

