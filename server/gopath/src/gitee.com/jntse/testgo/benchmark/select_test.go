package mytest
import "testing"

type ICar interface {
	Run() 
}

type Mercedes struct {
	price int
}
func (t *Mercedes) Run() {}

type Bmw struct {
	price int
}
func (t *Bmw) Run() {}

type Audi struct {
	price int
}
func (t *Audi) Run() {}


// int 类型chan
func BenchmarkSelectIntChan(b *testing.B) {
	ch1 := make(chan int)
	go func() {
		for i:=0; ;i++ {
			ch1 <- i
		}
	}()

	doCmd := func(int) {}
	for i := 0; i < b.N; i++ {
		select {
		case cmd , open := <-ch1:
			if open == false { panic("ch1 is close") }
			doCmd(cmd)
		}
	}
}


// 结构体对象
func BenchmarkSelectStructObjChan(b *testing.B) {
	ch1 := make(chan Mercedes)
	car := Mercedes{30}
	go func() {
		for i:=0; ;i++ {
			ch1 <- car
		}
	}()

	doCmd := func(Mercedes) {}
	for i := 0; i < b.N; i++ {
		select {
		case cmd, open := <-ch1:
			if open == false { panic("ch1 is close") }
			doCmd(cmd)
		}
	}
}

// 结构体指针
func BenchmarkSelectStructPtrChan(b *testing.B) {
	ch1 := make(chan *Mercedes)
	car := &Mercedes{ 30 }
	go func() {
		for i:=0; ;i++ {
			ch1 <- car
		}
	}()

	doCmd := func(*Mercedes) {}
	for i := 0; i < b.N; i++ {
		select {
		case cmd, open := <-ch1:
			if open == false { panic("ch1 is close") }
			doCmd(cmd)
		}
	}
}

// 接口
func BenchmarkSelectInterfaceChan(b *testing.B) {
	ch1 := make(chan ICar)
	car := &Mercedes{ 30 }
	go func() {
		for i:=0; ;i++ {
			ch1 <- car
		}
	}()

	doCmd := func(ICar) {}
	for i := 0; i < b.N; i++ {
		select {
		case cmd, open := <-ch1:
			if open == false { panic("ch1 is close") }
			doCmd(cmd)
		}
	}
}

