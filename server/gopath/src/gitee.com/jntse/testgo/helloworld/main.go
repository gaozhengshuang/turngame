// hello.go
package main // package declaration,must only
import (     // import packages
	"fmt"
	"os"
	"runtime"
	"time"
	"gitee.com/jntse/testgo/helloworld/common"
	"gitee.com/jntse/testgo/helloworld/times"
)

// 将导入的包匿名，否则在程序中又没有使用到其内部的符号，那么编译器将报错
import _ "log"

// 功能测试开关
var kSwitchDeclareVariable bool = false
var kSwitchConditionTrunk bool = false
var kSwitchTestFunction bool = false
var kSwitchTestStruct bool = false
var kSwitchTestRange bool = false
var kSwitchTestError bool = false
var kSwitchTestClosure bool = true
var kSwitchTestRoutines bool = false
var kSwitchTestChannels bool = false
var kSwitchTestTimerTick bool = true
var kSwitchTestTime bool = false
var kSwitchTestAtomic bool = false
var kSwitchTestMutex bool = false
var kSwitchTestRoutineStateful bool = false
var kSwitchTestSort bool = false
var kSwitchTestDefer bool = false
var kSwitchTestSliceCollection bool = false
var kSwitchTestStringFormat bool = false
var kSwitchTestRegexp bool = false
var kSwitchTestNumberParse bool = false
var kSwitchTestUrlParsing bool = false
var kSwitchTestSha1Hash bool = false
var kSwitchTestBase64Encoding bool = false
var kSwitchTestExecProcess bool = false
var kSwitchTestFlags bool = false

func main() {
	fmt.Println("进入main函数")
	fmt.Println("Hello World!")
	time.Sleep(time.Millisecond)

	// 命令行参数
	if len(os.Args) > 1 {
		for i, k := range os.Args {
			fmt.Printf("命令行参数argu[%d]=%s\n", i, k) // 依次打印每个参数
		}
	}


	// 获取系统信息
	numCPU := runtime.NumCPU();
	common.Pln("logical cpu num=", numCPU)
	fmt.Println(runtime.GOMAXPROCS(numCPU))	// 设置最大'并行'执行的Goroutine数目
	//panic("panic 函数和 c语言的assert类似，可以终止程序的执行")


	if kSwitchTestFlags {
		TestFlags()
	}

	//变量
	if kSwitchDeclareVariable {
		DeclareVariable()
	}

	//条件语句
	if kSwitchConditionTrunk {
		ConditionTrunk()
	}

	//函数
	if kSwitchTestFunction {
		TestFunction()
	}

	//结构体
	if kSwitchTestStruct {
		TestStruct()
	}

	//Range
	if kSwitchTestRange {
		TestRange()
	}

	//Error
	if kSwitchTestError {
		TestError()
	}

	//闭包
	if kSwitchTestClosure {
		TestClosure()
	}

	//定时器
	if kSwitchTestTimerTick {
		times.TestTimerTick()
	}

	//时间函数
	if kSwitchTestTime {
		times.TestTime()
	}

	//原子
	if kSwitchTestAtomic {
		TestAtomic()
	}

	//互斥体
	if kSwitchTestMutex {
		TestMutex()
	}

	//排序
	if kSwitchTestSort {
		TestSort()
	}

	//Defer特性
	if kSwitchTestDefer {
		TestDefer()
	}

	//容器操作
	if kSwitchTestSliceCollection {
		TestSliceCollection()
	}


	//正则表达式
	if kSwitchTestRegexp {
		TestRegexp()
	}


	// 数字字符串解析
	if kSwitchTestNumberParse {
		TestNumberParse()
	}

	//url解析
	if kSwitchTestUrlParsing {
		TestUrlParsing()
	}

	//sha1-hash
	if kSwitchTestSha1Hash {
		TestSha1Hash()
	}

	//base64-encode/decode
	if kSwitchTestBase64Encoding {
		TestBase64Encoding()
	}

	//执行进程执行完成后好像就退出程序了
	if kSwitchTestExecProcess {
		TestExecProcess()
	}
}

func init() {
	fmt.Println("每个文件都可以有自己的init函数，他们优先于main函数执行")
	common.Pln("enter main.go init")
}


