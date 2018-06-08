package def
import (
	"fmt"
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



