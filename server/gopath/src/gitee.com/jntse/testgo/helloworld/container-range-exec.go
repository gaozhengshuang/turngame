// 我们经常需要在程序中对数据集合执行操作，例如选择满足给定谓词的所有项目，
// 或将所有项目映射到具有自定义函数的新集合。
// 在某些语言中，通用数据结构和算法是惯用的。 Go不支持泛型，
// 在Go中，如果并且当它们对于程序和数据类型特别需要时，提供集合函数是很常见的
package main

import "strings"
import "fmt"
import "gitee.com/jntse/testgo/helloworld/common"

// Returns the first index of the target string `t`, or
// -1 if no match is found.
func Find(vs []string, t string) int {
	for i, v := range vs {
		if v == t {
			return i
		}
	}
	return -1
}

// Returns `true` if the target string t is in the
// slice.
func Exist(vs []string, t string) bool {
	return Find(vs, t) >= 0
}

// Returns `true` if one of the strings in the slice
// satisfies the predicate `f`.
// 类似std::any_of
func Any_Of(vs []string, f func(string) bool) bool {
	for _, v := range vs {
		if f(v) {
			return true
		}
	}
	return false
}

// Returns `true` if all of the strings in the slice
// satisfy the predicate `f`.
// 类似std::all_of
func All_Of(vs []string, f func(string) bool) bool {
	for _, v := range vs {
		if !f(v) {
			return false
		}
	}
	return true
}

// Returns a new slice containing all strings in the
// slice that satisfy the predicate `f`.
// 类似std::find_if
func Find_If(vs []string, f func(string) bool) []string {
	vsf := make([]string, 0)
	for _, v := range vs {
		if f(v) {
			vsf = append(vsf, v)
		}
	}
	return vsf
}

// Returns a new slice containing the results of applying
// the function `f` to each string in the original slice.
func Foreach_Exec(vs []string, f func(string) string) []string {
	vsm := make([]string, len(vs))
	for i, v := range vs {
		vsm[i] = f(v)
	}
	return vsm
}

func TestSliceCollection() {

	common.PrintSeparateLine("TestSliceCollection")
	defer common.PrintSeparateLine("TestSliceCollection")

	// Here we try out our various collection functions.
	var strs = []string{"peach", "apple", "pear", "plum"}
	fmt.Println(Find(strs, "pear"))
	fmt.Println(Exist(strs, "grape"))
	fmt.Println(Any_Of(strs, func(v string) bool {
		return strings.HasPrefix(v, "p")
	}))
	fmt.Println(All_Of(strs, func(v string) bool {
		return strings.HasPrefix(v, "p")
	}))
	fmt.Println(Find_If(strs, func(v string) bool {
		return strings.Contains(v, "e")
	}))

	// The above examples all used anonymous functions,
	// but you can also use named functions of the correct type.
	fmt.Println(Foreach_Exec(strs, strings.ToUpper))

	//
	TestMapCollection()
}

// Returns a new slice containing the results of applying
// the function `f` to each string in the original slice.
func Map_Foreach_Exec(vs map[int]string, f func(string)) {
	for _, v := range vs {
		f(v)
	}
}

func TestMapCollection() {
	var m1 = map[int]string{10: "aa", 20: "bb", 30: "cc"}
	Map_Foreach_Exec(m1, func(s string) {
		fmt.Println("val = ", s)
	})
}
