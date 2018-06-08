package main

import "fmt"
import "runtime/debug"
import "gitee.com/jntse/gotoolkit/log"

type stPanic struct {
	id int
	name string
}

func (this *stPanic) Test() {
	MakePanic()
}

func MakePanic() {
	ch := make(chan int, 1)
	close(ch)
	//ch <- 1		// panic here
}


func RecoverPanic() {
	if err := recover(); err != nil {
		LogPanicStack(err)
	}
}

func LogPanicStack(err interface{}) {
	//fmt.Println("====================")
	//fmt.Println("宕机了")
	//fmt.Printf("catch panic:'%v'\n",err)
	//fmt.Println(string(debug.Stack()))
	//fmt.Println("====================")
	log.Info("====================")
	log.Info("宕机了")
	log.Info("catch panic:'%v'\n",err)
	log.Info(string(debug.Stack()))
	log.Info("====================")
	log.Flush()
}

func main() {
	defer RecoverPanic()	// 必须defer
	fmt.Println("vim-go")
	
	// 初始日志系统
	log.Init("./", "panic.log")
	defer log.Flush()
	defer log.Info("main quit")

	// 产生一个panic
	st := stPanic{1001, "hello-panic"}
	st.Test()
}



