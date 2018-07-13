package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	_ "gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	_ "github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
	_ "reflect"
	_ "strconv"
)

//func init() {
//	log.Info("msg_msghandler.init")
//	NewC2GWMsgHandler()
//}

// 提取Session User指针
func ExtractSessionUser(session network.IBaseNetSession) *GateUser {
	user, ok := session.UserDefData().(*GateUser)
	if ok == false {
		log.Fatal("网络会话Sid[%d]中没有绑定User指针", session.Id())
		return nil
	}
	return user
}

type C2GWMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewC2GWMsgHandler() *C2GWMsgHandler {
	handler := &C2GWMsgHandler{}
	handler.Init()
	return handler
}

func (this *C2GWMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("C2GW_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqLogin{}, on_C2GW_ReqLogin)
	//this.msgparser.RegistProtoMsg(msg.C2GW_ReqUserInfo{}, on_C2GW_ReqUserInfo)
	this.msgparser.RegistProtoMsg(msg.C2GW_HeartBeat{}, on_C2GW_HeartBeat)
	//this.msgparser.RegistProtoMsg(msg.C2GW_ReqStartMatch{}, on_C2GW_ReqStartMatch)
	//this.msgparser.RegistProtoMsg(msg.C2GW_ReqCancelMatch{}, on_C2GW_ReqCancelMatch)
	//this.msgparser.RegistProtoMsg(msg.C2GW_ReqStartGame{}, on_C2GW_ReqStartGame)
	//this.msgparser.RegistProtoMsg(msg.C2GW_BuyItem{}, on_C2GW_BuyItem)
	//this.msgparser.RegistProtoMsg(msg.C2GW_Get7DayReward{}, on_C2GW_Get7DayReward)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqDeliveryGoods{}, on_C2GW_ReqDeliveryGoods)
	//this.msgparser.RegistProtoMsg(msg.C2GW_UseBagItem{}, on_C2GW_UseBagItem)
	//this.msgparser.RegistProtoMsg(msg.C2GW_ReqRechargeMoney{}, on_C2GW_ReqRechargeMoney)
	//this.msgparser.RegistProtoMsg(msg.C2GW_SellBagItem{}, on_C2GW_SellBagItem)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqDeliveryDiamond{}, on_C2GW_ReqDeliveryDiamond)
	this.msgparser.RegistProtoMsg(msg.C2GW_PlatformRechargeDone{}, on_C2GW_PlatformRechargeDone)
	//this.msgparser.RegistProtoMsg(msg.C2GW_ReFreshItems{}, on_C2GW_ReFreshItems)
	//this.msgparser.RegistProtoMsg(msg.C2GW_StartThrow{}, on_C2GW_StartThrow)
	//this.msgparser.RegistProtoMsg(msg.C2GW_TargetItem{}, on_C2GW_TargetItem)

	// 收战场消息
	this.msgparser.RegistProtoMsg(msg.BT_ReqEnterRoom{}, on_BT_ReqEnterRoom)
	this.msgparser.RegistProtoMsg(msg.BT_ReqJumpStep{}, on_BT_ReqJumpStep)
	this.msgparser.RegistProtoMsg(msg.BT_ReqQuitGameRoom{}, on_BT_ReqQuitGameRoom)
	this.msgparser.RegistProtoMsg(msg.BT_JumpPreCheck{}, on_BT_JumpPreCheck)

	// 收翻卡牌
	this.msgparser.RegistProtoMsg(msg.C2GW_StartTiger{}, on_C2GW_StartTiger)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqTakeCard{}, on_C2GW_ReqTakeCard)

	// 发
	this.msgparser.RegistSendProto(msg.GW2C_HeartBeat{})
	this.msgparser.RegistSendProto(msg.GW2C_MsgNotice{})
	this.msgparser.RegistSendProto(msg.GW2C_MsgNotify{})
	this.msgparser.RegistSendProto(msg.GW2C_RetLogin{})
	this.msgparser.RegistSendProto(msg.GW2C_SendUserInfo{})
	//this.msgparser.RegistSendProto(msg.GW2C_RetStartMatch{})
	//this.msgparser.RegistSendProto(msg.GW2C_RetCancelMatch{})
	//this.msgparser.RegistSendProto(msg.GW2C_MatchSuccess{})
	this.msgparser.RegistSendProto(msg.GW2C_RetStartGame{})
	this.msgparser.RegistSendProto(msg.GW2C_AddPackageItem{})
	this.msgparser.RegistSendProto(msg.GW2C_RemovePackageItem{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateYuanbao{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateCoupon{})
	this.msgparser.RegistSendProto(msg.GW2C_Ret7DayReward{})
	this.msgparser.RegistSendProto(msg.Sync_BigRewardPickNum{})
	this.msgparser.RegistSendProto(msg.GW2C_RetRechargeMoney{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateFreeStep{})
	this.msgparser.RegistSendProto(msg.GW2C_SendUserPlatformMoney{})
	this.msgparser.RegistSendProto(msg.GW2C_RetDeliveryDiamond{})
	//足球游戏
	//this.msgparser.RegistSendProto(msg.GW2C_RetReFreshItems{})
	//this.msgparser.RegistSendProto(msg.GW2C_RetKickFootBall{})
	//超市游戏
	//this.msgparser.RegistSendProto(msg.GW2C_HitTarget{})
	//this.msgparser.RegistSendProto(msg.GW2C_FreeThrow{})

	// Room
	this.msgparser.RegistSendProto(msg.BT_GameInit{})
	this.msgparser.RegistSendProto(msg.BT_SendBattleUser{})
	this.msgparser.RegistSendProto(msg.BT_GameStart{})
	this.msgparser.RegistSendProto(msg.BT_GameOver{})
	this.msgparser.RegistSendProto(msg.BT_RetJumpStep{})
	this.msgparser.RegistSendProto(msg.BT_PickItem{})
	this.msgparser.RegistSendProto(msg.BT_RetJumpPreCheck{})
	//发 卡牌相关
	this.msgparser.RegistSendProto(msg.GW2C_SumGet{})
	this.msgparser.RegistSendProto(msg.GW2C_NotifyCardState{})
	this.msgparser.RegistSendProto(msg.GW2C_AckTakeCardRet{})
	this.msgparser.RegistSendProto(msg.GW2C_GameResult{})
}

// 客户端心跳
func on_C2GW_HeartBeat(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_HeartBeat)
	//log.Info(reflect.TypeOf(tmsg).String())

	//curtime := util.CURTIMEUS()
	//log.Info("receive heart beat msg interval=%d", curtime - tmsg.GetTime())
	session.SendCmd(&msg.GW2C_HeartBeat{
		Uid:  tmsg.Uid,
		Time: pb.Int64(util.CURTIMEUS()),
		Test: tmsg.Test,
	})

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		return
	}

	user.SetHeartBeat(util.CURTIMEMS())
	//log.Trace("玩家[%s %d] 更新心跳", user.Name(), user.Id())

	// TODO: 临时方案，保存玩家Reidis token
	//token := tmsg.GetToken()
	//if user.Token() != token {
	//	log.Info("账户[%s] 玩家[%s %d] 更新token[%s] 老token[%s]", account, user.Name(), user.Id(), token, user.Token())
	//	key := fmt.Sprintf("charid_%d_token", user.Id())
	//	Redis().Set(key, token, 0)
	//	user.SetToken(token)
	//}
}

func on_C2GW_ReqStartGame(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqStartGame)
	//log.Info(reflect.TypeOf(tmsg).String())

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	gamekind, girdnum := tmsg.GetGamekind(), tmsg.GetGridnum()
	if errcode := user.ReqStartGame(gamekind, girdnum); errcode != "" {
		user.ReplyStartGame(errcode, 0)
	}
}

func on_C2GW_Get7DayReward(session network.IBaseNetSession, message interface{}) {

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		return
	}

	user.GetSignReward()
}

func on_BT_ReqEnterRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_ReqEnterRoom)
	//log.Info(reflect.TypeOf(tmsg).String())

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	// 进入游戏房间
	log.Info("玩家[%d] 开始进入房间[%d] ts[%d]", user.Id(), user.RoomId(), util.CURTIMEMS())
	tmsg.Roomid, tmsg.Userid = pb.Int64(user.RoomId()), pb.Uint64(user.Id())
	user.SendRoomMsg(tmsg)
}

func on_BT_JumpPreCheck(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_JumpPreCheck)
	//log.Info(reflect.TypeOf(tmsg).String())

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	tmsg.Roomid, tmsg.Userid = pb.Int64(user.RoomId()), pb.Uint64(user.Id())
	user.SendRoomMsg(tmsg)
}

func on_BT_ReqJumpStep(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_ReqJumpStep)
	//log.Info(reflect.TypeOf(tmsg).String())

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	tmsg.Roomid, tmsg.Userid = pb.Int64(user.RoomId()), pb.Uint64(user.Id())
	user.SendRoomMsg(tmsg)
}

func on_BT_ReqQuitGameRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_ReqQuitGameRoom)
	//log.Info(reflect.TypeOf(tmsg).String())

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	// 离开游戏房间
	tmsg.Roomid, tmsg.Userid = pb.Int64(user.RoomId()), pb.Uint64(user.Id())
	user.SendRoomMsg(tmsg)
}

func on_C2GW_ReqLogin(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqLogin)
	reason, account, verifykey, token, face := "", tmsg.GetAccount(), tmsg.GetVerifykey(), tmsg.GetToken(), tmsg.GetFace()
	islogin := false

	switch {
	default:
		if UserMgr().FindByAccount(account) != nil {
			islogin, reason = true, "玩家已经登陆了"
			log.Info("账户%s 登录Gate失败，已经登陆了", account)
			break
		}

		wAccount := WaitPool().Find(account)
		if wAccount == nil {
			reason = "非法登陆网关"
			//log.Info("账户%s 登录Gate失败，没有注册信息", account)
			break
		}

		if wAccount.verifykey != verifykey {
			reason = "登陆网关校验失败"
			log.Info("账户%s 登陆Gate校验Key不正确 want:%s have:%s", account, wAccount.verifykey, verifykey)
			break
		}

		// 构造新GateUser
		user, newerr := UserMgr().CreateNewUser(session, account, verifykey, token, face)
		if newerr != "" || user == nil {
			reason = newerr
			log.Info("账户%s 创建新GateUser失败 原因[%s]", account, newerr)
			break
		}

		// TODO: 登陆成功才绑定账户到会话
		session.SetUserDefData(user)
		return
	}

	// 返回给客户端，失败才回
	if reason != "" {
		if !islogin {
			UnBindingAccountGateWay(account)
		}
		log.Error("sid[%d] 账户[%s] 登陆网关失败 reason[%s]", session.Id(), account, reason)
		send := &msg.GW2C_RetLogin{Errcode: pb.String(reason)}
		session.SendCmd(send)
		session.Close()
	}
}

//func on_C2GW_ReqUserInfo(session network.IBaseNetSession, message interface{}) {
//	tmsg := message.(*msg.C2GW_ReqUserInfo)
//	//log.Info(reflect.TypeOf(tmsg).String())
//
//	account := tmsg.GetAccount()
//	user := UserMgr().FindByAccount(account)
//	if user == nil {
//		log.Error("账户%s 没有注册在这个Gate", account)
//		session.Close()
//		return
//	}
//
//	if user.IsOnline() == false {
//		log.Error("账户%s 没有登陆Gate成功", account)
//		session.Close()
//		return
//	}
//
//	user.Syn()
//}

// 购买道具
func on_C2GW_BuyItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_BuyItem)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if user.IsOnline() == false {
		log.Error("玩家[%s %d] C2GW_BuyItem 当前不在线", user.Name(), user.Id())
		session.Close()
		return
	}

	user.BuyItem(tmsg.GetProductid(), tmsg.GetNum())
}

func on_C2GW_ReqDeliveryGoods(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqDeliveryGoods)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if user.IsOnline() == false {
		log.Error("玩家[%s %d] C2GW_ReqDeliveryGoods 当前不在线", user.Name(), user.Id())
		session.Close()
		return
	}

	// 发货
	if tbl.Global.IntranetFlag {
		user.SendNotify("本版本暂不可用")
		return
	} else {
		if user.DeliveryState() == true {
			user.SendNotify("发货请求太频繁了")
			return
		}

		user.SetDeliveryState(true)
		event := NewDeliveryGoodsEvent(tmsg.GetList(), tmsg.GetToken(), tmsg.GetPhone(), user.DeliveryGoods)
		user.AsynEventInsert(event)
	}
}

func on_C2GW_ReqDeliveryDiamond(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqDeliveryDiamond)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if user.IsOnline() == false {
		log.Error("玩家[%s %d] C2GW_ReqDeliveryDiamond 当前不在线", user.Name(), user.Id())
		session.Close()
		return
	}

	// 提钻石
	if tbl.Global.IntranetFlag {
		user.SendNotify("本版本暂不可用")
		return
	} else {
		if user.DeliveryState() == true {
			user.SendNotify("发货请求太频繁了")
			return
		}

		user.SetDeliveryState(true)
		event := NewDeliveryGoodsEvent(tmsg.GetList(), tmsg.GetToken(), "", user.DeliveryDiamond)
		user.AsynEventInsert(event)
	}
}

func on_C2GW_UseBagItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_UseBagItem)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	user.UseItem(tmsg.GetItemid(), tmsg.GetNum())
}

func on_C2GW_ReqRechargeMoney(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqRechargeMoney)
	//log.Trace("%v", tmsg)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	// 充值
	event := NewUserRechargeEvent(user, user.Account(), tmsg.GetToken(), tmsg.GetAmount(), RequestRecharge)
	user.AsynEventInsert(event)
}

func on_C2GW_SellBagItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_SellBagItem)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	for _, v := range tmsg.GetList() {
		itemid, num := v.GetItemid(), v.GetNum()
		user.SellBagItem(itemid, num)
	}
}

// 玩家充值完成(大厅和房间都自己获取金币返回)
func on_C2GW_PlatformRechargeDone(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_PlatformRechargeDone)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	user.QueryPlatformCoins()
}

//开启一轮新的翻牌
func on_C2GW_StartTiger(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_StartTiger)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	//user.RemoveCoins("123",tmsg.GetType())
	user.StartTiger(tmsg.GetType())
}

//翻开一张牌
func on_C2GW_ReqTakeCard(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqTakeCard)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.UserTakeCard(tmsg.GetPos())
}
