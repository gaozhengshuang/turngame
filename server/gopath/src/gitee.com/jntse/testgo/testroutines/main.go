package main

import "fmt"

func main() {
	fmt.Println("vim-go")

	//goroutine
	TestRoutines()
	TestRoutinesWaitExit()

	//带状态的toutines
	TestRoutineStateful()
}
