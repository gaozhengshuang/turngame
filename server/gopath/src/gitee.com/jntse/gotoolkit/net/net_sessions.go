package network
import (
	"sync"
	"gitee.com/jntse/gotoolkit/log"
	_"fmt"
	"reflect"
	"sync/atomic"
)

// --------------------------------------------------------------------------
/// @brief generate TcpConnTask Id
// --------------------------------------------------------------------------
//var g_ConnTaskId int32 = 0
//func genConnTaskId() int32 {
//	return atomic.AddInt32(&g_ConnTaskId, 1)
//}

type NetSessionPool struct {
	spools map[int]IBaseNetSession
	slocker *sync.Mutex		// *sync.RWMutex
	taskid int32
	//recycles map[int]int
	//relocker *sync.Mutex
}


func NewNetSessionPool() *NetSessionPool {
	pool := &NetSessionPool{ spools:make(map[int]IBaseNetSession), slocker:&sync.Mutex{}, taskid:0 }
	return pool
}

func (this *NetSessionPool) Init() {
	this.spools = make(map[int]IBaseNetSession)
	this.slocker = &sync.Mutex{}
	this.taskid = 0
}

func (this *NetSessionPool) Size() int32 {
	return int32(len(this.spools))
}

func (this *NetSessionPool) GenerateTaskId() int32 {
	newid := atomic.AddInt32(&this.taskid, 1)
	return newid
}

func (this *NetSessionPool) AddSession(s IBaseNetSession) bool {
	if s == nil || reflect.ValueOf(s).IsNil() { return false }
	this.slocker.Lock()
	if _, ok := this.spools[s.Id()]; ok == true {
		this.slocker.Unlock()
		return false
	}
	this.spools[s.Id()] = s
	this.slocker.Unlock()
	return true
}

func (this *NetSessionPool) DelSession(s IBaseNetSession) {
	if s == nil || reflect.ValueOf(s).IsNil() { return }
	this.slocker.Lock()
	delete(this.spools, s.Id())
	this.slocker.Unlock()
}


func (this *NetSessionPool) FindSession(sid int) IBaseNetSession {
	this.slocker.Lock()
	s, ok := this.spools[sid]
	this.slocker.Unlock()
	if ok == true {	return s }
	return nil
}


func (this *NetSessionPool) SendMsg(sid int, msg interface{}) bool {
	this.slocker.Lock()
	s, ok := this.spools[sid]
	if ok == false {
		this.slocker.Unlock()
		return false
	}
	this.slocker.Unlock()
	return s.SendCmd(msg)
}

// 新会话建立
func (this *NetSessionPool) onSessionEstablished(conn IBaseConnTask) {
	this.AddSession(conn.getSession())
	conn.On_Connect()
	log.Trace("当前会话数:%d", this.Size())
}

// 会话断开
func (this *NetSessionPool) onSessionClose(conn IBaseConnTask) {
	this.DelSession(conn.getSession())
	conn.On_Close()
	log.Trace("当前会话数:%d", this.Size())
}


