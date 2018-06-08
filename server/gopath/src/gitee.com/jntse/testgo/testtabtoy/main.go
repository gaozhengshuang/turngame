package main

import "fmt"
import "testtabtoy/tblout"

func main() {
	fmt.Println("vim-go")
	LoadWrapper()
}


// 直接加载配置
func LoadConfig() {
	config := table.NewProtoMsgIndexTable()
	filepath := "./tblout/proto_id.json"
	err := config.Load(filepath)
	if err != nil {
		fmt.Printf("load [%s] fail err: %s\n", filepath, err)
		return
	}

	fmt.Printf("加载表格[%s]成功\n", filepath)
	for _ , v := range config.ProtoId {
		fmt.Printf("%#v\n",v)
	}

	for _ , v := range config.ProtoIdById {
		fmt.Printf("%#v\n",v)
	}
}


// wrapper加载
func LoadWrapper() {
	for _ , v := range MsgIndex.ProtoId {
		fmt.Printf("%#v\n",v)
	}
}


