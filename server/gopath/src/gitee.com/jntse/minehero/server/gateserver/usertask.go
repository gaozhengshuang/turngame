package main

import (
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/gotoolkit/log"
)

type UserTask struct {
	tasks map[int32]*msg.TaskData
	owner *GateUser
}

func (this *UserTask) Init(owner *GateUser) {
	this.owner = owner
	this.tasks = make(map[int32]*msg.TaskData)
}

func (this *UserTask) LoadBin(bin *msg.Serialize) {
	taskbin := bin.GetBase().GetTask();
	if taskbin == nil { return }
	for _, data := range taskbin.GetTasks() {
		this.tasks[data.GetId()] = data
	}
}

func (this *UserTask) PackBin(bin *msg.Serialize) {
	bin.GetBase().Task = &msg.UserTask{Tasks:make([]*msg.TaskData, 0)}
	taskbin := bin.GetBase().GetTask();
	for _, data := range this.tasks {
		taskbin.Tasks = append(taskbin.Tasks, data)
	}
}

func (this *UserTask) TaskFinish(id int32) {	
	task, find := this.tasks[id]
	if find == false {
		task = &msg.TaskData{Id:pb.Int32(id), Progress:pb.Int32(0), Completed:pb.Int32(1)}
		this.tasks[id] = task
	}else {
		if task.GetCompleted() == 1 {
			log.Info("玩家[%s %d] 重复完成任务[%d]", this.owner.Name(), this.owner.Id(), id)
			return
		}
		task.Completed = pb.Int32(1)
	}
	log.Info("玩家[%s %d] 完成任务[%d]", this.owner.Name(), this.owner.Id(), id)
}

func (this *UserTask) SendTaskList() {
	send := &msg.GW2C_SendTaskList{Tasks:make([]*msg.TaskData, 0)}
	for _, task := range this.tasks {
		send.Tasks = append(send.Tasks, task)
	}
	this.owner.SendMsg(send)
}

func (this *UserTask) IsTaskFinish(id int32) bool {
	task, find := this.tasks[id]
	if find && task.GetCompleted() == 1 {
		return true
	}
	return false
}


