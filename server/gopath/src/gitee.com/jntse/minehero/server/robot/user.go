package main
import (
	"fmt"
	"time"
	"reflect"
	"strings"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)


func init() {
	fmt.Println("init()")
}

// 玩家连接状态切换
const (
	kNetStatLoginDisconnect = iota + 1
	kNetStatLoginConnecting
	kNetStatLoginConnected

	kNetStatGateDisConnect
	kNetStatGateConnecting
	kNetStatGateConnected
)

// 玩家网络
type UserNet struct {
	net			*network.NetWork
	login		network.IBaseNetSession
	gate		network.IBaseNetSession
	ch_cmd		chan string
	loginstat	int32
	gatestat	int32
}

// 玩家
type User struct {
	UserNet
	UserBase
	do_heart	bool
	do_jump		bool
	ticker1s   	*util.GameTicker
	ticker5s   	*util.GameTicker
	ticker100ms *util.GameTicker
}

func NewUser() *User {
	return &User{}
}

func (this *User) Init(account string, passwd string) bool {

	// ticker
	this.ticker1s  = util.NewGameTicker(1 * time.Second, this.OnTicker1s)
	this.ticker5s  = util.NewGameTicker(5 * time.Second, this.OnTicker5s)
	this.ticker100ms = util.NewGameTicker(100 * time.Millisecond, this.OnTicker100ms)
	this.ticker1s.Start()
	this.ticker5s.Start()
	this.ticker100ms.Start()
	this.do_heart = true
	this.do_jump = false
	this.loginstat = kNetStatLoginDisconnect
	this.gatestat = kNetStatGateDisConnect
	this.ch_cmd = make(chan string, 10)

	//
	this.UserBase.Init(account, passwd, "13681626939", "510722")
	return true
}

func (this *User) Net() *network.NetWork {
	return this.net
}

func (this *User) StartNetWork(netconf *network.NetConf) bool {
	// 初始化网络
	this.net = network.NewNetWork()
	this.net.Init(netconf, this)
	if this.net.Start() == false {
		log.Info("初始网络失败...")
		return false
	}
	log.Info("初始网络ok...")
	return true
}

// --------------------------------------------------------------------------
/// @brief TODO: 
// --------------------------------------------------------------------------
func (this *User) OnClose(session network.IBaseNetSession) {
	sid := session.Id()
	subname := strings.Split(session.Name(), "_")
	switch subname[0] {
	case "LoginConnector":
		log.Info("和LoginServer连接断开 sid[%d]", sid)
		this.SetLoginSession(nil)
	case "GateConnector":
		log.Info("和GateServer连接断开 sid[%d]", sid)
		this.SetGateSession(nil)
	default:
		log.Error("not regist client OnConnect session:%+v", sid)
	}
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func (this *User) OnConnect(session network.IBaseNetSession)	{
	subname := strings.Split(session.Name(), "_")
	switch subname[0] {
	case "LoginConnector":
		//log.Trace("OnConnect loginsession:%+v", session)
		session.SetUserDefData(this)
		this.SetLoginSession(session)
		this.SendLogin()
		//this.RegistAccount()
	case "GateConnector":
		//log.Trace("OnConnect gatesession:%+v", session)
		session.SetUserDefData(this)
		this.SetGateSession(session)
		this.SendGateMsg(this.NewReqLoginGateMsg())
	default:
		log.Error("not regist client OnConnect session:%+v", session)
	}
}

// 连接LoginServer
func (this *User) LoginConnect() {
	if this.loginstat != kNetStatLoginDisconnect || this.gatestat != kNetStatGateDisConnect {
		return
	}

	conf , ok := RobotMgr().NetConf().FindWsConnectConf("LoginConnector")
	if ok == false {
		panic("can't find WsConnectConf 'LoginConnector' ")
		return
	}

	conf.Name = "LoginConnector" + "_" + this.Account()		// 连接器名必须唯一
	if this.net.AddWsConnector(conf) == false {
		//panic("AddGateConnector Fail")
		return
	}

	this.loginstat = kNetStatLoginConnecting
}

// --------------------------------------------------------------------------
/// @brief
// --------------------------------------------------------------------------
func (this *User) SetLoginSession(s network.IBaseNetSession) {
	this.login = s
	if s == nil { this.loginstat = kNetStatLoginDisconnect }
	if s != nil { this.loginstat = kNetStatLoginConnected }
}

func (this *User) SetGateSession(s network.IBaseNetSession) {
	this.gate = s
	if s == nil { this.gatestat = kNetStatGateDisConnect }
	if s != nil { this.gatestat = kNetStatGateConnected }
}

func (this *User) SendLoginMsg(msg pb.Message) bool {
	if this.login == nil || reflect.ValueOf(this.login).IsNil() {
		panic("User login session is nil")
		return false
	}
	return this.login.SendCmd(msg)
}

func (this *User) SendGateMsg(msg pb.Message) bool {
	if this.gate == nil || reflect.ValueOf(this.gate).IsNil() {
		panic("User gatesession is nil")
	}
	return this.gate.SendCmd(msg)
}

//  退出
func (this *User) Quit() {
	//this.ch_cmd <- "quit"
	close(this.ch_cmd)
}

func (this *User) Shutdown() {
	if this.net == nil { return }
	this.net.Shutdown()
	this.net = nil
	log.Info("User[%s] Shutdown", this.Account())
}

// run coroutine
func (this *User) Run() {
	for {
		time.Sleep(time.Millisecond * 10)
		select {
		case cmd, open := <-this.ch_cmd:
			if cmd == "quit" || open == false {
				this.Shutdown()
				break
			}
			this.DoInputCmd(cmd)
		default:
		}

		if this.net == nil {
			break
		}

		// 每帧处理1000条
		this.net.Dispatch(1000)

		now := util.CURTIMEMS()
		this.ticker100ms.Run(now)
		this.ticker1s.Run(now)
		this.ticker5s.Run(now)
	}
	log.Info("User[%s] RunLoop quit done!", this.Account())
}

func (this *User) OnTicker100ms(now int64) { 
	this.LoginConnect()
}

func (this *User) OnTicker1s(now int64) {
	if this.gate != nil  && this.do_heart {
		heartmsg := &msg.C2GW_HeartBeat{ Uid: pb.Int64(0), Time: pb.Int64(util.CURTIMEUS()) }
		//for i:=0; i < 42; i++ { heartmsg.Test = append(heartmsg.Test, "this is heart msg test") }	// 大约1024字节 测试
		this.SendGateMsg(heartmsg)
	}

	// 随机跳跳
	if this.gate != nil && this.do_jump {
		if util.SelectPercent(10) == true {
			//this.JumpStep()
		}
	}
}

func (this *User) OnTicker5s(now int64) {
}


// 注册用户
func (this *User) RegistAccount() {
	this.SendLoginMsg(this.NewRegistAccountMsg())
}

// 请求登陆验证
func (this *User) SendLogin() {
	this.SendLoginMsg(this.NewReqLoginMsg())
}

func (this *User) StartGame() {
	this.SendGateMsg(&msg.C2GW_ReqStartGame{Gamekind:pb.Int32(30)})
}

func (this *User) LeaveGame() {
	this.SendGateMsg(&msg.BT_ReqQuitGameRoom{})
}

//func (this *User) JumpStep() {
//	this.SendGateMsg(&msg.BT_JumpPreCheck{})
//}

func (this *User) BuyItem() {
	this.SendGateMsg(&msg.C2GW_BuyItem{Productid:pb.Uint32(7), Num:pb.Uint32(1)})
}

func (this *User) DeliveryGoods() {
	send := &msg.C2GW_ReqDeliveryGoods{}
	send.List = append(send.List, &msg.DeliveryGoods{Itemid:pb.Uint32(7001), Num:pb.Uint32(1)})
	send.List = append(send.List, &msg.DeliveryGoods{Itemid:pb.Uint32(7002), Num:pb.Uint32(2)})
	send.List = append(send.List, &msg.DeliveryGoods{Itemid:pb.Uint32(7003), Num:pb.Uint32(3)})
	this.SendGateMsg(send)
}

func (this *User) Recharge() {
	send := &msg.C2GW_ReqRechargeMoney{Amount:pb.Uint32(10)}
	this.SendGateMsg(send)
}

// 抽奖
func (this *User) LuckyDraw() {
	send := &msg.C2GW_StartLuckyDraw{ Userid:pb.Uint64(this.Id())}
	this.SendGateMsg(send)
}

// 设置抽奖地址
func (this *User) ChangeDeliveryAddress() {
	addr := &msg.UserAddress{Receiver:pb.String("机器人"), Phone:pb.String("188888888"), Address:pb.String("中国上海闵行区新龙路1333弄28号31栋901")}
	send := &msg.C2GW_ChangeDeliveryAddress{ Index:pb.Uint32(0), Info:addr }
	this.SendGateMsg(send)
}


//func (this *User) ReqMatch() {
//	this.SendGateMsg(this.NewReqMatchMsg(int(msg.GameMode_Normal_1v1)))
//}

//func (this *User) CancelMatch() {
//	this.SendGateMsg(this.NewCancelMatchMsg())
//}

func (this *User) DoInputCmd(cmd string) {
	switch cmd {
	case "reg":
		this.RegistAccount()
	case "login":
		this.SendLogin()
	case "start":
		this.StartGame()
	case "leave":
		this.LeaveGame()
	case "jump":
		this.do_jump = !this.do_jump
	case "buy":
		this.BuyItem()
	case "tihuo":
		this.DeliveryGoods()
	case "recharge":
		this.Recharge()
	case "heart":
		this.do_heart = !this.do_heart
	case "luckydraw":
		this.LuckyDraw()
	case "address":
		this.ChangeDeliveryAddress()
	}
}

func (this *User) OnLoginGateOK() {

}
