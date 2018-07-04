package main
import ( 
	"time"
	_"reflect"
	"fmt"
	_"math/rand"
	"crypto/md5"
	"strings"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/gotoolkit/util"
	_"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
)


//func init() {
//	NewC2LSMsgHandler()
//}

type C2LSMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewC2LSMsgHandler() *C2LSMsgHandler {
	handler := &C2LSMsgHandler{}
	handler.Init()
	return handler
}

func (this* C2LSMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("C2LS_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收
	this.msgparser.RegistProtoMsg(msg.C2L_ReqLogin{}, on_C2L_ReqLogin)
	this.msgparser.RegistProtoMsg(msg.C2L_ReqRegistAccount{}, on_C2L_ReqRegistAccount)
	this.msgparser.RegistProtoMsg(msg.C2L_ReqRegistAuthCode{}, on_C2L_ReqRegistAuthCode)


	// 发
	this.msgparser.RegistSendProto(msg.L2C_RetLogin{})
	this.msgparser.RegistSendProto(msg.L2C_RetRegistAccount{})
}

func newL2C_RetLogin(reason string, ip string, port int, key string) *msg.L2C_RetLogin {
	send := &msg.L2C_RetLogin {
		Result : pb.Int32(1),
		Reason : pb.String(reason),
		Gatehost : &msg.IpHost {
		Ip : pb.String(ip),
		Port : pb.Int(port),
		},
		Verifykey : pb.String(key),
	}
	if reason != "" {
		send.Result = pb.Int32(0)
	}
	return send
}

// 获取手机验证码
func on_C2L_ReqRegistAuthCode(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2L_ReqRegistAuthCode)
	//GetRegistAuthCode(tmsg.GetPhone())
}

// 获取注册短信验证码
func GetRegistAuthCode(phone string) string {
	errcode, keyauthcode := "", fmt.Sprintf("regist_phone_%s", phone)
	switch {
	default:
		// 手机是否已经注册过
		accountkey := fmt.Sprintf("accounts_%s", phone)
		accountexist, _ := Redis().Exists(accountkey).Result()
		if accountexist == 1 {
			errcode = "该手机号已经注册过了"
			break
		}

		// 检查redis是否获取过验证码(自动过期)
		exist , _ := Redis().Exists(keyauthcode).Result()
		if exist == 1 {
			errcode = "稍后再试"
			break
		}

		authcode := def.SendSms(phone)
		if authcode == "" {
			errcode = "发送验证码失败"
			break
		}

		// 缓存验证码
		Redis().Set(keyauthcode, authcode, time.Second * 60).Result()
	}

	if errcode != "" { log.Error("获取注册验证码失败 %s [%s]", keyauthcode, errcode) }
	return errcode 
}

// 注册账户
func on_C2L_ReqRegistAccount(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2L_ReqRegistAccount)
	errcode, phone, passwd, authcode, invitationcode := "", tmsg.GetPhone(), tmsg.GetPasswd(), tmsg.GetAuthcode(), tmsg.GetInvitationcode()
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
		if err != nil {
			errcode = "redis暂时不可用"
			log.Error("检查账户是否存在 Redis错误:%s", err)
			break
		}
		
		if svrauthcode == "" {
			errcode = "验证码已过期"
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

	// 回复
	send := &msg.L2C_RetRegistAccount{Errcode : pb.String(errcode) }
	session.SendCmd(send)
	if errcode != "" { log.Info("[注册] 账户[%s] 注册失败[%s]", phone, errcode) }
}


// --------------------------------------------------------------------------
/// @brief 注册账户
///
/// @param account 账户名
/// @param passwd 密码
/// @param invitationcode 邀请码
/// @param 
///
/// @return 
// --------------------------------------------------------------------------
func registAccount(account, passwd, invitationcode, token string) (errcode string) {
	errcode = ""
	switch {
	default:
		// 账户检查重复
		key := fmt.Sprintf("accounts_%s", account)
		bexist, _ := Redis().Exists(key).Result()
		if bexist == 1 {
			errcode = "账户已经存在"
			break
		}

		// 保存密码
		passwdkey := fmt.Sprintf("accounts_passwd_%s", account)
		if _, err := Redis().Set(passwdkey, passwd, 0).Result(); err != nil {
			errcode = "缓存账户密码失败"
			break
		}


		// 实名认证
		// 生成唯一userid
		userid , errstr := GenerateUserId()
		if errstr !=  "" {
			errcode = errstr
			break
		}

		// 新建账户
		info := &msg.AccountInfo {
			Account: &account,
			Passwd: &passwd,
			Userid: pb.Uint64(userid),
		}

		if err := utredis.SetProtoBin(Redis(), key, info); err != nil {
			errcode = "插入账户数据失败"
			log.Error("新建账户%s失败，err: %s", account, err)
			break
		}
		
		// 初始元宝和金卷
		Yuanbao := uint32(tbl.Global.Newuser.Yuanbao)
		userinfo := &msg.Serialize {
			Entity : &msg.EntityBase{ Id:pb.Uint64(userid), Name:pb.String(""), Face:pb.String(""), Account:pb.String(account) },
			Base : &msg.UserBase{Money: pb.Uint32(1000), Invitationcode:pb.String(invitationcode), Yuanbao:pb.Uint32(Yuanbao), Level:pb.Uint32(1)},
			Item : nil,
		}
		userkey := fmt.Sprintf("userbin_%d", userid)
		log.Info("userinfo=%v",userinfo)
		if err := utredis.SetProtoBin(Redis(), userkey, userinfo); err != nil {
			errcode = "插入玩家数据失败"
			log.Error("新建账户%s插入玩家数据失败，err: %s", account, err)
			break
		}

		log.Info("账户[%s] UserId[%d] 创建新用户成功", account, userid)
		ProcessInvitationUser(userid, invitationcode)
	}

	if errcode != "" {
		log.Info("账户[%s] 创建新用户失败 err[%s]", account, errcode)
	}

	return errcode
}


// 请求登陆验证
func on_C2L_ReqLogin(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2L_ReqLogin)
	tm1 := util.CURTIMEUS()
	errcode, account, passwd := "", tmsg.GetAccount(), tmsg.GetPasswd()
	switch {
	default:
		// 1. 多Gate时避免多客户端同时登陆
		// 2. 已经登陆上的账户，在对应的Gate中要验证是否重复登陆
		if account == "" || strings.Contains(account, " ") {
			errcode = "账户空字符串或包含空格"
			break
		}

		// 登陆验证
		if errcode = Authenticate(session, account, passwd); errcode != "" {
			break
		}

		if Login().FindAuthenAccount(account) == true {
			errcode = "同时登陆多个账户"
			break
		}

		// TODO: 从Redis获取账户缓存Gate信息，实现快速登陆
		log.Info("账户[%s]登陆Login ", account)
		if ok := QuickLogin(session, account); ok == true {
			return
		}

		// 挑选一个负载较低的agent
		agent := GateMgr().FindLowLoadGate()
		if agent == nil {
			errcode = "没有可用Gate"
			break
		}

		// 生成校验key，玩家简单信息发送到对应Gate,用于验证玩家登陆Gate合法
		now := util.CURTIMEMS()
		signbytes := []byte(fmt.Sprintf("<%d-%s>", now, account))
		md5array := md5.Sum(signbytes)
		md5bytes := []byte(md5array[:])
		md5string := fmt.Sprintf("%s_%x", account, md5bytes)

		sendmsg := &msg.L2GW_ReqRegistUser{
			Account : pb.String(account),
			Expire : pb.Int64(now+10000),	// 10秒
			Gatehost : pb.String(agent.Host()),
			Sid : pb.Int(session.Id()),
			Timestamp: pb.Int64(now),
			Verifykey : pb.String(md5string),
		}
		agent.SendMsg(sendmsg)
		Login().AddAuthenAccount(account, session)		// 避免同时登陆
		tm5 := util.CURTIMEUS()
		log.Info("登陆验证通过，请求注册玩家到Gate sid[%d] account[%s] host[%s] 登陆耗时%dus", session.Id(), account, agent.Host(), tm5-tm1)
		return
	}

	if errcode != "" {
		log.Info("账户:[%s] sid[%d] 登陆报错[%s]", account, session.Id(), errcode)
		session.SendCmd(newL2C_RetLogin(errcode, "", 0, ""))
		session.Close()
	}
}


