package main
import (
	"gitee.com/jntse/gotoolkit/log"
	_"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)

type IBaseUser interface {
	Init()
}

type UserAccount struct {
	account string
	passwd  string
	phone   string
	idcard  string
}

type UserBase struct {
	UserAccount				// 匿名字段，字段名就是类型名
	islogin		bool
	verifykey 	string
	data        msg.Serialize
}

//func newUserBase(acc string, pw string, ph string, idcard string) *UserBase {
//	return &UserBase{ UserAccount:UserAccount{account:acc, passwd:pw, phone:ph, idcard:idcard }}
//}

func (this *UserBase) Init(acc string, pwd string, ph string, idcard string) {
	this.account = acc
	this.passwd = pwd
	this.phone = ph
	this.idcard = idcard
}

func (this *UserBase) SetVerifykey(key string) {
	this.verifykey = key
}

func (this *UserBase) Account() string {
	return this.account
}

func (this *UserBase) Name() string {
	return this.data.GetEntity().GetName()
}

func (this *UserBase) Id() uint64 {
	return this.data.GetEntity().GetId()
}

func (this *UserBase) Face() string {
	return this.data.GetEntity().GetFace()
}

func (this *UserBase) LoadUserData(tmsg *msg.GW2C_SendUserInfo) {
	//this.data = pb.Clone(db).(*msg.Serialize)
	this.data.Entity = pb.Clone(tmsg.Entity).(*msg.EntityBase)
	this.data.Base   = pb.Clone(tmsg.Base).(*msg.UserBase)
	this.data.Item   = pb.Clone(tmsg.Item).(*msg.ItemBin)

	log.Info("玩家数据: ==========")
	log.Info("%v",  this.data)
	//log.Info("%#v", this.data.GetEntity())
	//log.Info("%#v", this.data.GetBase())
	//log.Info("%#v", this.data.GetItem())
	log.Info("玩家数据: ==========")
}

func (this *UserBase) NewRegistAccountMsg() *msg.C2L_ReqRegistAccount {
	msg := &msg.C2L_ReqRegistAccount{
		Phone: pb.String(this.account),
		Passwd: pb.String(this.passwd),
		Authcode: pb.String("robot@free@regist"),
		Invitationcode: pb.String(""),
		Nickname: pb.String(this.account),
	}
	return msg
}

func (this *UserBase) NewReqLoginMsg() *msg.C2L_ReqLogin {
	msg := &msg.C2L_ReqLogin {
		Account:pb.String(this.account),
		Passwd:pb.String(this.passwd),
	}
	return msg
}

func (this *UserBase) NewReqLoginGateMsg() *msg.C2GW_ReqLogin {
	msg := &msg.C2GW_ReqLogin {
		Account : pb.String(this.account),
		Verifykey : pb.String(this.verifykey),
	}
	return msg
}

//func (this *UserBase) NewReqMatchMsg(mode int) *msg.C2GW_ReqStartMatch {
//	msg := &msg.C2GW_ReqStartMatch {
//		Mode : pb.Int(mode),
//	}
//	return msg
//}

//func (this *UserBase) NewCancelMatchMsg() *msg.C2GW_ReqCancelMatch {
//
//	msg := &msg.C2GW_ReqCancelMatch {
//		//Userid : pb.Uint64(this.id),
//	}
//	return msg
//}
