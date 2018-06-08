package common
import "fmt"

// 变量保存函数--相当于函数指针的用法
var Pf = fmt.Printf
var Pln = fmt.Println

// 为类型定义别名
type SDWORD int32

func PrintSeparateLine(str string) {
	fmt.Printf("-----------------------[%s]---------------------\n", str)
}
