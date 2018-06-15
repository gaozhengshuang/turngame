package main
import (
	"fmt"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
	pb "github.com/gogo/protobuf/proto"
)

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type SliceGate []*GateAgent
func (s SliceGate) Len() int {
	return len(s)
}
func (s SliceGate) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}

// --------------------------------------------------------------------------
/// @brief GateServer
// --------------------------------------------------------------------------
type GateAgent struct {
	session	network.IBaseNetSession
	ip 		string
	port 	int
	host	string
	name	string
}

func NewGateAgent(s network.IBaseNetSession, name, ip string ,port int) *GateAgent {
	gate := &GateAgent{session:s, name:name, ip:ip, port:port}
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

func (this *GateAgent) SendMsg(msg pb.Message) bool {
	return this.session.SendCmd(msg)
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

func (this *GateManager) IsRegisted(ip string, port int) bool {
	host := fmt.Sprintf("%s:%d", ip, port)
	for _,v := range this.gates {
		if v.Host() == host {
			return true
		}
	}
	return false
}

func (this *GateManager) OnClose(session network.IBaseNetSession) {
	//RoomSvr().Net().DelTcpConnector(session.Name())
	agent := this.FindGate(session.Id())
	if agent == nil { return }
	this.DelGate(session.Id())
	log.Info("网关离线 id=%d [%v] 当前总数:%d", session.Id(), agent.Host(), this.Num())
}

func (this *GateManager) AddNew(session network.IBaseNetSession, name, ip string ,port int) {
	agent := NewGateAgent(session, name, ip, port)
	this.AddGate(agent)
	log.Info("注册网关 id=%d [%s:%d] 当前总数:%d", agent.Id(), agent.ip, agent.port, this.Num())
}

