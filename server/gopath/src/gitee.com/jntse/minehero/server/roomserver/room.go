package main
import (
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/pbmsg"
)

func (this *GameRoom) UpdateMoneyByClient(money uint64) {
	if this.owner == nil {
		return
	}


	// 检查钱是否合理

	// 设置
	this.owner.SetMoney(uint32(money), "同步客户端", true)

	// 检查任务
	taskid := int32(msg.TaskId_RegisterTopScore)
	if this.owner.task.IsTaskFinish(taskid) == false {
		task, find := tbl.TaskBase.TTaskById[uint32(taskid)]
		if find && money >= uint64(task.Count) { this.owner.task.TaskFinish(taskid) }
	}

	// 被邀请人

}


