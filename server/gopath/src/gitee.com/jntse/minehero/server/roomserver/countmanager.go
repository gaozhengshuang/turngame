package main
/*
import "fmt"
import "time"
import "gitee.com/jntse/gotoolkit/util"
import "gitee.com/jntse/gotoolkit/log"

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type CountManager struct {
	adds			map[uint32]uint32
	removes			map[uint32]uint32
	roomoutput		map[uint32]uint32		// 房间产出
	timetick		uint32
}

func (this *CountManager) Init(){
	this.adds = make(map[uint32]uint32)
	this.removes = make(map[uint32]uint32)
	this.roomoutput = make(map[uint32]uint32)
	this.timetick = uint32(util.RandBetween(int32(10), int32(100)));
}

func (this *CountManager) AddGet(id uint32, num uint32) {
	this.adds[id] += num
}

func (this *CountManager) AddRemove(id uint32, num uint32) {
	this.removes[id] += num
}

func (this *CountManager) AddRoomConsume(roomid uint32, num uint32) {
	this.roomoutput[roomid] += num
}

func (this *CountManager) WriteRedis() {
	log.Info("开始统计消耗")
	datetime := time.Now().Format("2006-01-02")
	for add_k, add_v := range this.adds{
		key := fmt.Sprintf("%s_%d_item_add" ,datetime, uint32(add_k))
		Redis().IncrBy(key, int64(add_v))
	}

	for rem_k, rem_v := range this.removes{
		key := fmt.Sprintf("%s_%d_item_remove" ,datetime, uint32(rem_k))
		Redis().IncrBy(key, int64(rem_v))
	}

	for rem_k, rem_v := range this.roomoutput {
		key := fmt.Sprintf("%s_%d_room_output" ,datetime, uint32(rem_k))
		Redis().IncrBy(key, int64(rem_v))
	}

	this.adds = make(map[uint32]uint32)
	this.removes = make(map[uint32]uint32)
	this.roomoutput = make(map[uint32]uint32)
}

func (this *CountManager) Timer() {
	this.timetick++
	if this.timetick >= uint32(600){
		this.timetick = 0
		this.WriteRedis()
	}
}
*/
