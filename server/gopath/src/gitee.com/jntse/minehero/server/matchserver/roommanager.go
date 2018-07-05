package main
import (
	"sort"
	"fmt"
	"time"
	"math"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/minehero/pbmsg"
	pb"github.com/gogo/protobuf/proto"
	"github.com/go-redis/redis"
)

// --------------------------------------------------------------------------
/// @brief 自定义排序，按人数排序RoomAgent
// --------------------------------------------------------------------------
type SliceRoom []*RoomAgent
func (s SliceRoom) Len() int {
	return len(s)
}
func (s SliceRoom) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}
func (s SliceRoom) Less(i, j int) bool {
	return s[i].RoomSize() < s[j].RoomSize()
}

// --------------------------------------------------------------------------
/// @brief RoomServer
// --------------------------------------------------------------------------
type RoomAgent struct {
	session network.IBaseNetSession
	name	string
	gates	map[string]*GateAgent
	roomsize int64			// 房间数，FindLowLoadRoom 时计算
	ticker10ms  *util.GameTicker
	asynev  eventque.AsynEventQueue
}

func NewRoomAgent(s network.IBaseNetSession, name string) *RoomAgent {
	agent := &RoomAgent{session:s, name:name} 
	agent.gates = make(map[string]*GateAgent)
	return agent
}

func (this *RoomAgent) Init() {
	this.ticker10ms = util.NewGameTicker(10 * time.Millisecond, this.Handler10msTick)
	this.ticker10ms.Start()
	this.asynev.Start(int64(this.Id()), 10000)
}

func (this *RoomAgent) Tick(now int64) {
	this.ticker10ms.Run(now)
}

func (this *RoomAgent) Handler10msTick(now int64) {
	this.asynev.Dispatch()
}

func (this *RoomAgent) OnEnd() {
	this.asynev.Shutdown()
}

func (this *RoomAgent) AsynEventInsert(event eventque.IEvent) {
	this.asynev.Push(event)
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

func (this *RoomAgent) Addr() string {
	return this.session.LocalIp();
}

func (this *RoomAgent) AddGate(gate *GateAgent) {
	this.gates[gate.HostKey()] = gate
}

func (this *RoomAgent) RoomSize() int64 {
	return this.roomsize
}

func (this *RoomAgent) DoCalcRoomSize(argu []interface{}) []interface{} {
	key := fmt.Sprintf("RS_%s_RoomSize", this.Name())
	size, err := Redis().SCard(key).Result()
	if err != nil {
		log.Error("获取%s房间数失败 err: %s", key, err)
		this.roomsize = math.MaxInt32
	}
	this.roomsize = size
	return nil
}

func (this *RoomAgent) AsynCalcRoomAmount() {
	if this.asynev.IsFull() { return }
	arglist := []interface{}{}
	event := eventque.NewCommonEvent(arglist, this.DoCalcRoomSize, nil)
	this.AsynEventInsert(event)
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type RoomSvrManager struct {
	agents map[int]*RoomAgent
	tm_lastcalculate int64
}

func (this *RoomSvrManager) Init() {
	this.agents = make(map[int]*RoomAgent)
}

func (this *RoomSvrManager) Num() int {
	return len(this.agents)
}

func (this *RoomSvrManager) Tick(now int64) {
	for _, v := range this.agents {
		v.Tick(now)
	}
}

func (this *RoomSvrManager) AddRoomAgent(agent *RoomAgent) {
	id := agent.Id()
	this.agents[id] = agent
}

func (this* RoomSvrManager) DelRoomAgent(id int) {
	delete(this.agents, id)
}

func (this* RoomSvrManager) FindRoomAgent(id int) *RoomAgent {
	agent, ok := this.agents[id]
	if ok == false {
		return nil
	}
	return agent
}

func (this *RoomSvrManager) IsRegisted(name string) bool {
	for _,v := range this.agents {
		if v.Name() == name {
			return true
		}
	}
	return false
}

// 获取一个低负荷Room
func (this *RoomSvrManager) FindLowLoadRoom() *RoomAgent {
	sortRooms := make(SliceRoom, 0)
	now := util.CURTIMEMS()
	for _, v := range this.agents {
		if now >= this.tm_lastcalculate + 1 {	// 间隔计算
			v.AsynCalcRoomAmount()       // 多Gate下，异步计数Gate在线人数效率提升明显
		}
		//v.DoCalcRoomSize(nil)
		sortRooms = append(sortRooms, v)
	}

	if len(sortRooms) == 0 {
		return nil
	}

	this.tm_lastcalculate = now
	sort.Sort(sortRooms)
	return sortRooms[0]
}

func (this *RoomSvrManager) BroadCast(msg pb.Message) {
	for _, v := range this.agents {
		v.SendMsg(msg)
	}
}

func (this *RoomSvrManager) OnClose(sid int) {
	agent := this.FindRoomAgent(sid)
	if agent == nil {return }
	this.DelRoomAgent(sid)
	log.Info("房间服离线 id=%d [%s] 当前总数:%d", sid, agent.Name(), this.Num())
}

func (this *RoomSvrManager) AddNewSession(session network.IBaseNetSession, name string) {
	agent := NewRoomAgent(session, name)
	agent.Init()
	this.AddRoomAgent(agent)
	log.Info("注册房间服 id=%d [%s][%s] 当前总数:%d", agent.Id(), agent.name, agent.Addr(), RoomSvrMgr().Num())

	//将已经连接的Gate通知这个Room
	GateSvrMgr().SendGateToRoom(agent)
}

func (this *RoomSvrManager) SendGateToRoom(gate *GateAgent) {
	for _, v := range this.agents {
		v.AddGate(gate)
	}
	send := &msg.MS2RS_GateInfo{Gates:make([]*msg.GateSimpleInfo, 0)}
	gateinfo := &msg.GateSimpleInfo{Name:pb.String(gate.Name()), Host:&msg.IpHost{Ip:pb.String(gate.ip), Port:pb.Int(gate.port)}}
	send.Gates = append(send.Gates, gateinfo)

	this.BroadCast(send)
}

func GenerateRoomId() (id int64, errcode string ) {
	key := "uuid_room"
	id, err := Redis().Incr(key).Result()
	if err != nil {
		log.Error("生成roomid redis报错, err: %s", err)
		return 0, "redis不可用"
	}
	return id, ""
}

func (this *RoomSvrManager) CreateGameRoom(kind int32, now int64, sid_gate int, userid uint64) (string) {

	tm1 := util.CURTIMEUS()
	agent := this.FindLowLoadRoom()
	if agent == nil {
		return "找不到合适的房间服务器"
	}

	roomid, errcode := GenerateRoomId()
	if errcode != "" {
		return errcode
	}

	quotakey := fmt.Sprintf("global_rewardpool_%d_quota", kind)
	left_quota, err_quota := Redis().Get(quotakey).Int64()
	if err_quota != nil && err_quota != redis.Nil {
		errcode = fmt.Sprintf("向RS请求创建房间[%d] 获取大奖配额失败 err:%s", roomid, err_quota)
		return errcode
	}

	if left_quota > 0  {
		val, err := Redis().Decr(quotakey).Result()
		if err != nil {
			errcode = fmt.Sprintf("向RS请求创建房间[%d] 设置大奖配额失败 err:%s", roomid, err)
			return errcode
		}
		log.Info("房间[%d] 玩家[%d] 模式[%d] 本次房间获得大奖配额，剩余配额[%d]", roomid, userid, kind, val)
	}
	rmsg := &msg.MS2RS_CreateRoom { 
		Roomid : pb.Int64(roomid), 
		Gamekind: pb.Int32(kind), 
		Sidgate: pb.Int(sid_gate), 
		Userid: pb.Uint64(userid),
		Quotaflag: pb.Bool(left_quota > 0),
	}
	agent.SendMsg(rmsg)
	tm2 := util.CURTIMEUS()
	log.Info("向RS请求创建房间[%d]，玩家[%d] 模式[%d] 创建耗时[%dus] ts[%d]", roomid, userid, kind, tm2-tm1, util.CURTIMEMS())
	return ""
}

