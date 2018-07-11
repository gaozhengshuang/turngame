package def
import (
	"fmt"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
)


// 预定义redis key
const (
	RedisKeyAccountGate  = "account_gateinfo"
	RedisKeyGateAccounts = "gate_accounts"
)


// 组装带颜色字体的公告内容
func MakeNoticeText(text string, color string, size int32) string {
	return fmt.Sprintf(`<color=%s>%s</color>`, color, text)
}


func CheckSessionBindAccount(session network.IBaseNetSession) (string) {
	account, ok := session.UserDefData().(string)
	if ok == false {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return ""
	}
	return account
}
