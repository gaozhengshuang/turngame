package main
import _"fmt"
import "gitee.com/jntse/gotoolkit/net"
import "gitee.com/jntse/gotoolkit/log"
import _"gitee.com/jntse/minehero/pbmsg"
import pb"github.com/gogo/protobuf/proto"


// --------------------------------------------------------------------------
/// @brief RoomServer
// --------------------------------------------------------------------------
type RoomAgent struct {
	session network.IBaseNetSession
	name	string
}

func NewRoomAgent(session network.IBaseNetSession, name string) *RoomAgent {
	gate := &RoomAgent{session, name}
	return gate
}

func (this *RoomAgent) Id() int {
	return this.session.Id()
}

func (this *RoomAgent) SendMsg(msg pb.Message) bool {
	return this.session.SendCmd(msg)
}

func (this *RoomAgent) Name() string {
	return this.name
}

func (this *RoomAgent) Tick(now int64) {
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type RoomSvrManager struct {
	rooms map[int]*RoomAgent		// 房间服务器
}

func (this *RoomSvrManager) Init() {
	this.rooms = make(map[int]*RoomAgent)
}

func (this *RoomSvrManager) Num() int {
	return len(this.rooms)
}

func (this *RoomSvrManager) AddRoom(agent *RoomAgent) {
	id := agent.Id()
	this.rooms[id] = agent
}

func (this* RoomSvrManager) DelRoom(id int) {
	delete(this.rooms, id)
}

func (this* RoomSvrManager) FindRoom(id int) *RoomAgent {
	agent, _ := this.rooms[id]
	return agent
}

func (this *RoomSvrManager) FindByName(name string) *RoomAgent {
	for _,v := range this.rooms {
		if v.Name() == name {
			return v
		}
	}
	return nil
}

func (this *RoomSvrManager) IsRegisted(name string) bool {
	for _,v := range this.rooms {
		if v.Name() == name {
			return true
		}
	}
	return false
}

func (this *RoomSvrManager) Tick(now int64) {
	for _, v := range this.rooms {
		v.Tick(now)
	}
}

func (this *RoomSvrManager) BroadCast(msg pb.Message) {
	for _, v := range this.rooms {
		v.SendMsg(msg)
	}
}

func (this *RoomSvrManager) SendMsg(sid int, msg pb.Message) {
	if agent := this.FindRoom(sid); agent != nil {
		agent.SendMsg(msg)
	}
}

func (this *RoomSvrManager) OnClose(sid int) {
	agent := this.FindRoom(sid)
	if agent == nil {return }
	this.DelRoom(sid)
	UserMgr().OnRoomServerClose(sid)
	log.Info("房间服离线 id=%d [%s] 当前总数:%d", sid, agent.Name(), this.Num())
}

func (this *RoomSvrManager) AddNew(session network.IBaseNetSession, name string) {
	agent := NewRoomAgent(session, name)
	this.AddRoom(agent)
	log.Info("注册房间服 id=%d [%s] 当前总数:%d", agent.Id(), agent.Name(), RoomSvrMgr().Num())
}

