package main

import "fmt"
import "strings"
import "errors"
import "time"
import "gitee.com/jntse/testgo/helloworld/common"
import "unsafe"

// --------------------------------------------------------------------------
/// @brief 	Go语言切片是对数组的抽象。Go数组的长度不可改变，在特定场景中这样的集合就不太适用，
///			Go中提供了一种灵活，功能强悍的内置类型切片("动态数组"),与数组相比切片的长度是不固定的，
///			可以追加元素，在追加时可能使切片的容量增大.
///
/// @brief	切片持有对底层数组的引用，如果你将一个切片赋值给另一个，二者都将引用同一个数组。
///			如果函数接受一个切片参数，对切片的元素改动(s[k] = v)，对于调用者是可见的，好比是传递了一个底层数组的指针
///			如果函数接受一个切片参数，增加切片元素(s=append(s,v) , ref=src[begin:end] )，对于调用者又是不可见的.
///			ref=src[begin:end] cut切片实际上是引用，修改原切片src元素，会同步被引用切片ref
// --------------------------------------------------------------------------
func TestSlice() {
	common.PrintSeparateLine("TestSlice")
	defer common.PrintSeparateLine("TestSlice")

	// 创建一个capacity是5的slice
	var s1 []int
	if s1 == nil { fmt.Println("未初始化的slice是nil") }
	s1 = make([]int, 5, 10) // 第3个参数是cap，可以省略
	for i := 0; i < 5; i++ { s1[i] = i }
	fmt.Printf("s1 len:%d cap:%d info:%#v\n", len(s1), cap(s1), s1)


	// 简写make
	s2 := make([]string, 3, 5)
	s2[0] = "a"
	s2[1] = "b"
	s2[2] = "c"
	fmt.Printf("s2 len:%d cap:%d info:%#v\n", len(s2), cap(s2), s2)


	// 声明初始化
	//var s3 []int = []int {1,2,3}		// 可以省去变量类型
	var s3 = []int{1, 2, 3}
	fmt.Printf("s3 len:%d cap:%d info:%#v\n", len(s3), cap(s3), s3)


	// 直接初始化
	s4 := []float32{1.1, 2.2, 3.3}
	fmt.Printf("s4 len:%d cap:%d info:%#v\n", len(s4), cap(s4), s4)


	//用数组初始化 slice := arr[startIndex:endIndex]
	var a1 = [5]int{5, 4, 3, 2, 1}
	var s5 = a1[:] // 整个数组，实际上是引用了数组底层地址
	s5[0], s5[1], s5[2] = 1, 2, 3		// a1也发生了改变
	fmt.Printf("s5 len:%d cap:%d info:%#v\n", len(s5), cap(s5), s5)
	s6 := a1[2:4] // 数组index[2] - index[4]
	fmt.Printf("s6 len:%d cap:%d info:%#v\n", len(s6), cap(s6), s6)
	s7 := a1[:3] // 数组index[0] - index[3]
	fmt.Printf("s7 len:%d cap:%d info:%#v\n", len(s7), cap(s7), s7)
	s8 := a1[2:] // 数组index[2] - index[end-1]
	fmt.Printf("s8 len:%d cap:%d info:%#v\n", len(s8), cap(s8), s8)

	// 切片拷贝
	s9 := []int32{10, 20, 30, 40}
	s10 := make([]int32, 3, 5)
	copySlice(s10, s9)
	fmt.Printf("切片s9=%+v拷贝到s10=%+v\n", s9, s10)


	//切片的切片
	// Create a tic-tac-toe board.
	game := [][]string{
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
	}

	// The players take turns.
	game[0][0] = "X"
	game[2][2] = "O"
	game[2][0] = "X"
	game[1][0] = "O"
	game[0][2] = "X"
	printBoard(game)

	// 
	// Allocate the top-level slice.
	YSize, XSize := 3,4
	picture := make([][]uint8, YSize) // One row per unit of y.
	// Loop over the rows, allocating the slice for each row.
	for i := range picture {
		picture[i] = make([]uint8, XSize)
	}
	fmt.Printf("%#v\n",picture);

	TestSliceCut()
	TestSliceAppendCopy()
	TestStringToByteSlice()
	TestMemcpySlice()
	TestSliceChan()
	TestShowSliceAddr()

	//
}

// 可变参数函数,实际上参数被合并为一个`slice`传入函数
// append(), make() 等都是可变参数函数
func TestVariableArguments() {
	fmt.Println("----VariableArgu----")
	vByte, vStr := make([]byte, 0), make([]string, 0)
	ByteFun := func(i ...byte) {
		if len(i) == 0 { fmt.Printf("可变参数是空 i=%#v \n", i) }
		vByte = append(vByte, i...)
	}
	fmt.Printf("VariableArgu vByte=%#v\n", vByte);
	ByteFun()					// 无参数
	ByteFun(1)					// 单类型
	ByteFun([]byte{2,3,4,5}...)	// slice类型
	fmt.Printf("VariableArgu vByte=%#v\n", vByte);

	StrFun := func(s ...string) {
		if s == nil { fmt.Printf("可变参数是空 s=%#v \n", s) }
		vStr = append(vStr, s...)
	}
	fmt.Printf("VariableArgu vByte=%#v\n", vStr);
	StrFun()
	StrFun("how")
	StrFun([]string{"are","you"}...)
	fmt.Printf("VariableArgu vStr=%#v\n", vStr);
}


func TestSliceCut() {
	fmt.Println("----SliceCut----")

	/* 创建切片 */
	numbers := []int{0, 1, 2, 3, 4, 5, 6, 7, 8}
	printSlice(&numbers)

	/* 打印原始切片 */
	fmt.Println("numbers ==", numbers)

	/* 打印子切片从索引1(包含) 到索引4(不包含)*/
	n1 := numbers[1:4]
	fmt.Println("numbers[1:4] ==", n1)

	/* 默认下限为 0*/
	n2 := numbers[:3]
	fmt.Println("numbers[:3] ==", n2)

	/* 默认上限为 len(s)*/
	n3 := numbers[4:]
	fmt.Println("numbers[4:] ==", n3)

	/* cut切片实际上是引用，修改原切片元素，会同步被引用切片*/
	numbers[1] = numbers[1] * 100
	numbers[4] = numbers[4] * 100
	fmt.Println("numbers ==", numbers)
	fmt.Println("numbers[1:4] ==", n1)
	fmt.Println("numbers[:3] ==",  n2)
	fmt.Println("numbers[4:] ==",  n3)


	numbers1 := make([]int, 0, 5)
	printSlice(&numbers1)

	/* 复制子切片从索引  0(包含) 到索引 2(不包含) */
	number2 := numbers[:2]
	printSlice(&number2)

	/* 复制子切片从索引 2(包含) 到索引 5(不包含) */
	number3 := numbers[2:5]
	printSlice(&number3)

}

func TestSliceAppendCopy() {

	fmt.Println("----SliceAppendCopy----")

	var numbers []int
	printSlice(&numbers)

	/* 向切片添加一个元素 */
	numbers = append(numbers, 1)
	printSlice(&numbers)

	/* 同时添加多个元素 */
	numbers = append(numbers, 2, 3, 4)
	printSlice(&numbers)

	/* 添加一个切片,切片后必须带 '...'，否则会因为类型错误而无法编译*/
	s1 := []int{10,20,30}
	numbers = append(numbers, s1...)

	/* 创建切片 numbers1 是之前切片的两倍容量*/
	numbers1 := make([]int, len(numbers), (cap(numbers))*2)

	/* 拷贝 numbers 的内容到 numbers1 */
	copy(numbers1, numbers)
	printSlice(&numbers1)
}

func printSlice(x* []int) {
	fmt.Printf("len=%d cap=%d addr=%p slice=%v\n", len(*x), cap(*x), x, *x)
}

func printBoard(s [][]string) {
	for i := 0; i < len(s); i++ {
		fmt.Printf("%s\n", strings.Join(s[i], " "))
	}
}

// 拷贝切片，行为和c++数组一类似，函数是可以改变传入切片的
func copySlice(a []int32, b []int32) bool {
	if len(a) > len(b) {
		return false
	}
	for i, _ := range a {
		a[i] = b[i]
	}
	return true
}

func memcpySlice(dst* []int, src []int, from int, end int) error {
	if end > len(src) {
		return errors.New("Error: end pos is greater than len(src)")
	}

	if from == 0 && end == 0 {
		*dst = (src)[:]
	}else {
		*dst = (src)[from:end]
	}
	return nil
}

// string->[]byte 和 []byte->string
func TestStringToByteSlice()	{
	fmt.Println("----StringToByteSlice----")
	defer fmt.Println("----StringToByteSlice----")

	// 用string初始化
	s1 := []byte("string1")
	fmt.Printf("s1=%v\n", s1)
	fmt.Printf("s1=%v\n", string(s1))

	// copy会先检查切片大小，所以只会copy进去dst slice size的内容
	s2 := make([]byte, 10)
	copy(s2, "copy string to []byte")
	fmt.Printf("s2=%v\n", s2)
	fmt.Printf("s2=%v\n", string(s2))

	// golang 采用utf8编码，中文占3个字节
	s3 := make([]byte, 10)
	s3 = []byte("中文测试")
	fmt.Printf("s3=%v\n", s3)
	fmt.Printf("s3=%v\n", string(s3))
}

func TestMemcpySlice() {
	fmt.Println("----TestMemcpySlice----")
	defer fmt.Println("----TestMemcpySlice----")

	s1 := []int{1,2,3,4,5,6,7,8,9,10}
	fmt.Println("s1=",s1)

	dst := make([]int,10)
	err := memcpySlice(&dst, s1, 0, 100)
	if err != nil {
		fmt.Printf("copy to src err=%v\n",err)
	}

	memcpySlice(&dst, s1, 0, 0)
	fmt.Printf("copy to src dst=%v\n", dst)

	memcpySlice(&dst, s1, 5, 10)
	fmt.Printf("copy to src dst=%v\n", dst)

	memcpySlice(&dst, s1, 0, 5)
	fmt.Printf("copy to src dst=%v\n", dst)

}

// --------------------------------------------------------------------------
/// @brief 测试slice通过chan传输
/// @brief 结论: 	传输的slice如果是临时变量，那么传输的是一份拷贝
/// @brief 			传输的slice如果是在有效生命期内，那么传输的就是slice本身
///
/// @return 
// --------------------------------------------------------------------------
func TestSliceChan() {
	fmt.Println("---TestSliceChan---")

	SendLoop := func(ch_send chan *[]int) {
		for i:=0; i < 2; i++ {
			s := []int{i,10,20,30,40}
			ch_send <- &s
			fmt.Printf("send addr=%p data=%v\n", s, s);
		}
	}
	ch_send := make(chan *[]int, 5)
	go SendLoop(ch_send)

	RecvLoop := func(ch_send chan *[]int) {
		time.Sleep(time.Millisecond)
		for {
			select {
			case s, open := <-ch_send:
				if open == false {
					break
				}
				fmt.Printf("recv addr=%p data=%v\n", s, s);
			}
		}
	}
	go RecvLoop(ch_send)
	time.Sleep(time.Millisecond * 10)

	// --------------------------------------------------------------------------
	/// @brief 
	// --------------------------------------------------------------------------
	fmt.Println("---SendLoop_2---")
	s1 := make([][]int,10)
	for i:=0; i < 10; i++ {
		s1[i] = []int{i,10,20,30,40}
	}

	SendLoop_2 := func(ch_send chan *[]int, s [][]int) {
		for i:=0; i < 2; i++ {
			s1 := &s[i]
			ch_send <- s1
			fmt.Printf("send addr=%p data=%v\n", s1, s1);
		}
	}
	go SendLoop_2(ch_send, s1)
	time.Sleep(time.Millisecond * 10)
}

func TestShowSliceAddr() {
	a1 := [5]int{1, 2, 3}
	p0 := unsafe.Pointer(&a1[0])
	fmt.Printf("a1=%#v len=%d cap=%d ptr=%p\n",a1, len(a1), cap(a1), p0)

	s1 := a1[:]
	p1 := unsafe.Pointer(&s1[0])
	fmt.Printf("s1=%#v len=%d cap=%d ptr=%p\n",s1, len(s1), cap(s1), p1)

	s2 := s1
	p2 := unsafe.Pointer(&s2[0])
	fmt.Printf("s2=%#v len=%d cap=%d ptr=%p\n",s2, len(s2), cap(s2), p2)

	s1 = s1[:0]
	s1 = append(s1, []int{100,200,300}...)
	p3 := unsafe.Pointer(&s1[0])
	fmt.Printf("s1=%#v len=%d cap=%d ptr=%p\n",s1, len(s1), cap(s1), p3)
}
