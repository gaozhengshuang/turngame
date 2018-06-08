package main

import "fmt"

// --------------------------------------------------------------------------
/// @brief 	Go 语言中 range 关键字用于for循环中迭代数组(array)、切片(slice)、通道(channel)或集合(map)的元素。
/// 				在数组和切片中它返回元素的索引值，在集合中返回 key-value 对的 key 值。
// --------------------------------------------------------------------------

func TestRange() {

	//这是我们使用range去求一个slice的和。使用数组跟这个很类似 ，由于不需要使用index 所以我们使用空白符"_"省略了
	slicenum := []int{2, 3, 4}
	sum := 0
	for _, val := range slicenum {
		sum += val
	}
	fmt.Println("sum:", sum)

	// 获取index
	for i, val := range slicenum {
		if val == 3 {
			fmt.Println("index:", i)
		}
	}

	// range也可以用在map的键值对上。
	kvs := map[string]string{"a": "apple", "b": "banana"}
	for k, v := range kvs {
		fmt.Printf("key:%s val:%s\n", k, v)
	}

	//range也可以用来列举字符串。第一个参数是字符的索引，第二个是字符（Unicode的值）。
	for i, c := range "abcde" {
		fmt.Println(i, c)
	}

}
