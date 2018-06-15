package main
import (
	"fmt"
	_"time"
	_"strings"
	"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/minehero/pbmsg"
	"github.com/go-redis/redis"
)


//func init() {
//	NewRS2MSMsgHandler()
//}

type RS2MSMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewRS2MSMsgHandler() *RS2MSMsgHandler {
	handler := &RS2MSMsgHandler{}
	handler.Init()
	return handler
}

func (this* RS2MSMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("RS2MS_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收
	this.msgparser.RegistProtoMsg(msg.RS2MS_ReqRegist{}, on_RS2MS_ReqRegist)
	this.msgparser.RegistProtoMsg(msg.RS2MS_HeartBeat{}, on_RS2MS_HeartBeat)
	this.msgparser.RegistProtoMsg(msg.RS2MS_RetCreateRoom{}, on_RS2MS_RetCreateRoom)
	this.msgparser.RegistProtoMsg(msg.RS2MS_UpdateRewardPool{}, on_RS2MS_UpdateRewardPool)
	this.msgparser.RegistProtoMsg(msg.RS2MS_MsgNotice{}, on_RS2MS_MsgNotice)

	// 发
	this.msgparser.RegistSendProto(msg.MS2RS_RetRegist{})
	this.msgparser.RegistSendProto(msg.MS2RS_HeartBeat{})
	this.msgparser.RegistSendProto(msg.MS2RS_GateInfo{})
	this.msgparser.RegistSendProto(msg.MS2RS_CreateRoom{})
	this.msgparser.RegistSendProto(msg.MS2Server_BroadCast{})

}

func on_RS2MS_ReqRegist(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2MS_ReqRegist)
	name := tmsg.GetName()
	if tmsg.GetAccount() != "room_account_123" || tmsg.GetPasswd() != "room_passwd_123" {
		log.Info("Room[%s]验证失败，断开", name)
		session.Close()
		return
	}

	// TODO: 重复注册服务器为了第一时间发现问题使用了panic
	if RoomSvrMgr().IsRegisted(name) == true {
		log.Fatal(fmt.Sprintf("重复注册房间服务器 %s", name))
		session.SendCmd(&msg.MS2RS_RetRegist{Errcode:pb.String("重复注册房间服务器")})
		return
	}
	session.SendCmd(&msg.MS2RS_RetRegist{})

	// 添加Room
	RoomSvrMgr().AddNewSession(session, name)
}

func on_RS2MS_HeartBeat(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2MS_HeartBeat)
	log.Info(reflect.TypeOf(tmsg).String())
}

func on_RS2MS_MsgNotice(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2MS_MsgNotice)
	//log.Info(reflect.TypeOf(tmsg).String())
	send := &msg.MS2GW_MsgNotice{ Notice : tmsg.GetNotice()}
	Match().BroadcastGateMsg(send)
}

func on_RS2MS_RetCreateRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2MS_RetCreateRoom)
	//log.Info(reflect.TypeOf(tmsg).String())

	roomid, userid, sid_gate, errcode := tmsg.GetRoomid(), tmsg.GetUserid(), tmsg.GetSidgate(), tmsg.GetErrcode()
	agent, agentname := RoomSvrMgr().FindRoomAgent(session.Id()), ""
	if agent == nil {
		errcode = fmt.Sprintf("创建房间[%d]返回，但找不到RoomAgent[%d] RoomErrcode[%s] ", roomid, session.Id(), errcode)
	} else {
		agentname = agent.Name()
	}

	rsend := &msg.MS2GW_RetCreateRoom  { 
		Userid : pb.Uint64(userid),
		Errcode : pb.String(errcode),
		Roomid : pb.Int64(roomid),
		Roomagent : pb.String(agentname),
	}
	Match().SendMsg(int(sid_gate), rsend)

	if errcode == "" {
		log.Error("RS返回 创建房间成功[%d] 玩家[%d] ts[%d]", roomid, userid, util.CURTIMEMS())
	} else {
		log.Error("RS返回 创建房间失败[%d] 玩家[%d] errcode: %s", roomid, userid, errcode)
	}
}


func on_RS2MS_UpdateRewardPool(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2MS_UpdateRewardPool)
	log.Info(reflect.TypeOf(tmsg).String())
	mapid , cost := tmsg.GetMapid(), tmsg.GetCost()
	SetGlobalRewardPool(mapid, int64(cost))
}

// 
func GetDungeonsConfig(gamekind int32) (*table.TDungeonsDefine) {
	dconfig, findid := tbl.DungeonsBase.TDungeonsById[gamekind]
	if findid == false {
		return nil
	}
	return dconfig
}

// --------------------------------------------------------------------------
/// @brief 全局奖池
// --------------------------------------------------------------------------
func SetGlobalRewardPool(mapid int32, cost int64) bool {

	dconfig := GetDungeonsConfig(mapid)
	if dconfig == nil {
		log.Error("[全局奖池] 获取房间类型[%d]配置失败", mapid)
		return false
	}

	// 生成一次奖励配额
	if dconfig.Rewardid == 0 {
		log.Error("[全局奖池] 获取房间类型[%d]的奖池失败，没有配置大奖", mapid)
		return false
	}

	// 获得当前奖池
	key := fmt.Sprintf("global_rewardpool_%d", mapid)
	val, err := Redis().Get(key).Int64()
	if err != nil && err != redis.Nil {
		log.Error("[全局奖池] 获取房间类型[%d]的奖池失败 err[%s]", mapid, err)
		return false
	}

	newval := val + cost
	for newval >= int64(dconfig.Scorelimit) && dconfig.Scorelimit != 0 {
		rkey := fmt.Sprintf("global_rewardpool_%d_quota", mapid)
		val, err := Redis().Incr(rkey).Result()
		if err != nil {
			log.Error("[全局奖池] 更新房间类型[%d]的奖励配额失败 err[%s]", mapid, err)
			return false
		}
		log.Error("[全局奖池] 更新房间类型[%d]的奖励配额成功 Old[%d] New[%d]", mapid, val - 1, val)
		newval = newval - int64(dconfig.Scorelimit)
	}

	// 保存剩余奖池
	retset, seterr := Redis().Set(key, newval, 0).Result()
	if  seterr != nil || retset != "OK" {
		log.Error("[全局奖池] 更新房间类型[%d]的奖池失败 err[%s]", mapid, seterr)
		return false
	}
	log.Info("[全局奖池] 更新房间类型[%d]的奖池成功 当前奖池[%d]", mapid, newval)
	return true
}


//func on_RS2MS_DeleteRoom(session network.IBaseNetSession, message interface{}) {
//	tmsg := message.(*msg.RS2MS_DeleteRoom)
//	log.Info(reflect.TypeOf(tmsg).String())
//
//	roomid := tmsg.GetRoomid()
//	agent := RoomSvrMgr().FindRoomAgent(session.Id())
//	if agent == nil {
//		log.Error("删除房间[%d]失败，但找不到RoomAgent[%d]", roomid, session.Id())
//		return
//	}
//
//	gameroom := agent.FindGameRoom(roomid)
//	if gameroom == nil {
//		log.Error("删除房间[%d]失败，但找不到房间信息", roomid)
//		return
//	}
//
//	agent.RemoveGameRoom(roomid)
//	log.Error("删除房间[%d]成功", roomid)
//}

