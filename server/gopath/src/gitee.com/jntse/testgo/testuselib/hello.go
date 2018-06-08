// hello.go
package main // package declaration,must only
import (     // import packages
	"fmt"
)

import "testgolib"


func main() {
	str := "字符串翻转测试"
	fmt.Println("翻转前:", str)
	fmt.Println("翻转后:", makegolib.Reverse(str))

	str = "123456789"
	fmt.Println("翻转前:", str)
	fmt.Println("翻转后:", makegolib.Reverse(str))
}
