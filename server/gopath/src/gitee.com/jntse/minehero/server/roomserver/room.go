package main
import (
	"fmt"
	_"time"
	"math"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	pb"github.com/gogo/protobuf/proto"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/def"
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
		if this.IsDiamondMode() {
			this.owner.SetDiamondRoomCost(this.totalcost)
			this.owner.SetDiamondRoomIncome(this.diamondincome)
			this.owner.SetDiamondRoomStep(this.diamondstepcount)
		}
		this.owner.OnEnd(now) 
	}

	// 通知Gate删除房间，回传个人数据
	msgend := &msg.BT_GameEnd { Roomid:pb.Int64(this.Id()) ,Ownerid:pb.Uint64(this.ownerid), Reason:pb.String(this.close_reason)}
	if this.owner != nil { msgend.Bin = this.owner.PackBin() }
	this.SendMsg(msgend)

	// 检查是否归还大奖配额
	this.GiveBackGlobalRewardPoolQuota("游戏结束")


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

	// 同步平台金币
	this.owner.QueryPlatformCoins()

	// 游戏初始化
	msginit := &msg.BT_GameInit {
		Roomid:pb.Int64(this.Id()), 
		Ownerid:pb.Uint64(this.ownerid),
		Gamekind:pb.Int32(this.Kind()), 
		Listitem:make([]*msg.GridItem, 0),
	}
	for _, v := range this.griditems {
		if v == nil { continue }
		msginit.Listitem = append(msginit.Listitem, v)	// v一定要指针类型
		//item := pb.Clone(&v).(*msg.GridItem)
		//msginit.Listitem = append(msginit.Listitem, item)
	}
	this.SendMsg(msginit)


	// 同步玩家数据
	this.owner.SendBattleUser()

	// 游戏开始
	msgstart := &msg.BT_GameStart{Roomid:pb.Int64(this.Id()), Ownerid:pb.Uint64(this.ownerid)}
	this.SendMsg(msgstart)

	// 推送开房间
	arglist := []interface{}{this.owner.Account(), this.owner.Token(), uint64(this.ownerid), "1", int32(1)}
	event := eventque.NewCommonEvent(arglist, def.HttpRequestUserBattleCountArglist, nil)
	this.owner.AsynEventInsert(event)
}

// 加载玩家
func (this *GameRoom) LoadUser(bin *msg.Serialize, gate network.IBaseNetSession) {
	if this.owner != nil {
		log.Error("房间[%d] 玩家[%s %d]个人数据已经在房间了", this.id, this.owner.Id(), this.owner.Name())
		return
	}

	// 
	user := NewRoomUser(this.id, bin, gate, this.roomkind)
	this.owner = user

	// 钻石场
	if this.IsDiamondMode() {
		this.totalcost = this.owner.DiamondRoomCost()
		this.diamondincome = this.owner.DiamondRoomIncome()
		this.diamondstepcount = this.owner.DiamondRoomStep()
	}

	// 
	log.Info("房间[%d] 玩家[%s %d] 加载个人数据 加载钻石场收入:%d 支出:%d Step:%d ts[%d]", this.id, user.Name(), user.Id(), 
			this.diamondincome, this.totalcost, this.diamondstepcount, util.CURTIMEMS())
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


//请求奖池状态，货币检查
func (this* GameRoom) JumpPreCheck(token string) {
	if this.owner == nil {
		log.Error("房间[%d] Owner[%d] ReqRewardFlag 玩家不在房间中", this.id, this.ownerid)
		return
	}
	this.owner.UpdateToken(token)

	var errcode string = ""
	switch {
	default:
		if this.dungeon == nil {
			errcode = "没有配置数据"
			break
		}

		// 免费场
		if this.dungeon.FreeMark == 1 && this.owner.GetFreeStep() > 0 {
			this.owner.RemoveFreeStep(1, "请求跳跃")
		} else {		// 检查元宝
			amount := this.dungeon.Costnum
			if tbl.Global.IntranetFlag {
				amount = 10		// TODO: 测试版本
			}
			//if this.owner.GetCoins() < uint32(amount) {	// TODO: 充值后不会更新这个金币
			//	errcode = "金币不足"
			//	break
			//}
			this.owner.RemoveCoins(this, amount)
			return
			//if this.owner.GetYuanbao() < costnum {
			//	errcode = fmt.Sprintf("房间[%d] 玩家[%d] 跳跃货币不足[%d]，元宝[%d]", this.id, this.ownerid, costnum, this.owner.GetYuanbao())
			//	this.owner.SendNotify("余额不足")
			//	break
			//}
			//this.owner.RemoveYuanbao(costnum, "请求跳跃")
			//this.totalcost += int32(costnum)
			//this.cost_personal += int32(costnum)
			//this.yb_middle.cost += int32(costnum)
			//this.yb_large.cost += int32(costnum)

			//// 全局奖池更新，个人奖池在跳完后才更新
			//if this.dungeon.Rewardid != 0 {
			//	rmsend := &msg.RS2MS_UpdateRewardPool{Mapid:pb.Int32(this.roomkind), Cost:pb.Int32(int32(costnum))}
			//	Match().SendCmd(rmsend)
			//}
		}
	}

	// 检查反馈
	send := &msg.BT_RetJumpPreCheck{ Userid:pb.Uint64(this.ownerid), Errcode:pb.String(errcode) }
	this.SendMsg(send)
	if errcode != "" { log.Error("房间[%d] 玩家[%s %d] JumpPreCheck失败[%s]", this.Id(), this.owner.Name(), this.owner.Id(), errcode) }

	// 同步玩家数据
	this.owner.SendBattleUser()
}

// 更新StepIndex
//func (this *GameRoom) JumpForward(stepnum int32) {
//
//	if this.owner == nil {
//		log.Error("房间[%d] Owner[%d] JumpForward 玩家不在房间中", this.id, this.ownerid)
//		return
//	}
//
//	this.dungeon := GetDungeonsConfig(this.roomkind)
//	if this.dungeon == nil {
//		log.Error("房间[%d] 请求跳跃失败，无效房间类型[%d]", this.id, this.roomkind)
//		return
//	}
//
//	//
//	tconfig := GetTurntableConfig(this.roomkind)
//	if tconfig == nil {
//		log.Error("房间[%d] UpdateStepIndex 无效的房间类型[%d]", this.id, this.roomkind)
//		return
//	}
//
//	if stepnum > tconfig.Max {
//		log.Error("房间[%d] UpdateStepIndex 单次步幅大于转盘最大值[%d>tconfig.Max]", this.id, stepnum , tconfig.Max)
//		return
//	}
//
//	newindex := this.stepindex + stepnum
//	if newindex > this.gridsum {
//		newindex = newindex % this.gridsum
//	}
//	
//	// 作弊检查
//	item := this.griditems[newindex]
//	if item != nil && item.GetControl() == true {
//		itemid, girdtype := item.GetId(), item.GetGridtype()
//		newindex = this.stepindex
//		log.Error("房间[%d] 玩家[%d] 跳中控制道具但服务器不允许，item[%d] gridtype[%d]", this.id, this.ownerid, itemid, girdtype)
//	}
//
//	log.Info("房间[%d] 玩家[%d] 更新StepIndex  old[%d] new[%d] add[%d]", this.id, this.ownerid, this.stepindex, newindex, stepnum)
//	this.stepindex = newindex
//
//	// 检查格子上是否有奖励
//	this.CheckPickItem()
//
//	// 检测个人奖池，高级元宝奖池，钻石奖池
//	this.CheckGridItemControl()
//
//	// 回复客户端
//	send := &msg.BT_RetJumpStep{Userid:pb.Uint64(this.ownerid), Stepindex:pb.Int32(newindex) }
//	for k, v := range this.griditems {
//		if v != nil && v.GetControl() == true { send.Fakelist = append(send.Fakelist, int32(k)) }
//	}
//	this.SendMsg(send)
//
//	// 统计
//	RCounter().IncrByDate("jumpcount", uint32(this.dungeon.Rewardid), 1)
//}

// 服务器向前跳
func (this *GameRoom) JumpForwardByServer(stepnum int32) {

	newindex := this.stepindex + stepnum
	if newindex >= this.gridsum {
		newindex = newindex % this.gridsum
	}
	
	log.Info("房间[%d] 玩家[%d] 更新StepIndex  old[%d] new[%d] add[%d]", this.id, this.ownerid, this.stepindex, newindex, stepnum)
	this.stepindex = newindex
	this.diamondstepcount += 1

	// 检查格子上是否有奖励
	this.CheckPickItem()

	// 检测个人奖池，高级元宝奖池，钻石奖池
	this.CheckGridItemControl()

	// 回复客户端
	//send := &msg.BT_RetJumpStep{Userid:pb.Uint64(this.ownerid), Stepindex:pb.Int32(newindex) }
	//for k, v := range this.griditems {
	//	if v.GetControl() == true { send.Fakelist = append(send.Fakelist, int32(k)) }
	//}
	//this.SendMsg(send)

	// 统计
	RCounter().IncrByDate("jumpcount", uint32(this.dungeon.Rewardid), 1)
}

func (this *GameRoom) IsBigRewardIndex(index int32) bool {
	if index == this.gridsum - 1 {
		return true
	}
	return false
}


// 检查格子上是否有奖励
func (this *GameRoom) CheckPickItem() bool {
	if (this.owner == nil) {
		return false
	}

	if this.stepindex >= int32(this.gridsum) {
		return false
	}
	
	item := this.griditems[this.stepindex]
	if item == nil {
		return false
	}

	// 道具配置检查
	itemid := uint32(item.GetId())
	itembase, ok := tbl.ItemBase.ItemBaseDataById[itemid]
	if ok == false {
		log.Error("玩家[%s %d] 拾取到道具[%d] 无效的配置", this.owner.Name(), this.owner.Id(), itemid)
		return false
	}

	// 拿大奖?
	gridtype := item.GetGridtype()
	if gridtype == kGridTypeBigReward {
		this.quota_global = kQuotaUsed
		PickItemNotice(this.owner, itembase.Name)	// 大奖公告
		Redis().ZIncrBy("bigreward_picknum", 1, fmt.Sprintf("%d",itemid))
		log.Info("玩家[%s %d] 拾取大奖[%s %d]", this.owner.Name(), this.owner.Id(), itembase.Name, itemid)

		// 推送胜利次数
		arglist := []interface{}{this.owner.Account(), this.owner.Token(), uint64(this.ownerid), "1", int32(1)}
		event := eventque.NewCommonEvent(arglist, def.HttpRequestUserVictoryArglist, nil)
		this.owner.AsynEventInsert(event)

	} else if gridtype == kGridTypeDiamondL1 || gridtype == kGridTypeDiamondL2 || gridtype == kGridTypeDiamondL3 {
		Redis().ZIncrBy("bigreward_picknum", 1, fmt.Sprintf("%d",itemid))
	}

	this.owner.AddItem(uint32(item.GetId()), uint32(item.GetNum()), "游戏拾取")


	// 获得道具
	send := &msg.BT_PickItem{ Userid:pb.Uint64(this.ownerid) }
	send.Item = pb.Clone(item).(*msg.GridItem)
	this.SendMsg(send)


	// 钻石场
	if this.IsDiamondMode() {
		if item.GetId() == int32(msg.ItemId_Diamond) { this.diamondincome += int64(item.GetNum() * int32(tbl.Room.DiamondToCoins)); this.diamondstepcount=0 }
		if item.GetId() == int32(msg.ItemId_DiamondParts) { this.diamondincome += int64(item.GetNum() * int32(tbl.Room.DiamondpartsToCoins)) }
	}

	//
	if itemid == uint32(msg.ItemId_YuanBao) {
		this.owner.AddExp(uint32(item.GetNum()), "拾取元宝", false)
		if int64(item.GetNum()) >= tbl.Global.PickYuanbaoNotice {
			PickNumItemNotice(this.owner, itembase.Name, int64(item.GetNum()))	// 元宝公告
		}

		// 扣除个人奖池
		this.cost_personal = int32(math.Max(float64(this.cost_personal-item.GetNum()), 0))
		this.yb_middle.cost = int32(math.Max(float64(this.yb_middle.cost-item.GetNum()), 0))
		this.yb_large.cost = int32(math.Max(float64(this.yb_large.cost-item.GetNum()), 0))
		log.Trace("房间[%d] 玩家[%d] 个人全局奖池[%d] 中元宝奖池[%d] 大元宝奖池[%d]", this.id, this.ownerid,
			this.cost_personal, this.yb_middle.cost, this.yb_large.cost)

		// 拾取高级元宝
		if (gridtype == kGridTypeMiddleYuanbao || gridtype == kGridTypeBigYuanbao) && item.GetControl() == false {
			this.SetGridItemControl(gridtype, true)
			log.Trace("房间[%d] 玩家[%d] 重新开启高级元宝[%d]控制", this.id, this.ownerid, gridtype)
		}

	}else if itemid == uint32(msg.ItemId_Diamond) || itemid == uint32(msg.ItemId_DiamondParts) {	// 钻石和钻石碎片
		// 扣除钻石奖池
		if itemid == uint32(msg.ItemId_Diamond) {
			PickNumItemNotice(this.owner, itembase.Name, int64(item.GetNum()))	// 钻石公告
			for _, v := range this.diamonds { v.cost = 0 }
		}
	}else {
		this.griditems[this.stepindex] = nil		// 元宝，钻石，钻石碎片不删除
		this.owner.AddExp(uint32(itembase.Sold) * 10, "拾取道具", false)	// 卖出价 * 10 才是原价
	}

	// 同步玩家数据
	this.owner.SendBattleUser()
	return true
}

// 归还全局奖池配额
func (this *GameRoom) GiveBackGlobalRewardPoolQuota(reason string) {
	// 配额已经使用了
	if this.quota_global == kQuotaNil || this.quota_global == kQuotaUsed {
		return
	}

	// 房间没有配置大奖
	if this.dungeon.Rewardid == 0  {
		return
	}

	// 归还redis
	quotakey := fmt.Sprintf("global_rewardpool_%d_quota", this.roomkind)
	newval, err_quota := Redis().Incr(quotakey).Result()
	if err_quota != nil { 
		log.Error("房间[%d] 类型[%d] [%s]归还全局奖池配额失败 err:%s", this.id, this.roomkind, reason, err_quota)
	}else {
		log.Error("房间[%d] 类型[%d] [%s]归还全局奖池配额成功，当前最新[%d]", this.id, this.roomkind, reason, newval) 
	}
}


// 格子作假控制，检测个人奖池和高级元宝奖池
func (this *GameRoom) CheckGridItemControl() {

	// 大奖个人奖池
	if this.dungeon.Rewardid != 0 && this.cost_personal >= int32(this.dungeon.PersonlLimit) && this.quota_personal == kQuotaNil {
		this.quota_personal = kQuotaUnused
		this.SetGridItemControl(kGridTypeBigReward, false)
		log.Info("房间[%d] 玩家[%d] 个人消耗满足大奖配额[%d]", this.id, this.ownerid, this.dungeon.PersonlLimit)
	}

	// 高级中元宝满足最低消费移除控制
	if this.yb_middle.grade != 0 && this.yb_middle.cost >= this.yb_middle.limit && this.yb_middle.control {
		log.Trace("房间[%d] 玩家[%d] 个人消耗达到[%d] 临时开放全部高级中元宝格子", this.id, this.ownerid, this.yb_middle.cost)
		this.yb_middle.cost = 0
		this.SetGridItemControl(kGridTypeMiddleYuanbao, false)
	}

	// 高级大元宝满足最低消费移除控制
	if this.yb_large.grade != 0 && this.yb_large.cost >= this.yb_large.limit && this.yb_large.control {
		log.Trace("房间[%d] 玩家[%d] 个人消耗达到[%d] 临时开放全部高级大宝格子", this.id, this.ownerid, this.yb_large.cost)
		this.yb_large.cost = 0
		this.SetGridItemControl(kGridTypeBigYuanbao, false)
	}

	// 钻石有概率拿到
	//if util.SelectPercent(this.GetDiamondPro(kDiamondGrade1)) == true { this.SetGridItemControl(kGridTypeDiamondL1, false) }
	//if util.SelectPercent(this.GetDiamondPro(kDiamondGrade2)) == true { this.SetGridItemControl(kGridTypeDiamondL2, false) }
	//if util.SelectPercent(this.GetDiamondPro(kDiamondGrade3)) == true { this.SetGridItemControl(kGridTypeDiamondL3, false) }
}

// 扣除平台金币
func (this *GameRoom) RemovePlatformCoins(amount int32, desc string) bool {
	tvmid := this.owner.Account()
	removeok := def.HttpRequestDecrCoins(this.owner.Id(), this.owner.Token(), tvmid, amount, desc)
	if removeok == true {
		log.Info("玩家[%d] 扣除金币[%d] 库存[%d] 原因[%s]", this.ownerid, amount, 0, desc)
	}
	return removeok
}

// 扣除完毕回调
func (this *GameRoom) RemovePlatformCoinsOk(removeok bool, costnum int32) {

	if removeok == false && !tbl.Global.IntranetFlag {		//TODO: 特殊版本，不扣金币
		notifymsg := "金币不足"
		this.owner.SendNotify(notifymsg)

		send := &msg.BT_RetJumpPreCheck{ Userid:pb.Uint64(this.ownerid), Errcode:pb.String(notifymsg), Dice:pb.Int32(0)}
		this.SendMsg(send)

	} else {

		// 推送金币消耗
		yuanbao := float32(tbl.Room.RmbToYuanbao) * float32(costnum) / float32(tbl.Room.RmbToConis) 
		this.owner.PlatformPushConsumeMoney(yuanbao)
		if tbl.Global.IntranetFlag {
			costnum = 3000	// TODO: 测试代码
		}
		this.totalcost += int64(costnum)
		this.cost_personal += int32(costnum)
		this.yb_middle.cost += int32(costnum)
		this.yb_large.cost += int32(costnum)
		for _, diamond := range this.diamonds {
			diamond.cost += int32(costnum)
		}

		//
		RCounter().IncrByDate("item_remove", uint32(msg.ItemId_Gold), uint32(costnum))
		RCounter().IncrByDate("room_income", uint32(this.roomkind), uint32(costnum))

		// 全局奖池更新
		if this.dungeon.Rewardid != 0 {
			rmsend := &msg.RS2MS_UpdateRewardPool{Mapid:pb.Int32(this.roomkind), Cost:pb.Int32(int32(costnum))}
			Match().SendCmd(rmsend)
		}

		this.owner.QueryPlatformCoins()

		// 计算色子点数
		dicepoint := this.NewCalcDicePoints()
		send := &msg.BT_RetJumpPreCheck{ Userid:pb.Uint64(this.ownerid), Errcode:pb.String(""), Dice:pb.Int32(dicepoint)}
		this.SendMsg(send)
		log.Trace("房间[%d] 玩家[%d] 本次获得色子点数[%d]",this.id, this.ownerid, dicepoint)

		// 开始跳跃
		this.JumpForwardByServer(dicepoint)
	}

}

// 获得普通场色子点数
func (this *GameRoom) GetNormalRoomDicePoints() int32 {
	points, index, count := make([]int32, 0), this.stepindex, int32(0)
	for count < 6 {
		index, count = index + 1, count + 1
		if index >= this.gridsum { index = 0 }
		item := this.griditems[index]
		if item == nil { points = append(points, count) }
		if item != nil && item.GetControl() != true { points = append(points, count) }
	}

	if len(points) != 0 {
		pindex := util.RandBetween(0, int32(len(points) - 1))
		return points[pindex]
	}

	log.Error("房间[%d] 玩家[%d] 6步内全都不能踩", this.id, this.ownerid)
	return 0
}

func (this *GameRoom) NewCalcDicePoints() int32 {
	if this.IsDiamondMode() == true {   // 钻石场
		return this.GetDiamondRoomDicePoints()
	}else {
		return this.GetNormalRoomDicePoints()
	}
	return 0
}

func (this *GameRoom) GetDiamondRoomDicePoints() int32 {
	if this.diamondstepcount < 0 {
		log.Error("房间[%d] 玩家[%s %d] 钻石场跳跃计数错误[%d]", this.id, this.owner.Name(), this.owner.Id(), this.diamondstepcount)
		return 0
	}

	//
	incomeCostRate := ""
	if income, cost := this.diamondincome, this.totalcost; cost != 0 {
		incomeCostRate = fmt.Sprintf("钻石场收入:%d 支出:%d 比率:%.2f", income, cost, float32(income) / float32(cost))
	}

	// 新加规则：第一次玩钻石场第4步必定中钻石，只有一次
	stepcount := this.diamondstepcount + 1
	if this.totalcost ==  int64(this.dungeon.Costnum) * tbl.Room.MustBeOutDiamondStep {
		log.Trace("房间[%d] 玩家[%s %d] 跳跃计数[%d] 新用户第4步必中 %s", this.id, this.owner.Name(), this.owner.Id(), stepcount, incomeCostRate)
		return this.GetPickDiamondPoints()
	}

	// 递增概率规则
	for _ ,v := range tbl.Room.StepDiamondProbability {
		if v.Step != stepcount { continue }
		log.Trace("房间[%d] 玩家[%s %d] 跳跃计数[%d] 跳中概率[%d] %s", this.id, this.owner.Name(), this.owner.Id(), stepcount, v.Pro, incomeCostRate)
		if util.SelectPercent(int32(v.Pro)) {
			return this.GetPickDiamondPoints()
		}else {
			return this.GetMissDiamondPoints()
		}
	}

	// 第八步必定中钻石，如果没有拿可能是6步之内没有钻石，直到拿到为止
	log.Trace("房间[%d] 玩家[%s %d] 跳跃计数[%d] 必中钻石 %s", this.id, this.owner.Name(), this.owner.Id(), stepcount, incomeCostRate)
	return this.GetPickDiamondPoints()
}

// 获得错过钻石的步数，排除空格子
func (this *GameRoom) GetMissDiamondPoints() int32 {
	points, index, count := make([]int32, 0), this.stepindex, int32(0)
	for count < 6 {
		index, count = index + 1, count + 1
		if index >= this.gridsum { index = 0 }
		item := this.griditems[index]
		//if item == nil { points = append(points, count) }
		if item != nil && item.GetControl() != true { points = append(points, count) }
	}

	if len(points) != 0 {
		pindex := util.RandBetween(0, int32(len(points) - 1))
		return points[pindex]
	}

	log.Error("房间[%d] 玩家[%d] 6步之内全是钻石", this.id, this.ownerid)
	return 0
}

// 获得可以捡到钻石步数
func (this *GameRoom) GetPickDiamondPoints() int32 {
	points, index, count := make([]int32, 0), this.stepindex, int32(0)
	for count < 6 {
		index, count = index + 1, count + 1
		if index >= this.gridsum { index = 0 }
		item := this.griditems[index]
		if item != nil && item.GetControl() == true { points = append(points, count) }
	}

	if len(points) != 0 {
		log.Info("房间[%d] 玩家[%d] =====潜规则获得钻石=====", this.Id(), this.ownerid)
		pindex := util.RandBetween(0, int32(len(points) - 1))
		return points[pindex]
	}

	// 6步内没有钻石，随机返回点数
	log.Warn("房间[%d] 玩家[%d] 6步之内没有钻石", this.Id(), this.ownerid)
	return util.RandBetween(1, 6)
}

// 计算色子点数
//func (this *GameRoom) CalcDicePoints() int32 {
//	if this.IsDiamondMode() {	// 钻石场
//		if income, cost := this.diamondincome, this.totalcost; cost != 0 {
//			log.Trace("房间[%d] 玩家[%d] 钻石场收入:%d 支出:%d 比率:%.2f", this.id, this.ownerid, income, cost, float32(income) / float32(cost))
//		}
//
//		if this.totalcost < int64(tbl.Room.Rebate.MinConsume) {	// 低于最低消费，走概率
//			return this.GetProDiamondPoints()
//		}else {
//			costrate := float32(this.diamondincome) / float32(this.totalcost) * 100.0
//			if costrate < float32(tbl.Room.Rebate.WarningLineMin) {			// 有钻石必中钻石
//				return this.GetPickDiamondPoints()
//			} else if costrate > float32(tbl.Room.Rebate.WarningLineMax) {	// 必定不中钻石
//				return this.GetMissDiamondPoints()
//			}else {
//				return this.GetProDiamondPoints()
//			}
//		}
//	}else {		// 其他场
//		return this.GetNormalRoomDicePoints()
//	}
//
//	return 0
//}

//// 获得10%概率捡到钻石，90%概率捡到碎片的步数
//func (this *GameRoom) GetProDiamondPoints() int32 {
//	index, count := this.stepindex, int32(0)
//	diamondgrid, partsgrid, emptygrid := make([]int32, 0), make([]int32, 0), make([]int32, 0)
//	for count < 6 {
//		index, count = index + 1, count + 1
//		if index >= this.gridsum { index = 0 }
//		item := this.griditems[index]
//		if item == nil {
//			emptygrid = append(emptygrid, count) 
//		} else {
//			if item.GetControl() == true { diamondgrid = append(diamondgrid, count) }
//			if item.GetControl() != true { partsgrid = append(partsgrid, count) }
//		}
//	}
//
//	if len(diamondgrid) != 0 && len(partsgrid) != 0 && len(emptygrid) != 0 {	// 6步内有空格子，卷，钻石
//		weigthvec := make([]int32, 0)
//		weigthvec = append(weigthvec, int32(tbl.Room.Rebate.GroupGird.HaveEmptyPartsDiamond.Empty))
//		weigthvec = append(weigthvec, int32(tbl.Room.Rebate.GroupGird.HaveEmptyPartsDiamond.Parts))
//		weigthvec = append(weigthvec, int32(tbl.Room.Rebate.GroupGird.HaveEmptyPartsDiamond.Diamond))
//		weightindex := util.SelectByWeightSlice(weigthvec)
//		if weightindex == 0 {
//			pindex := util.RandBetween(0, int32(len(emptygrid) - 1))
//			return emptygrid[pindex]
//		}else if weightindex == 1 {
//			pindex := util.RandBetween(0, int32(len(partsgrid) - 1))
//			return partsgrid[pindex]
//		}else if weightindex == 2 {
//			log.Info("房间[%d] 玩家[%d] =====概率获得钻石=====", this.Id(), this.ownerid)
//			pindex := util.RandBetween(0, int32(len(diamondgrid) - 1))
//			return diamondgrid[pindex]
//		}
//
//	}else if len(diamondgrid) != 0 && len(partsgrid) != 0 {	// 6步内只有钻石和卷
//		getdiamond := util.SelectPercent(int32(tbl.Room.Rebate.GroupGird.HavePartsDiamond.Diamond))
//		if getdiamond == true {
//			log.Info("房间[%d] 玩家[%d] =====概率获得钻石=====", this.Id(), this.ownerid)
//			pindex := util.RandBetween(0, int32(len(diamondgrid) - 1))
//			return diamondgrid[pindex]
//		}else {
//			pindex := util.RandBetween(0, int32(len(partsgrid) - 1))
//			return partsgrid[pindex]
//		}
//
//	}else if len(partsgrid) != 0 {	// 6步内只有卷和空格子
//		pindex := util.RandBetween(0, int32(len(partsgrid) - 1))
//		return partsgrid[pindex]
//	}
//
//	return 0
//}
//
//
