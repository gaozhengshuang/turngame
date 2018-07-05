package main
import (
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
)

// --------------------------------------------------------------------------
/// @brief 玩家管理器
// --------------------------------------------------------------------------
type UserManager struct {
	ids	map[uint64]*RoomUser
}

func (this *UserManager) Init() {
	this.ids = make(map[uint64]*RoomUser)
}

func (this *UserManager) Amount() int {
	return len(this.ids)
}

func (this *UserManager) AddUser(user *RoomUser) {
	this.ids[user.Id()] = user
}

func (this *UserManager) FindUser(id uint64) *RoomUser {
	user, _ := this.ids[id]
	return user
}

func (this *UserManager) DelUser(user *RoomUser) {
	delete(this.ids, user.Id())
}

func (this *UserManager) IsRegisted(id uint64) bool {
	_, ok := this.ids[id]
	return ok
}

func (this *UserManager) Tick(now int64) {
}

func (this *UserManager) CreateRoomUser(roomid int64, bin *msg.Serialize, gate network.IBaseNetSession, roomkind int32) *RoomUser {
	user := NewRoomUser(roomid, bin, gate, roomkind)
	if _, find := this.ids[user.Id()]; find ==true { 
		log.Error("创建RoomUser失败，服务器已经存在这个User了")
		return nil
	}
	this.ids[user.Id()] = user
	return user
}
