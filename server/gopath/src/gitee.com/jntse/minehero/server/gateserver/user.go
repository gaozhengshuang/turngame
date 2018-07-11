package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/def"
	pb "github.com/golang/protobuf/proto"
	//"gitee.com/jntse/minehero/server/def"
	_"github.com/go-redis/redis"
	_"strconv"
	_"strings"
	_"time"
)

//const (
//	StayHall = 1		// 待在大厅
//	RoomCreating = 2	// 创建房间中
//	RoomCreateFail  = 3	// 失败
//	GamePlaying  = 4	// 游戏中
//	)

// --------------------------------------------------------------------------
/// @brief 玩家房间简单数据
// --------------------------------------------------------------------------
type RoomBase struct {
	roomid      int64
	sid_room    int
	kind        int32
	gridnum     int32
	tm_closing	int64		// 房间关闭超时
	creating	bool
}

func (this *RoomBase) Reset() {
	this.roomid = 0
	this.sid_room = 0
	this.kind = 0
	this.gridnum = 0
	this.tm_closing = 0
	this.creating = false
}

// --------------------------------------------------------------------------
/// @brief db数据管理
// --------------------------------------------------------------------------
type DBUserData struct {
	bin           *msg.Serialize // db二进制数据
	tm_login      int64
	tm_logout     int64
	money         uint32
	coupon        uint32
	yuanbao		  uint32
	level		  uint32
	exp			  uint32
	continuelogin uint32
	nocountlogin  uint32
	signreward	  uint32
	signtime	  uint32
	addrlist	  []*msg.UserAddress
	freestep	  int32
	givestep	  int64
}

// --------------------------------------------------------------------------
/// @brief 玩家
// --------------------------------------------------------------------------
type GateUser struct {
	DBUserData
	client			network.IBaseNetSession
	account			string
	verifykey		string
	online			bool
	tickers			UserTicker
	bag				UserBag // 背包
	tm_disconnect	int64
	tm_heartbeat	int64    	// 心跳时间
	tm_asynsave		int64		// 异步存盘超时
	savedone		bool		// 存盘标记
	cleanup			bool     	// 清理标记
	roomdata		RoomBase 	// 房间信息
	token			string	// token
	asynev			eventque.AsynEventQueue	// 异步事件处理
	fbitemmap		map[int32]int32
	deliverystate   bool		// 发货状态
	cartflag		uint32		// 超市游戏状态
	freetime		uint32		// 免费
	sumvaluemap		map[uint32]uint32
	freetype		uint32
	sumget			uint32
}

func NewGateUser(account, key, token string) *GateUser {
	u := &GateUser{account: account, verifykey: key}
	u.bag.Init(u)
	u.tickers.Init(u.OnTicker10ms, u.OnTicker100ms, u.OnTicker1s, u.OnTicker5s, u.OnTicker1m)
	u.cleanup = false
	u.tm_disconnect = 0
	u.continuelogin = 1
	u.tm_asynsave = 0
	u.savedone = false
	u.token = token
	u.fbitemmap = make(map[int32]int32)
	u.cartflag = 0
	u.freetime = 0
	u.sumvaluemap = make(map[uint32]uint32)
	u.freetype = 0
	u.sumget = 0
	return u
}

func (this *GateUser) Account() string {
	return this.account
}

func (this *GateUser) EntityBase() *msg.EntityBase {
	return this.bin.GetEntity()
}

func (this *GateUser) UserBase() *msg.UserBase {
	return this.bin.GetBase()
}

func (this *GateUser) Name() string {
	return this.EntityBase().GetName()
}

func (this *GateUser) Id() uint64 {
	return this.EntityBase().GetId()
}

func (this *GateUser) Face() string {
	return this.EntityBase().GetFace()
}

func (this *GateUser) SetFace(f string) {
	this.EntityBase().Face = pb.String(f)
}

func (this *GateUser) Sid() int {
	if this.client != nil { return this.client.Id() }
	return 0
}

func (this *GateUser) Level() uint32 {
	return this.level
}

func (this *GateUser) Exp() uint32 {
	return this.exp
}

func (this *GateUser) Token() string {
	return this.token
}

func (this *GateUser) SetToken(t string) {
	this.token = t
}

func (this *GateUser) GetDefaultAddress() *msg.UserAddress {
	if this.GetAddressSize() != 0 {
		return this.addrlist[0]
	}
	return nil
}

func (this *GateUser) SetDefaultAddress(addr string) {
	//this.address = addr
}

func (this *GateUser) AddAddress(receiver, phone, address string) {
	addr := &msg.UserAddress{Receiver:pb.String(receiver), Phone:pb.String(phone), Address:pb.String(address)}
	this.addrlist = append(this.addrlist, addr)
}

func (this *GateUser) GetAddressSize() uint32 {
	return uint32(len(this.addrlist))
}

func (this *GateUser) Verifykey() string {
	return this.verifykey
}

func (this *GateUser) IsOnline() bool {
	return this.online
}

func (this *GateUser) GameKind() int32 {
	return this.roomdata.kind
}

// 房间id
func (this *GateUser) RoomId() int64 {
	return this.roomdata.roomid
}

// 房间服务器 sid
func (this *GateUser) RoomSid() int {
	return this.roomdata.sid_room
}

// 是否有房间
func (this *GateUser) IsInRoom() bool {
	if this.RoomId() != 0 {
		return true
	}
	return false
}

// 正在创建房间
func (this *GateUser) IsRoomCreating() bool {	
	return this.roomdata.creating
}

// 房间关闭中
func (this *GateUser) IsRoomClosing() bool {
	return this.roomdata.tm_closing != 0
}

// 关闭超时, 10秒
func (this *GateUser) IsRoomCloseTimeOut() bool {
	return util.CURTIMEMS() > (this.roomdata.tm_closing + 10000)
}

func (this *GateUser) IsCleanUp() bool {
	return this.cleanup
}

func (this *GateUser) SendMsg(msg pb.Message) {
	if this.online == false {
		log.Info("账户[%s] [%d %s] 不在线", this.Account(), this.Id(), this.Name())
		return
	}
	this.client.SendCmd(msg)
}

// 玩家全部数据
func (this *GateUser) SendUserBase() {
	send := &msg.GW2C_SendUserInfo{}
	entity, base, item := this.bin.GetEntity(), this.bin.GetBase(), this.bin.GetItem()
	// clone类似c++的copyfrom
	send.Entity = pb.Clone(entity).(*msg.EntityBase)
	send.Base = pb.Clone(base).(*msg.UserBase)
	send.Item = pb.Clone(item).(*msg.ItemBin)
	this.SendMsg(send)
}

func (this *GateUser) IsLoadDB() bool {
	return this.bin != nil
}

func (this *GateUser) LoadDB() bool {
	key, info := fmt.Sprintf("accounts_%s", this.account), &msg.AccountInfo{}
	if err := utredis.GetProtoBin(Redis(), key, info); err != nil {
		log.Error("账户%s 获取账户数据失败，err: %s", this.account, err)
		return false
	}

	// 获取游戏数据
	this.bin = new(msg.Serialize)
	userkey := fmt.Sprintf("userbin_%d", info.GetUserid())
	if err := utredis.GetProtoBin(Redis(), userkey, this.bin); err != nil {
		log.Error("账户%s 获取玩家数据失败，err: %s", this.account, err)
		return false
	}

	this.OnLoadDB("登陆")
	return true
}

func (this *GateUser) OnLoadDB(way string) {
	log.Info("玩家数据: ==========")
	log.Info("账户%s 加载DB数据成功 方式[%s]", this.account, way)
	log.Info("%v", this.bin)
	log.Info("玩家数据: ==========")

	// 没有名字取个名字
	entity := this.bin.GetEntity()
	if entity == nil {
		this.bin.Entity = &msg.EntityBase{}
	}
	if entity.GetName() == "" {
		entity.Name = pb.String(fmt.Sprintf("%d_name", this.Id()))
	}

	// proto对象变量初始化
	if this.bin.Base == nil { this.bin.Base = &msg.UserBase{} }
	if this.bin.Base.Scounter == nil { this.bin.Base.Scounter = &msg.SimpleCounter{} }

	// 加载二进制
	this.LoadBin()

	// 新用户回调
	if this.tm_login == 0 {
		this.OnCreateNew()
	}
}

// 打包数据到二进制结构
func (this *GateUser) PackBin() *msg.Serialize {
	bin := &msg.Serialize{}

	// 基础信息
	bin.Entity = pb.Clone(this.bin.GetEntity()).(*msg.EntityBase)

	if bin.Base == nil { bin.Base = &msg.UserBase{} }
	if bin.Base.Scounter == nil { bin.Base.Scounter = &msg.SimpleCounter{} }

	userbase := bin.GetBase()
	userbase.Tmlogin = pb.Int64(this.tm_login)
	userbase.Tmlogout = pb.Int64(this.tm_logout)
	userbase.Money = pb.Uint32(this.money)
	userbase.Coupon = pb.Uint32(this.coupon)
	userbase.Yuanbao = pb.Uint32(this.yuanbao)
	userbase.Level = pb.Uint32(this.level)
	userbase.Exp = pb.Uint32(this.exp)
	userbase.Continuelogin = pb.Uint32(this.continuelogin)
	userbase.Nocountlogin = pb.Uint32(this.nocountlogin)
	userbase.Signreward	= pb.Uint32(this.signreward)
	userbase.Signtime	= pb.Uint32(this.signtime)
	//userbase.Addrlist = this.addrlist[:]
	userbase.GetScounter().Freestep = pb.Int32(this.freestep)
	userbase.GetScounter().Givestep = pb.Int64(this.givestep)

	for index, item := range this.fbitemmap {
		item := &msg.FootBallItem{Index:pb.Int32(index), Itemid:pb.Int32(item)}
		userbase.Fbitem = append(userbase.Fbitem, item)
	}

	userbase.Freetime = pb.Uint32(this.freetime)
	userbase.Freetype = pb.Uint32(this.freetype)
	userbase.Sumget = pb.Uint32(this.sumget)

	// 道具信息
	this.bag.PackBin(bin)

	//
	return bin
}

// 将二进制解析出来
func (this *GateUser) LoadBin() {

	// 基础信息

	// 玩家信息
	userbase := this.bin.GetBase()
	this.tm_login = userbase.GetTmlogin()
	this.tm_logout = userbase.GetTmlogout()
	this.money = userbase.GetMoney()
	this.coupon = userbase.GetCoupon()
	this.yuanbao = userbase.GetYuanbao()
	this.level = userbase.GetLevel()
	this.exp  = userbase.GetExp()
	this.continuelogin = userbase.GetContinuelogin()
	this.nocountlogin = userbase.GetNocountlogin()
	this.signreward = userbase.GetSignreward()
	this.signtime	= userbase.GetSigntime()	
	//this.addrlist = userbase.GetAddrlist()[:]
	this.freestep = userbase.GetScounter().GetFreestep()
	this.givestep = userbase.GetScounter().GetGivestep()

	for _, item :=  range userbase.GetFbitem(){
		this.fbitemmap[item.GetIndex()] = item.GetItemid()
	}

	this.freetime = userbase.GetFreetime()
	this.freetype = userbase.GetFreetype()
	this.sumget = userbase.GetSumget()

	// 道具信息
	this.bag.Clean()
	this.bag.LoadBin(this.bin)

}

// TODO: 存盘可以单独协程
func (this *GateUser) Save() {
	key := fmt.Sprintf("userbin_%d", this.Id())
	if err := utredis.SetProtoBin(Redis(), key, this.PackBin()); err != nil {
		log.Error("保存玩家[%s %d]数据失败", this.Name(), this.Id())
		return
	}

	log.Info("保存玩家[%s %d]数据成功", this.Name(), this.Id())
}

// 异步存盘完成回调
func (this *GateUser) AsynSaveFeedback() {
	this.savedone = true
}

// 新用户回调
func (this* GateUser) OnCreateNew() {
}

// 上线回调，玩家数据在LoginOk中发送
func (this *GateUser) Online(session network.IBaseNetSession) bool {

	if this.online == true {
		log.Error("Sid[%d] 账户[%s] 玩家[%d %s] Online失败，已经处于在线状态", this.Sid(), this.account, this.Id(), this.Name())
		return false
	}

	curtime := util.CURTIME()
	this.tickers.Start()
	this.asynev.Start(int64(this.Id()), 100)
	this.LoginStatistics()
	this.online = true
	this.client = session
	this.tm_login = curtime
	this.tm_disconnect = 0
	this.tm_heartbeat = util.CURTIMEMS()
	this.savedone = false
	this.roomdata.Reset()
	log.Info("Sid[%d] 账户[%s] 玩家[%d] 名字[%s] 登录成功", this.Sid(), this.account, this.Id(), this.Name())

	// 同步数据到客户端
	this.Syn()

	return true
}

func (this *GateUser) Syn(){
	this.SendUserBase()
	//this.SendSign()
	//this.CheckGiveFreeStep(util.CURTIME(), "上线跨整点")
	this.CheckHaveCompensation()
	//this.SyncBigRewardPickNum()
	this.QueryPlatformCoins()
	//this.SendFreeTime()
	this.InitTiger()
	//AutoGame()
}

func (this *GateUser) SendFreeTime() {
	if !util.IsSameDay(int64(this.freetime), util.CURTIME()) {
		send := &msg.GW2C_FreeThrow{Cost: pb.Uint32(1500)}
		this.SendMsg(send)
		return
	}
}

// 断开连接回调
func (this *GateUser) OnDisconnect() {
	log.Info("sid[%d] 账户%s 玩家[%s %d] 断开连接", this.Sid(), this.account, this.Name(), this.Id())
	if this.online == false {
		return
	}
	this.online = false
	this.client = nil
	this.tm_disconnect = util.CURTIMEMS()
	if this.IsInRoom() == true { this.SendRsUserDisconnect() }
	this.PlatformPushUserOnlineTime()
}

// 服务器下线玩家
func (this *GateUser) KickOut(way string) {
	log.Info("sid[%d] 账户[%s] [%d %s] KickOut 原因[%s]", this.Sid(), this.account, this.Id(), this.Name(), way)
	if this.online == false {
		return
	}
	this.online = false
	this.client.Close()
	this.client = nil
	this.tm_disconnect = util.CURTIMEMS()
	if this.IsInRoom() == true { this.SendRsUserDisconnect() }
	this.PlatformPushUserOnlineTime()
}

// 检查下线存盘
func (this *GateUser) CheckDisconnectTimeOut(now int64) {
	if this.tm_disconnect == 0 {
		return
	}

	// 延迟存盘清理
	if now < this.tm_disconnect + tbl.Global.Disconclean {
		return
	}

	// 等待房间关闭
	if this.IsInRoom() && !this.IsRoomCloseTimeOut() {
		return
	}

	// 异步事件未处理完
	if this.asynev.EventSize() != 0 || this.asynev.FeedBackSize() != 0 {
		return
	}

	// 异步存盘，最大延迟1秒
	//if this.tm_asynsave == 0 {
	//	this.tm_asynsave = now + 1000
	//	event := NewUserSaveEvent(this.Save)
	//	this.AsynEventInsert(event)
	//}
	//if now < this.tm_asynsave {
	//	return
	//}
	
	this.Logout()
}

// 真下线(存盘，从Gate清理玩家数据)
func (this *GateUser) Logout() {
	this.online = false
	this.tm_logout = util.CURTIME()
	this.cleanup = true
	this.Save()
	UnBindingAccountGateWay(this.account)
	this.asynev.Shutdown()

	log.Info("账户%s 玩家[%s %d] 存盘下线", this.account, this.Name(), this.Id())
}

// logout完成，做最后清理
func (this* GateUser) OnCleanUp() {
	this.tickers.Stop()
}

// 发送个人通知
func (this *GateUser) SendNotify(text string) {
	send := &msg.GW2C_MsgNotify{Text: pb.String(text)}
	this.SendMsg(send)
}

//发送个人通知2
func (this *GateUser) SendNotify2(text string) {
	send := &msg.GW2C_MsgNotice{Userid:pb.Uint64(0), Name:pb.String(""), Face:pb.String(""), Type:pb.Int32(int32(msg.NoticeType_Marquee)), Text:pb.String(text)}
	this.SendMsg(send)
}


// 发送房间消息
func (this *GateUser) SendRoomMsg(msg pb.Message) {
	if this.IsInRoom() == false {
		log.Error("玩家[%s %d]没有房间信息", this.Name(), this.Id())
		return
	}
	RoomSvrMgr().SendMsg(this.roomdata.sid_room, msg)
}

// 回复客户端
func (this *GateUser) ReplyStartGame(err string, roomid int64) {
	send := &msg.GW2C_RetStartGame{Errcode: pb.String(err), Roomid: pb.Int64(roomid)}
	this.SendMsg(send)
	if err != "" {
		log.Info("玩家[%s %d] 开始游戏失败: roomid=%d errcode=%s", this.Name(), this.Id(), roomid, err)
	}
}

// 请求开始游戏
func (this *GateUser) ReqStartGame(gamekind int32, gridnum int32) (errcode string) {

	// 检查游戏类型是否有效
	dunconfig , findid := tbl.DungeonsBase.TDungeonsById[gamekind]
	if findid == false {
		errcode = "无效的游戏类型"
		return
	}

	// 最小格子数检查
	if gridnum < (dunconfig.Size * 2 + 2) {
		errcode = "格子数太少了"
		return
	}

	if Match() == nil {
		log.Error("玩家[%s %d] 匹配服务器未连接", this.Name(), this.Id())
		errcode = "创建房间服务器不可用"
		return
	}

	//
	if RoomSvrMgr().Num() == 0 {
		log.Error("玩家[%s %d] 请求开房间，但是没有房间服务器", this.Name(), this.Id())
		errcode = "房间服务器不可用"
		return
	}

	// 创建中
	if this.IsRoomCreating() {
		log.Error("玩家[%s %d] 重复创建房间，正在创建房间中", this.Name(), this.Id())
		errcode = "正在创建房间中"
		return
	}

	// 有房间
	if this.IsInRoom() {
		log.Error("玩家[%s %d] 重复创建房间，已经有一个房间[%d]", this.Name(), this.Id(), this.RoomId())
		errcode = "重复创建房间"
		return
	}

	// 请求创建房间
	this.roomdata.kind = gamekind
	this.roomdata.gridnum = gridnum
	this.roomdata.creating = true

	//
	send := &msg.GW2MS_ReqCreateRoom{
		Userid:   pb.Uint64(this.Id()),
		Gamekind: pb.Int32(gamekind),
		Gridnum:  pb.Int32(gridnum),
	}
	Match().SendCmd(send)
	log.Info("玩家[%s %d] 请求创建房间类型:%d ts[%d]", this.Name(), this.Id(), gamekind, util.CURTIMEMS())
	return
}

// 开启游戏房间成功
func (this *GateUser) StartGameOk(servername string, roomid int64) {
	var agent *RoomAgent = RoomSvrMgr().FindByName(servername)
	if agent == nil {
		log.Error("玩家[%s %d] 开房间成功，但找不到RoomServer[%s]", this.Name(), this.Id(), servername)
		return
	}

	this.roomdata.roomid = roomid
	this.roomdata.sid_room = agent.Id()

	// TODO: 将个人信息上传到Room
	send := &msg.BT_UploadGameUser{}
	send.Roomid = pb.Int64(roomid)
	//send.Bin = pb.Clone(this.PackBin()).(*msg.Serialize)
	send.Bin = this.PackBin()
	agent.SendMsg(send)

	log.Info("玩家[%s %d] 创建房间[%d]成功 向RS上传玩家个人数据 ts[%d]", this.Name(), this.Id(), roomid, util.CURTIMEMS())
}

// 开启游戏房间失败
func (this *GateUser) StartGameFail(err string) {
	this.roomdata.Reset()
}

// 房间关闭
func (this *GateUser) GameEnd(bin *msg.Serialize, reason string) {

	// 重置房间数据
	log.Info("玩家[%s %d] 房间关闭 房间[%d] 原因[%s]", this.Name(), this.Id(), this.RoomId(), reason)
	this.roomdata.Reset()

	// 加载玩家最新数据
	if bin != nil {
		this.bin = pb.Clone(bin).(*msg.Serialize)
		this.OnLoadDB("房间结束")
		if this.IsOnline() { 
			this.SendUserBase()
			this.CheckGiveFreeStep(util.CURTIME(), "回大厅跨整点")
			this.SyncBigRewardPickNum()
			this.QueryPlatformCoins()
		}
	}
}

// 通知RS 玩家已经断开连接了
func (this *GateUser) SendRsUserDisconnect() {
	if this.roomdata.tm_closing != 0 { return }
	this.roomdata.tm_closing = util.CURTIMEMS()
	msgclose := &msg.GW2RS_UserDisconnect{Roomid: pb.Int64(this.roomdata.roomid), Userid: pb.Uint64(this.Id())}
	this.SendRoomMsg(msgclose)
	log.Info("玩家[%d %s] 通知RoomServer关闭房间", this.Id(), this.Name())
}


// 赠送每日免费次数，在房间中不要执行
// 每小时赠送免费次数，在房间中不要执行，退出房间再执行
func (this *GateUser) CheckGiveFreeStep(now int64, reason string) {
	if this.IsInRoom() == true { return }           // 退出房间再执行
	floor_clock := util.FloorIntClock(now)
	if floor_clock == this.givestep {   // 同一个整点
		return
	}
	this.SetFreeStep(int32(tbl.Global.PresentFreeStep), reason)
	this.givestep = floor_clock
}

// 插入新异步事件
func (this *GateUser) AsynEventInsert(event eventque.IEvent) {
	this.asynev.Push(event)
}

// 获取平台金币
func (this *GateUser) QueryPlatformCoins() {
	event := NewQueryPlatformCoinsEvent(this.SyncPlatformCoins)
	this.AsynEventInsert(event)
}

func (this *GateUser) SyncPlatformCoins () {
	errcode, coins, _ := def.HttpRequestFinanceQuery(this.Id(), this.Token(), this.Account())
	if errcode != "" {
		return
	}

	send := &msg.GW2C_SendUserPlatformMoney{Coins:pb.Int32(coins)}
	this.SendMsg(send)
}

// 扣除平台金币
func (this *GateUser) RemovePlatformCoins(amount int32, desc string) bool {
	tvmid := this.Account()
	removeok := def.HttpRequestDecrCoins(this.Id(), this.Token(), tvmid, amount, desc)
	if removeok == true {
		log.Info("玩家[%d] 扣除金币[%d] 库存[%d] 原因[%s]", this.Id(), amount, 0, desc)
	}
	return removeok
}

// 增加平台金币
func (this *GateUser) AddPlatformCoins(amount int32, desc string) bool {
	tvmid := this.Account()
	addok := def.HttpRequestIncrCoins(this.Id(), this.Token(), tvmid, amount, desc)
	if addok == true {
		log.Info("玩家[%d] 增加金币[%d] 库存[%d] 原因[%s]", this.Id(), amount, 0, desc)
	}
	return addok
}

// 推送资源消耗
func (this *GateUser) PlatformPushConsumeMoney(yuanbao float32) {
	rmbcent := 100.0 * yuanbao / float32(tbl.Room.RmbToYuanbao)
	arglist := []interface{}{this.Account(), this.Token(), uint64(this.Id()), uint32(rmbcent)}
	event := eventque.NewCommonEvent(arglist, def.HttpRequestUserResourceConsumeArglist, nil)
	this.AsynEventInsert(event)
}

// 推送资源获取
func (this *GateUser) PlatformPushLootMoney(yuanbao float32) {
	rmbcent := 100.0 * yuanbao / float32(tbl.Room.RmbToYuanbao)
	arglist := []interface{}{this.Account(), this.Token(), uint64(this.Id()), uint32(rmbcent)}
	event := eventque.NewCommonEvent(arglist, def.HttpRequestUserResourceEarnArglist, nil)
	this.AsynEventInsert(event)
}

// 推送在线时长
func (this *GateUser) PlatformPushUserOnlineTime() {
	tm_onlinestay := (util.CURTIME() - this.tm_login) / 60
	if tm_onlinestay <= 0 { return }

	arglist := []interface{}{this.Account(), this.Token(), uint64(this.Id()), int64(tm_onlinestay)}
	event := eventque.NewCommonEvent(arglist, def.HttpRequestUserOnlineTimeArglist, nil)
	this.AsynEventInsert(event)
}

// 发货状态解除
func (this *GateUser) SetDeliveryState(b bool) {
	this.deliverystate = b
}

func (this *GateUser) DeliveryState() bool {
	return this.deliverystate
}

