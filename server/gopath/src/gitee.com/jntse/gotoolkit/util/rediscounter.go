package util
import "github.com/go-redis/redis"
import "time"
import "fmt"

type RedisCounter struct {
	set map[string]uint32
	rds *redis.Client
}

func NewRedisCounter() *RedisCounter {
	tc := &RedisCounter{}
	tc.set = make(map[string]uint32)
	tc.rds = nil
	return tc
}

func (this *RedisCounter) Init(rds *redis.Client) {
	this.set = make(map[string]uint32)
	this.rds = rds
}

func (this *RedisCounter) Set(key string, num uint32) {
	this.set[key] = num
}

func (this *RedisCounter) IncrBy(key string, num uint32) {
	this.set[key] += num
}

func (this *RedisCounter) IncrByDate(keypart string, id uint32, num uint32) {
	datetime := time.Now().Format("2006-01-02")
	key := fmt.Sprintf("%s_%d_%s", datetime, id, keypart)
	this.set[key] += num
}

func (this *RedisCounter) DecrBy(key string, num uint32) {
	this.set[key] -= num
}

// 全部存储
func (this *RedisCounter) Save() {
	for k , v := range this.set {
		this.rds.IncrBy(k, int64(v))
	}
	this.set = make(map[string]uint32)
}

// 分批存储
func (this *RedisCounter) BatchSave(num int32) {
	var count int32 = 0
	for k , v := range this.set {
		this.rds.IncrBy(k, int64(v))
		delete(this.set, k)
		if count++; count >= num {
			break
		}
	}
	//this.set = make(map[string]uint32)
}

