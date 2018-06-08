package main
import (
	"time"
	"fmt"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/eventqueue"
	)
func DoEvent(chd chan int32) {
	time.Sleep(time.Microsecond)
	chd <- 1
}

func testDynamicMakeCoroutine() {
	chd  := make(chan int32)
	t1 := util.CURTIMEMS()
	for i:=0; i<100000;i++ {
		go DoEvent(chd)
		<-chd
	}
	t2 := util.CURTIMEMS()
	fmt.Printf("testDynamicMakeCoroutine cost %dms \n", t2 - t1)
}
func DoAsynEvent(arg []interface{}) []interface{} {
	time.Sleep(time.Microsecond)
	return nil
}
func testEventQueue() {
	var asynev  eventque.AsynEventQueue
	asynev.Start(0, 100000)
	t1 := util.CURTIMEMS()
	arglist := []interface{}{}
	event := eventque.NewCommonEvent(arglist, DoAsynEvent, nil)
	for i:=0; i<100000;i++ {
		asynev.Push(event)
	}
	for asynev.IsFull() {
	}
	t2 := util.CURTIMEMS()
	fmt.Printf("testEventQueue cost %dms \n", t2 - t1)
}
