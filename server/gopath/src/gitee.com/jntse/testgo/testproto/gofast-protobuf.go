package main
import (
	"fmt"
	"gitee.com/jntse/minehero/pbmsg"
	gopb "github.com/gogo/protobuf/proto"
)


// --------------------------------------------------------------------------
/// @brief gofast protobuf
// --------------------------------------------------------------------------
func PackGofastProto(protomsg gopb.Message) ([]byte, int) {
	buff, err := gopb.Marshal(protomsg)
	if err != nil {
		fmt.Sprintf("gopb.Marshal fail err=%s", err)
		return nil, 0
	}
	return buff, len(buff)
}

func UnPackGofastProto(buff []byte , protomsg gopb.Message) {
	err := gopb.Unmarshal(buff, protomsg)
	if err != nil {
		fmt.Println("gopb.msg Unmarshal fail")
	}
}

func BenchmarkGofastProtobufMarshal() {
	userinfo := &msg.Serialize {
		Entity : &msg.EntityBase{ Id:gopb.Uint64(1000001), Name:gopb.String("测试proto"), Face:gopb.String(""), Account:gopb.String("") },
		Base : &msg.UserBase{Money: gopb.Uint32(0), Coupon:gopb.Uint32(0), Yuanbao:gopb.Uint32(0), Level:gopb.Uint32(1)},
		Item : &msg.ItemBin{Items:make([]*msg.ItemData,0)},
	}

	PackGofastProto(userinfo)
}

func BenchmarkGofastProtobufUnMarshal() {
	userinfo := &msg.Serialize {
		Entity : &msg.EntityBase{ Id:gopb.Uint64(1000001), Name:gopb.String("测试proto"), Face:gopb.String(""), Account:gopb.String("") },
		Base : &msg.UserBase{Money: gopb.Uint32(0), Coupon:gopb.Uint32(0), Yuanbao:gopb.Uint32(0), Level:gopb.Uint32(1)},
		Item : &msg.ItemBin{Items:make([]*msg.ItemData,0)},
	}
	buff, _ := PackGofastProto(userinfo)

	userbin := &msg.Serialize{}
	UnPackGofastProto(buff, userbin)
}

