package main

import "fmt"
import "time"
import "gitee.com/jntse/testgo/helloworld/common"

type MsgChannelData struct {
	len uint16
	id  uint16
	str string
}

func TestChannels() {
	common.PrintSeparateLine("TestChannels")
	defer common.PrintSeparateLine("TestChannels")

	// Create a new channel with `make(chan val-type)`.
	// Channels are typed by the values they convey.
	// 没有缓冲的channel，会阻塞
	// 有缓冲的channel，只有buffer满了后send才会阻塞，而只有缓存空了后receive才会阻塞
	messages := make(chan string)

	// _Send_ a value into a channel using the `channel <-`
	// syntax. Here we send `"ping"`  to the `messages`
	// channel we made above, from a new goroutine.
	go func() { messages <- "ping" }()

	// The `<-channel` syntax _receives_ a value from the
	// channel. Here we'll receive the `"ping"` message
	// we sent above and print it out.
	var msg, ret = <-messages // block until receive a notify
	if ret {
		fmt.Println(msg)
	}

	// --------------------------------------------------------------------------
	/// @brief 传输自定义类型
	// --------------------------------------------------------------------------
	chan2 := make(chan MsgChannelData)
	go func() {
		var data MsgChannelData
		data.id = 1001
		data.str = "测试通道数据"
		data.len = uint16(len(data.str)) + 4
		time.Sleep(100 * time.Millisecond)
		chan2 <- data
	}()

	MsgData := <-chan2 // block until receive a notify
	fmt.Printf("%+v\n", MsgData)

	// --------------------------------------------------------------------------
	/// @brief 通道缓冲
	// --------------------------------------------------------------------------
	// Here we `make` a channel of strings buffering up to
	// 2 values.
	chan3 := make(chan string, 2)

	// Because this channel is buffered, we can send these
	// values into the channel without a corresponding concurrent receive.
	chan3 <- "buffered"
	chan3 <- "channel"
	//chan3 <- "hello"		// error, buffer大小只有2

	// Later we can receive these two values as usual.
	fmt.Println(<-chan3)
	fmt.Println(<-chan3)
	//fmt.Println(<-chan3)	// error, 没有内容可以接收了

	switch (*g_kind)	{
	case "1":
		// 同步
		TestChannelsSync()
	case "2":
		// 单向通道
		TestOneWayChannels()
	case "3":
		// select 可等待多个通道操作。将goroutine和channel与select结合是Go语言的一个强大功能
		TestChannelSelect()
	case "4":
		// 超时
		TestChannelTimeOut()
	case "5":
		// 关闭通道
		TestChannelClose()
	case "6":
		// 工作池
		TestChannelWorkPool()
	}
}
