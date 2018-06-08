package main
import (
	"fmt"
	"runtime"
	"runtime/debug"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/gotoolkit/util"
)


func init() {
	fmt.Println("robot.init()")
}

var g_RobotAccount string = "robot"

type Robot struct {
	netconf         *network.NetConf
	//net           *network.NetWork
	tblloader		*tbl.TblLoader
	msghandlers 	[]network.IBaseMsgHandler
	clients 		map[string] *User
	sids			map[int] *User
}

//func (this *Robot) Net() *network.NetWork {
//	return this.net
//}

func (this *Robot) NetConf() *network.NetConf {
	return this.netconf
}

func (this *Robot) InitMsgHandler() {
	this.msghandlers = append(this.msghandlers, NewGW2CMsgHandler())
	this.msghandlers = append(this.msghandlers, NewLS2CMsgHandler())
}

func (this *Robot) Start() {
	for _, client := range this.clients {
		go client.Run()
	}
}

func (this *Robot) Quit() {
	for _, client := range this.clients {
		client.Quit()
	}
}

func (this *Robot) Init() {

	// 机器人配置
	netconf := &network.NetConf{}
	jsonerr := util.JsonConfParser(g_ConfName, netconf)
	if jsonerr != nil || netconf == nil {
		log.Error("JsonParser Error: '%s'", jsonerr)
		return 
	}
	this.netconf = netconf
	this.tblloader = tbl.NewTblLoader(netconf.TblPath)
	log.Info("加载机器人配置ok...")


	// MsgHandler
	this.InitMsgHandler()


	// 初始化机器人
	this.clients = make(map[string] *User)
	for i := g_AccountStart; i < g_RobotNum + g_AccountStart; i++ {
		passwd, account := "12345", fmt.Sprintf("%s_%d", g_RobotAccount, i)
		client := NewUser()

		if client.Init(account, passwd) == false {
			panic("初始机器人失败")
		}

		if client.StartNetWork(netconf) == false {
			panic("机器人起到网络失败")
		}

		this.clients[account] = client
	}

}

func (this *Robot) Run(now int64) {
}

func (this *Robot) DoInputCmd(cmd string) {
	switch cmd {
	case "gc":
		log.Info("Start Force GC...")
		runtime.GC()
	case "free":
		log.Info("Start FreeOSMemory...")
		debug.FreeOSMemory()        // 谨慎使用
	default:
		this.BroadCastCmd(cmd)
	}
}

func (this *Robot) BroadCastCmd(cmd string) {
	for _, client := range this.clients {
		client.ch_cmd <- cmd
	}
}

// --------------------------------------------------------------------------
/// @brief TODO: session is nil
// --------------------------------------------------------------------------
func (this *Robot) OnClose(session network.IBaseNetSession) {
	panic("Robot.OnClose callback should't be used")
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func (this *Robot) OnConnect(session network.IBaseNetSession)	{
	panic("Robot.OnConnect callback should't be used")
}

