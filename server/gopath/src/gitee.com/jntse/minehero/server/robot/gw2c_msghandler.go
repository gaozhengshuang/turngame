package main
import (
	"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	//pb "github.com/gogo/protobuf/proto"
)


//func init() {
//	NewGW2CMsgHandler()
//}

type GW2CMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewGW2CMsgHandler() *GW2CMsgHandler {
	handler := &GW2CMsgHandler{}
	handler.Init()
	return handler
}

func (this* GW2CMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("GW2C_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收Gate消息
	this.msgparser.RegistProtoMsg(msg.GW2C_RetLogin{}, on_GW2C_RetLogin)
	this.msgparser.RegistProtoMsg(msg.GW2C_SendUserInfo{}, on_GW2C_SendUserInfo)
	this.msgparser.RegistProtoMsg(msg.GW2C_HeartBeat{}, on_GW2C_HeartBeat)
	this.msgparser.RegistProtoMsg(msg.GW2C_MsgNotify{}, on_GW2C_MsgNotify)
	this.msgparser.RegistProtoMsg(msg.GW2C_MsgNotice{}, on_GW2C_MsgNotice)
	this.msgparser.RegistProtoMsg(msg.GW2C_RetStartGame{}, on_GW2C_RetStartGame)
	this.msgparser.RegistProtoMsg(msg.GW2C_AddPackageItem{}, on_GW2C_AddPackageItem)
	this.msgparser.RegistProtoMsg(msg.GW2C_RemovePackageItem{}, on_GW2C_RemovePackageItem)
	this.msgparser.RegistProtoMsg(msg.GW2C_UpdateYuanbao{}, on_GW2C_UpdateYuanbao)
	this.msgparser.RegistProtoMsg(msg.GW2C_UpdateGold{}, on_GW2C_UpdateGold)
	this.msgparser.RegistProtoMsg(msg.GW2C_UpdateCoupon{}, on_GW2C_UpdateCoupon)
	this.msgparser.RegistProtoMsg(msg.Sync_BigRewardPickNum{}, on_Sync_BigRewardPickNum)
	this.msgparser.RegistProtoMsg(msg.GW2C_Ret7DayReward{}, on_GW2C_Ret7DayReward)
	this.msgparser.RegistProtoMsg(msg.GW2C_UpdateFreeStep{}, on_GW2C_UpdateFreeStep)
	this.msgparser.RegistProtoMsg(msg.GW2C_LuckyDrawHit{}, on_GW2C_LuckyDrawHit)
	this.msgparser.RegistProtoMsg(msg.GW2C_SendDeliveryAddressList{}, on_GW2C_SendDeliveryAddressList)

	// 收room消息
	this.msgparser.RegistProtoMsg(msg.BT_GameInit{}, on_BT_GameInit)
	this.msgparser.RegistProtoMsg(msg.BT_SendBattleUser{}, on_BT_SendBattleUser)
	this.msgparser.RegistProtoMsg(msg.BT_GameStart{}, on_BT_GameStart)
	this.msgparser.RegistProtoMsg(msg.BT_GameOver{}, on_BT_GameOver)
	this.msgparser.RegistProtoMsg(msg.BT_PickItem{}, on_BT_PickItem)
	
	// 发
	this.msgparser.RegistSendProto(msg.C2GW_ReqLogin{})
	this.msgparser.RegistSendProto(msg.C2GW_HeartBeat{})
	this.msgparser.RegistSendProto(msg.C2GW_ReqStartGame{})
	this.msgparser.RegistSendProto(msg.C2GW_BuyItem{})
	this.msgparser.RegistSendProto(msg.C2GW_ReqRechargeMoney{})
	this.msgparser.RegistSendProto(msg.C2GW_StartLuckyDraw{})
	this.msgparser.RegistSendProto(msg.C2GW_ReqDeliveryGoods{})
	this.msgparser.RegistSendProto(msg.C2GW_ChangeDeliveryAddress{})

	// 发room消息
	this.msgparser.RegistSendProto(msg.BT_ReqEnterRoom{})
	this.msgparser.RegistSendProto(msg.BT_ReqQuitGameRoom{})

}

func on_GW2C_UpdateCoupon(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_UpdateCoupon)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%#v", tmsg)
}

func on_GW2C_UpdateYuanbao(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_UpdateYuanbao)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%#v", tmsg)
}

func on_GW2C_UpdateGold(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_UpdateGold)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%#v", tmsg)
}

func on_GW2C_RemovePackageItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RemovePackageItem)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%#v", tmsg)
}

func on_GW2C_AddPackageItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_AddPackageItem)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%#v", tmsg)
}

func on_GW2C_MsgNotify(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2C_MsgNotify)
	//log.Info(reflect.TypeOf(tmsg).String())
	//log.Info("%v", tmsg)
}

func on_GW2C_MsgNotice(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2C_MsgNotice)
	//log.Info(reflect.TypeOf(tmsg).String())
	//log.Info("%+v", tmsg)
}

func on_GW2C_HeartBeat(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2C_HeartBeat)
	//log.Info(reflect.TypeOf(tmsg).String())

	//client, ok := session.UserDefData().(*User)
	//if ok == false {
	//	panic("没有为Session设置UserDefData")
	//}
	//if client.Id() == 1000001 {
	//	log.Info("%s on_GW2C_HeartBeat", client.Name())	// for test
	//}
}

func on_GW2C_RetStartGame(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetStartGame)
	log.Info(reflect.TypeOf(tmsg).String())

	client, ok := session.UserDefData().(*User)
	if ok == false {
		panic("没有为Session设置UserDefData")
	}

	err, roomid := tmsg.GetErrcode(), tmsg.GetRoomid()
	name, id := client.Name(), client.Id()
	if err != "" {
		log.Info("玩家[%s %d] 开始游戏失败 err: %s", name, id, err)
		return
	}

	sendmsg := &msg.BT_ReqEnterRoom{}
	session.SendCmd(sendmsg)
	log.Info("玩家[%s %d] 开启游戏成功，进入房间[%d]", name, id, roomid)

}

func on_GW2C_RetLogin(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetLogin)
	//log.Info(reflect.TypeOf(tmsg).String())
	sid := session.Id()
	client, ok := session.UserDefData().(*User)
	if ok == false {
		panic("登陆失败，没有为Session设置UserDefData")
	}

	account := client.Account()
	if tmsg.GetErrcode() != "" {
		log.Info("sid[%d] 账户[%s] 登录Gate失败 [%s]", sid, account, tmsg.GetErrcode())

		// 删除Gate连接
		//client.Net().DelWsConnector("GateConnector")

		// 重新连接loginserver
		//client.Net().AddWsConnector("LoginConnector")
		return
	}

	// 请求玩家游戏数据
	//send := &msg.C2GW_ReqUserInfo { Account : pb.String(account) }
	//session.SendCmd(send)
	//log.Info("sid[%d] 账户[%s] 登录Gate成功，请求玩家数据", sid, account)
}


// 构造玩家数据
func on_GW2C_SendUserInfo(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_SendUserInfo)
	//log.Info(reflect.TypeOf(tmsg).String())
	client, ok := session.UserDefData().(*User)
	if ok == false {
		panic("没有为Session设置UserDefData")
	}
	client.LoadUserData(tmsg)
	client.OnLoginGateOK()
}

func on_GW2C_Ret7DayReward(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2C_Ret7DayReward)
	//log.Info(reflect.TypeOf(tmsg).String())
}

func on_GW2C_UpdateFreeStep(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2C_UpdateFreeStep)
	//log.Info(reflect.TypeOf(tmsg).String())
}

func on_Sync_BigRewardPickNum(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.Sync_BigRewardPickNum)
	//log.Info(reflect.TypeOf(tmsg).String())
	//log.Info("大奖获取次数同步:%v", tmsg)
}

func on_GW2C_LuckyDrawHit(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_LuckyDrawHit)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%#v", tmsg)
}

func on_GW2C_SendDeliveryAddressList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_SendDeliveryAddressList)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%#v", tmsg)
}

