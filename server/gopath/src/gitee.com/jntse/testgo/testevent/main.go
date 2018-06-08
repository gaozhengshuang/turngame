package main
import (
	"fmt"
	"time"
	_"strings"
	_"sort"
	_"reflect"
	_"sync"
	"errors"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/log"
)

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type EventQueueTester struct {
	uid 		int64
	asynevent 	eventque.AsynEventQueue
	capacity 	int64
	makecount 	int64
	feedcount 	int64
	tm_start 	int64
}

func (this *EventQueueTester) Init(uid int64, cap int32) {
	this.uid = uid
	this.asynevent.Start(uid, cap)

	this.capacity = 200
	this.tm_start = util.CURTIMEMS()
}

func (this *EventQueueTester) Tick(now int64) {
	//this.MakeHttpRequest()
	this.MakeCommonEvent()
	this.asynevent.Dispatch()
}

func (this *EventQueueTester) MakeHttpRequest() {
	if this.makecount < this.capacity {
		this.makecount++
		event := eventque.NewHttpPostEvent("127.0.0.1", "MakeHttpRequest", this.DoHttpRequest, this.HttpRequestFeedback)
		this.asynevent.Push(event)
	}
}

func (this *EventQueueTester) DoHttpRequest(url, body string) (resp string, err error) {
	//randtime := util.RandBetween(1, 20)
	//time.Sleep(time.Millisecond * time.Duration(randtime))
	//log.Info("DoHttpRequest url:%v body:%v", url, body)
	url, body = url, body
	return "invalid url", errors.New("invalid url")
}

func (this *EventQueueTester) HttpRequestFeedback(resp string, err error) {
	resp, err = resp, err
	//log.Info("HttpRequestFeedback resp:%v error:%v", resp, err)
	this.feedcount++
	if this.feedcount == this.capacity {
		log.Info("process %d event cost [%dms]", this.capacity, util.CURTIMEMS() - this.tm_start)
	}
}

func (this *EventQueueTester) MakeCommonEvent() {
	if this.makecount < this.capacity {
		this.makecount++
		params := []interface{}{"127.0.0.1", "MakeCommonEvent"}
		event := eventque.NewCommonEvent(params, this.DoCommonEvent, this.FeedCommonEvent)
		this.asynevent.Push(event)
	}
}

func (this *EventQueueTester) DoCommonEvent(params []interface{}) []interface{} {
	if params == nil || len(params) == 0 {
		log.Info("DoCommonEvent params is nil or zero num")
		return nil
	}
	url := params[0].(string)
	body := params[1].(string)
	//log.Info("DoCommonEvent url:%v body:%v", url, body)
	url, body = url, body
	return []interface{}{"invalid url", errors.New("invalid url")}
}

func (this *EventQueueTester) FeedCommonEvent(params []interface{}) {
	if params == nil || len(params) == 0 {
		log.Info("FeedCommonEvent params is nil or zero num")
		return
	}
	resp := params[0].(string)
	err := params[1].(error)
	resp, err = resp, err
	this.feedcount++
	if this.feedcount == this.capacity {
		log.Info("process %d event cost [%dms]", this.capacity, util.CURTIMEMS() - this.tm_start)
	}
	//log.Info("FeedCommonEvent resp:%v error:%v", resp, err)
}


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
var g_KeyBordInput util.KeyBordInput
var g_Quit bool = false
var g_TestFlag string
func main() {

	// 初始日志
	log.Init("","","trace")
	log.Info("初始日志完成")


	// 初始化键盘输入
	g_KeyBordInput.Init()
	g_KeyBordInput.Start()
	log.Info("初始键盘输入完成")


	//
	testers := make(map[int64]*EventQueueTester)
	for i := int64(1); i <= 10000; i++ {
		tester := new(EventQueueTester)
		tester.Init(int64(i), 100)
		testers[i] = tester
	}


	//
	for g_Quit == false {
		time.Sleep(time.Millisecond * 1)
		select {
		case cmd,_:= <-g_KeyBordInput.C:
			DoInputCmd(cmd)
		default:
			now := util.CURTIMEMS()
			for _, v := range testers {
				v.Tick(now)
				//v.DoHttpRequest("","")
			}
			delay := util.CURTIMEMS() - now
			if delay > 10 {
				fmt.Printf("delay[%d]ms\n", delay)
			}
		}
	}
}

func DoInputCmd(cmd string) {
	switch cmd {
	case "quit","exit":
		g_Quit = true
		break
	default:
		g_TestFlag = cmd
		break
	}
}
