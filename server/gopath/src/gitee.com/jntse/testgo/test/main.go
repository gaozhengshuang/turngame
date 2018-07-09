package main
import (
	"fmt"
	"time"
	"math/rand"
	_"strings"
	_"sort"
	"reflect"
	_"sync"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	_"path/filepath"
	_"os"
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

func tests(args ...string) {
	for i, v := range args {
		fmt.Println(i, "----", v)
	}
}

func main() {
	defer util.RecoverPanic(ProcessPanic, nil)

	// 初始日志
	log.Init("","","trace")
	log.Info("初始日志完成")
	tests("111", "222", "333")
	tests([]string{"11", "22", "33"}...)


	// 初始化键盘输入
	g_KeyBordInput.Init()
	g_KeyBordInput.Start()
	log.Info("初始键盘输入完成")


	// 特殊符合检查
	fmt.Println("ContainsSpecialCharacter = ", util.ContainsSpecialCharacter("helloworld"))
	fmt.Println("ContainsSpecialCharacter = ", util.ContainsSpecialCharacter("中文名称测试"))
	fmt.Println("ContainsSpecialCharacter = ", util.ContainsSpecialCharacter("—…（）。，！￥；：“”‘’？、、《》"))
	fmt.Println("ContainsSpecialCharacter = ", util.ContainsSpecialCharacter("[~!@#$%^&*()/\\|,.<>?\"'();:_+-={} "))
	fmt.Println("ContainsSpecialCharacter = ", util.ContainsSpecialCharacter("①⑴㈠"))
	return


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
// --------------------------------------------------------------------------
/// @brief 
///
/// @return 
// --------------------------------------------------------------------------
func TestMultiChanWriteRead() {
	m1 := make(map[int]int)
	for i := 0; i < 10000; i++ {
		m1[i] = i
	}

	datetime := time.Now().Format("2006-01-02")
	fmt.Println(datetime)


	ch1, ch2, ch3 := make(chan int, 10000), make(chan int), make(chan int)
	Read := func() {
		<-ch3
		run, count := true, 0
		for run {
			select {
			case <-ch1:
				if count++; count == 1000000 { run = false }
			default:
			}
		}
		close(ch2)
	}

	Write := func(num int) {
		<-ch3
		for i := 1; i <= num; i++ {
			ch1 <- i
		}
	}

	go Read()
	go Write(1000000)
	tm1 := time.Now().UnixNano() / 1000000
	close(ch3)
	<-ch2
	tm2 := time.Now().UnixNano() / 1000000
	fmt.Println("use time %d ms", tm2 - tm1)
}



