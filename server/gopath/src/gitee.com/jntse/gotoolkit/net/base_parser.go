package network
import "fmt"

// parser类型
const (
	proto_parser 	= 1
	json_parser  	= 2
	gogo_parser  	= 3
	struct_parser 	= 4
	)

type IBaseMsgHandler interface {
	Init()
}

// MsgHandle proto消息handler处理回调
type MsgHandle func(session IBaseNetSession, msg interface{})
type GenerateMsgIndexHandle func(msg interface{}) int32


// ProtoMsgInfo proto消息注册信息 
type ProtoMsgInfo struct {
	name    string
	id      int32
	handler MsgHandle
}

type IBaseParser interface {
	Name() string
	Init(handler GenerateMsgIndexHandle)
	RegistProtoMsg(msg interface{}, handler MsgHandle)
	PreUnpack(rbuf *[]byte) (*[]byte, int32)
	UnPackMsg(rbuf *[]byte, task IBaseConnTask) bool
	PackMsg(msg interface{}) ([]byte, bool)
}


type JsonCmdParser struct {
	name string
	cmdid_set map[int32]*ProtoMsgInfo
	cmdname_set map[string]*ProtoMsgInfo
}


type GoGoCmdParser struct {
	name string
	cmdid_set map[int32]*ProtoMsgInfo
	cmdname_set map[string]*ProtoMsgInfo
}


type StructCmdParser struct {
	name string
	cmdid_set map[int32]*ProtoMsgInfo
	cmdname_set map[string]*ProtoMsgInfo
}


var g_ProtoParserSet 	map[string]IBaseParser
//var g_ProtoParserSet 	map[string]ProtoParser
//var g_JsonParserSet 	map[string]*JsonCmdParser
//var g_GoGoParserSet 	map[string]*GoGoCmdParser
//var g_StructParserSet	map[string]*StructCmdParser
func init() {
	g_ProtoParserSet 	= make(map[string]IBaseParser)
}

func getParser(name string) IBaseParser {
	parser, ok := g_ProtoParserSet[name]
	if ok == false {
		return nil
	}
	//fmt.Printf("g_ProtoParserSet=%v\n", g_ProtoParserSet)
	return parser
}

func addParser(parser IBaseParser)	{
	name := parser.Name()
	if getParser(name) != nil {
		panic(fmt.Sprintf("parser[%s] duplicate error", name))
	}

	g_ProtoParserSet[name] = parser
}

