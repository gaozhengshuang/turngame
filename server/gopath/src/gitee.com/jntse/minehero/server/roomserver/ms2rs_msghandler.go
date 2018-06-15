package main
import (
	_"time"
	"fmt"
	"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"encoding/json"
)


//func init() {
//	log.Info("ms2rs_msghandler.init")
//	NewMS2RSMsgHandler()
//}

type MS2RSMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewMS2RSMsgHandler() *MS2RSMsgHandler {
	handler := &MS2RSMsgHandler{}
	handler.Init()
	return handler
}

func (this* MS2RSMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("MS2RS_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}


	// 收
	this.msgparser.RegistProtoMsg(msg.MS2RS_RetRegist{}, on_MS2RS_RetRegist)
	this.msgparser.RegistProtoMsg(msg.MS2RS_HeartBeat{}, on_MS2RS_HeartBeat)
	this.msgparser.RegistProtoMsg(msg.MS2RS_GateInfo{}, on_MS2RS_GateInfo)
	this.msgparser.RegistProtoMsg(msg.MS2RS_CreateRoom{}, on_MS2RS_CreateRoom)
	this.msgparser.RegistProtoMsg(msg.MS2Server_BroadCast{}, on_MS2Server_BroadCast)

	// 发
	this.msgparser.RegistSendProto(msg.RS2MS_ReqRegist{})
	this.msgparser.RegistSendProto(msg.RS2MS_HeartBeat{})
	this.msgparser.RegistSendProto(msg.RS2MS_RetCreateRoom{})
	this.msgparser.RegistSendProto(msg.RS2MS_UpdateRewardPool{})
	this.msgparser.RegistSendProto(msg.RS2MS_MsgNotice{})
	//this.msgparser.RegistSendProto(msg.RS2MS_DeleteRoom{})

}

func on_MS2RS_RetRegist(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2RS_RetRegist)
	if tmsg.GetErrcode() != "" {
		panic(fmt.Sprintf("Matach服务器通知注册失败 原因：%s", tmsg.GetErrcode()))
		return
	}
	log.Info("注册房间服[%s]到Match成功", RoomSvr().Name())

}

func on_MS2RS_HeartBeat(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2RS_HeartBeat)
	log.Info(reflect.TypeOf(tmsg).String())
}

func on_MS2RS_GateInfo(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2RS_GateInfo)
	//log.Info(reflect.TypeOf(tmsg).String())

	//
	for _, gate := range tmsg.GetGates() {
		name, ip , port := gate.GetName(), gate.GetHost().GetIp(), int(gate.GetHost().GetPort())
		log.Info("Match返回网关服务器信息: [%s:%d]", ip, port)
		if GateMgr().IsRegisted(ip, port) == true {
			log.Error("已经向网关服[%s][%s:%d]注册过", name, ip, port)
			continue
		}

		conf := network.TcpConnectConf{ 
			Name:"GateConnector" + "_" + gate.GetName(),
			Parser:"GW2RS_MsgParser",
			Host:network.NetHost{gate.GetHost().GetIp(), int(gate.GetHost().GetPort())},
			Interval:0,
			SvrChannel:true,
			Disable:1,
			DisReconnect:1,
		}
		if RoomSvr().Net().AddTcpConnector(conf) == false {
			//panic("AddGateConnector Fail")
			log.Fatal("============= AddGateConnector Fail =============")
		}
	}
}

func on_MS2RS_CreateRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2RS_CreateRoom)
	userid, roomid, gamekind, gridnum, errcode := tmsg.GetUserid(), tmsg.GetRoomid(), tmsg.GetGamekind(), tmsg.GetGridnum(), ""

	switch {
	default:
		if RoomMgr().Find(roomid) != nil {
			errcode = fmt.Sprintf("房间服务器发现了相同的房间[%d]", roomid)
			break
		}

		// 初始化房间
		room := NewGameRoom(userid, roomid, gamekind, gridnum, tmsg.GetQuotaflag())
		if errcode = room.Init(); errcode != "" {
			break
		}

		RoomMgr().Add(room)
		//log.Info("添加房间[%d]成功，等待玩家[%d]个人数据", roomid, tmsg.GetUserid())
	}

	rmsg := &msg.RS2MS_RetCreateRoom{ Roomid : tmsg.Roomid , Errcode: pb.String(errcode), Userid: tmsg.Userid, Sidgate: tmsg.Sidgate}
	session.SendCmd(rmsg)
	if errcode != "" { log.Error(errcode) }

}

//
func on_MS2Server_BroadCast(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2Server_BroadCast)
	cmdfull := tmsg.GetCmd()

	cmdmap := make(map[string]interface{})
	unerr := json.Unmarshal(util.StringToBytes(cmdfull), &cmdmap)
	if unerr != nil {
		log.Error("on_MS2Server_BroadCast json.Unmarshal err[%s]", unerr)
		return
	}

	// GM指令
	if _ , ok := cmdmap["gmcmd"]; ok {
		gmcommands:= make(map[string]string)
		for k ,v := range cmdmap { gmcommands[k] = v.(string) }
		DoGMCmd(gmcommands)
	}
}

func DoGMCmd(cmd map[string]string) {
	value, ok := cmd["gmcmd"]
	if !ok {
		log.Error("找不到gmcmd字段")
		return
	}

	switch value {
	case "reload":
		RoomSvr().Reload()
		break
	}
}


