package main

import "fmt"
import "gitee.com/jntse/testgo/helloworld/common"

// --------------------------------------------------------------------------
/// @brief Go语言提供了数组类型的数据结构。
///			数组是具有相同唯一类型的一组已编号且长度固定的数据项序列，这种类型可以是任意的原始类型例如整形、字符串或者自定义类型。

///	@brief	数组是值。将一个数组赋值给另一个，会拷贝所有的元素，效率低

///	@brief	特别是，如果你给函数传递一个数组，其将收到一个数组的拷贝，而不是它的指针。
///			可以传递一个数组的指针来达到和c语言数组一样的性能

///	@brief	数组的大小是其类型的一部分。类型[10]int和[20]int是不同的
// --------------------------------------------------------------------------
func TestArray() {

	common.PrintSeparateLine("TestArray")
	var a1 = [5]int32{1, 2, 3, 4, 5}
	fmt.Printf("a1 len:%d cap:%d info:%#v\n", len(a1), cap(a1), a1)


	//var a2 [5]int32 = {1,2,3,4,5}	// 错误语法
	var a2 = [5]int32{10, 20, 30} // 5个size的数组，未填充的索引值是0
	for i := 0; i < len(a2); i++ { fmt.Printf("数组a2[%d]=%d\n", i, a2[i]) }
	var avg = ArrryAverage(a2, int32(len(a2)))
	fmt.Printf("数组a2平均值:%d\n", avg)


	// 如果忽略[]中的数字，会根据元素的个数来自动设置数组的大小
	var a3 = [...]string{"a", "b", "c", "d", "e"} 
	fmt.Printf("a3 len:%d cap:%d info:%#v\n", len(a3), cap(a3), a3)
	printAutoArray(a3)


	// 用数组初始化 arr := arr[startIndex:endIndex]
	var a4 = a3
	a4[0] = "A"
	fmt.Printf("a3 len:%d cap:%d info:%#v\n", len(a3), cap(a3), a3)
	fmt.Printf("a4 len:%d cap:%d info:%#v\n", len(a4), cap(a4), a4)
	a5 := a3[:]
	fmt.Printf("a5 len:%d cap:%d info:%#v\n", len(a5), cap(a5), a5)
	a6 := a3[1:2]
	fmt.Printf("a6 len:%d cap:%d info:%#v\n", len(a6), cap(a6), a6)


	// 拷贝数组,由于数组参数是值传入所以拷贝并不会影响函数体外变量
	// 这和c++的数组是不一样的
	var dstArray [5]int32
	copyArray(dstArray, a1)
	fmt.Printf("数组a1=%+v拷贝到dstArray=%+v\n", a1, dstArray) // {0,0,0}


	// 多维数组
	var ma = [3][4]int{
		{1, 2, 3, 4},
		{10, 20, 30, 40},
		{100, 200, 300, 400},
	}
	rowlen := len(ma)
	collen := len(ma[0])
	fmt.Printf("多维数组ma row大小%d col大小%d\n", rowlen, collen)
	for i := 0; i < rowlen; i++ {
		for j := 0; j < collen; j++ {
			fmt.Printf("多维数组 ma[%d][%d]=%d\n", i, j, ma[i][j])
		}
	}
	fmt.Printf("数组ma=%v\n", ma)

	//
	common.PrintSeparateLine("TestArray")
}

// 固定大小的数组参数，只能传入指定大小的数组
func ArrryAverage(arr [5]int32, size int32) int32 {
	var total int32
	for i := int32(0); i < size; i++ {
		total += arr[i]
	}
	var a = total / size
	return a
}

// 动态大小的数组才能作为参数传入
func printAutoArray(arr [5]string) {
	fmt.Printf("array info: %#v\n", arr)
	fmt.Printf("array size: %d\n", len(arr))
}

// 拷贝数组，由于数组参数是值传入所以拷贝并不会影响函数体外变量
// 这和c++数组是不一样的
func copyArray(a [5]int32, b [5]int32) bool {
	if len(a) > len(b) {
		return false
	}
	for i, _ := range a {
		a[i] = b[i]
	}
	return true
}
