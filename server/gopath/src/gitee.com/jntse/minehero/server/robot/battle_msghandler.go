package main
import _"reflect"
import "gitee.com/jntse/gotoolkit/net"
import "gitee.com/jntse/minehero/pbmsg"
import "gitee.com/jntse/gotoolkit/log"

func on_BT_GameInit(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_GameInit)
	//log.Info(reflect.TypeOf(tmsg).String())
	client, ok := session.UserDefData().(*User)
	if ok == false { panic("没有为Session设置UserDefData") }

	name, id := client.Name(), client.Id()
	log.Info("玩家[%s %d]收到 BT_GameInit:[%v]", name, id, tmsg)
}

func on_BT_SendBattleUser(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_SendBattleUser)
	//log.Info(reflect.TypeOf(tmsg).String())
	client, ok := session.UserDefData().(*User)
	if ok == false { panic("没有为Session设置UserDefData") }

	name, id := client.Name(), client.Id()
	log.Info("玩家[%s %d]收到 BT_SendBattleUser:[%v]", name, id, tmsg)
}

func on_BT_GameStart(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_GameStart)
	//log.Info(reflect.TypeOf(tmsg).String())
	client, ok := session.UserDefData().(*User)
	if ok == false { panic("没有为Session设置UserDefData") }

	name, id := client.Name(), client.Id()
	log.Info("玩家[%s %d]收到 BT_GameStart:[%v]", name, id, tmsg)

}

func on_BT_GameOver(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_GameOver)
	//log.Info(reflect.TypeOf(tmsg).String())
	client, ok := session.UserDefData().(*User)
	if ok == false { panic("没有为Session设置UserDefData") }

	name, id := client.Name(), client.Id()
	log.Info("玩家[%s %d]收到 BT_GameOver:[%v]", name, id, tmsg)
}

func on_BT_PickItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_PickItem)
	//log.Info(reflect.TypeOf(tmsg).String())
	client, ok := session.UserDefData().(*User)
	if ok == false { panic("没有为Session设置UserDefData") }

	name, id := client.Name(), client.Id()
	log.Info("玩家[%s %d]收到 BT_PickItem:[%v]", name, id, tmsg)
}


