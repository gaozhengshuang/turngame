package main

import (
	"errors"
	"fmt"
)
import "gitee.com/jntse/testgo/helloworld/common"

// By convention, errors are the last return value and
// have type `error`, a built-in interface.
// 通过简单方式返回一个错误
func f1(arg int) (int, error) {
	if arg == 42 {

		// `errors.New` constructs a basic `error` value
		// with the given error message.
		return -1, errors.New("can't work with 42")

	}

	// A nil value in the error position indicates that
	// there was no error.
	return arg + 3, nil
}

// It's possible to use custom types as `error`s by
// implementing the `Error()` method on them. Here's a
// variant on the example above that uses a custom type
// to explicitly represent an argument error.
type ArgError struct {
	arg  int
	prob string
}

// 必须定义实现 Error() string 方法
func (e *ArgError) Error() string {
	return fmt.Sprintf("%d - %s", e.arg, e.prob)
}

// 通过自定义构造错误结构体返回错误
func f2(arg int) (int, error) {
	if arg == 42 {

		// In this case we use `&ArgError` syntax to build
		// a new struct, supplying values for the two
		// fields `arg` and `prob`.
		return -1, &ArgError{arg, "can't work with it"}
	}
	return arg + 3, nil
}

func TestError() {
	common.PrintSeparateLine("TestError")
	defer common.PrintSeparateLine("TestError")

	// The two loops below test out each of our
	// error-returning functions. Note that the use of an
	// inline error check on the `if` line is a common
	// idiom in Go code.
	for _, i := range []int{7, 42} {
		if _, e := f1(i); e != nil {
			fmt.Println("f1 failed:", e)
		}
	}

	for _, i := range []int{7, 42} {
		if _, e := f2(i); e != nil {
			fmt.Println("f2 failed:", e)
		}
	}

}
