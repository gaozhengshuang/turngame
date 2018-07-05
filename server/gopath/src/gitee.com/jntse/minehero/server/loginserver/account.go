package main
import (
	"fmt"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/redis"
	_"gitee.com/jntse/gotoolkit/util"
	"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/minehero/server/def"
)

type ClientAccount struct {
	session network.IBaseNetSession
	account string
	tm_login int64
}

// 查找账户绑定Gate
func FindAccountGateWay(account string) (*msg.AccountGateInfo, error ) {
	info := &msg.AccountGateInfo{}
	key:= fmt.Sprintf("%s_%s", def.RedisKeyAccountGate, account)
	err := utredis.GetProtoBin(Redis(), key, info);
	if err == redis.Nil { return nil, nil }
	if err != nil { return nil, err }

	ip, port := info.GetIp(), int(info.GetPort())
	if GateMgr().IsRegisted(ip, port) == false {
		log.Error("账户%s 存储的网关host %s:%d 不可用", account, ip, port)
		return nil, nil
	}

	return info, nil
}

// 绑定账户一个Gate
func BindingAccountGateWay(account string, ip string, port int, vkey string) error {
	key := fmt.Sprintf("%s_%s", def.RedisKeyAccountGate, account)
	info := &msg.AccountGateInfo { Ip : pb.String(ip), Port : pb.Int(port), Verifykey : pb.String(vkey) }
	if err := utredis.SetProtoBin(Redis(), key, info); err != nil {
		return err
	}
	err := InsertAccountToGate(account, ip, port)
	return err
}

// 移除账户和Gate的绑定关系
func UnBindingAccountGateWay(account string) error	{
	key := fmt.Sprintf("%s_%s", def.RedisKeyAccountGate, account)
	err := Redis().Del(key).Err()
	return err
}

// 插入账户到Gate
func InsertAccountToGate(account string, ip string, port int) error {
	key := fmt.Sprintf("%s_%s:%d", def.RedisKeyGateAccounts, ip, port)
	err := Redis().SAdd(key, account).Err()
	return err
}

// 从Gate查找账户
func IsFindAccountFromGate(account string, ip string, port int) (bool, error) {
	key := fmt.Sprintf("%s_%s:%d", def.RedisKeyGateAccounts, ip, port)
	ok, err := Redis().SIsMember(key, account).Result()
	if err != nil { return false, err }
	return ok, nil
}

func AmountGateAccount(ip string, port int) int64	{
	key := fmt.Sprintf("%s_%s:%d", def.RedisKeyGateAccounts, ip, port)
	num, err := Redis().SCard(key).Result()
	if err != nil { return 0 }
	return num
}


//// 从Gate移除账户
//func RemoveAccountsFromGate(account string, ip string, port int) error {
//	key := fmt.Sprintf("%s_%s:%d", def.RedisKeyGateAccounts, ip, port)
//	err := Redis().SRem(key, account).Err()
//	return err
//}
//
//// 清除Gate上的账户信息
//func ClearGateAccounts(ip string, port int) error {
//	key := fmt.Sprintf("%s_%s:%d", def.RedisKeyGateAccounts, ip, port)
//	err := Redis().Del(key).Err()
//	return err
//}

func QuickLogin(session network.IBaseNetSession, account string) bool {
	host, err := FindAccountGateWay(account)
	if err != nil && err != redis.Nil {
		log.Error("账户%s Find Account GateWay 报错err: %v", account, err)
		return false
	}

	if host == nil {
		return false
	}

	// 检查Gate是否存在
	ip, port, vkey := host.GetIp(), int(host.GetPort()), host.GetVerifykey()
	if GateMgr().IsRegisted(ip, port) == false {
		return false
	}

	// 检查Gate上是否清除了玩家信息，例如Gate重启过
	isfind , err := IsFindAccountFromGate(account, ip, port); 
	if err != nil {	
		log.Error("账户%s Is Find Account FromGate 报错err: %s", account, err)
		return false
	}

	// 解除绑定Account上的Gateway信息，使用普通登陆
	if isfind == false {
		UnBindingAccountGateWay(account)
		//RemoveAccountsFromGate(account, ip, port)
		return false
	}

	log.Info("账户[%s] 快速登陆Gate[ip:%s port:%d]", account, ip, port)
	session.SendCmd(newL2C_RetLogin("", ip, port, vkey))
	Login().AddAuthenAccount(account, session)		// 避免同时登陆
	return true
}

// --------------------------------------------------------------------------
/// @brief 账户校验
/// @return 
// --------------------------------------------------------------------------
func Authenticate(session network.IBaseNetSession, account string, passwd string) (string) {

	// 校验账户密码
	key := fmt.Sprintf("accounts_passwd_%s", account)
	svrpasswd, err := Redis().Get(key).Result()
	if err == redis.Nil {
		return "账户未注册"
	}

	if svrpasswd != passwd {
		return "密码错误"
	}

	return ""
}

func ProcessInvitationUser(charid uint64, invitationcode string) {

	// 保存邀请人信息
	if len(invitationcode) < 2 {
		return
	}

	invitation_user := invitationcode[2:]
	invitkey := fmt.Sprintf("user_%d_invitation", charid)
	Redis().Set(invitkey, invitation_user, 0)

	// 转账给邀请人
	invitation_openid , geterror := Redis().Get(fmt.Sprintf("user_%d_wechat_openid", invitation_user)).Result()
	if geterror != nil {
		return
	}
	def.HttpWechatCompanyPay(invitation_openid, 1)

}


