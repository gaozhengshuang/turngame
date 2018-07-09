package main
import (
	_"fmt"
	_"time"
	_"math"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	_"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	pb"github.com/gogo/protobuf/proto"
	_"gitee.com/jntse/minehero/server/tbl"
	_"gitee.com/jntse/minehero/server/def"
)


//
func (this *GameRoom) CanStart() bool {
	if this.IsStart() == true {
		return false
	}
	return true
}

func (this *GameRoom) IsStart() bool {
	if ( this.tm_start == 0 ) {
		return false
	}
	return true
}

//
func (this *GameRoom) IsEnd(now int64) bool {

	// 超过10秒还未开始游戏
	if ( this.tm_start == 0 && (now/1000) > this.tm_create + 10) {
		this.close_reason = "玩家超时未进房间"
		log.Info("房间[%d] 准备删除房间，玩家10秒内未进游戏", this.id)
		return true
	}

	if ( this.tm_end != 0)	{
		log.Info("房间[%d] 准备删除房间，玩家[%d]", this.id, this.ownerid)
		return true
	}

	return false
}


// 游戏结束
func (this *GameRoom) OnEnd(now int64) {
	log.Info("房间[%d] 游戏结束，模式[%d]", this.Id(), this.Kind())

	// 序列化玩家个人数据
	if this.owner != nil { 
		this.owner.OnEnd(now) 
	}

	// 通知Gate删除房间，回传个人数据
	msgend := &msg.BT_GameEnd { Roomid:pb.Int64(this.Id()) ,Ownerid:pb.Uint64(this.ownerid), Reason:pb.String(this.close_reason)}
	if this.owner != nil { msgend.Bin = this.owner.PackBin() }
	this.SendMsg(msgend)


	// 更新房间数量到redis
	key := RoomSizeKey()
	_, err := Redis().SRem(key, this.id).Result()
	if err != nil { log.Error("更新房间数量到redis失败 key:%s , err: %s", key, err) }
	log.Info("SCard Redis[%s] Amount[%d]", key, Redis().SCard(key).Val())

}

// 玩家进游戏，游戏开始
func (this *GameRoom) OnStart() {
	if this.owner == nil {
		log.Error("房间[%d] Owner[%d] OnStart 玩家不在房间中", this.id, this.ownerid)
		return
	}

	log.Info("房间[%d] 游戏开始，模式[%d]", this.Id(), this.Kind())
	this.tm_start = util.CURTIME()


	// 游戏初始化
	msginit := &msg.BT_GameInit {
		Roomid:pb.Int64(this.Id()), 
		Ownerid:pb.Uint64(this.ownerid),
		Gamekind:pb.Int32(this.Kind()), 
	}
	this.SendClientMsg(msginit)


	// 同步玩家数据
	this.owner.SendBattleUser()

	// 游戏开始
	msgstart := &msg.BT_GameStart{Roomid:pb.Int64(this.Id()), Ownerid:pb.Uint64(this.ownerid)}
	this.SendClientMsg(msgstart)
}

// 加载玩家
func (this *GameRoom) LoadUser(bin *msg.Serialize, gate network.IBaseNetSession) {
	if this.owner != nil {
		log.Error("房间[%d] 玩家[%s %d]个人数据已经在房间了", this.id, this.owner.Id(), this.owner.Name())
		return
	}

	// 
	user := UserMgr().CreateRoomUser(this.id, bin, gate, this.roomkind)
	this.owner = user

	// 
	log.Info("房间[%d] 玩家[%s %d] 加载个人数据 Step:%d", this.id, user.Name(), user.Id(), this.totalcost)
}

// 玩家进房间，开始游戏
func (this *GameRoom) UserEnter(userid uint64, token string) {
	if this.IsStart() == true {
		log.Error("房间[%d] 玩家[%d] 游戏已经开始了，不要重复进入", this.id, userid)
		return
	}

	if this.owner == nil {
		log.Error("房间[%d] Owner[%d] UserEnter 玩家不在房间中", this.id, this.ownerid)
		return
	}

	log.Info("房间[%d] 玩家[%d]进入游戏 ts[%d]", this.id, userid, util.CURTIMEMS())
	this.owner.UpdateToken(token)
	this.OnStart()
}

// 玩家正常离开
func (this *GameRoom) UserLeave(userid uint64) {
	this.tm_end = util.CURTIME()
	this.close_reason = "玩家退出房间"
	log.Info("房间[%d] 玩家[%d]退出房间，准备删除房间", this.id, userid)
}

// 玩家断开连接
func (this *GameRoom) UserDisconnect(userid uint64) {
	this.tm_end = util.CURTIME()
	this.close_reason = "玩家断开连接"
	log.Info("房间[%d] 玩家[%d]断开连接，准备删除房间", this.id, userid)
}

// 网关断开
func (this *GameRoom) GateLeave(sid int) {
	this.tm_end = util.CURTIME()
	log.Info("房间[%d] Owner[%d] 网关断开连接Sid[%d]", this.id, this.ownerid, sid)
}

