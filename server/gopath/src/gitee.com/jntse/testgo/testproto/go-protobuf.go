package main
import (
	"fmt"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/golang/protobuf/proto"
)

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


