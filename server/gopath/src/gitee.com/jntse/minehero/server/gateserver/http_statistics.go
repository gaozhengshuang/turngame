package main
import (
	"strconv"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/minehero/server/def"
)

// post addr 1000001 token
func TestHttpPostRedPacketPlatform(subcmd []string) {
	if len(subcmd) < 4 {
		log.Error("cmd param is less than 3")
		return
	}

	cmd, token := subcmd[1], subcmd[3]
	charid, _ := strconv.ParseInt(subcmd[2], 10, 64)
	pUser := UserMgr().FindById(uint64(charid))
	if pUser == nil {
		log.Error("not find user charid=[%s]", subcmd[2])
		return
	}

	if token == "" {
		token = def.GetUserToken(Redis(), uint64(charid))
	}

	tvmid := pUser.Account();
	switch cmd {
	case "addr":
		//RequestUserHomeAddress("wxh5ac32853d4189a5a4cd51b36"  , "red_5f55f44b0afd45a199bdcf2a8003c337")
		RequestUserHomeAddress(tvmid, token)
	case "recharge":
		RequestRecharge(tvmid, token, pUser, 100)
	case "new":
		arglist := []interface{}{tvmid, token, pUser.Name(), uint64(charid)}
		event := eventque.NewCommonEvent(arglist, def.HttpRequestNewUserArglist, nil)
		pUser.AsynEventInsert(event)
	case "online":
		arglist := []interface{}{tvmid, token, uint64(charid), int64(1)}
		event := eventque.NewCommonEvent(arglist, def.HttpRequestUserOnlineTimeArglist, nil)
		pUser.AsynEventInsert(event)
	case "battle":
		arglist := []interface{}{tvmid, token, uint64(charid), "1", int32(1)}
		event := eventque.NewCommonEvent(arglist, def.HttpRequestUserBattleCountArglist, nil)
		pUser.AsynEventInsert(event)
	case "level":
		arglist := []interface{}{tvmid, token, uint64(charid), uint32(pUser.Level() + 2)}
		event := eventque.NewCommonEvent(arglist, def.HttpRequestUserLevelArglist, nil)
		pUser.AsynEventInsert(event)
	case "win":
		arglist := []interface{}{tvmid, token, uint64(charid), "1", int32(1)}
		event := eventque.NewCommonEvent(arglist, def.HttpRequestUserVictoryArglist, nil)
		pUser.AsynEventInsert(event)
	case "resadd":
		arglist := []interface{}{tvmid, token, uint64(charid), uint32(10)}
		event := eventque.NewCommonEvent(arglist, def.HttpRequestUserResourceEarnArglist, nil)
		pUser.AsynEventInsert(event)
	case "resdec":
		arglist := []interface{}{tvmid, token, uint64(charid), uint32(10)}
		event := eventque.NewCommonEvent(arglist, def.HttpRequestUserResourceConsumeArglist, nil)
		pUser.AsynEventInsert(event)
	case "query":
		def.HttpRequestFinanceQuery(uint64(charid), token, tvmid)
	case "decrcoin":
		def.HttpRequestDecrCoins(uint64(charid), token, tvmid, 1, "跳跃测试扣除")
	case "wechat":
		def.HttpRequestCheckWechatBound(uint64(charid), token, tvmid)
	case "diamond":
		def.HttpRequestIncrDiamonds(uint64(charid), token, tvmid, 1, "跳跳测试添加")
	default:
		log.Warn("无效的测试指令 'post %s %d %s'", cmd, charid, token)
	}
}

