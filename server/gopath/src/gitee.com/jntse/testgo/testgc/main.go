package main

import (
	"runtime"
	"time"
)

const capacity int   = 50000

var d interface{}

func value() map[int]int {
	m := make(map[int]int, capacity)
	for i := 0; i < capacity; i++ {
		m[i] = i
	}
	return m
}

func pointer() map[int]*int  {
	m := make(map[int]*int, capacity)
	for i := 0; i < capacity; i++ {
		v := i
		m[i] = &v
	}
	return m
}

func main()  {
	//d = value()
	d = pointer()

	for i := 0; i < 20; i++  {
		runtime.GC()
	}
	time.Sleep(time.Second)
}
