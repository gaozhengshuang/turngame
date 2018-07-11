package main

import (
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	pb "github.com/golang/protobuf/proto"
	_"strconv"
	"fmt"
)

func (this *GateUser) InitTiger() {
	for _, v := range tbl.Tiger.TTigerById {
		this.sumvaluemap[v.Id / uint32(10)] += v.Weight
	}

	send := &msg.GW2C_SumGet{}
	send.Num = pb.Uint32(this.sumget)
	this.SendMsg(send)
}

func (this *GateUser) GetNumByCount(count uint32) []int32{
	if this.freetype == 0{
		this.freetype = uint32(util.RandBetween(1, 2))
	}
	if this.freetype == 1{
		if count == 0{
			tmpslice := []int32{1,1,1}
			return tmpslice
		}else if count == 1{
			tmpslice := []int32{0, int32(util.RandBetween(0, 3)), int32(util.RandBetween(0, 3))}
			util.Shuffle(tmpslice)
			return tmpslice
		}else if count == 2{
			tmpslice := []int32{2,1,1}
			util.Shuffle(tmpslice)
			return tmpslice
		}
	}else{
		if count == 0{
			tmpslice := []int32{2,1,1}
			util.Shuffle(tmpslice)
			return tmpslice
		}else if count == 1{
			tmpslice := []int32{0, int32(util.RandBetween(0, 3)), int32(util.RandBetween(0, 3))}
			util.Shuffle(tmpslice)
			return tmpslice
		}else if count == 2{
			tmpslice := []int32{1,1,1}
			return tmpslice
		}
	}
	return []int32{0,0,0}
}

func (this *GateUser) RemoveCoins(token string, ctype uint32) {
	if this.DeliveryState() == true  {
		this.SendNotify("请求太频繁了，请稍后再尝试")
		return
	}
	this.SetToken(token)
	var cost int32
	switch ctype{
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
	event := NewRemovePlatformCoinsEvent(cost, 0, "数字转转乐扣除金币", this.RemovePlatformCoins, this.StartTiger)
	this.AsynEventInsert(event)
}

func (this *GateUser) StartTiger(removeok bool, tmpcost int32, uid int32) {
	var cost uint32
	cost = uint32(tmpcost)
	if removeok == false {
		this.SendNotify("金币不足")
		log.Info("玩家[%d]游戏失败，扣除金子%d失败", this.Id(), cost)
		return
	}
	if !this.RemoveYuanbao(cost, "老虎机扣除") {
		return
	}
	send := &msg.GW2C_GameResult{}
	if this.freetime <= 2{
		tmpnum := this.GetNumByCount(this.freetime)
		for _, numv := range tmpnum{
			send.Nums = append(send.Nums, uint32(numv))
		}
	}else{
		for sumk, sumv := range this.sumvaluemap{
			per := util.RandBetween(1, int32(sumv))
			var num uint32
			num = 0
			for _, tigerv := range tbl.Tiger.TTigerById {
				if tigerv.Id / uint32(10) != sumk{
					continue
				}
				num += tigerv.Weight
				if num >= uint32(per){
					send.Nums = append(send.Nums, tigerv.Number)
					break
				}
			}
		}
	}
	var reward uint32
	reward = 1
	for _, v := range send.Nums{
		reward *= v
	}
	this.AddYuanbao(cost * reward, "老虎机获得")
	this.SendMsg(send)

	this.freetime += 1
	this.sumget += cost * reward

	if reward > 1{
		txt := fmt.Sprintf("%d倍奖励 %d金币", reward, cost * reward)
		GateSvr().SendNotice(this.Face(), msg.NoticeType_Suspension, def.MakeNoticeText("恭喜", "#FFFFFF", 26),def.MakeNoticeText(this.Name(), "#A6E5FF", 26),def.MakeNoticeText("获得", "#FFFFFF", 26),def.MakeNoticeText(txt, "#ECFF94", 26))
	}

	if reward >= 1{
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
	personout := Redis().IncrBy(key, int64(cost * reward))
	globalout := Redis().IncrBy("tigersumoutput", int64(cost * reward))
	log.Info("玩家[%d] 本局投入:%d 本局获得:%d 个人总投入:%d 个人总获得:%d 全局总投入:%d 全局总支出:%d",this.Id(), cost, cost * reward, personin.Val(), personout.Val(), globalin.Val(), globalout.Val())
}

