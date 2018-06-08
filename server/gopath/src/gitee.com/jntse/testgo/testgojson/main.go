package main

import "fmt"
import "os"
import "encoding/json"
import "testgojson/gojson"

func main() {
	fmt.Println("vim-go")

	file1, err1 := os.Open("global.json")
	if err1 != nil  {
		println(err1)
	}
	defer file1.Close()

	fileinfo1, _:= file1.Stat()
	buf1 := make([]byte, fileinfo1.Size())
	n1, _:= file1.Read(buf1)
	fmt.Printf("n1=%d buf1=\n%v\n", n1, string(buf1))
	conf1 := &tbl.Global{}
	if err := json.Unmarshal(buf1, conf1); err != nil {
		panic(err)
	}
	//fmt.Println(conf1)
}
