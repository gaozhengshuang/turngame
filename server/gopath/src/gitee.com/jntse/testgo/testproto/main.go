package main
import (
	"fmt"
	"time"
	"math/rand"
	"reflect"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
)

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
var g_KeyBordInput util.KeyBordInput
var g_Quit bool = false
var g_TestFlag string

func ProcessPanic(data interface{}) {
	log.Info("ProcessPanic")
}



func main() {
	defer util.RecoverPanic(ProcessPanic, nil)

	// 初始日志
	log.Init("","","trace")
	log.Info("初始日志完成")

	BenchmarkGofastProtobufMarshal()
	BenchmarkGofastProtobufUnMarshal()
	return

	// 初始化键盘输入
	g_KeyBordInput.Init()
	g_KeyBordInput.Start()
	log.Info("初始键盘输入完成")


	//
	var reflectvar interface{} = "reflect test"
	fmt.Printf("reflectvar=%v kind=%s\n", reflectvar, reflect.TypeOf(reflectvar).String())


	//
	rand.Seed(time.Now().Unix())
	s1 := make([]int32,3)
	for i:= 0; i < 10; i++ {
		rd := util.RandBetween(-10, 10)
		fmt.Println(rd)

		rd = util.SelectByWeightSlice([]int32{1,8,1})
		s1[rd] = s1[rd] + 1
	}
	fmt.Println(s1)


	//
	now := util.CURTIME()
	fmt.Println(util.GetDayStart())
	fmt.Println(now)
	fmt.Println(util.FloorIntClock(now))
	fmt.Println(util.CeilIntClock(now))


	//
	for g_Quit == false {
		time.Sleep(time.Millisecond * 10)
		select {
		case cmd,_:= <-g_KeyBordInput.C:
			DoInputCmd(cmd)
		default:
		}
	}
}

func DoInputCmd(cmd string) {
	switch cmd {
	case "quit","exit":
		g_Quit = true
		break
	default:
		g_TestFlag = cmd
		break
	}
}

