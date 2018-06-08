package main

import (
	"fmt"
	"math/rand"
	"sync/atomic"
	"time"
)
import "gitee.com/jntse/testgo/helloworld/common"

// In this example our state will be owned by a single
// goroutine. This will guarantee that the data is never
// corrupted with concurrent access. In order to read or
// write that state, other goroutines will send messages
// to the owning goroutine and receive corresponding
// replies. These `ReadOp` and `WriteOp` `struct`s
// encapsulate those requests and a way for the owning
// goroutine to respond.
type ReadOp struct {
	key  int
	resp chan int
}
type WriteOp struct {
	key  int
	val  int
	resp chan bool
}

func TestRoutineStateful() {

	common.PrintSeparateLine("TestRoutineStateful")

	// As before we'll count how many operations we perform.
	var readOps uint64 = 0
	var writeOps uint64 = 0

	// The `chanreads` and `chanwrites` channels will be used by
	// other goroutines to issue read and write requests,
	// respectively.
	chanreads := make(chan *ReadOp)
	chanwrites := make(chan *WriteOp)

	// Here is the goroutine that owns the `state`, which
	// is a map as in the previous example but now private
	// to the stateful goroutine. This goroutine repeatedly
	// selects on the `chanreads` and `chanwrites` channels,
	// responding to requests as they arrive. A response
	// is executed by first performing the requested
	// operation and then sending a value on the response
	// channel `resp` to indicate success (and the desired
	// value in the case of `chanreads`).
	go func() {
		var state = make(map[int]int)
		for {
			select {
			case read := <-chanreads:
				read.resp <- state[read.key]
			case write := <-chanwrites:
				state[write.key] = write.val
				write.resp <- true
			}
		}
	}()

	// This starts 100 goroutines to issue chanreads to the
	// state-owning goroutine via the `chanreads` channel.
	// Each read requires constructing a `ReadOp`, sending
	// it over the `chanreads` channel, and the receiving the
	// result over the provided `resp` channel.
	for r := 0; r < 100; r++ {
		go func() {
			for {
				read := &ReadOp{key: rand.Intn(5), resp: make(chan int)}
				chanreads <- read
				<-read.resp
				atomic.AddUint64(&readOps, 1)
				time.Sleep(time.Millisecond)
			}
		}()
	}

	// We start 10 chanwrites as well, using a similar
	// approach.
	for w := 0; w < 10; w++ {
		go func() {
			for {
				write := &WriteOp{key: rand.Intn(5), val: rand.Intn(100), resp: make(chan bool)}
				chanwrites <- write
				<-write.resp
				atomic.AddUint64(&writeOps, 1)
				time.Sleep(time.Millisecond)
			}
		}()
	}

	// Let the goroutines work for a second.
	time.Sleep(time.Millisecond * 500)

	// Finally, capture and report the op counts.
	readOpsFinal := atomic.LoadUint64(&readOps)
	fmt.Println("readOps:", readOpsFinal)
	writeOpsFinal := atomic.LoadUint64(&writeOps)
	fmt.Println("writeOps:", writeOpsFinal)

	//
	common.PrintSeparateLine("TestRoutineStateful")
}
