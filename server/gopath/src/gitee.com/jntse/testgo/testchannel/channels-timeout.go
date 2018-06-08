package main

import "fmt"
import "time"

// --------------------------------------------------------------------------
/// @brief 	select有很重要的一个应用就是超时处理。
///			因为上面我们提到，如果没有case需要处理，select语句就会一直阻塞着。
///			这时候我们可能就需要一个超时操作，用来处理超时的情况.
///
/// @brief	其实它利用的是time.After方法，它返回一个类型为<-chan Time的单向的channel，
///			在指定的时间发送一个当前时间给返回的channel中
// --------------------------------------------------------------------------
func TestChannelTimeOut() {
	fmt.Println("----TestChannelTimeOut----")
	// For our example, suppose we're executing an external
	// call that returns its result on a channel `c1`
	// after 2ms.
	c1 := make(chan string, 1)
	go func() {
		time.Sleep(time.Millisecond * 20)
		c1 <- "result 1"
	}()

	// Here's the `select` implementing a timeout.
	// `res := <-c1` awaits the result and `<-Time.After`
	// awaits a value to be sent after the timeout of
	// 10ms. Since `select` proceeds with the first
	// receive that's ready, we'll take the timeout case
	// if the operation takes more than the allowed 10ms.
	select {
	case res := <-c1:
		fmt.Println(res)
	case <-time.After(time.Millisecond * 10):
		fmt.Println("timeout 1")
	}

	// If we allow a longer timeout of 3ms, then the receive
	// from `c2` will succeed and we'll print the result.
	c2 := make(chan string, 1)
	go func() {
		time.Sleep(time.Millisecond * 2)
		c2 <- "result 2"
	}()
	select {
	case res := <-c2:
		fmt.Println(res)
	case <-time.After(time.Millisecond * 3):
		fmt.Println("timeout 2")
	}

}
