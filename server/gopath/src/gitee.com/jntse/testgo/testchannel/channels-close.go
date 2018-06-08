package main

import "fmt"

// --------------------------------------------------------------------------
/// @brief	关闭通道只是表示不会再发送数据到通道了，不代表这个通道无效，
///			通道内部未取出的数据任然还可以取出
/// @brief 	如果channel已经被关闭,继续往它发送数据会导致 panic: send on closed channel
// --------------------------------------------------------------------------
func TestChannelClose() {
	fmt.Println("----TestChannelClose----")
	jobs := make(chan int, 5)
	done := make(chan bool)

	// Here's the worker goroutine. It repeatedly receives
	// from `jobs` with `j, more := <-jobs`. In this
	// special 2-value form of receive, the `more` value
	// will be `false` if `jobs` has been `close`d and all
	// values in the channel have already been received.
	// We use this to notify on `done` when we've worked
	// all our jobs.
	go func() {
		for {
			j, more := <-jobs
			if more {
				fmt.Println("received job", j)
			} else {
				fmt.Println("chan closed")
				done <- true
				return
			}
		}
	}()

	// This sends 3 jobs to the worker over the `jobs`
	// channel, then closes it.
	for j := 1; j <= 3; j++ {
		jobs <- j
		fmt.Println("sent job", j)
	}

	// 关闭后还可以从通道取数据，但不能再想通道写入数据
	close(jobs)
	fmt.Println("sent all jobs")

	// We await the worker using the
	// [synchronization](channel-synchronization) approach
	// we saw earlier.
	<-done
}
