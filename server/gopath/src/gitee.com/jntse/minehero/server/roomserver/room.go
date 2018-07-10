package main
import (
)

func (this *GameRoom) UpdateMoneyByClient(money uint64) {
	if this.owner == nil {
		return
	}

	// 检查任务
	;

	// 检查钱是否合理
	;

	// 设置
	this.owner.SetMoney(uint32(money), "同步客户端", true)
}


