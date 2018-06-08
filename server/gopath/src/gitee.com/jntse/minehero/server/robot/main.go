package main
import (
	"fmt"
	"os"
	"time"
	"syscall"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
)


var g_ConfName 	string = ""
var g_RobotNum 	int = 0
var g_AccountStart int = 0
var g_Signal *util.Signal = nil
var g_KeyBordInput util.KeyBordInput
var g_CmdArgs CmdlineArgument

type CmdlineArgument struct {
	Conf		string
	Logname 	string
	Logpath 	string
	Daemon 		bool
	Num 		int
	Start		int
}


// 命令行参数解析
func init() {
	fmt.Println("main.init()")

	util.DoCmdLineParse(&g_CmdArgs)
	if g_CmdArgs.Conf == ""         { panic("-----input '-conf' cmdline argu-----")     }
	if g_CmdArgs.Logname == ""      { panic("-----input '-logname' cmdline argu-----")  }
	if g_CmdArgs.Logpath == ""      { panic("-----input '-logpath' cmdline argu-----")  }
	if g_CmdArgs.Num == 0			{ panic("-----input '-num' cmdline argu-----") 		}

	g_ConfName 	= g_CmdArgs.Conf
	g_RobotNum 	= g_CmdArgs.Num
	g_AccountStart = g_CmdArgs.Start
}

func main() {
	//util.OpenPProf(main_pprof)
	util.OpenNetPProf("127.0.0.1", 27013, main_pprof)
}

func SignalInt(signal os.Signal)    {
	log.Info("SignalInt");
	Quit();
}

func SignalTerm(signal os.Signal)   {
	log.Info("SignalTerm");
	Quit();
}

func SignalHup(signal os.Signal)    {
	log.Info("SignalHup");
	Quit();
}

func SignalCoreDump(signal os.Signal)    {
	log.Info("Signal[%d] Received", signal);
	Quit();
}

var g_Robot *Robot = nil
func RobotMgr() *Robot {
	if g_Robot == nil { g_Robot = &Robot{} }
	return g_Robot
}

func main_pprof() {

	// 宕机日志
	defer util.RecoverPanic(nil, nil)

	// 初始化日志
	log.Init(g_CmdArgs.Logpath, g_CmdArgs.Logname, "trace")
	defer log.Flush()
	log.Info("初始化日志ok")
	log.Info("启动参数: %v", os.Args)

	// 初始化键盘输入
	g_KeyBordInput.Init()
	if g_CmdArgs.Daemon == false {
		g_KeyBordInput.Start()
	}

	//
	g_Signal = util.CreateNewSignal()
	g_Signal.Init()
	g_Signal.Regist(syscall.SIGHUP,  SignalHup)
	g_Signal.Regist(syscall.SIGINT,  SignalInt)
	g_Signal.Regist(syscall.SIGTERM, SignalTerm)
	g_Signal.Regist(syscall.SIGQUIT, SignalCoreDump)
	g_Signal.Regist(syscall.SIGSEGV, SignalCoreDump)
	g_Signal.Regist(syscall.SIGILL,  SignalCoreDump)
	g_Signal.Regist(syscall.SIGBUS,  SignalCoreDump)
	g_Signal.Start()

	//
	robot := RobotMgr()
	robot.Init()
	robot.Start()

	//主线程
	MainLoop(robot)

	//
	time.Sleep(time.Millisecond * 500)
}

func Quit() {
	g_KeyBordInput.Insert("quit")
	//g_Signal.Close()
}

func MainLoop(robot *Robot) {
	defer log.Info("quit")
	for {
		time.Sleep(time.Millisecond * 10)
		select {
		case cmd, open := <-g_KeyBordInput.C:
			if cmd == "exit" || cmd == "quit" || open == false {
				log.Info("keybord recv cmd:'%v' open:'%t'", cmd, open)
				robot.Quit()
				return
			}
			robot.DoInputCmd(cmd)
		default:
			robot.Run(time.Now().Unix())
		}
	}
}


