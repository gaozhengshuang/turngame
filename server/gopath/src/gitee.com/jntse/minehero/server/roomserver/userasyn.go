package main
import (
	"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
)
// --------------------------------------------------------------------------
/// @brief 玩家异步事件
// --------------------------------------------------------------------------


// 获取充值页面
type RechargeCheckEventHandle func() bool
type RechargeCheckEventFeedback func()
type RechargeCheckEvent struct {
	user *RoomUser
	handler RechargeCheckEventHandle
	feedback RechargeCheckEventFeedback
}

func NewRechargeCheckEvent(user *RoomUser, handler RechargeCheckEventHandle, feedback RechargeCheckEventFeedback) * RechargeCheckEvent{
	return &RechargeCheckEvent{user, handler, feedback}
}

func (this *RechargeCheckEvent) Process(ch_fback chan eventque.IEvent) {
	if this.handler() == true {
		ch_fback <- this
	}
}

func (this *RechargeCheckEvent) Feedback() {
	this.feedback()
}


// 扣除平台金币
type RemovePlatformCoinsEventHandle func(amount int32, desc string) bool
type RemovePlatformCoinsFeedback func(removeok bool, amount int32)
type RemovePlatformCoinsEvent struct {
	room *GameRoom
	amount int32
	desc string
	handler RemovePlatformCoinsEventHandle

	removeok bool
	feedback RemovePlatformCoinsFeedback
}

func NewRemovePlatformCoinsEvent(room *GameRoom, amount int32, desc string, handler RemovePlatformCoinsEventHandle, 
																feedback RemovePlatformCoinsFeedback) *RemovePlatformCoinsEvent {
	return &RemovePlatformCoinsEvent{room, amount, desc, handler, false, feedback}
}

func (this *RemovePlatformCoinsEvent) Process(ch_fback chan eventque.IEvent) {
	tm1 := util.CURTIMEMS()
	this.removeok = this.handler(this.amount, this.desc)
	log.Trace("[异步事件] 房间[%d] 玩家[%d] QueryPlatformCoinsEvent 本次消耗 %dms", this.room.Id(), this.room.ownerid, util.CURTIMEMS() - tm1)
	ch_fback <- this
}

func (this *RemovePlatformCoinsEvent) Feedback() {
	this.feedback(this.removeok, this.amount)
}


// 同步平台金币
type QueryPlatformCoinsEventHandle func()
type QueryPlatformCoinsFeedback func()
type QueryPlatformCoinsEvent struct {
	handler QueryPlatformCoinsEventHandle
	feedback QueryPlatformCoinsFeedback
	user *RoomUser
	coins int32
	diamonds int32
}

func NewQueryPlatformCoinsEvent(user *RoomUser, handler QueryPlatformCoinsEventHandle) *QueryPlatformCoinsEvent {
	return &QueryPlatformCoinsEvent{handler:handler, feedback:nil, user:user}
}

func (this *QueryPlatformCoinsEvent) Process(ch_fback chan eventque.IEvent) {
	tm1 := util.CURTIMEMS()
	this.handler()
	log.Trace("[异步事件] 房间[%d] 玩家[%d] QueryPlatformCoinsEvent 本次消耗 %dms", this.user.roomid, this.user.Id(), util.CURTIMEMS() - tm1)
}

func (this *QueryPlatformCoinsEvent) Feedback() {
}


