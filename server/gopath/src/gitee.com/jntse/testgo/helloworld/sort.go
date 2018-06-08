package main

import (
	"fmt"
	"sort"
)
import "gitee.com/jntse/testgo/helloworld/common"

func TestSort() {

	common.PrintSeparateLine("TestSort")

	// 排序函数直接修改待传入的排序数据
	strs := []string{"c", "a", "b", "a", "c"}
	sort.Strings(strs)
	fmt.Println("Strings:", strs)

	// An example of sorting `int`s.
	ints := []int{7, 2, 4, 4, 6, 1, 1}
	sort.Ints(ints)
	fmt.Println("Ints:   ", ints)

	// We can also use `sort` to check if a slice is
	// already in sorted order.
	s := sort.IntsAreSorted(ints)
	fmt.Println("Sorted: ", s)

	// 自定义排序
	UserDefineSort()

	//
	common.PrintSeparateLine("TestSort")
}

// 自定义排序规则，按字符串的长度而不是字母顺序对字符串进行排序
// 首先要创建一个自定义类型
// 然后需要实现sort.Interface - Len，Less和Swap三个方法

// In order to sort by a custom function in Go, we need a
// corresponding type. Here we've created a `ByLength`
// type that is just an alias for the builtin `[]string`
// type.
type ByLength []string

// We implement `sort.Interface` - `Len`, `Less`, and
// `Swap` - on our type so we can use the `sort` package's
// generic `Sort` function. `Len` and `Swap`
// will usually be similar across types and `Less` will
// hold the actual custom sorting logic. In our case we
// want to sort in order of increasing string length, so
// we use `len(s[i])` and `len(s[j])` here.
func (s ByLength) Len() int {
	return len(s)
}
func (s ByLength) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}
func (s ByLength) Less(i, j int) bool {
	return len(s[i]) < len(s[j])
}
func UserDefineSort() {
	// With all of this in place, we can now implement our
	// custom sort by casting the original `fruits` slice to
	// `ByLength`, and then use `sort.Sort` on that typed
	// slice.
	fruits := []string{"peach", "banana", "kiwi", "apple"}
	sort.Sort(ByLength(fruits))
	fmt.Println("Sorted: ", fruits)
}
