package main

import "fmt"
import "time"

// --------------------------------------------------------------------------
/// @brief 	select channel 一些特性
/// @brief	如果有同时多个case去处理,比如同时有多个channel可以接收数据，
/// 		那么Go会伪随机的选择一个case处理(pseudo-random)。
/// @brief 	如果没有case需要处理，则会选择default去处理，如果没有default case，则select语句会阻塞，直到某个case需要处理
// --------------------------------------------------------------------------

func TestChannelSelect() {
	fmt.Println("----TestChannelSelect----")
	// For our example we'll select across two channels.
	c1 := make(chan string)
	c2 := make(chan string)

	// Each channel will receive a value after some amount
	// of time, to simulate e.g. blocking RPC operations
	// executing in concurrent goroutines.
	go func() {
		time.Sleep(time.Millisecond * 10)
		c1 <- "one"
	}()

	go func() {
		time.Sleep(time.Millisecond * 20)
		c2 <- "two"
	}()

	// We'll use `select` to await both of these values
	// simultaneously, printing each one as it arrives.
	for i := 0; i < 2; i++ {
		select {
		case msg1 := <-c1:
			fmt.Println("received", msg1)
		case msg2 := <-c2:
			fmt.Println("received", msg2)
		}
	}

	// 如果没有case需要处理，则会选择default去处理
	c3 := make(chan int, 1)
	c3 <- 1
	donec3 := false;
	for {
		if donec3 { break }
		select {
		case msg := <-c3:
			println("channels c3 rev msg ", msg)
		default:
			println("noting recv from c3 channels")
			donec3 = true
		}
	}
}
