package utredis
import (
	"github.com/go-redis/redis"
	pb "github.com/golang/protobuf/proto"
)


//type ISerializableData interface {
//	Marshal()
//	Unmarshal()
//}


// 设置 protobuff value
func SetProtoBin(rds *redis.Client, key string, data pb.Message) error {

	// proto 序列化
	buf, err := pb.Marshal(data)
	if err != nil { return err }

	// Set二进制
	err = rds.Set(key, buf, 0).Err()
	return err
}

func GetProtoBin(rds *redis.Client, key string, data pb.Message) error {

	// Get二进制
	str, err := rds.Get(key).Result()
	if err != nil { return err }


	// 反序列化
	rbuf :=[]byte(str)
	err = pb.Unmarshal(rbuf, data)
	return err
}

