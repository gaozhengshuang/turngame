// condition.go
package main // package declaration,must only
import (     // import packages
	"fmt"
)
import "gitee.com/jntse/testgo/helloworld/common"

// 多返回值函数
func SwapString(s1, s2 string) (string, string) {
	var temp string
	temp = s1
	s1 = s2
	s2 = temp
	return s1, s2
}

func SwapStringByPtr(s1, s2 *string) {
	tmp := *s1
	*s1 = *s2
	*s2 = tmp
}

func TestFunction() {

	common.PrintSeparateLine("TestFunction")

	// defer 语句会延迟函数的执行直到上层函数返回, 延迟调用的参数会立刻生成，
	// 但是在上层函数返回前函数都不会被调用.
	// 延迟的函数调用被压入一个栈中。当函数返回时会按照后进先出的顺序调用被延迟的函数调用.
	for i := 0; i < 10; i++ {
		defer fmt.Println("defer延迟调用", i)
	}

	// 值传递函数
	var a, b string = "123", "456"
	fmt.Printf("交换前字符串a=%s b=%s\n", a, b)
	c, d := SwapString(a, b)
	fmt.Printf("交换后字符串a=%s b=%s c=%s d=%s\n", a, b, c, d)

	//
	a, b = "111", "222"
	fmt.Printf("交换前字符串a=%s b=%s\n", a, b)
	SwapStringByPtr(&a, &b)
	fmt.Printf("交换后字符串a=%s b=%s\n", a, b)

	// 递归函数求阶乘
	fmt.Println("5的阶乘是", Factorial(5))

	//
	common.PrintSeparateLine("TestFunction")
}

// 递归函数
func Factorial(n uint32) uint32 {
	if n == 0 || n == 1 {
		return 1
	}

	return n * Factorial(n-1)
}
