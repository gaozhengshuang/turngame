package main
import (
	"fmt"
	"time"
	"math/rand"
	"reflect"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
	//pb "github.com/golang/protobuf/proto"
	gopb "github.com/gogo/protobuf/proto"
)

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
var g_KeyBordInput util.KeyBordInput
var g_Quit bool = false
var g_TestFlag string

func ProcessPanic(data interface{}) {
	log.Info("ProcessPanic")
}

/*
// --------------------------------------------------------------------------
/// @brief golang protobuf
// --------------------------------------------------------------------------
func PackGoProto(msg pb.Message) ([]byte, int) {
	buff, err := pb.Marshal(msg)
	if err != nil {
		fmt.Sprintf("pb.Marshal fail err=%s", err)
		return nil, 0
	}
	return buff, len(buff)
}

func UnPackGoProto(buff []byte , protomsg pb.Message) {
	err := pb.Unmarshal(buff, protomsg)
	if err != nil {
		fmt.Println("msg Unmarshal fail")
	}
}

func BenchmarkGolangProtobufMarshal() {
	userinfo := &msg.Serialize {
		Entity : &msg.EntityBase{ Id:pb.Uint64(1000001), Name:pb.String("测试proto"), Face:pb.String(""), Account:pb.String("") },
		Base : &msg.UserBase{Money: pb.Uint32(0), Coupon:pb.Uint32(0), Yuanbao:pb.Uint32(0), Level:pb.Uint32(1)},
		Item : &msg.ItemBin{Items:make([]*msg.ItemData,0)},
	}

	PackGoProto(userinfo)
}

func BenchmarkGolangProtobufUnMarshal() {
	userinfo := &msg.Serialize {
		Entity : &msg.EntityBase{ Id:pb.Uint64(1000001), Name:pb.String("测试proto"), Face:pb.String(""), Account:pb.String("") },
		Base : &msg.UserBase{Money: pb.Uint32(0), Coupon:pb.Uint32(0), Yuanbao:pb.Uint32(0), Level:pb.Uint32(1)},
		Item : &msg.ItemBin{Items:make([]*msg.ItemData,0)},
	}
	buff, _ := PackGoProto(userinfo)

	userbin := &msg.Serialize{}
	UnPackGoProto(buff, userbin)
}
*/

// --------------------------------------------------------------------------
/// @brief gofast protobuf
// --------------------------------------------------------------------------
func PackGofastProto(protomsg gopb.Message) ([]byte, int) {
	buff, err := protomsg.Marshal()
	if err != nil {
		fmt.Sprintf("gopb.Marshal fail err=%s", err)
		return nil, 0
	}
	return buff, len(buff)
}

func BenchmarkGofastProtobufMarshal() {

	userinfo := &msg.Serialize {
		Entity : &msg.EntityBase{ Id:gopb.Uint64(1000001), Name:gopb.String("测试proto"), Face:gopb.String(""), Account:gopb.String("") },
		Base : &msg.UserBase{Money: gopb.Uint32(0), Coupon:gopb.Uint32(0), Yuanbao:gopb.Uint32(0), Level:gopb.Uint32(1)},
		Item : &msg.ItemBin{Items:make([]*msg.ItemData,0)},
	}

	PackGofastProto(userinfo)
}


func main() {
	defer util.RecoverPanic(ProcessPanic, nil)

	// 初始日志
	log.Init("","","trace")
	log.Info("初始日志完成")

	BenchmarkGofastProtobufMarshal()
	return

	// 初始化键盘输入
	g_KeyBordInput.Init()
	g_KeyBordInput.Start()
	log.Info("初始键盘输入完成")


	//
	var reflectvar interface{} = "reflect test"
	fmt.Printf("reflectvar=%v kind=%s\n", reflectvar, reflect.TypeOf(reflectvar).String())


	//
	rand.Seed(time.Now().Unix())
	s1 := make([]int32,3)
	for i:= 0; i < 10; i++ {
		rd := util.RandBetween(-10, 10)
		fmt.Println(rd)

		rd = util.SelectByWeightSlice([]int32{1,8,1})
		s1[rd] = s1[rd] + 1
	}
	fmt.Println(s1)


	//
	now := util.CURTIME()
	fmt.Println(util.GetDayStart())
	fmt.Println(now)
	fmt.Println(util.FloorIntClock(now))
	fmt.Println(util.CeilIntClock(now))


	//
	for g_Quit == false {
		time.Sleep(time.Millisecond * 10)
		select {
		case cmd,_:= <-g_KeyBordInput.C:
			DoInputCmd(cmd)
		default:
		}
	}
}

func DoInputCmd(cmd string) {
	switch cmd {
	case "quit","exit":
		g_Quit = true
		break
	default:
		g_TestFlag = cmd
		break
	}
}

