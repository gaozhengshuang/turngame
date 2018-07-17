package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/golang/protobuf/proto"
	_ "strconv"
)

func (this *GateUser) InitTiger() {
	/*
		for _, v := range tbl.Tiger.TTigerById {
			this.sumvaluemap[v.Id / uint32(10)] += v.Weight
		}

		send := &msg.GW2C_SumGet{}
		send.Num = pb.Uint32(this.sumget)
		this.SendMsg(send)
	*/
	for _, v := range tbl.Tiger.TTigerById {
		this.sumvaluemap[v.Id/uint32(10)] += v.Weight
	}
	send := &msg.GW2C_NotifyCardState{}
	userCard := this.GetCardState()
	for _, v := range userCard {
		if v.GetPos() > 0 {
			send.Card = append(send.Card, v)
		}
	}
	send.Cost = pb.Uint32(this.cardcost)
	this.SendMsg(send)
	sendsumget := &msg.GW2C_SumGet{}
	sendsumget.Num = pb.Uint32(this.sumget)
	this.SendMsg(sendsumget)

}

func (this *GateUser) GetNumByCount(count uint32) []int32 {
	if this.freetype == 0 {
		this.freetype = uint32(util.RandBetween(1, 3))
	}
	if this.freetype == 1 {
		if count == 0 {
			tmpslice := []int32{2, 1, 1}
			util.Shuffle(tmpslice)
			return tmpslice
		} else if count == 1 {
			tmpslice := []int32{0, int32(util.RandBetween(0, 3)), int32(util.RandBetween(0, 3))}
			util.Shuffle(tmpslice)
			return tmpslice
		} else if count == 2 {
			tmpslice := []int32{1, 1, 1}
			return tmpslice
		}

	} else {
		if count == 0 {
			tmpslice := []int32{1, 1, 1}
			return tmpslice
		} else if count == 1 {
			tmpslice := []int32{0, int32(util.RandBetween(0, 3)), int32(util.RandBetween(0, 3))}
			util.Shuffle(tmpslice)
			return tmpslice
		} else if count == 2 {
			tmpslice := []int32{2, 1, 1}
			util.Shuffle(tmpslice)
			return tmpslice
		}
	}
	return []int32{0, 0, 0}
}

func (this *GateUser) RemoveCoins(token string, ctype uint32) {
	if this.DeliveryState() == true {
		this.SendNotify("请求太频繁了，请稍后再尝试")
		return
	}
	this.SetToken(token)
	var cost int32
	switch ctype {
	case 1:
		cost = 1000
	case 2:
		cost = 2000
	case 3:
		cost = 5000
	default:
		cost = 0
	}
	if cost == 0 {
		return
	}
	log.Info("玩家[%d]开始游戏 付费", this.Id())
	//event := NewRemovePlatformCoinsEvent(cost, 0, "数字转转乐扣除金币", this.RemovePlatformCoins, this.StartTiger)
	//this.AsynEventInsert(event)
}

/*
func (this *GateUser) StartTiger(removeok bool, tmpcost int32, uid int32) {
	var cost uint32
	cost = uint32(tmpcost)
	//if removeok == false {
	//	this.SendNotify("金币不足")
	//	log.Info("玩家[%d]游戏失败，扣除金子%d失败", this.Id(), cost)
	//	return
	//}
	if !this.RemoveYuanbao(cost, "老虎机扣除") {
		return
	}
	send := &msg.GW2C_GameResult{}
	if this.freetime <= 2 {
		tmpnum := this.GetNumByCount(this.freetime)
		for _, numv := range tmpnum {
			send.Nums = append(send.Nums, uint32(numv))
		}
	} else {
		for sumk, sumv := range this.sumvaluemap {
			per := util.RandBetween(1, int32(sumv))
			var num uint32
			num = 0
			for _, tigerv := range tbl.Tiger.TTigerById {
				if tigerv.Id/uint32(10) != sumk {
					continue
				}
				num += tigerv.Weight
				if num >= uint32(per) {
					send.Nums = append(send.Nums, tigerv.Number)
					break
				}
			}
		}
	}
	var reward uint32
	reward = 1
	for _, v := range send.Nums {
		reward *= v
	}
	this.AddYuanbao(cost*reward, "老虎机获得")
	this.SendMsg(send)

	this.freetime += 1
	this.sumget += cost * reward

	if reward > 1 {
		txt := fmt.Sprintf("%d倍奖励 %d金币", reward, cost*reward)
		GateSvr().SendNotice(this.Face(), msg.NoticeType_Suspension, def.MakeNoticeText("恭喜", "#FFFFFF", 26), def.MakeNoticeText(this.Name(), "#A6E5FF", 26), def.MakeNoticeText("获得", "#FFFFFF", 26), def.MakeNoticeText(txt, "#ECFF94", 26))
	}

	if reward >= 1 {
		//	event := NewAddPlatformCoinsEvent(int32(cost * reward), "转转乐获得金币", this.AddPlatformCoins)
		//	this.AsynEventInsert(event)
		sendsum := &msg.GW2C_SumGet{}
		sendsum.Num = pb.Uint32(this.sumget)
		this.SendMsg(sendsum)
	}

	key := fmt.Sprintf("tigerinput_%d", this.Id())
	personin := Redis().IncrBy(key, int64(cost))
	globalin := Redis().IncrBy("tigersuminput", int64(cost))
	key = fmt.Sprintf("tigeroutput_%d", this.Id())
	personout := Redis().IncrBy(key, int64(cost*reward))
	globalout := Redis().IncrBy("tigersumoutput", int64(cost*reward))
	log.Info("玩家[%d] 本局投入:%d 本局获得:%d 个人总投入:%d 个人总获得:%d 全局总投入:%d 全局总支出:%d", this.Id(), cost, cost*reward, personin.Val(), personout.Val(), globalin.Val(), globalout.Val())
}
*/

func (this *GateUser) PreStartTiger(cost uint32, token string) {
	send := &msg.GW2C_GameResult{}
	if cost > 100000 {
		send.Ret = pb.Uint32(1)
		this.SendMsg(send)
		log.Info("玩家[%d]开启新一轮失败, 下注超过上限 cost:%d", this.Id(), cost)
		return
	}
	if cost < 1000 {
		send.Ret = pb.Uint32(1)
		this.SendMsg(send)
		log.Info("玩家[%d]开启新一轮失败, 下注低于下限 cost:%d", this.Id(), cost)
		return
	}

	if !this.CheckUserCardCanStart() {
		send.Ret = pb.Uint32(2)
		this.SendMsg(send)
		log.Info("玩家[%d]开启新一轮失败，存在翻牌数据, 上一轮未结束", this.Id())
		return
	}
	cost = cost / uint32(tbl.Global.Tvmtestmoney)
	this.SetToken(token)
	log.Info("玩家[%d]开始新一轮翻牌游戏 付费", this.Id())
	event := NewRemovePlatformCoinsEvent(int32(cost), 0, "数字翻翻乐扣除金币", this.RemovePlatformCoins, this.StartTiger)
	this.AsynEventInsert(event)

}

func (this *GateUser) StartTiger(removeok bool, cost int32, uid int32) {

	send := &msg.GW2C_GameResult{}
	if removeok == false {
		this.SendNotify("金币不足")
		log.Info("玩家[%d]游戏失败，扣除金子%d失败", this.Id(), cost)
		send.Ret = pb.Uint32(3)
		this.SendMsg(send)
		return
	}
	cardNums := make([]uint32, 0)
	if this.freetime <= 2 {
		tmpnum := this.GetNumByCount(this.freetime)
		for _, numv := range tmpnum {
			cardNums = append(cardNums, uint32(numv))
		}
	} else {
		for sumk, sumv := range this.sumvaluemap {
			per := util.RandBetween(1, int32(sumv))
			var num uint32
			num = 0
			for _, tigerv := range tbl.Tiger.TTigerById {
				if tigerv.Id/uint32(10) != sumk {
					continue
				}
				num += tigerv.Weight
				if num >= uint32(per) {
					cardNums = append(cardNums, tigerv.Number)
					break
				}
			}
		}
	}
	this.QueryPlatformCoins()
	this.freetime += 1
	this.InitUserCardStateByNewRoundStart(cardNums, uint32(cost))
	key := fmt.Sprintf("tigerinput_%d", this.Id())
	personin := Redis().IncrBy(key, int64(cost))
	globalin := Redis().IncrBy("tigersuminput", int64(cost))
	send.Ret = pb.Uint32(0)
	this.SendMsg(send)
	log.Info("玩家[%d] 本局投入:%d 个人总投入:%d 全局总投入:%d", this.Id(), cost, personin.Val(), globalin.Val())
}

func (this *GateUser) CheckUserCardCanStart() bool {
	userCard := this.GetCardState()
	if len(userCard) > 0 {
		return false
	}
	return true
}

//开启新的一轮抽卡 初始化 玩家抽卡数据
func (this *GateUser) InitUserCardStateByNewRoundStart(nums []uint32, cost uint32) {
	Nums := nums[:3]
	//如果前两个数字都是0 那么让第一个数字非0
	if Nums[0] == 0 && Nums[1] == 0 {
		Nums[0] = uint32(util.RandBetween(1, 3))
	}
	if Nums[1] == 0 && Nums[2] == 0 {
		Nums[1] = uint32(util.RandBetween(1, 3))
	}
	if Nums[0] == 0 && Nums[1] > 0 && Nums[2] > 0 {
		temp := Nums[0]
		Nums[0] = Nums[2]
		Nums[2] = temp
	}

	this.ClearCardState()
	for _, v := range Nums {
		temp := &msg.CardData{}
		temp.Num = pb.Uint32(v)
		temp.Pos = pb.Uint32(0)
		this.cardstate = append(this.cardstate, temp)
	}
	for _, k := range this.cardstate {
		log.Info("玩家[%d]翻牌新一轮卡牌 位置:%d 数字:%d", this.Id(), k.GetPos(), k.GetNum())
	}
	this.cardcost = cost
}

//玩家翻卡
func (this *GateUser) UserTakeCard(pos uint32) {
	userCard := this.GetCardState()
	for _, v := range userCard {
		if v.GetPos() == pos {
			log.Info("玩家[%d]翻牌失败，此位置已翻开", this.Id())
			return
		}
	}
	index := 0
	find := false
	var numfind uint32 = 0
	for i, v := range userCard {
		if v.GetPos() == 0 {
			v.Pos = pb.Uint32(pos)
			index = i
			find = true
			numfind = v.GetNum()
			break
		}
	}

	if find {
		log.Info("玩家[%d]翻牌第 %d 张牌成功 位置%d  数字%d", this.Id(), index+1, pos, numfind)
		send := &msg.GW2C_AckTakeCardRet{}
		send.Num = pb.Uint32(numfind)
		send.Pos = pb.Uint32(pos)
		this.SendMsg(send)
		roundend := true

		if numfind > 0 {
			for _, v := range userCard {
				if v.GetPos() == 0 {
					roundend = false
				}
			}
		}
		if roundend {
			this.GiveUserCardAward()
		}
	} else {
		log.Info("玩家[%d]翻牌失败，没有可翻的牌", this.Id())
	}

}

//一轮全部翻了 发送本轮奖励
func (this *GateUser) GiveUserCardAward() {
	cost := this.cardcost
	var reward uint32
	reward = 1
	userCard := this.GetCardState()
	for _, v := range userCard {
		reward *= v.GetNum()
	}
	this.AddYuanbao(cost*reward, "翻卡奖励")

	this.sumget += cost * reward

	if reward >= 1 {
		txt := fmt.Sprintf("%d倍奖励 %dK元宝", reward, cost*reward/1000)
		GateSvr().SendNotice(this.Face(), msg.NoticeType_Suspension, def.MakeNoticeText("恭喜", "#FFFFFF", 26), def.MakeNoticeText(this.Name(), "#A6E5FF", 26), def.MakeNoticeText("获得", "#FFFFFF", 26), def.MakeNoticeText(txt, "#ECFF94", 26))
	}

	if reward >= 1 {
		//event := NewAddPlatformCoinsEvent(int32(cost*reward), "数字翻翻乐", this.AddPlatformCoins)
		//this.AsynEventInsert(event)

		sendsum := &msg.GW2C_SumGet{}
		sendsum.Num = pb.Uint32(this.sumget)
		this.SendMsg(sendsum)
	}
	this.QueryPlatformCoins()
	key := fmt.Sprintf("tigeroutput_%d", this.Id())
	personout := Redis().IncrBy(key, int64(cost*reward))
	globalout := Redis().IncrBy("tigersumoutput", int64(cost*reward))
	log.Info("玩家[%d]  本局获得:%d 个人总获得:%d 全局总支出:%d", this.Id(), cost*reward, personout.Val(), globalout.Val())
	this.ClearCardState()
}

//将身上的元宝全部兑换钻石
func (this *GateUser) ExChangeDiamondByYuanbao(token string) {
	yuanbaoNum := this.GetYuanbao()
	var exChangeDiamondNum uint32 = yuanbaoNum / uint32(tbl.Global.TvmExChangeDiamondCost)
	if exChangeDiamondNum <= 1 {
		send := &msg.GW2C_AckExChangeToDiamondRet{}
		send.Ret = pb.Uint32(1)
		send.Diamond = pb.Uint32(0)
		this.SendMsg(send)
		return
	}
	// Http请求
	if def.HttpRequestIncrDiamonds(this.Id(), token, this.Account(), int32(exChangeDiamondNum), "元宝兑换钻石") == true {
		log.Info("玩家[%d] 添加钻石[%d] 原因[%s]", this.Id(), exChangeDiamondNum, "元宝兑换钻石")
		yuanbaoSub := exChangeDiamondNum * uint32(tbl.Global.TvmExChangeDiamondCost)
		this.RemoveYuanbao(uint32(yuanbaoSub), "兑换钻石扣除")
		send := &msg.GW2C_AckExChangeToDiamondRet{}
		send.Ret = pb.Uint32(0)
		send.Diamond = pb.Uint32(exChangeDiamondNum)
		this.SendMsg(send)
	} else {
		log.Info("玩家[%s %d] 元宝兑换钻石异常，请求兑换钻石数量 %d", this.Name(), this.Id(), exChangeDiamondNum)
		this.SendNotify("今日可兑换钻石额度已达上线，明日再来兑换")
		send := &msg.GW2C_AckExChangeToDiamondRet{}
		send.Ret = pb.Uint32(1)
		send.Diamond = pb.Uint32(0)
		this.SendMsg(send)
	}

}
