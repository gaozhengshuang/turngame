package main
import (
	"fmt"
	"net/http"
	"encoding/json"
	"github.com/go-redis/redis"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/server/def"
)

// 定义Http解析参数 字段名首字母必须大写
type HttpArguBaseCmd struct {
	GMCmd string
}

type HttpArguAccountAuthCode struct {
	GMCmd string
	Phone string
}

type HttpArguRegitstAccount struct {
	GMCmd 		string
	Phone 		string
	Passwd 		string
	Authcode 	string
	Invitationcode string
}

// TODO：回调函数有http底层单独的协程调用，想要单线程处理可以将数据push到主线程chan中
func HttpServerResponseCallBack(w http.ResponseWriter, urlpath string, rawquery string, body []byte) {
	log.Info("HttpServerResponseCallBack[rid=%d]", util.GetRoutineID())

	//
	log.Info("urlpath: %s", urlpath)
	log.Info("rawquery: %s", rawquery)
	log.Info("body: %s", string(body))
	respbody := ""

	switch {
	default:

		// 基础解析
		objcmd := &HttpArguBaseCmd{}
		objerror := json.Unmarshal(body, objcmd)
		if objerror != nil {
			log.Error("HttpServerResponseCallBack json.Unmarshal to HttpArguBaseCmd err[%s]", objerror)
			respbody = "无法解析json参数"
			break
		}

		// 注册账户
		if objcmd.GMCmd == "registauthcode" {
			respbody = HttpGetRegistAuthCode(body)
			break
		}else if objcmd.GMCmd == "registaccount" {
			respbody = HttpRegistAccount(body)
			break
		}


		// GM指令
		cmdmap := make(map[string]interface{})
		unerr := json.Unmarshal(body, &cmdmap)
		if unerr != nil {
			log.Error("HttpServerResponseCallBack json.Unmarshal to map[string]interface{} err[%s]", unerr)
			respbody = "无法解析json参数"
			break
		}

		if _ , ok := cmdmap["gmcmd"]; ok {
			gmcommands:= make(map[string]string)
			for k ,v := range cmdmap { gmcommands[k] = v.(string) }
			respbody = DoGMCmd(gmcommands)
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
	respcode := 0
	if respbody != "" { respcode = -1 }
	respjson := fmt.Sprintf(`{"status":%d, "msg":"%s"}`, respcode, respbody)
	w.WriteHeader(http.StatusOK)
	//w.WriteHeader(http.StatusNotFound)
	//w.Write([]byte("hello golang http test"))
	w.Write([]byte(respjson))
}


// GM指令处理
func DoGMCmd(cmd map[string]string) string {
	value, ok := cmd["gmcmd"]
	if !ok {
		log.Error("找不到gmcmd字段")
		return "找不到gmcmd字段"
	}

	switch value {
	case "reload":
		return DoReload(cmd)
	case "wechatpay":
		return DoWeChatPay(cmd)
	}

	return "错误的cmd类型"
}

func DoReload(cmd map[string]string) string {
	Login().Reload()
	return ""
}

func DoWeChatPay(cmd map[string]string) string {
	openid := cmd["openid"]
	def.HttpWechatCompanyPay(openid)
	return ""
}

func HttpGetRegistAuthCode(body []byte) string {
	objcmd := &HttpArguAccountAuthCode{}
	objerror := json.Unmarshal(body, objcmd)
	if objerror != nil {
		log.Error("json.Unmarshal to HttpArguAccountAuthCode err[%s]", objerror)
		return "解析json参数失败"
	}

	return GetRegistAuthCode(objcmd.Phone)
}

func HttpRegistAccount(body []byte) string {
	objcmd := &HttpArguRegitstAccount{}
	objerror := json.Unmarshal(body, objcmd)
	if objerror != nil {
		log.Error("json.Unmarshal to HttpArguRegitstAccount err[%s]", objerror)
		return "解除json参数失败"
	}

	errcode, phone, passwd, authcode, invitationcode := "", objcmd.Phone, objcmd.Passwd, objcmd.Authcode, objcmd.Invitationcode
	switch {
	default:
		if phone == "" {
			errcode = "手机号不能为空"
			break
		}

		if authcode == "" {
			errcode = "请填写验证码"
			break
		}

		if passwd == "" {
			errcode = "密码不能为空"
			break
		}

		key := fmt.Sprintf("regist_phone_%s", phone)
		svrauthcode , err := Redis().Get(key).Result()
		if err == redis.Nil {
			errcode = "无效的验证码"
			break
		}else if err != nil {
			errcode = "redis暂时不可用"
			log.Error("检查账户是否存在 Redis错误:%s", err)
			break
		}
		
		if svrauthcode != authcode {
			errcode = "验证码错误"
			break
		}

		// 验证通过
		account := phone
		errcode = registAccount(account, passwd, invitationcode, "")
	}

	// 回复客户端
	if errcode != "" { log.Info("[注册] 账户[%s] 注册失败[%s]", phone, errcode) }
	return errcode
}


