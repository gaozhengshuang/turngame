package main

import "fmt"
import "sync"
import "gitee.com/jntse/testgo/helloworld/common"

// --------------------------------------------------------------------------
/// @brief 等待协程退出2种方式
/// @brief 1. 使用Channel等待goroutine完成
/// @brief 2. 使用WaitGroup等待goroutine完成
// --------------------------------------------------------------------------

func TestRoutinesWaitExit()	{

	// 使用Channel等待goroutine完成
	RoutinesWaitExitByChannel()

	// 使用WaitGroup等待goroutine完成
	RoutinesWaitExitByGroup()
}

func RoutinesWaitExitByChannel()	{
	common.PrintSeparateLine("RoutinesWaitExitByChannel")
	defer common.PrintSeparateLine("RoutinesWaitExitByChannel")

	// 用Channel等待goroutine完成
	ch1 := make(chan string)
	ch2 := make(chan string)

	go func(name string, ch chan string)	{
		println(name, " ready exit...")
		ch <- name
	}("routine1", ch1)

	go func(name string, ch chan string)	{
		println(name, " ready exit...")
		ch <- name
	}("routine2", ch2)

	// select
	for i := 0; i < 2; i++	{
		select {
		case msg1 := <-ch1:
			fmt.Println(msg1, " exit ok")
		case msg2 := <-ch2:
			fmt.Println(msg2, " exit ok")
		}
	}
}

func RoutinesWaitExitByGroup()	{
	common.PrintSeparateLine("RoutinesWaitExitByGroup")
	defer common.PrintSeparateLine("RoutinesWaitExitByGroup")

	var waitch sync.WaitGroup
	waitch.Add(2)

	// 特别注意，WaitGroup必须是指针传入，否则无效
	go func(name string, wg *sync.WaitGroup)	{
		defer wg.Done()
		println(name, " ready exit...")
	}("routine1", &waitch)

	go func(name string, wg *sync.WaitGroup)	{
		defer wg.Done()
		println(name, " ready exit...")
	}("routine2", &waitch)

	waitch.Wait()
	println("2 routine is exit ok")

}


