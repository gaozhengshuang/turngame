package times

import "time"
import "fmt"
import "gitee.com/jntse/testgo/helloworld/common"

func TestTimerTick() {

	common.PrintSeparateLine("TestTimerTick")
	defer common.PrintSeparateLine("TestTimerTick")

	// 定时器
	TestTimer()

	// 轮询tick
	TestTicker()

}

func TestTimer() {
	// Timers represent a single event in the future. You
	// tell the timer how long you want to wait, and it
	// provides a channel that will be notified at that
	// time. This timer will wait 200 mseconds.
	timer1 := time.NewTimer(time.Millisecond * 200)

	// The `<-timer1.C` blocks on the timer's channel `C`
	// until it sends a value indicating that the timer
	// expired.
	<-timer1.C
	fmt.Println("Timer 1 expired")

	// If you just wanted to wait, you could have used
	// `time.Sleep`. One reason a timer may be useful is
	// that you can cancel the timer before it expires.
	// Here's an example of that.
	timer2 := time.NewTimer(time.Millisecond * 100)
	go func() {
		<-timer2.C
		fmt.Println("Timer 2 expired")
	}()

	// stop timer
	stop2 := timer2.Stop()
	if stop2 {
		fmt.Println("Timer 2 stopped")
	}

}

// tick函数
func TestTicker() {
	// Tickers use a similar mechanism to timers: a
	// channel that is sent values. Here we'll use the
	// `range` builtin on the channel to iterate over
	// the values as they arrive every 100ms.
	ticker := time.NewTicker(time.Millisecond * 100)
	go func() {
		for t := range ticker.C {
			fmt.Printf("Tick at %v\n", t)
		}
	}()

	// Tickers can be stopped like timers. Once a ticker
	// is stopped it won't receive any more values on its
	// channel. We'll stop ours after 500ms.
	time.Sleep(time.Millisecond * 500)
	ticker.Stop() // stop ticker
	time.Sleep(time.Millisecond)
	fmt.Println("Ticker stopped")
}
