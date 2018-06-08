package main

import (
	"fmt"
	"gitee.com/jntse/testgo/helloworld/common"
)

// --------------------------------------------------------------------------
/// @brief Go语言提供了另外一种数据类型即接口，它把所有的具有共性的方法定义在一起，任何其他类型只要实现了这些方法就是实现了这个接口
// --------------------------------------------------------------------------
type Phone interface {
	call()
}

type NokiaPhone struct{}
func (nokia NokiaPhone) call() {
	fmt.Println("I am Nokia, I can call you!")
}

type Samsung struct{}
func (apple Samsung) call() {
	fmt.Println("I am Samsung, I can call you!")
}

// 如果要在内建类型上定义方法，则需要给内建类型重新指定一个名字，然后在新指定名字的类型上 定义方法
type myInteger int
func (p myInteger) abs() int {
	if int(p) < 0 {
		return int(-p)
	}
	return int(p)
} // Conversion required.


func TestInterface() {

	common.PrintSeparateLine("TestInterface")

	// 电话都call的功能
	var phone Phone
	phone = new(NokiaPhone)
	phone.call()

	var p2 Phone
	p2 = Samsung{}
	p2.call()

	// 实现一个汽车通用接口
	TestInterfaceCar()


	// 新定义的类型和内建的类型是有区别的，需要类型转换
	var m1 myInteger = myInteger(-10)
	println(m1, m1.abs())


	// 接口在switch中的使用
	whatAmI := func(i interface{}) {
		switch t := i.(type) {
		case bool:
			fmt.Println("I'm a bool")
		case int:
			fmt.Println("I'm an int")
		default:
			fmt.Printf("Don't know type %T\n", t)
		}
	}
	whatAmI(true)
	whatAmI(1)
	whatAmI("hey")
	common.PrintSeparateLine("TestInterface")
}


