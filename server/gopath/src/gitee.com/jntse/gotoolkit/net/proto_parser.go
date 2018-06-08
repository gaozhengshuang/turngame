// --------------------------------------------------------------------------
// Package network 
/// @brief 使用google/golang/protobuf做协议通讯
///
/// @param 
// --------------------------------------------------------------------------
package network

import "fmt"
import "reflect"
import "encoding/binary"

import "gitee.com/jntse/gotoolkit/log"
import "github.com/golang/protobuf/proto"

const (
	cmd_id_size     = 2;	// id  大小
	cmd_len_size    = 2;	// len 大小
	cmd_header_size = 4;	// 包头大小
)

type ProtoParser struct {
	name string
	cmdid_set map[int32]*ProtoMsgInfo
	cmdname_set map[string]*ProtoMsgInfo
	cmdid_generator GenerateMsgIndexHandle
}

// --------------------------------------------------------------------------
/// @brief 导出接口
///
/// @param 
// --------------------------------------------------------------------------
func NewProtoParser(name string, generator GenerateMsgIndexHandle) *ProtoParser {
	parser := &ProtoParser{name:name}
	parser.Init(generator)
	addParser(parser)
	return parser
}


// 初始化
func (this* ProtoParser) Init(generator GenerateMsgIndexHandle) {
	this.cmdid_set		 = make(map[int32]*ProtoMsgInfo)
	this.cmdname_set	 = make(map[string]*ProtoMsgInfo)
	this.cmdid_generator = generator
}

func (this* ProtoParser) Name() string {
	return this.name
}


// 注册发送proto协议
func (this* ProtoParser) RegistSendProto(msg interface{})	{
	msg_type := reflect.TypeOf(msg)
	name, id := msg_type.String(), this.cmdid_generator(msg)
	info := &ProtoMsgInfo{id:id, name:name, handler:nil}
	this.cmdid_set[id] = info
	this.cmdname_set[name] = info
	log.Info("regist send msg[%d:%+v]", id, msg_type)
}

// 注册接收proto协议
func (this* ProtoParser) RegistProtoMsg(msg interface{}, handler MsgHandle) {

	msg_type := reflect.TypeOf(msg)
	//protomsg := reflect.New(msg_type).Elem().Interface()
	//if protomsg != nil { log.Info("protomsg=%+v", protomsg) }

	name, id := msg_type.String(), this.cmdid_generator(msg)
	regist_type := proto.MessageType(name)
	if regist_type == nil {
		panic(fmt.Sprintf("RegistProtoMsg('%s') fail, not a 'protobuf msg' ?", name))
	}

	info := &ProtoMsgInfo{id:id, name:name, handler:handler}
	this.cmdid_set[id] = info
	this.cmdname_set[name] = info
	log.Info("regist recv msg[%d:%+v]", id, msg_type)
}

// 数据编码
func (this* ProtoParser) PackMsg(msg interface{}) ([]byte, bool) {
	return this.PackProtocol(msg.(proto.Message))
}


// 数据解码 -- 获得完整包返回true
func (this* ProtoParser) UnPackMsg(rbuf *[]byte, conn IBaseConnTask) bool {

	cmddata, cmdid:= this.PreUnpack(rbuf)
	if cmddata == nil {
		return false
	}

	msg_info , ok := this.cmdid_set[cmdid]
	if ok == false {
		log.Fatal("not regist msg, cmdid=%d", cmdid)
		return false
	}

	msg_type := proto.MessageType(msg_info.name)
	protomsg := reflect.New(msg_type.Elem()).Interface()
	//protomsg := reflect.New(msg_type).Elem().Interface()
	err := proto.Unmarshal((*cmddata)[cmd_header_size:], protomsg.(proto.Message))
	if err != nil {
		log.Fatal("msg Unmarshal fail, name=%s" , msg_info.name)
		conn.quit()	// 议错乱，非法链接? 外挂?
		return false
	}

	if msg_info.handler == nil {
		errinfo := fmt.Sprintf("msg:%s handler func is nil", msg_info.name)
		log.Fatal(errinfo)
		panic(errinfo)
		return false
	}

	// 成功解析协议信任该连接
	conn.verifyOk()

	//TODO: 1. 直接回调--每个客户端消息处理都在单独的协程中
	// 		2. 事件通知--发送到主逻辑协程处理
	//msg_info.handler(conn.session , protomsg)

	msgEvent := &MsgDispatchEvent{conn.getSession(), protomsg, msg_info.handler}
	//eventchan_cap := cap(conn.eventChan())
	//if eventchan_cap == len(conn.eventChan()) {
	//	log.Error("网络底层主事件队列满了 size[%d]", eventchan_cap)
	//}
	conn.eventChan() <- msgEvent 
	return true
}


// --------------------------------------------------------------------------
/// @brief 非导出接口
///
/// @param 
// --------------------------------------------------------------------------

// proto预解析
// --------------------------------------------------------------------------
/// @brief protobuf 预解包
/// @brief ProtoParser, GoGoParser, JsonParser, CmdParser 需要单独实现这个方法
// --------------------------------------------------------------------------
func (this* ProtoParser) PreUnpack(rbuf *[]byte) (*[]byte, int32)	{
	buflen := len(*rbuf)
	if buflen < cmd_header_size {
		return nil, 0
	}

	cmdheader := (*rbuf)[0:cmd_header_size]
	cmdlen := binary.LittleEndian.Uint16(cmdheader[0:cmd_len_size])
	cmdid  := binary.LittleEndian.Uint16(cmdheader[cmd_len_size:cmd_header_size])
	if int(cmdlen) > buflen {
		return nil, 0
	}

	cmddata := (*rbuf)[:cmdlen]
	*rbuf = (*rbuf)[cmdlen:]
	//log.Info("unpack msgcmd ok, buflen=%d cmdlen=%d cmdid=%d", buflen, cmdlen, cmdid)
	return &cmddata, int32(cmdid)
}

//TODO: PreUnpack2 优化数据包解析，不需要拷贝一份cmddata出来
func (this* ProtoParser) PreUnpack2(rbuf *[]byte) (cmdlen int32, cmdid int32)	{
	buflen := len(*rbuf)
	if buflen < cmd_header_size {
		return 0, 0
	}

	cmdlen = int32(binary.LittleEndian.Uint16((*rbuf)[0:cmd_len_size]))
	cmdid  = int32(binary.LittleEndian.Uint16((*rbuf)[cmd_len_size:cmd_header_size]))
	if cmdlen > int32(buflen) {
		return 0, 0
	}

	return cmdlen, cmdid
}

// --------------------------------------------------------------------------
/// @brief 打包具体实现 TODO: 如果发包速度很快，势必导致申请内存频繁GC也就频繁
/// @brief ProtoParser, GoGoParser, JsonParser, CmdParser 需要单独实现这个方法
// --------------------------------------------------------------------------
func (this* ProtoParser) PackProtocol(msg proto.Message) ([]byte, bool) {
	cmdid := this.ParseMessageCmd(msg)
	if cmdid == 0 {
		panic(fmt.Sprintf("can't find msgcmd msg=%#v", msg))
		return nil, false
	}

	buff, err := proto.Marshal(msg)
	if err != nil {
		//log.Fatal("cmd=%d Marshal fail err=%s", cmdid, err)
		panic(fmt.Sprintf("cmd=%d proto.Marshal fail err=%s", cmdid, err))
		return nil, false
	}

	cmdlen := len(buff) + cmd_header_size
	header := make([]byte, cmd_header_size)
	binary.LittleEndian.PutUint16(header[0:], uint16(cmdlen))
	binary.LittleEndian.PutUint16(header[2:], uint16(cmdid))
	data := append(header, buff...)
	//log.Printf("unpackmsg ok, len=%d data=%v", len(data), data)
	return data, true
}

func (this* ProtoParser) ParseMessageCmd(msg proto.Message) int32 {
	name := proto.MessageName(msg)
	info, ok := this.cmdname_set[name]
	if ok == false {
		log.Error("not regist msg=%s",name)
		return 0
	}
	return info.id
}


