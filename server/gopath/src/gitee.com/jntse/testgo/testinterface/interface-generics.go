package main
import "fmt"
import "gitee.com/jntse/testgo/helloworld/common"

// --------------------------------------------------------------------------
/// @brief 泛型编程
/// @brief 本示例演示对通用切片类型常用操作实现泛型接口
// --------------------------------------------------------------------------

type SliceAnyType []interface{}
type AnyType interface{}

// 工厂方法
func MakeNewSlice()	SliceAnyType {
	return make(SliceAnyType, 0)
}

func (slice* SliceAnyType) Print()	{
	fmt.Printf("%+v\n", *slice);
}

// 添加一个元素
func (slice* SliceAnyType) AddToSlice(val interface{}) {
	*slice = append((*slice), val)
}

// 删除一个元素，通过索引
func (slice* SliceAnyType) RemoveFromSliceIndex(index int) {
	len := len(*slice)
	if index > len	|| index < 0 {
		fmt.Println("index is unexpected, i=" , index);
		return
	}

	old := (*slice)[index]
	if index == 0 {
		*slice = (*slice)[1:]
	} else if index == len - 1 {
		*slice = (*slice)[:index]
	} else {
		*slice = append((*slice)[:index], (*slice)[index+1:]...)
	}
	fmt.Printf("remove element[%d]=%v ok\n", index, old);
}

// 删除一个元素，通过值
func (slice* SliceAnyType) RemoveFromSliceValue(val interface{}) {
	for i, v := range (*slice)	{
		if IsEqual(v, val) {
			slice.RemoveFromSliceIndex(i)
			return
		}
	}
	fmt.Printf("not found element[%v]\n", val);
}

// 自定义类型，需要定义相等方法，"=="只可以拿来判定系统类型(int string 等)
func IsEqual( a, b interface{}) bool {
	if UserDefType, ok := a.(CompareUserDefType); ok {
		return UserDefType.IsEqual(b)
	} else {
		return a == b
	}
}

type CompareUserDefType interface {
	IsEqual(obj interface{}) bool
}

type Student struct {
	id int
	name string
}
// 特别注意，这里IsEqual方法不要绑定指针(否则 a.(CompareUserDefType) 会返回nil)
func (s Student) IsEqual(obj interface{}) bool {
	if student, ok := obj.(Student); ok	{
		return student.id == s.id
	}
	panic("unexpected type")
}


func TestInterfaceGenerics() {
	common.PrintSeparateLine("TestInterfaceGenerics")
	defer common.PrintSeparateLine("TestInterfaceGenerics")

	// 整型切片
	IntSlice := SliceAnyType {1, 2, 3}
	IntSlice.Print()
	IntSlice.AddToSlice(4);
	IntSlice.AddToSlice(4);
	IntSlice.AddToSlice(5);
	IntSlice.Print()
	IntSlice.RemoveFromSliceIndex(0)
	IntSlice.Print()
	IntSlice.RemoveFromSliceIndex(len(IntSlice)-1)
	IntSlice.Print()
	IntSlice.RemoveFromSliceValue(3)
	IntSlice.Print()
	IntSlice.AddToSlice(6);
	IntSlice.Print()

	// 字符串切片
	StrSlice := SliceAnyType {"i", "am", "golang"}
	StrSlice.Print()
	StrSlice.AddToSlice("use")
	StrSlice.AddToSlice("golang")
	StrSlice.AddToSlice("is")
	StrSlice.AddToSlice("happy")
	StrSlice.AddToSlice("!")
	StrSlice.Print()
	StrSlice.RemoveFromSliceIndex(0)
	StrSlice.Print()
	StrSlice.RemoveFromSliceIndex(len(StrSlice)-1)
	StrSlice.Print()
	StrSlice.RemoveFromSliceValue("golang")
	StrSlice.Print()


	// 用户自定义切片
	StuSlice := SliceAnyType { Student{1,"xiao ming"}, Student{2,"xiao li"}, Student{3, "xiao liu"} }
	StuSlice.Print()
	StuSlice.AddToSlice(Student{1,"xiao wang"})
	StuSlice.AddToSlice(Student{3,"xiao zhang"})
	StuSlice.AddToSlice(Student{4,"xiao cheng"})
	StuSlice.Print()
	StuSlice.RemoveFromSliceIndex(0)
	StuSlice.Print()
	StuSlice.RemoveFromSliceIndex(len(StuSlice)-1)
	StuSlice.Print()
	StuSlice.RemoveFromSliceValue(Student{3,""})
	StuSlice.Print()

}
