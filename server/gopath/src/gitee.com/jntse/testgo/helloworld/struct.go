package main

import "fmt"
import "gitee.com/jntse/testgo/helloworld/common"

type Books struct {
	title   string
	author  string
	subject string
	book_id int
}

// 可以在结构体类型上定义方法
// 接收者为指针的方法 1.避免在每个方法调用中拷贝值对于大结构体效率更高 2.可以修改指针指向的值
func (b *Books) Print() {
	fmt.Printf("Book title : %s\n", b.title)
	fmt.Printf("Book author : %s\n", b.author)
	fmt.Printf("Book subject : %s\n", b.subject)
	fmt.Printf("Book book_id : %d\n", b.book_id)
	println("")
}

// 接收者为拷贝副本的方法 1.读取的是值的副本无法修改原始值
func (b Books) Print2() {
	fmt.Printf("Book title : %s\n", b.title)
	fmt.Printf("Book author : %s\n", b.author)
	fmt.Printf("Book subject : %s\n", b.subject)
	fmt.Printf("Book book_id : %d\n", b.book_id)
	println("")
}

func NewBook1() *Books {
	b := new(Books)
	b.title = "Java"
	b.book_id = 123
	fmt.Printf("b=%v addr=%p\n",*b, b)
	return b
}

func NewBook2() *Books {
	b := &Books{title:"Ruby", book_id:124}
	fmt.Printf("b=%v addr=%p\n",*b, b)
	return b
}

func TestStruct() {

	common.PrintSeparateLine("TestStruct")
	defer common.PrintSeparateLine("TestStruct")


	/* 字段赋值 */
	var Book1 Books /* 声明 Book1 为 Books 类型 */
	Book1.title = "Go新手教程"
	Book1.author = "runoob"
	Book1.subject = "Go 语言教程"
	Book1.book_id = 6495407
	Book1.Print()

	// 通过字段标号初始化, 没有出现的字段则对应为零值
	var Book2 Books = Books{title: "C++ Primer", author: "Stanley B. Lippman"}
	Book2.Print2()

	// 复合文字(composite literal)初始化，域按顺序排列并且必须都存在
	var Book3 Books = Books{"Effective C++", "Scott Meyers", "55 Specific Ways", 000002}
	Book3.Print()

	// new先构造一块内存，所以book4是一个指针
	var Book4 *Books = new(Books)
	Book4.title = "Go语言圣经"
	Book4.author = "Alan A. A. Donovan, Brian W. Kernighan"
	Book4.subject = "Go 语言教程"
	Book4.book_id = 123123
	Book4.Print2()

	// 2中构造对比
	book4 := NewBook1()
	book5 := NewBook2()
	fmt.Printf("book4=%v addr=%p\n",*book4, book4)
	fmt.Printf("book5=%v addr=%p\n",*book5, book5)

}
