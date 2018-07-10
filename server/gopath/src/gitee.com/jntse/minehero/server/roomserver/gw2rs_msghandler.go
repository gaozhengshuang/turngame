package main
import (
	"fmt"
	"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	_"github.com/go-redis/redis"
)


//func init() {
//	log.Info("gw2rs_msghandler.init")
//	NewC2GWMsgHandler()
//}

type C2GWMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewC2GWMsgHandler() *C2GWMsgHandler {
	handler := &C2GWMsgHandler{}
	handler.Init()
	return handler
}

func (this* C2GWMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("GW2RS_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收
	this.msgparser.RegistProtoMsg(msg.GW2RS_RetRegist{}, on_GW2RS_RetRegist)
	this.msgparser.RegistProtoMsg(msg.GW2RS_UserDisconnect{}, on_GW2RS_UserDisconnect)
	this.msgparser.RegistProtoMsg(msg.GW2RS_MsgTransfer{}, on_GW2RS_MsgTransfer)
	this.msgparser.RegistProtoMsg(msg.BT_UploadGameUser{}, on_BT_UploadGameUser)
	this.msgparser.RegistProtoMsg(msg.BT_ReqEnterRoom{}, on_BT_ReqEnterRoom)
	this.msgparser.RegistProtoMsg(msg.BT_ReqQuitGameRoom{}, on_BT_ReqQuitGameRoom)
	this.msgparser.RegistProtoMsg(msg.BT_UpdateMoney{}, on_BT_UpdateMoney)
	this.msgparser.RegistProtoMsg(msg.C2GW_StartLuckyDraw{}, on_C2GW_StartLuckyDraw)


	// 发
	this.msgparser.RegistSendProto(msg.RS2GW_ReqRegist{})
	this.msgparser.RegistSendProto(msg.RS2GW_RetUserDisconnect{})
	this.msgparser.RegistSendProto(msg.RS2GW_MsgTransfer{})
	//this.msgparser.RegistSendProto(msg.BT_GameInit{})
	//this.msgparser.RegistSendProto(msg.BT_SendBattleUser{})
	//this.msgparser.RegistSendProto(msg.BT_GameStart{})
	this.msgparser.RegistSendProto(msg.BT_GameEnd{})
	//this.msgparser.RegistSendProto(msg.BT_PickItem{})

	// 发Gate
	this.msgparser.RegistSendProto(msg.GW2C_MsgNotify{})
}

func on_GW2RS_RetRegist(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2RS_RetRegist)
	name, ip, port := tmsg.GetAgentname(), session.RemoteIp(), session.RemotePort()
	if tmsg.GetErrcode() != "" {
		log.Info("请求注册房间服[%s]到Gate[%s][%s:%d]失败: %s", RoomSvr().Name(), session.Name(), ip, port, tmsg.GetErrcode())
		panic(fmt.Sprintf("网关通知注册失败 原因:%s", tmsg.GetErrcode()))
		return
	}

	// TODO: 重复注册服务器为了第一时间发现问题使用了panic
	if GateMgr().IsRegisted(ip, port) == true {
		log.Fatal(fmt.Sprintf("已经注册过网关房间服务器 [%s:%d]", ip, port))
		return
	}

	// 添加gate
	GateMgr().AddNew(session, name, ip, port)
	log.Info("注册房间服[%s]到Gate[%s][%s:%d]成功", RoomSvr().Name(), session.Name(), ip, port)
}

func on_GW2RS_UserDisconnect(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2RS_UserDisconnect)
	//log.Info(reflect.TypeOf(tmsg).String())

	rsend := &msg.RS2GW_RetUserDisconnect{ Roomid:tmsg.Roomid, Userid:tmsg.Userid, Errcode: pb.String("") }
	roomid, userid := tmsg.GetRoomid(), tmsg.GetUserid()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("GW2RS_UserDisconnect 游戏房间[%d]不存在 玩家[%d]", roomid, userid)
		rsend.Errcode = pb.String("找不到房间")
		session.SendCmd(rsend)
		return
	}
	room.UserDisconnect(userid)
	session.SendCmd(rsend)
}

func on_GW2RS_MsgTransfer(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2RS_MsgTransfer)
	msg_type := pb.MessageType(tmsg.GetName())
	if msg_type == nil {
		log.Fatal("消息转发解析失败，找不到proto msg=%s" , tmsg.GetName())
		return
	}

	protomsg := reflect.New(msg_type.Elem()).Interface()
	err := pb.Unmarshal(tmsg.GetBuf(), protomsg.(pb.Message))
	if err != nil {
		log.Fatal("消息转发解析失败，Unmarshal失败 msg=%s" , tmsg.GetName())
		return
	}

	CMHandler().Handler(session, protomsg, tmsg.GetUid())
	//log.Info("msg=%v", protomsg)
}

func on_BT_UploadGameUser(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_UploadGameUser)
	roomid := tmsg.GetRoomid()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("收到玩家信息，但游戏房间[%d]不存在", roomid)
		return
	}

	room.LoadUser(tmsg.GetBin(), session)
}

func on_BT_ReqEnterRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_ReqEnterRoom)
	roomid, userid, token := tmsg.GetRoomid(), tmsg.GetUserid(), tmsg.GetToken()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("BT_ReqEnterRoom 游戏房间[%d]不存在 玩家[%d]", roomid, userid)
		return
	}

	room.UserEnter(userid, token)
}

func on_BT_ReqQuitGameRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_ReqQuitGameRoom)
	roomid, userid := tmsg.GetRoomid(), tmsg.GetUserid()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("on_BT_ReqQuitGameRoom 游戏房间[%d]不存在 玩家[%d]", roomid, userid)
		return
	}
	room.UserLeave(userid)
}

func on_BT_UpdateMoney(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_UpdateMoney)
	roomid, userid, money := tmsg.GetRoomid(), tmsg.GetUserid(), tmsg.GetMoney()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("BT_UpdateMoney 游戏房间[%d]不存在 玩家[%d]", roomid, userid)
		return
	}
	
	room.UpdateMoneyByClient(money)
}

func on_C2GW_StartLuckyDraw(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_StartLuckyDraw)
	user := UserMgr().FindUser(tmsg.GetUserid())
	if user == nil { 
		log.Error("C2GW_StartLuckyDraw 玩家[%d]没有在Room中", tmsg.GetUserid())
		return 
	}
	user.LuckyDraw()
}

