package main
import (
	pb"github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/log"
	_"gitee.com/jntse/gotoolkit/util"
)


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type RoomManager struct {
	rooms map[int64]*GameRoom
}

func (this *RoomManager) Init() {
	this.rooms = make(map[int64]*GameRoom)
}

func (this *RoomManager) Num() int {
	return len(this.rooms)
}

func (this *RoomManager) Add(room *GameRoom) {
	id := room.Id()
	this.rooms[id] = room
	log.Info("添加房间[%d]--当前房间数[%d]", id, len(this.rooms))
}

func (this* RoomManager) Del(id int64) {
	delete(this.rooms, id)
	log.Info("删除房间[%d]--当前房间数[%d]", id, len(this.rooms))
}

func (this* RoomManager) Find(id int64) *GameRoom {
	room, ok := this.rooms[id]
	if ok == false {
		return nil
	}
	return room
}

func (this *RoomManager) Tick(now int64) {
	for id, room := range this.rooms {
		if room.IsEnd(now) == true {
			room.OnEnd(now)
			this.Del(id)
			continue
		}
		room.Tick(now)
	}
}

func (this *RoomManager) BroadCast(msg pb.Message) {
	for _, v := range this.rooms {
		v.SendMsg(msg)
	}
}

func (this *RoomManager) OnGateClose(sid int) {
	for _, v := range this.rooms {
		if v.owner == nil { continue; }
		if v.owner.SidGate() == sid {
			v.GateLeave(sid)
		}
	}
}

func (this *RoomManager) Shutdown() {
	//for id, room := range this.rooms {
	//	room.OnEnd(util.CURTIMEMS())
	//}
	//this.rooms = make(map[int64]*GameRoom)
}

