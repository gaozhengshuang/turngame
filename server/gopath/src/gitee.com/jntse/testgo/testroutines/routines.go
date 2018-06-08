package main

import "fmt"
import "time"
import "sync"
import "math/rand"
import "gitee.com/jntse/testgo/helloworld/common"

func f(from string) {
	for i := 0; i < 3; i++ {
		fmt.Println(from, ":", i)
	}
}

func TestRoutines() {
	common.PrintSeparateLine("TestRoutines")
	defer common.PrintSeparateLine("TestRoutines")

	// Suppose we have a function call `f(s)`. Here's how
	// we'd call that in the usual way, running it
	// synchronously.
	f("direct")

	// To invoke this function in a goroutine, use
	// `go f(s)`. This new goroutine will execute
	// concurrently with the calling one.
	go f("goroutine")

	// You can also start a goroutine for an anonymous(匿名)
	// function call.
	go func(from string) {
		for i := 0; i < 3; i++ {
			fmt.Println(from, ":", i)
		}
	}("goroutine2")

	// Our two function calls are running asynchronously in
	// separate goroutines now, so execution falls through
	// to here. This `Scanln` code requires we press a key
	// before the program exits
	time.Sleep(100 * time.Millisecond)
	//fmt.Printf("任意键继续...")
	//var input string
	//fmt.Scanln(input)
	fmt.Println("done")

	//
	TestWriteSameContainer()
}

// --------------------------------------------------------------------------
/// @brief 多个协程写同一个map
/// @brief map不是线程安全的，但实际测试只挂了一次
///
/// @return 
// --------------------------------------------------------------------------
func TestWriteSameContainer() {
	common.PrintSeparateLine("TestWriteSameContainer")
	defer common.PrintSeparateLine("TestWriteSameContainer")
	mapstr := make(map[int]string)
	var watch sync.WaitGroup
	watch.Add(4)
	writeContainer := func (begin int, mp* map[int]string, wg *sync.WaitGroup) {
		defer wg.Done()
		defer fmt.Println("Done writeContainer", begin)
		for i := begin; i < begin + 1000; i++ {
			(*mp)[i] = fmt.Sprintf("Hello WriteContainer [%d]", i)
			time.Sleep(time.Millisecond)
		}
	}
	rand.Seed(time.Now().Unix())
	readContainer := func(mp *map[int]string)	{
		for {
			time.Sleep(time.Millisecond)
			len := len(*mp)
			if len == 0 { continue }
			key := rand.Intn(len)
			v, ok := (*mp)[key]
			if ok {
				fmt.Printf("find key:%d val:%s\n", key, v)
			}
		}
	}
	go writeContainer(1,	&mapstr, &watch)
	go writeContainer(2001, &mapstr, &watch)
	go writeContainer(3001, &mapstr, &watch)
	go writeContainer(4001, &mapstr, &watch)
	go readContainer(&mapstr)
	watch.Wait()
	fmt.Printf("mapstr size:%d\n", len(mapstr))

}
