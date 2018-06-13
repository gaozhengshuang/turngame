package main

import "fmt"
import "gitee.com/jntse/testgo/helloworld/common"

// --------------------------------------------------------------------------
/// @brief 	Map 是一种无序的键值对的集合。Map 最重要的一点是通过 key 来快速检索数据，key 类似于索引，指向数据的值。
///			Map 是一种集合，所以我们可以像迭代数组和切片那样迭代它。
///			不过Map是无序的，我们无法决定它的返回顺序，这是因为 Map 是使用 hash 表来实现的
///			
///	@brief	如果map包含的是整数，则查找一个不存在的key将会返回0。
///			要区分开没有的项和值为零的项，要使用查找返回的第二个参数来确定.
///
///	@brief	删除使用delete内建函数，其参数为map和要删除的key。即使key已经不在map中，这样做也是安全的
// --------------------------------------------------------------------------

func TestMap() {

	common.PrintSeparateLine("TestMap")

	// 声明初始化map
	var m1 = map[int]string{10: "aa", 20: "bb", 30: "cc"}
	fmt.Printf("%#v\n", m1)
	for key, val := range m1 {
		fmt.Printf("m1 k=[%d] v=%s\n", key, val)
	}

	// 查找返回2个参数，第一个找到的val，第二个表示key是否存在
	r1, rf := m1[10]
	if rf == true	{
		println("m1[10] is exist, val=", r1);
	}

	r2, rf := m1[50]
	if rf == false	{
		println("m1[50] is not exist, val=", r2);
	}

	type Vertex struct {
		Lat, Long float64
	}

	var m2 = map[string]Vertex{
		"Bell Labs": {40.68433, -74.39967},
		"Google":    {37.42202, -122.08408},
	}
	fmt.Printf("%+v\n", m2)

	// 也可以使用内建函数 make 初始化
	var countrySet map[string]string
	if countrySet == nil {
		fmt.Println("未初始化的map是nil")
	}
	countrySet = make(map[string]string)

	/* 插入 */
	countrySet["France"] = "Paris"
	countrySet["Italy"] = "Rome"
	countrySet["Japan"] = "Tokyo"
	countrySet["India"] = "New Delhi"

	/* 查找 */
	captial, ok := countrySet["United States"]
	if ok {
		fmt.Println("Capital of 'United States' is", captial)
	} else {
		fmt.Println("Capital of 'United States' is not present")
	}

	/* 不关系返回值，只关系是否存在*/
	_, iok := countrySet["India"]
	if iok	{
		fmt.Println("Capital of 'India ' is present")
	}

	/* 删除 */
	delete(countrySet, "Japan")
	delete(countrySet, "China")
	fmt.Printf("map删除后 info:%#v\n", countrySet)

	/* 拷贝和引用 */
	countrySet2 := countrySet
	countrySet3 := make(map[string]string)
	for k ,v := range countrySet { countrySet3[k] = v }
	countrySet["England"] = "London"
	fmt.Printf("map插入后 info:%#v\n", countrySet)
	fmt.Printf("map引用后 info:%#v\n", countrySet2)
	fmt.Printf("map拷贝后 info:%#v\n", countrySet3)


	//
	common.PrintSeparateLine("TestMap")
}

