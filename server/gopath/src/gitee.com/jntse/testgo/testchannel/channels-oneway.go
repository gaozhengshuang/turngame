package main

import "fmt"

// --------------------------------------------------------------------------
/// @brief  指定通道是否仅用于发送或接收值
// --------------------------------------------------------------------------
func TestOneWayChannels() {
	chpings := make(chan string, 1)
	chpongs := make(chan string, 1)
	ping(chpings, "passed message")
	pong(chpings, chpongs)
	fmt.Println(<-chpongs)
}

// This `ping` function only accepts a channel for 'sending'
// values. It would be a compile-time error to try to
// receive on this channel.
func ping(pings chan<- string, msg string) {
	pings <- msg
}

// The `pong` function accepts one channel for 'receives'
// (`pings`) and a second for sends (`pongs`).
func pong(pings <-chan string, pongs chan<- string) {
	msg := <-pings
	pongs <- msg
}
