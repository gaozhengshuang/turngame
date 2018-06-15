package mytest
import (
	"testing"
	"fmt"
	_"time"
	_"strings"
	_"strconv"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/golang/protobuf/proto"
	gopb "github.com/gogo/protobuf/proto"

)

// --------------------------------------------------------------------------
/// @brief go test -v -bench=. -benchmem
/// @brief -v "Verbose output"
/// @brief -bench=regp "Run (sub)benchmarks matching a regular expression"
/// @brief -benchmem "Print memory allocation statistics for benchmarks"
// --------------------------------------------------------------------------


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

func BenchmarkGolangProtobufMarshal(b *testing.B) {
	userinfo := &msg.Serialize {
		Entity : &msg.EntityBase{ Id:pb.Uint64(1000001), Name:pb.String("测试proto"), Face:pb.String(""), Account:pb.String("") },
		Base : &msg.UserBase{Money: pb.Uint32(0), Coupon:pb.Uint32(0), Yuanbao:pb.Uint32(0), Level:pb.Uint32(1)},
		Item : &msg.ItemBin{Items:make([]*msg.ItemData,0)},
	}

	for i := 0; i < b.N; i++ {
		PackGoProto(userinfo)
	}
}

func BenchmarkGolangProtobufUnMarshal(b *testing.B) {
	b.StopTimer()
	userinfo := &msg.Serialize {
		Entity : &msg.EntityBase{ Id:pb.Uint64(1000001), Name:pb.String("测试proto"), Face:pb.String(""), Account:pb.String("") },
		Base : &msg.UserBase{Money: pb.Uint32(0), Coupon:pb.Uint32(0), Yuanbao:pb.Uint32(0), Level:pb.Uint32(1)},
		Item : &msg.ItemBin{Items:make([]*msg.ItemData,0)},
	}
	buff,_ := PackGoProto(userinfo)
	b.StartTimer()

	userbin := &msg.Serialize{}
	for i := 0; i < b.N; i++ {
		UnPackGoProto(buff, userbin)
	}
}


// --------------------------------------------------------------------------
/// @brief gofast protobuf
// --------------------------------------------------------------------------
func PackGofastProto(protomsg gopb.Message) ([]byte, int) {
	buff, err := protomsg.Marshal()
	if err != nil {
		fmt.Sprintf("pb.Marshal fail err=%s", err)
		return nil, 0
	}
	return buff, len(buff)
}

func BenchmarkGofastProtobufMarshal(b *testing.B) {

	userinfo := &msg.Serialize {
		Entity : &msg.EntityBase{ Id:pb.Uint64(1000001), Name:pb.String("测试proto"), Face:pb.String(""), Account:pb.String("") },
		Base : &msg.UserBase{Money: pb.Uint32(0), Coupon:pb.Uint32(0), Yuanbao:pb.Uint32(0), Level:pb.Uint32(1)},
		Item : &msg.ItemBin{Items:make([]*msg.ItemData,0)},
	}

	for i := 0; i < b.N; i++ {
		PackGofastProto(userinfo)
	}
}

func BenchmarkGofastProtobufUnMarshal(b *testing.B) {
	for i := 0; i < b.N; i++ {
	}
}

// --------------------------------------------------------------------------
/// @brief gogofast protobuf
// --------------------------------------------------------------------------
func BenchmarkGoGofastProtobufUnMarshal(b *testing.B) {
	for i := 0; i < b.N; i++ {
	}
}

// --------------------------------------------------------------------------
/// @brief gogofaster protobuf
// --------------------------------------------------------------------------
func BenchmarkGoGofasterProtobuf(b *testing.B) {
	for i := 0; i < b.N; i++ {
	}
}

