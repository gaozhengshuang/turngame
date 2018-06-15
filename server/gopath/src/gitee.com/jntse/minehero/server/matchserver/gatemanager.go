package main
import "fmt"
import _"sort"
import "gitee.com/jntse/gotoolkit/net"
import "gitee.com/jntse/gotoolkit/log"
import "gitee.com/jntse/minehero/pbmsg"
import pb "github.com/gogo/protobuf/proto"

// --------------------------------------------------------------------------
/// @brief 按人数排序GateAgent
// --------------------------------------------------------------------------
type SliceGate []*GateAgent
func (s SliceGate) Len() int {
	return len(s)
}
func (s SliceGate) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}
func (s SliceGate) Less(i, j int) bool {
	return s[i].usernum < s[j].usernum
}

// --------------------------------------------------------------------------
/// @brief GateServer
// --------------------------------------------------------------------------
type GateAgent struct {
	session network.IBaseNetSession
	ip 		string
	port 	int
	usernum	int
	host	string
	name	string
}

func NewGateAgent(s network.IBaseNetSession, name, ip string ,port int) *GateAgent {
	gate := &GateAgent{session:s, name:name, ip:ip, port:port, usernum:0}
	gate.host = fmt.Sprintf("%s:%d", ip, port)
	return gate
}

func (this *GateAgent) Id() int {
	return this.session.Id()
}

func (this *GateAgent) Host() string {
	return this.host
}

func (this *GateAgent) Name() string {
	return this.name
}

func (this *GateAgent) HostKey() string {
	return this.Host()
}

func (this *GateAgent) TickNum(n int) {
	this.usernum += n
	if this.usernum <= 0 { this.usernum = 0 }
}

func (this *GateAgent) SendMsg(msg pb.Message) bool {
	return this.session.SendCmd(msg)
}

func (this *GateAgent) OnClose() {
	//UserMgr().GateClose(this.Id())
	GateSvrMgr().DelGate(this.Id())
	log.Info("网关离线 id=%d [%v] 当前总数:%d", this.Id(), this.Host(), GateSvrMgr().Num())
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type GateManager struct {
	gates map[int]*GateAgent
}

func (this *GateManager) Init() {
	this.gates = make(map[int]*GateAgent)
}

func (this *GateManager) Num() int {
	return len(this.gates)
}

func (this *GateManager) AddGate(agent *GateAgent) {
	id := agent.Id()
	this.gates[id] = agent
}

func (this* GateManager) DelGate(id int) {
	delete(this.gates, id)
}

func (this* GateManager) FindGate(id int) *GateAgent {
	agent, ok := this.gates[id]
	if ok == false {
		return nil
	}
	return agent
}

func (this *GateManager) IsRegisted(name, ip string, port int) bool {
	host := fmt.Sprintf("%s:%d", ip, port)
	for _,v := range this.gates {
		if v.Host() == host || v.Name() == name {
			return true
		}
	}
	return false
}

func (this *GateManager) OnClose(sid int) {
	agent := this.FindGate(sid)
	if agent == nil { return }
	agent.OnClose()
}

func (this *GateManager) AddNewSession(session network.IBaseNetSession, name, ip string ,port int) {
	agent := NewGateAgent(session, name, ip, port)
	this.AddGate(agent)
	log.Info("注册网关服 id=%d [%s][%s:%d] 当前总数:%d", agent.Id(), agent.Name(), agent.ip, agent.port, this.Num())

	// 将Gate信息通知所有Room
	RoomSvrMgr().SendGateToRoom(agent)
}

func (this *GateManager) SendGateToRoom(room *RoomAgent) {
	send := &msg.MS2RS_GateInfo{Gates:make([]*msg.GateSimpleInfo, 0)}
	for _, gate := range this.gates {
		room.AddGate(gate)
		gateinfo := &msg.GateSimpleInfo{Name:pb.String(gate.Name()), Host:&msg.IpHost{Ip:pb.String(gate.ip), Port:pb.Int(gate.port)}}
		send.Gates = append(send.Gates, gateinfo)
	}
	room.SendMsg(send)
}

func (this *GateManager) Broadcast(msg pb.Message) {
	for _, gate := range this.gates {
		gate.SendMsg(msg)
	}
}

