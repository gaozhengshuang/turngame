// condition.go
package main // package declaration,must only
import (     // import packages
	"fmt"
)
import "gitee.com/jntse/testgo/helloworld/common"

func init()	{
	println("enter condition.go init")
}

// --------------------------------------------------------------------------
/// @brief 条件语句
// --------------------------------------------------------------------------
func ConditionTrunk() {

	common.PrintSeparateLine("ConditionTrunk")

	// Go 的 if 语句也不要求用 ( ) 将条件括起来，但{ }是必须有的
	i := 10
	if i >= 10 {
		fmt.Println("i >= 10")
	}

	if i >= 10 {
		fmt.Println("i >= 10")
	}

	// if 语句可以在条件之前执行一个简单语句,由这个语句定义的变量的作用域仅在 if 范围之内
	if j := 11; i >= j {
		fmt.Println("i >= j")
	} else { // else 必须在}后,不能换行
		fmt.Println("i < j")
	}

	// switch 语句
	var grade string = "B"
	var marks int = 90

	// 表达式不需要为常量，甚至不需要为整数，case是按照从上到下的顺序进行求值
	// switch不会自动从一个case子句跌落到下一个case子句,所以可以不使用break
	switch marks {
	case 90:
		grade = "A"
	case 80:
		grade = "B"
	case 50, 60, 70:
		grade = "C"
	default:
		grade = "D"
	}

	// 如果switch没有表达式，则对true进行匹配
	switch {
	case grade == "A":
		fmt.Printf("优秀!\n")
	case grade == "B", grade == "C":
		fmt.Printf("良好\n")
	case grade == "D":
		fmt.Printf("及格\n")
	default:
		fmt.Printf("差\n")
	}

	switch grade {
	case "A":
		fmt.Printf("优秀!\n")
	case "B":
		fmt.Printf("良好\n")
	case "C":
		fmt.Printf("良好\n")
	}

	// Go语言的For循环有3中形式，只有其中的一种使用分号
	// 语法1. for init; condition; post { }			(和C语言的for一样)
	// 语法2. for condition { }			(和C的while一样)
	// 语法3. for { }		(和C的for(;;)一样)
	// 语法4. for i,k := range c	{ }
	for i := 0; i < 3; i++ {
		fmt.Printf("i的值为: %d\n", i)
	}

	a, b := 0, 3
	for a < b {
		if a++; a%2 == 0 {
			continue
		}
		fmt.Printf("a 的值为: %d\n", a)
	}

	for {
		fmt.Printf("b 的值为: %d\n", b)
		if b--; b <= 0 {
			break
		}
	}

	for pos, char := range "日本\x80語" { // \x80 is an illegal UTF-8 encoding
		fmt.Printf("character %#U starts at byte position %d\n", char, pos)	
	}

	//
	common.PrintSeparateLine("ConditionTrunk")
}
