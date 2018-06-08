/// @file msgindex.go
/// @brief 获取消息唯一id
/// @author jian xie, xiejian1998@foxmail.com
/// @version 1.0
/// @date 2017-09-27
package tbl
import "fmt"
import "reflect"

func ProtoMsgIndexGenerator(msg interface{}) int32 {
	name := reflect.TypeOf(msg).String()
	info := ProtoMsgIndex.ProtoIdByName[name]
	if info == nil { panic(fmt.Sprintf("proto msg [%s] not found index config", name)) }
	return info.Id
}


func JsonMsgIndexGenerator(msg interface{}) int32 {
	return 0
}


func StructMsgIndexGenerator(msg interface{}) int32 {
	return 0
}


