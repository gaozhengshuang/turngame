// declare.go
package main // package declaration,must only
import (     // import packages
	"fmt"
)
import "gitee.com/jntse/testgo/helloworld/common"

func init()	{
	println("enter declare.go init")
}

// --------------------------------------------------------------------------
/// @brief 定义变量
// --------------------------------------------------------------------------
func DeclareVariable() bool {

	common.PrintSeparateLine("DeclareVariable")
	defer common.PrintSeparateLine("DeclareVariable")
	//defer panic("asset false")

	// 函数也可以保存成一个变量
	var fun1 func(string) bool = func(str string) bool {
		println(str)
		return true
	}
	fun1("函数作为变量")

	// 不做任何事的函数
	fun2 := func() { }
	fun2()

	// 类型相同多个变量, 非全局变量
	var a1, a2, a3 common.SDWORD
	a1, a2, a3 = 1, 2, 3 // 平行赋值
	println(a1, a2, a3)

	// 自行推断变量类型
	var auto1, auto2 = 1, "this is string"
	fmt.Println(auto1, auto2)

	// 短声明变量，省略var关键字，:=左侧的变量不应该是已经声明过的
	shortd1, shortd2 := 22, "not use 'var' keyword"
	fmt.Println(shortd1, shortd2)

	// 字符串内部嵌套双引号
	var str string = `{"id":1, "name":"xiejian"}`
	fmt.Println(str)

	// 常量
	const Pi float32 = 3.1415926
	const OneHourSecs = 3600

	// 枚举
	const (
		Unknown = 0
		Female  = 1
		Male    = 2
	)
	fmt.Println(Unknown, Female, Male)

	// iota特殊常量，在每一个const关键字出现时被重置为0，每出现一次iota，其所代表的数字会自动增加1
	const (
		monday    = iota // 0
		tuesday          // 1
		wednesday        // 2
		thursday         // 3
		friday           // 4
		saturday         // 5
		sunday           // 6
	)
	fmt.Println(monday, tuesday, wednesday, thursday, friday, saturday, sunday)

	const (
		i = 1 << iota // 1 << 0
		j = 1 << iota // 1 << 1
		k             // 1 << 2
		l             // 1 << 3
	)
	fmt.Println(i, j, k, l)

	// 指针地址
	var p1 *common.SDWORD = &a1
	common.Pf("a1取地址%x a1取值%d\n", p1, *p1)

	//指针的指针
	a1++
	var p2 **common.SDWORD = &p1
	common.Pf("p1地址%x p2取值%d\n", *p2, **p2)

	return true
}
