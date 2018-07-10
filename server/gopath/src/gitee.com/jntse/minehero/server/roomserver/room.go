package main
import (
	"fmt"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/pbmsg"
	_"gitee.com/jntse/gotoolkit/util"
)

func (this *GameRoom) UpdateMoneyByClient(money uint64) {
	if this.owner == nil {
		return
	}

	// 设置
	this.owner.SetMoney(uint32(money), "同步客户端", true)

	// 检查任务
	taskid := int32(msg.TaskId_RegisterTopScore)
	task, find := tbl.TaskBase.TTaskById[uint32(taskid)]
	if this.owner.task.IsTaskFinish(taskid) == false && find && money >= uint64(task.Count) {

		//
		this.owner.task.TaskFinish(taskid) 

		// 邀请人
		if this.owner.Inviter() != 0 {
			Redis().SAdd(fmt.Sprintf("TaskInviteeTopScoreFinish_%d", this.owner.Inviter()), this.owner.Id())
		}
	}

}

