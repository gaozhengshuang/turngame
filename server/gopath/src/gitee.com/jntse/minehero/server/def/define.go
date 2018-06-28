package def
import (
	"fmt"
	"strconv"
	"encoding/base64"
	"encoding/json"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"

	"gitee.com/jntse/minehero/server/tbl"
)


// 预定义redis key
const (
	RedisKeyAccountGate  = "account_gateinfo"
	RedisKeyGateAccounts = "gate_accounts"
)


// 组装带颜色字体的公告内容
func MakeNoticeText(text string, color string, size int32) string {
	return fmt.Sprintf(`<font color="%s" size=%d>%s</font>`, color, size, text)
}

// 发送短信
func SendSms(phone string) (authcode string) {

	// make body
	randcode := util.RandBetween(10000,99999)
	body := fmt.Sprintf(`{
		"batchName":"巨枫娱乐测试",
		"content":"%s:%d",
		"msgType":"sms",
		"items":[ { "to":"%d" } ]
	}`, tbl.Global.Sms.AuthCodeContent, randcode, phone)

	// make properties
	Auth := tbl.Global.Sms.Account + "=" + util.MD5(tbl.Global.Sms.Passwd)	// md5加密
	AuthBase64:= base64.StdEncoding.EncodeToString([]byte(Auth))	// base64加密
	Contentlength := strconv.FormatInt(int64(len(body)), 10)	// 这个参数可选
	ContentType := "application/json"
	properties := map[string]string{ "Content-Type":ContentType, "Authorization":AuthBase64, "Content-length":Contentlength ,"Accept":ContentType}

	// make request
	url := tbl.Global.Sms.URLAPI
	resp, err := network.HttpSendByProperty("POST", url ,body, properties)
	if err != nil {
		log.Error("TestPostSms HttpPost phone=%s err=[%v]", phone, err)
		return ""
	}

	if resp.Code != 200 {
		log.Error("TestPostSms HttpPost phone=%s 失败 Code=%d", phone, resp.Code)
		return ""
	}

	type stHttpResp struct {
		Code string
		Msg  string
		UUID string
	}
	
	RespObj := &stHttpResp{}
	unerror := json.Unmarshal(resp.Body, RespObj)
	if unerror != nil {
		log.Error("TestPostSms Unmarshal resp.body失败 phone=%s err[%s]", phone, unerror)
		return ""
	}

	log.Trace("TestPostSms body=%s", resp.Body)
	log.Trace("TestPostSms RespObj=%#v", RespObj)
	log.Info("手机:%d 生成验证码:%d", phone, randcode)
	authcode = strconv.FormatInt(int64(randcode), 10)
	return authcode
}

