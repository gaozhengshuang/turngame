package mytest
import "testing"
import "fmt"
var printf = fmt.Println

// 阻塞
func BenchmarkBlockChan(b *testing.B) {
	ch_que := make(chan int)
	go func(ch_que chan int) {
		for {
			<-ch_que
		}
	}(ch_que)

	for i := 0; i < b.N; i++ {
		ch_que <- 1
	}
	//close(ch_quit)
	//close(ch_que)
}

// 非阻塞
func BenchmarkNonBlockChan(b *testing.B) {
	ch_que := make(chan int, 1000)
	go func(ch_que chan int) {
		for {
			<-ch_que
		}
	}(ch_que)

	for i := 0; i < b.N; i++ {
		ch_que <- 1
	}
	//close(ch_que)
}

// make new chan int
func BenchmarkMakeChan(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_ = make(chan int)
	}
}

// make and close chan
func BenchmarkCloseChan(b *testing.B) {
	for i := 0; i < b.N; i++ {
		ch := make(chan int)
		close(ch)
	}
}

