package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/pbmsg"
	pb"github.com/gogo/protobuf/proto"
	"net/http"
	"strconv"
	"strings"
	"time"
	"encoding/json"
)

func HttpServerResponseCallBack(w http.ResponseWriter, urlpath string, rawquery string, body []byte) {
	log.Info("HttpServerResponseCallBack")

	//
	log.Info("urlpath: %s", urlpath)
	log.Info("rawquery: %s", rawquery)
	log.Info("body: %s", string(body))

	switch {
	default:
		cmdmap := make(map[string]interface{})
		unerr := json.Unmarshal(body, &cmdmap)
		if unerr != nil {
			log.Error("HttpServerResponseCallBack json.Unmarshal err[%s]", unerr)
			break
		}

		// 充值
		if _, ok := cmdmap["order_id"]; ok {
			DoUserRecharge(cmdmap)
			break
		}

		// GM指令
		if _ , ok := cmdmap["gmcmd"]; ok {
			gmcommands:= make(map[string]string)
			for k ,v := range cmdmap { gmcommands[k] = v.(string) }
			DoGMCmd(gmcommands, util.BytesToString(body))
			break
		}
	}


	// header 属性设置
	head := w.Header()
	head.Set("Content-Type", "text/plain; charset=utf-8")       // default
	head.Set("Access-Control-Allow-Origin", "*")       // 允许客户端跨域
	//head.Set("Content-Type", "application/json")
	//head.Set("Content-Type", "application/x-www-form-urlencoded")

	// ret code
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("gmcmd received"))
}

// 充值
func DoUserRecharge(cmd map[string]interface{}) {

	// 平台回调
	cb_orderid, ok1 := cmd["order_id"]
	cb_amount,  ok2 := cmd["amount"]
	cb_tvmid,   ok3 := cmd["tvmid"]
	if ok1 == false || ok2 == false || ok3 == false {
		log.Error("[充值] 平台返回充值信息不完整 order:%s amount:%f tvmid:%s", cb_orderid, cb_amount, cb_tvmid)
		return
	}

	detail, err := Redis().Get(cb_orderid.(string)).Bytes()
	if err != nil {
		log.Error("[充值] 本地订单不存在 order:%s", cb_orderid.(string))
		return
	}

	// 本地订单
	ordermap := make(map[string]interface{})
	unerr := json.Unmarshal(detail, &ordermap)
	if unerr != nil {
		return
	}

	lo_orderid, ok1 := ordermap["order_id"]
	lo_amount, 	ok2 := ordermap["amount"]
	lo_tvmid, 	ok3 := ordermap["tvmid"]
	if ok1 == false || ok2 == false || ok3 == false {
		log.Error("[充值] 本地订单不完整 order:%s amount:%f tvmid:%s", lo_orderid, lo_amount, lo_tvmid)
		return
	}

	// 校验订单
	if cb_orderid != lo_orderid || cb_amount != lo_amount || cb_tvmid != lo_tvmid {
		log.Error("[充值] 本地订单和回调订单不匹配 cb_orderid:%s lo_orderid:%s", cb_orderid, lo_orderid)
		return
	}

	// 解析 userid
	orderid := lo_orderid.(string)
	amount := uint32(lo_amount.(float64))		// 单位，分
	orderpart := strings.Split(orderid ,"_")
	if len(orderpart) != 3 {
		return
	}
	userid := orderpart[0]
	yuanbao := uint32(amount * 10 / 100)		// 1元:10元宝

	// 标记已经处理的订单
	Redis().Del(orderid)
	Redis().SRem(fmt.Sprintf("%s_submit_recharge_orders", userid), orderid)

	// 已经核实的订单，可以把钱加到身上了 (recharge_order_userid_timestamp_amount_number)
	order_amount := fmt.Sprintf("%s_amount_%d", orderid, yuanbao)	// 订单号 + 元宝
	keyorder := fmt.Sprintf("%s_verified_recharge_orders", userid)
	Redis().SAdd(keyorder, order_amount)
	log.Info("[充值] 成功处理订单 详情[%s]", util.BytesToString(detail))
}

// GM指令处理
func DoGMCmd(cmd map[string]string, origin string) {
	value, ok := cmd["gmcmd"]
	if !ok {
		log.Error("找不到gmcmd字段")
		return
	}

	switch value {
	case "consume":
		DoConsumeCount(cmd)
		break
	case "login":
		DoLoginCount(cmd)
		break
	case "compen":
		DoCompensation(cmd)
		break
	case "reload":
		DoReload(cmd, origin)
		break
	}
}

func DoConsumeCount(cmd map[string]string) {
	strdate, dateok := cmd["date"]
	if !dateok {
		log.Info("没有date")
		return
	}

	strday, dayok := cmd["day"]
	if !dayok {
		log.Info("没有day")
		return
	}

	intday, err := strconv.Atoi(strday)
	if err != nil {
		log.Info("没有day2")
		return
	}

	starttime, _ := time.Parse("2006-01-02", strdate)

	currencylist := []int32{6001, 6002, 6003, 10001, 10002}
	for i := 0; i < intday; i++ {
		newtime := starttime.AddDate(0, 0, 0+i)
		if newtime.YearDay() > time.Now().YearDay() {
			break
		}
		datetime := newtime.Format("2006-01-02")

		for _, j := range currencylist {
			iconfig := tbl.ItemBase.ItemBaseDataById[uint32(j)]
			if iconfig == nil {
				continue
			}
			key := fmt.Sprintf("%s_%d_item_add", datetime, j)
			get, geterr:= Redis().Get(key).Int64()
			key2 := fmt.Sprintf("%s_%d_item_remove", datetime, j)
			remove, removeerr := Redis().Get(key2).Int64()
			if (geterr == nil && removeerr == nil){
			}
			log.Info("产品数据统计,日期:%s,产品id:%d, 名字:%s，总产出:%d, 总收入:%d", datetime, j, iconfig.Name, get, remove)
		}

		//for _, dconfig := range tbl.DungeonsBase.TDungeonsById {
		//	if dconfig == nil {
		//		continue
		//	}
		//	iconfig := tbl.ItemBase.ItemBaseDataById[dconfig.Rewardid]
		//	if iconfig == nil {
		//		continue
		//	}
		//	key := fmt.Sprintf("%s_%d_jumpcount", datetime, dconfig.Rewardid)
		//	jumpcount, costerr := Redis().Get(key).Int64()
		//	key2 := fmt.Sprintf("%s_%d_item_add", datetime, dconfig.Rewardid)
		//	get, geterr:= Redis().Get(key2).Int64()

		//	if geterr == nil || costerr == nil {
		//	}
		//	log.Info("产品数据统计,日期:%s,产品id:%d, 名字:%s, 总次数:%d，命中:%d", datetime, dconfig.Rewardid, iconfig.Name, jumpcount, get)

		//	// 房间产出和收入
		//	key3 := fmt.Sprintf("%s_%d_room_output", datetime, dconfig.Id)
		//	output, _ := Redis().Get(key3).Int64()
		//	key4 := fmt.Sprintf("%s_%d_room_income", datetime, dconfig.Id)
		//	income, _ := Redis().Get(key4).Int64()
		//	log.Info("房间数据统计,日期:%s,房间id:%d 产出元宝:%d 收入金币:%d", datetime, dconfig.Id, output, income)
		//}
	}
}

func DoLoginCount(cmd map[string]string) {
	strdate, dateok := cmd["date"]
	if !dateok {
		log.Info("没有date")
		return
	}

	strday, dayok := cmd["day"]
	if !dayok {
		log.Info("没有day")
		return
	}

	intday, err := strconv.Atoi(strday)
	if err != nil {
		log.Info("没有day2")
		return
	}

	starttime, _ := time.Parse("2006-01-02", strdate)

	for i := 0; i < intday; i++ {
		newtime := starttime.AddDate(0, 0, 0+i)
		datetime := newtime.Format("2006-01-02")
		if newtime.YearDay() > time.Now().YearDay() {
			break
		}

		key := fmt.Sprintf("%s_loginsum", datetime)
		sum, _ := Redis().Get(key).Int64()

		key2 := fmt.Sprintf("%s_create", datetime)
		create , _ := Redis().Get(key2).Int64()

		strlogin, tmptime := "", newtime
		for count := 2; count <= 15; count++ {
			// 连续登陆数
			loginkey2 := fmt.Sprintf("%s_login_%d", datetime, count)
			login2, loginerr := Redis().Get(loginkey2).Int64()
			if loginerr != nil { continue }

			// 新增用户数
			datetime2 := tmptime.AddDate(0, 0, 1-count).Format("2006-01-02")
			key2 := fmt.Sprintf("%s_create", datetime2)
			sum2, sumerr2 := Redis().Get(key2).Int64()
			if sumerr2 != nil { continue }

			per := float64(login2) / float64(sum2) * 100
			tmpstr := fmt.Sprintf(", %d日留存:%6.2f", count, per)
			strlogin += tmpstr
		}

		log.Info("登陆统计,日期:%s,登陆总数:%d 新增用户:%d 活跃用户:%d %s", datetime, sum, create, sum - create, strlogin)
	}
}

func DoCompensation(cmd map[string]string) {

	strname, nameok := cmd["name"]
	if !nameok {
		log.Info("没有名字")
		return
	}

	strid, idok := cmd["id"]
	if !idok {
		log.Info("没有id")
		return
	}

	strnum, numok := cmd["num"]
	if !numok {
		log.Info("没有num")
		return
	}

	strinfo := strid + ":" + strnum

	strkey := fmt.Sprintf("compen_%s", strname)
	Redis().SAdd(strkey, strinfo)

	log.Info("GM指令补偿玩家%s, 道具%s, 数量%s", strname, strid, strnum)
}

func DoReload(cmd map[string]string, origin string) {	
	Match().Reload()

	send := &msg.MS2Server_BroadCast{}
	send.Cmd = pb.String(origin)
	RoomSvrMgr().BroadCast(send)
	GateSvrMgr().Broadcast(send)
}


