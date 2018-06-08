//Defer用于确保稍后在程序执行中执行函数调用，通常用于清理目的。
//延迟(defer)常用于例如,ensure和finally常见于其他编程语言中。

package main

import "fmt"
import "os"
import "gitee.com/jntse/testgo/helloworld/common"

// Suppose we wanted to create a file, write to it,
// and then close when we're done. Here's how we could
// do that with `defer`.
//假设要创建一个文件，写入内容，然后在完成之后关闭
func TestDefer() {

	common.PrintSeparateLine("TestDefer")
	defer common.PrintSeparateLine("TestDefer") // 多个defer入栈，先进后出
	// Immediately after getting a file object with
	// `createFile`, we defer the closing of that file
	// with `closeFile`. This will be executed at the end
	// of the enclosing function (`main`), after
	// `writeFile` has finished.

	//f := createFile("test-defer.txt")
	//defer closeFile(f)
	//writeFile(f)

}

func createFile(p string) *os.File {
	fmt.Println("creating")
	f, err := os.Create(p)
	if err != nil {
		panic(err)
	}
	return f
}

func writeFile(f *os.File) {
	fmt.Println("writing")
	fmt.Fprintln(f, "data")
	fmt.Fprintln(f, "这是一个测试文件，用于测试defer")

}

func closeFile(f *os.File) {
	fmt.Println("closing")
	f.Close()
}
