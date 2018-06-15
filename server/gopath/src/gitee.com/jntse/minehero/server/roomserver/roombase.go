package main
import (
	"fmt"
	"strings"
	"strconv"
	_"time"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	pb"github.com/gogo/protobuf/proto"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
	"gitee.com/jntse/minehero/server/def"
)

const (
	kQuotaNil = iota		// 没有配额
	kQuotaUnused			// 配额未使用
	kQuotaUsed				// 配额已使用
)

// GirdItem类型
const (
	kGridTypeDefault = 0		// 默认道具
	kGridTypeBigReward = 1		// 大奖
	kGridTypeMiddleYuanbao = 2	// 高级元宝1
	kGridTypeBigYuanbao = 3		// 高级元宝2
	kGridTypeDiamondParts = 4	// 钻石碎片
	kGridTypeDiamondL1 = 5		// 钻石1
	kGridTypeDiamondL2 = 6		// 钻石2
	kGridTypeDiamondL3 = 7		// 钻石3
)

// 钻石等级
const (
	kDiamondGrade1 = 1
	kDiamondGrade2 = 2
	kDiamondGrade3 = 3
)


// --------------------------------------------------------------------------
/// @brief 房间格子道具管理
// --------------------------------------------------------------------------

// 高级元宝
type HighGradeYuanbao struct {
	grade	int32		// 档次
	num		int32		// 产生数量
	limit 	int32		// 满足最低消费才可以获得
	cost  	int32		// 消费计数
	control bool		// 作假控制
}

// 高级钻石
type HighGradeDiamond struct {
	grade 	int32		// 档位
	total	int32		// 总数量
	num		int32		// 单个叠加数量
	probability	map[int32]int32
	cost	int32
}

type RoomGridItem struct {
	gridsum			int32				// 格子总数
	griditems		[]*msg.GridItem		// 格子道具信息
	quota_global	int32 				// 房间否有奖励配额(0没有配额，1配额未使用，2配额使用)
	quota_personal 	int32				// 个人消费达到额度生成配额
	cost_personal   int32				// 个人奖池
	yb_middle 		HighGradeYuanbao	// 中等元宝
	yb_large 		HighGradeYuanbao	// 大元宝
	diamonds		map[int32]*HighGradeDiamond	// 钻石
}

type DiamondRoom struct {
	diamondincome	int64				// 钻石场总收入 
	diamondstepcount int64				// 跳跃计数
}
// --------------------------------------------------------------------------
/// @brief TODO: 一个房间可以对应一个单独的协程
// --------------------------------------------------------------------------
type GameRoom struct {
	id				int64
	tm_create		int64
	tm_start		int64
	tm_end			int64
	roomkind		int32
	owner			*RoomUser
	ownerid			uint64
	close_reason	string					// 正常关闭房间的原因
	stepindex		int32					// 玩家所在index
	totalcost		int64					// 本局游戏总消耗
	dungeon			*table.TDungeonsDefine	// 关卡配置
	RoomGridItem
	DiamondRoom
}

func NewGameRoom(ownerid uint64, id int64, roomkind int32, gridnum int32 , quota bool) *GameRoom {
	room := &GameRoom{id:id, tm_create: util.CURTIME(), tm_start:0}
	//room.griditems = make(map[int32]*msg.GridItem)
	room.griditems = make([]*msg.GridItem, gridnum)
	room.roomkind = roomkind
	room.gridsum = gridnum
	room.owner = nil
	room.ownerid = ownerid
	room.quota_global = kQuotaNil
	if quota == true { room.quota_global = kQuotaUnused }
	room.quota_personal = kQuotaNil
	room.diamonds = make(map[int32]*HighGradeDiamond)
	return room
}

func (this *GameRoom) Tick(now int64) { if this.owner != nil { this.owner.Tick(now) } }
func (this *GameRoom) Id() int64 { return this.id }
func (this *GameRoom) Kind() int32 { return this.roomkind }

func (this *GameRoom) SendMsg(msg pb.Message) {
	if this.owner == nil {
		log.Error("房间[%d] Owner数据未初始化", this.id)
		return
	}
	this.owner.SendMsg(msg)
}

func GetDungeonsConfig(roomkind int32) (*table.TDungeonsDefine) {
	config, findid := tbl.DungeonsBase.TDungeonsById[roomkind]
	if findid == false {
		return nil
	}
	return config
}

func GetTurntableConfig(roomkind int32) (*table.TTurntableNewDefine) {
	config := GetDungeonsConfig(roomkind)
	if config == nil {
		return nil
	}

	tconfig, ok := tbl.TurntableBase.TTurntableNewById[uint32(config.Turntableid)]
	if ok == false {
		return nil
	}
	return tconfig
}

// 是否有大奖配额
func (this *GameRoom) IsHaveRewardQuota() bool {
	if this.quota_global != kQuotaNil || this.quota_personal != kQuotaNil {
		return true
	}
	return false
}

// 房间参数初始化
func (this *GameRoom) Init() (errcode string) {

	tmfun := make([]int64,10)
	tmfun[0] = util.CURTIMEUS()

	switch{
	default:
		// 检查房间类型是否有效
		this.dungeon = GetDungeonsConfig(this.roomkind)
		if this.dungeon == nil {
			errcode = fmt.Sprintf("初始化房间[%d] 无效的房间类型[%d]", this.id, this.roomkind)
			break
		}

		// 转盘配置
		tconfig := GetTurntableConfig(this.roomkind)
		if tconfig == nil {
			errcode = fmt.Sprintf("初始化房间[%d] 无效的转盘类型[%d]", this.id, this.dungeon.Turntableid)
			break
		}

		// 检查格子数是否合理
		if this.gridsum != 0 && this.gridsum < this.dungeon.Size * 2 + 2 {
			errcode = fmt.Sprintf("初始化房间[%d] 格子数太少了[%d]", this.id, this.gridsum)
			break
		}

		// 初始格子道具
		tmfun[1] = util.CURTIMEUS()
		if errcode = this.InitGridItem(); errcode != "" {
			break
		}
		tmfun[2] = util.CURTIMEUS()

		// 更新房间数量到redis
		key := RoomSizeKey()
		_, err := Redis().SAdd(key, this.id).Result()
		if err != nil {
			errcode = fmt.Sprintf("更新房间数量到redis失败 key:%s , err: %s", key, err)
			break
		}
		tmfun[3] = util.CURTIMEUS()

		// 大奖有配额
		if this.quota_global != kQuotaNil {
			this.SetGridItemControl(kGridTypeBigReward, false)
		}

		log.Info("玩家[%d] 创建房间[%d]完成 类型[%d] 格子数[%d] 大奖配额[%t] 总道具数[%d] ts[%d]", 
			this.ownerid, this.id, this.roomkind, this.gridsum, this.quota_global != kQuotaNil, len(this.griditems), util.CURTIMEMS())

		//TODO: %v复杂结构效率直接爆炸，耗时从50-900微秒不等
		//log.Trace("玩家[%d] 房间[%d] 生成房间道具%v", this.ownerid, this.id, this.griditems)

		itemlog := ""
		for _, v := range this.griditems {
			itemlog += fmt.Sprintf("格子index[%d] 道具[%d] 数量[%d] control[%t]\n", v.GetIndex(), v.GetId(), v.GetNum(), v.GetControl())
		}
		log.Info("房间[%d] 道具信息\n%s", this.id, itemlog)

		// 函数耗时分析
		tmfun[4] = util.CURTIMEUS()
		//for k,v := range tmfun {
		//	if k == len(tmfun)-1 || tmfun[k+1] == 0 { break }
		//	log.Trace("函数耗时分析: tmfun[%d]-tmfun[%d] = %d", k+1, k, tmfun[k+1] - v)
		//}

		return ""
	}

	// 检查是否归还大奖配额
	this.GiveBackGlobalRewardPoolQuota("房间初始化")
	return
}

// 初始化格子道具
func (this *GameRoom) InitGridItem() (errcode string) {

	//tmfun := make([]int64,10)
	//tmfun[0] = util.CURTIMEUS()

	// 钻石场
	if this.IsDiamondMode() { 
		return this.InitDiamondRoom()
	}
	
	// 打乱所有空格子(剔除起点，终点 2格子)
	gridlist, maxindex := make([]int32, 0, this.gridsum), this.gridsum - 1
	for i := int32(1); i < this.gridsum - 1; i++ {  gridlist = append(gridlist, i)  }
	util.Shuffle(gridlist)		// TODO: Shuffle有点耗时
	//tmfun[1] = util.CURTIMEUS()

	// 解析高级元宝限制
	errcode = this.ParseHighGradeYuanBaoLimit(this.dungeon.YuanbaoLimit)
	if errcode != "" {
		return
	}
	fake_gridnum := this.yb_middle.num + this.yb_large.num	// 作假格子数

	// 初始大奖
	fakegrids := make(map[int32]int32)
	if this.dungeon.Rewardid != 0 {
		fake_gridnum += 1
		this.griditems[maxindex] = NewGridItem(maxindex, int32(this.dungeon.Rewardid), 1, kGridTypeBigReward, true)
		fakegrids[maxindex] = kGridTypeBigReward
	}

	// 获取不连续的随机索引
	var count int32 = 0
	for _ , index := range gridlist {
		if int32(len(fakegrids)) == fake_gridnum { break }
		leftindex := int32(index) - 1;
		_, ok := fakegrids[leftindex]
		if ok == true { continue }

		rightindex := int32(index) + 1;
		_, ok = fakegrids[rightindex]
		if ok == true { continue }

		count += 1
		if count <= this.yb_middle.num {
			fakegrids[index] = kGridTypeMiddleYuanbao
		}else if count <= (this.yb_middle.num + this.yb_large.num) {
			fakegrids[index] = kGridTypeBigYuanbao
		}
	}
	//tmfun[2] = util.CURTIMEUS()


	// 初始化中元宝和大元宝
	randnum := int32(0)
	for index, ty := range fakegrids {
		gridlist = util.IntSliceRemove(gridlist, index)
		if ty == kGridTypeMiddleYuanbao {
			randnum, errcode = this.ParseProbItem(this.dungeon.MiddleYuanbao)
		}else if ty == kGridTypeBigYuanbao {
			randnum, errcode = this.ParseProbItem(this.dungeon.BigYuanbao)
		}else {
			continue
		}
		if errcode != "" || randnum == 0 { 
			return 
		}
		this.griditems[index] = NewGridItem(index, int32(msg.ItemId_YuanBao), randnum, ty, true)
	}


	// 初始化普通元宝
	yuanbaonum := this.gridsum * int32(tbl.Room.Griditem.YuanbaoRate) / 100
	if this.dungeon.FreeMark == 1 { yuanbaonum = this.gridsum * int32(tbl.Room.Griditem.FreeYuanbaoRate) / 100 }	// 免费场
	if yuanbaonum > this.gridsum { yuanbaonum = this.gridsum }	// 要小于 this.gridsum
	if yuanbaonum != 0 && len(this.dungeon.Scorenum) != 0 {
		randnum , goldgrids := int32(0), gridlist[0:yuanbaonum]
		gridlist = gridlist[yuanbaonum:]
		for _, index := range goldgrids {
			randnum, errcode = this.ParseProbItem(this.dungeon.Scorenum)	// 解析元宝
			if errcode != "" { return }
			if randnum == 0 { continue }
			this.griditems[index] = NewGridItem(index, int32(msg.ItemId_YuanBao), randnum, kGridTypeDefault, false)
		}
	}
	//tmfun[3] = util.CURTIMEUS()


	// 初始小礼品
	if count := len(this.dungeon.Item); count != 0 {
		i := util.RandBetween(0, int32(count) - 1)
		stritems := this.dungeon.Item[i]
		itempair := strings.Split(stritems, "-")
		if len(itempair) != 2 { return }
		itemid, ierr := strconv.Atoi(itempair[0])
		num, nerr := strconv.Atoi(itempair[1])
		if ierr != nil || nerr != nil { return }
		itemgrids := gridlist[0:num]
		gridlist = gridlist[num:]
		for _, index := range itemgrids {
			this.griditems[index] = NewGridItem(index, int32(itemid), 1, kGridTypeDefault, false)
		}
	}


	// 初始广告
	if count := len(this.dungeon.Adv); count != 0 {
		i := util.RandBetween(0, int32(count) - 1)
		stritems := this.dungeon.Adv[i]
		itempair := strings.Split(stritems, "-")
		if len(itempair) != 2 { return }
		itemid, ierr := strconv.Atoi(itempair[0])
		num, nerr := strconv.Atoi(itempair[1])
		if ierr != nil || nerr != nil { return }
		itemgrids := gridlist[0:num]
		gridlist = gridlist[num:]
		for _, index := range itemgrids {
			this.griditems[index] = NewGridItem(index, int32(itemid), 1, kGridTypeDefault, false)
		}
	}

	//tmfun[4] = util.CURTIMEUS()

	// 函数耗时分析
	//for k,v := range tmfun {
	//	if k == len(tmfun)-1 || tmfun[k+1] == 0 { break }
	//	log.Trace("函数耗时分析: tmfun[%d]-tmfun[%d] = %d", k+1, k, tmfun[k+1] - v)
	//}


	//var itemnum , emptygird int32 = 1, int32(len(gridlist))
	//if tbl.Room.Griditem.Itemrate != 0 && emptygird > 0 {
	//	itemnum = this.gridsum * int32(tbl.Room.Griditem.Itemrate) / 100
	//	if itemnum > emptygird { itemnum = emptygird }		// 不要大于剩余空格子数
	//}
	//if count := len(this.dungeon.Item); itemnum != 0 && count != 0 {
	//	itemgrids := gridlist[0:itemnum]
	//	for _, index := range itemgrids {
	//		i := util.RandBetween(0, int32(count) - 1)
	//		itemid, _ := strconv.Atoi(this.dungeon.Item[i])
	//		if itemid != 0 {
	//			this.griditems[index] = NewGridItem(index, int32(itemid), 1, kGridTypeDefault, false)
	//		}
	//	}
	//}

	return
}

// 初始化钻石场
func (this *GameRoom) InitDiamondRoom() (errcode string) {

	// 打乱所有空格子(剔除起点)
	gridlist := make([]int32, 0, this.gridsum)
	for i := int32(0); i < this.gridsum; i++ {  gridlist = append(gridlist, i)  }
	gridlist[0] = -1

	// 初始钻石
	diamondlist := make([]*msg.GridItem,0)
	for _, v := range tbl.Room.Diamondroom {
		diamond := &HighGradeDiamond{grade:int32(v.Grade), total:int32(v.Total), num:int32(v.Num)}
		diamond.probability = make(map[int32]int32)
		multirank := strings.Split(v.Pickpro, ";")
		for _, rank := range multirank {
			costpair := strings.Split(rank, "-")
			if len(costpair) != 2 { 
				log.Error("初始化房间[%d] 类型:%d 玩家[%d] 解析钻石配置失败", this.id, this.roomkind, this.ownerid)
				continue 
			}
			cost, _ := strconv.Atoi(costpair[0])
			pro, _ := strconv.Atoi(costpair[1])
			diamond.probability[int32(cost)] = int32(pro)
		}
		this.diamonds[diamond.grade] = diamond

		var girdtype int32 = 0
		if diamond.grade == 1 { girdtype = kGridTypeDiamondL1 }
		if diamond.grade == 2 { girdtype = kGridTypeDiamondL2 }
		if diamond.grade == 3 { girdtype = kGridTypeDiamondL3 }

		// 默认索引0
		for i:= int32(0); i < diamond.total; i++ {
			diamondlist = append(diamondlist, NewGridItem(0, int32(msg.ItemId_Diamond), diamond.num, girdtype, true))
		}
	}

	// 刷钻石，把所有格子分成 total/diamond 部分，每部分单独随机
	// 例如12个格子刷3个钻石，概率分布为 2-4, 6-8, 10-11
	// 例如12个格子刷4个钻石，概率分布为 1-3, 4-6, 7-9, 10-11
	// 例如12个格子刷6个钻石，概率分布为 1-2, 3-4, 5-6, 7-8, 9-10, 11-11
	// 例如12个格子刷7个钻石，概率分布为 1-1, 1-2, 2-3, 3-4, 4-5,  6-7, 7-8, 8-9 位置重叠了
	// 结论：要保证这个算法有效性，总格子数 / 钻石数 必须大于等于2，也就是12个格子最多6个钻石
	index, dist, count := int32(0), int32(this.gridsum / int32(len(diamondlist))), int32(0)
	if dist < 2 { dist = 2 }	// 保证算法有效性dist必须>=2 
	for _ , v := range diamondlist {
		randmin, randmax := dist/2+dist*count, dist+dist*count
		count = count + 1
		if randmin == 0 { randmin = 1 }
		if randmin >= this.gridsum { break }
		if randmax >= this.gridsum { randmax = this.gridsum - 1}

		index = util.RandBetween(randmin, randmax)
		if index > 0 && index < this.gridsum {
			gridlist[index] = -1
			v.Index = pb.Int32(index)
			this.griditems[index] = v
		}

		if count >= int32(len(diamondlist)) { break }
	}


	// 钻石有概率拿到
	//if util.SelectPercent(this.GetDiamondPro(kDiamondGrade1)) == true { this.SetGridItemControl(kGridTypeDiamondL1, false) }
	//if util.SelectPercent(this.GetDiamondPro(kDiamondGrade2)) == true { this.SetGridItemControl(kGridTypeDiamondL2, false) }
	//if util.SelectPercent(this.GetDiamondPro(kDiamondGrade3)) == true { this.SetGridItemControl(kGridTypeDiamondL3, false) }


	// 剩下格子全部初始钻石碎片
	randnum := int32(0)
	for _ , index := range gridlist {
		if index == -1 { continue }		// 无效点
		randnum, errcode = this.ParseProbItem(this.dungeon.DiamondChip)	// 解析钻石碎片
		if errcode != "" { return errcode }
		if randnum == 0  { continue }
		this.griditems[index] = NewGridItem(index, int32(msg.ItemId_DiamondParts), randnum, kGridTypeDiamondParts, false)
	}

	return
}

// 解析普通元宝概率配置
func (this *GameRoom) ParseProbItem(complex []string) (randnum int32, errcode string ) {
	randweight, countweight := util.RandBetween(1, 100), int32(0)
	for _, v := range complex {
		pairNumWeight := strings.Split(v, "-")
		if len(pairNumWeight) != 2 {
			errcode = fmt.Sprintf("初始化房间[%d] 解析元宝概率失败 PairNumWeight=%s", this.id, v)
			return 0, errcode
		}

		gold , gerr := strconv.Atoi(pairNumWeight[0])
		weight, werr := strconv.Atoi(pairNumWeight[1])
		if gerr != nil || werr != nil {
			errcode = fmt.Sprintf("初始化房间[%d] 解析元宝概率失败 PairNumWeight=%s", this.id, v)
			return 0, errcode
		}

		countweight += int32(weight)
		if countweight >= randweight {
			randnum = int32(gold)
			break
		}
	}

	if randnum == 0 {
		log.Error("初始化房间[%d] 类型:%d 玩家[%d] 解析元宝等于0，至少为1", this.id, this.roomkind, this.ownerid)
		return 0, "解析元宝等于0"
	}

	return randnum, ""
}

// 解析高级元宝限制
func (this *GameRoom) ParseHighGradeYuanBaoLimit(complex []string) (errcode string ) {
	for _, v := range complex {
		yuanbaolimit := strings.Split(v, "-")
		if len(yuanbaolimit) != 3 {
			errcode = fmt.Sprintf("初始化房间[%d] 解析特殊元宝配置失败 yuanbaolimit=%s", this.id, v)
			return
		}

		grade , gerr := strconv.Atoi(yuanbaolimit[0])
		number, werr := strconv.Atoi(yuanbaolimit[1])
		limit,  lerr := strconv.Atoi(yuanbaolimit[2])
		if gerr != nil || werr != nil || lerr != nil {
			errcode = fmt.Sprintf("初始化房间[%d] 解析特殊元宝配置失败 yuanbaolimit=%s", this.id, v)
			return
		}

		if grade == 1 {
			this.yb_middle = HighGradeYuanbao{grade:int32(grade), num:int32(number), limit:int32(limit), cost:0, control:true}
		}else if grade == 2 {
			this.yb_large = HighGradeYuanbao{grade:int32(grade), num:int32(number), limit:int32(limit), cost:0, control:true}
		}
	}
	return
}

// 格子作假控制
func (this *GameRoom) SetGridItemControl(girdtype int32, ctl bool) {
	if girdtype == kGridTypeMiddleYuanbao {
		this.yb_middle.control = ctl
	}else if girdtype == kGridTypeBigYuanbao {
		this.yb_large.control = ctl
	}

	for _, v := range this.griditems {
		if v.GetGridtype() != girdtype { continue }
		v.Control = pb.Bool(ctl)
	}
}

// 格子道具
func NewGridItem(index, reward, num, girdtype int32, ctl bool) *msg.GridItem {
	return &msg.GridItem{ Index: pb.Int32(index), Id:pb.Int32(reward), Num: pb.Int32(num), Gridtype:pb.Int32(girdtype), Control:pb.Bool(ctl) }
}

// 大奖公告
func PickItemNotice(user *RoomUser, itemname string) {
	RoomSvr().SendNotice(user.Face(), msg.NoticeType_Suspension, 
		def.MakeNoticeText("恭喜", "#ffffff", 26),
		def.MakeNoticeText(user.Name(), "#ffffff", 26),
		def.MakeNoticeText("获得", "#fffc00", 26), 
		def.MakeNoticeText(itemname, "#ffffff", 26),
	);

}

// 元宝公告
func PickNumItemNotice(user *RoomUser, itemname string, num int64) {
	strnum := strconv.FormatInt(num, 10)
	RoomSvr().SendNotice(user.Face(), msg.NoticeType_Suspension, 
		def.MakeNoticeText("恭喜", "#ffffff", 26),
		def.MakeNoticeText(user.Name(), "#ffffff", 26),
		def.MakeNoticeText("获得", "#fffc00", 26),  
		def.MakeNoticeText(strnum, "#ffffff", 26), 
		def.MakeNoticeText(itemname, "#ffffff", 26),
	);
}

// 钻石概率获取
func (this *GameRoom) GetDiamondPro(level int32) int32 {
	diamond, ok := this.diamonds[level]
	if ok == false {
		return 0
	}

	costpool, getpro := diamond.cost, int32(0)
	for cost, pro := range diamond.probability {
		if costpool >= cost && pro > getpro {
			getpro = pro
		}
	}
	
	log.Error("房间[%d] 玩家[%d] 钻石等级[%d] 奖池[%d] 概率[%d]", this.id, this.ownerid, level, costpool, getpro)
	return getpro
}

// 是否钻石场
func (this *GameRoom) IsDiamondMode() bool {
	return this.dungeon != nil && this.dungeon.FreeMark == 2
}

