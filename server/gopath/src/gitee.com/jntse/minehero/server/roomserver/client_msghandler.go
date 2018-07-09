package main
import (
	"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	_"gitee.com/jntse/minehero/pbmsg"
	//"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	_"github.com/go-redis/redis"
)


// --------------------------------------------------------------------------
/// @brief 转发客户端消息Handler
/// @return 
// --------------------------------------------------------------------------
type ClientMsgFunHandler func(session network.IBaseNetSession, message interface{}, uid uint64)
type ClientMsgHandler struct {
	msghandler map[string]ClientMsgFunHandler
}

func NewClientMsgHandler() *ClientMsgHandler {
	h := new(ClientMsgHandler)
	h.Init()
	return h
}

func (this *ClientMsgHandler) Init() {
	this.msghandler = make(map[string]ClientMsgFunHandler)

	// 消息注册
	//this.Regist(msg.C2GW_StartLuckyDraw{}, on_C2GW_StartLuckyDraw)
}

func (this *ClientMsgHandler) Regist(message interface{} , fn ClientMsgFunHandler) {
	msg_type := reflect.TypeOf(message)
	this.msghandler[msg_type.String()] = fn
}

func (this *ClientMsgHandler) Handler(session network.IBaseNetSession, message interface{}, uid uint64) {
	pbmsg := message.(pb.Message)
	name := pb.MessageName(pbmsg)
	fn, ok := this.msghandler[name]
	if ok == false {
		log.Error("ClientMsgHandler 未注册消息%s", name)
		return
	}
	fn(session, message, uid)
}

//func on_C2GW_StartLuckyDraw(session network.IBaseNetSession, message interface{}, uid uint64) {
//	//tmsg := message.(*msg.C2GW_StartLuckyDraw)
//	user := UserMgr().FindUser(uid)
//	if user == nil { 
//		log.Error("C2GW_StartLuckyDraw 玩家[%d]没有在Room中", uid)
//		return 
//	}
//	user.LuckyDraw()
//}

