//Go提供对JSON编码和解码的内置支持，包括内置和自定义数据类型。
//我们将使用两个结构来演示下面的自定义类型的编码和解码。
//首先，我们将看到基本数据类型到JSON字符串的编码。 这里有一些原子值的例子

// 注意：通过结构体构造json字符串，字段首字母必须大写才会被导出json

package main

import "encoding/json"
import "fmt"
import "os"
import _ "strings"
import "gitee.com/jntse/testgo/helloworld/common"

// We'll use these two structs to demonstrate encoding and
// decoding of custom types below.

func TestJson() {

	common.PrintSeparateLine("TestJson")
	defer common.PrintSeparateLine("TestJson")

	// First we'll look at encoding basic data types to
	// JSON strings. Here are some examples for atomic
	// values.
	// 基本值
	bolB, _ := json.Marshal(true)
	fmt.Println(string(bolB))
	intB, _ := json.Marshal(1)
	fmt.Println(string(intB))
	fltB, _ := json.Marshal(2.34)
	fmt.Println(string(fltB))
	strB, _ := json.Marshal("gopher")
	fmt.Println(string(strB))

	// And here are some for slices and maps, which encode
	// to JSON arrays and objects as you'd expect.
	// slice构造json字符串
	slcD := []string{"apple", "peach", "pear"}
	slcB, _ := json.Marshal(slcD)
	fmt.Println("slcB=", string(slcB))

	// map构造json字符串
	mapD := map[string]int{"apple": 5, "lettuce": 7}
	mapB, _ := json.Marshal(mapD)
	fmt.Println("mapB=", string(mapB))

	// The JSON package can automatically encode your
	// custom data types. It will only include exported
	// fields in the encoded output and will by default
	// use those names as the JSON keys.
	// 通过结构体构造json字符串，字段首字母必须大写才会被导出json
	// 'price'字段小写不会被导出json
	// 'WhereFrom' 字段没有给初始值也会被导出
	{
		type Response1 struct {
			Weight 	int
			Fruits 	[]string
			price  	int
			WhereFrom	string
			PriceLists	map[string]int
		}
		res1D := &Response1{
			Weight: 1,
			Fruits: []string{"apple", "peach", "pear"},
			price:  100,
			PriceLists: map[string]int{"apple":10, "peach":8, "pear":20 },
		}
		res1B, err := json.Marshal(res1D)
		if err != nil {
			fmt.Println(err)
		} else {
			fmt.Printf("res1B=%s\n", string(res1B))
		}
	}

	// You can use tags on struct field declarations
	// to customize the encoded JSON key names. Check the
	// definition of `Response2` above to see an example
	// of such tags.
	// 通过结构体构造json字符串，为field指定'json tag'，将会按照tag命名 导出
	type Response2 struct {
		Page   int      `json:"page"`
		Fruits []string `json:"fruits"`
		price  int		`json:"price"`
		WhereFrom string	`json:"WHEREFORM"`
	}

	var res2D Response2
	res2D.Page = 1
	res2D.Fruits = []string{"banana", "cherry"}
	res2B, _ := json.Marshal(res2D)
	fmt.Printf("res2B=%s\n", string(res2B))

	// Now let's look at decoding JSON data into Go
	// values. Here's an example for a generic data
	// structure.
	byt := []byte(`{"num":6.13,"strs":["a","b"]}`)

	// We need to provide a variable where the JSON
	// package can put the decoded data. This
	// `map[string]interface{}` will hold a map of strings
	// to arbitrary data types.
	var dat map[string]interface{}

	// Here's the actual decoding, and a check for
	// associated errors.
	if err := json.Unmarshal(byt, &dat); err != nil {
		panic(err)
	}
	fmt.Println("dat= ", dat)

	// In order to use the values in the decoded map,
	// we'll need to cast them to their appropriate type.
	// For example here we cast the value in `num` to
	// the expected `float64` type.
	num := dat["num"].(float64)
	fmt.Println("num = ", num)

	// Accessing nested data requires a series of
	// casts.
	strs := dat["strs"].([]interface{})
	str1 := strs[0].(string)
	fmt.Println("st1 = " , str1)

	// We can also decode JSON into custom data types.
	// This has the advantages of adding additional
	// type-safety to our programs and eliminating the
	// need for type assertions when accessing the decoded
	// data.
	str := `{"page": 1, "fruits": ["apple", "peach"]}`
	res := Response2{}
	json.Unmarshal([]byte(str), &res)
	fmt.Printf("res=%#v\n", res)
	fmt.Println(res.Fruits[0])

	// In the examples above we always used bytes and
	// strings as intermediates between the data and
	// JSON representation on standard out. We can also
	// stream JSON encodings directly to `os.Writer`s like
	// `os.Stdout` or even HTTP response bodies.
	enc := json.NewEncoder(os.Stdout)
	d := map[string]int{"apple": 5, "lettuce": 7}
	enc.Encode(d)

	//
	fmt.Println("==========================")
	type attachment struct {
		Type int `json:"type"`
		Num  int `json:"num"`
		Prop_id int `json:"prop_id"`
	};

	type Mail struct {
		Content string `json:"content"`
		To string `json:"to"`
		Title string `json:"title"`
		Att []attachment `json:"attachment"`
	}

	mail := &Mail{Content:"内容", To:"1,2,3", Title:"标题", Att: nil}
	mail.Att = append(mail.Att, attachment{1, 10, 1001})
	mail.Att = append(mail.Att, attachment{2, 20, 2001})
	mail.Att = append(mail.Att, attachment{3, 30, 3001})
	mail_str , _ := json.Marshal(mail)
	fmt.Printf("mail_str=%s\n", string(mail_str))
	fmt.Println("==========================")

	//
	TestWriteServerConf()
	TestReadServerConf()
}

// --------------------------------------------------------------------------
/// @brief 写ServerConf json 配置
// --------------------------------------------------------------------------
type IPhost struct {
	Ip      string	`json:"ip"`
	Port    int		`json:"port"`
}

type ServerListenConf struct {
	Name	string	`json:"name"`
	Parser	string	`json:"parser"`
	Host	IPhost	`json:"host"`
}

type ServerConnectConf struct {
	Name	string	`json:"name"`
	Parser	string	`json:"parser"`
	Host	IPhost	`json:"host"`
}

type ServerConf struct {
	Name		string	`json:"name"`
	Listens		[]ServerListenConf	`json:"listens"`
	Connects	[]ServerConnectConf	`json:"connects"`
}

func TestWriteServerConf() {
	common.PrintSeparateLine("TestWriteServerConf")
	defer common.PrintSeparateLine("TestWriteServerConf")

	conf1 := &ServerConf{}
	conf1.Name = "LoginServer"
	conf1.Listens  = make([]ServerListenConf,0)
	conf1.Listens  = append(conf1.Listens, ServerListenConf{Name:"ListenClient", Parser:"Client2LoginParser", Host:IPhost{"127.0.0.1",9010}})
	conf1.Listens  = append(conf1.Listens, ServerListenConf{Name:"ListenGate",	 Parser:"Gate2LoginParser", Host:IPhost{"127.0.0.1",9020}})
	conf1.Connects = append(conf1.Connects, ServerConnectConf{Name:"ConnectGame",Parser:"Login2GameParser", Host:IPhost{"127.0.0.1",9030}})
	conf1.Connects = append(conf1.Connects, ServerConnectConf{Name:"ConnectDB",  Parser:"Login2DBParser", Host:IPhost{}})
	//json1, _ := json.Marshal(conf1)
	json1, _ := json.MarshalIndent(conf1,"","\t")
	fmt.Printf("json1=%v\n", string(json1))
	file1, _ := os.Create("./files/test-json-write1.txt")
	defer file1.Close()
	file1.WriteString(string(json1))	// 写json字符串
	file1.Sync()

	/*
	file2, _ := os.Create("./files/test-json-write2.txt")
	conf2 := &ServerConf {
		Host:IPhost{"127.0.0.1", 8090},
		Name:"GameServer",
		Parser:"C2GProtoParser",
	}
	json2, _ := json.Marshal(conf2)
	fmt.Printf("json2=%v\n", string(json2))
	enc := json.NewEncoder(file2)		// 写json二进制
	enc.Encode(json2)
	*/
}


func TestReadServerConf() {
	common.PrintSeparateLine("TestReadServerConf")
	defer common.PrintSeparateLine("TestReadServerConf")

	file1, err1 := os.Open("./files/test-json-write1.txt")
	if err1 != nil	{
		println(err1)
	}
	defer file1.Close()
	fileinfo1, _:= file1.Stat()
	buf1 := make([]byte, fileinfo1.Size())
	n1, _:= file1.Read(buf1)
	common.Pf("n1=%d buf1=%v\n", n1, string(buf1))
	conf1 := &ServerConf{}
	json.Unmarshal(buf1, conf1)
	common.Pf("conf1=%+v\n", conf1)


	// 这个方式还不行，后面再查具体方法吧
	//file2, err2 := os.Open("./files/test-json-write2.txt")
	//if err2 != nil	{
	//	println(err2)
	//}
	//fileinfo2, _:= file2.Stat()
	//buf2 := make([]byte, fileinfo2.Size())
	//n2, _:= file2.Read(buf2)
	//common.Pf("n2=%d buf2=%v\n", n2, string(buf2))
	//enc := json.NewDecoder(file2)
	//conf2 := &ServerConf{}
	//enc.Decode(conf2)
	//common.Pf("conf2=%+v\n", conf2)
}


