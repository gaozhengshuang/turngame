package main
import (
	"fmt"
	_"strings"
	"strconv"
	_"time"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	pb"github.com/gogo/protobuf/proto"
	_"gitee.com/jntse/minehero/server/tbl"
	_"gitee.com/jntse/minehero/server/tbl/excel"
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

type RoomGridItem struct {
	gridsum			int32				// 格子总数
	griditems		[]*msg.GridItem		// 格子道具信息
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
	totalcost		int64					// 本局游戏总消耗
	RoomGridItem
}

func NewGameRoom(ownerid uint64, id int64, roomkind int32, quota bool) *GameRoom {
	room := &GameRoom{id:id, tm_create: util.CURTIME(), tm_start:0}
	room.griditems = make([]*msg.GridItem, 0)
	room.roomkind = roomkind
	room.gridsum = 0
	room.owner = nil
	room.ownerid = ownerid
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

func (this *GameRoom) SendClientMsg(msg pb.Message) {
	if this.owner == nil {
		log.Error("房间[%d] Owner数据未初始化", this.id)
		return
	}
	this.owner.SendClientMsg(msg)
}

// 房间参数初始化
func (this *GameRoom) Init() (errcode string) {
	switch{
	default:
		// 检查房间类型是否有效
		//this.dungeon = GetDungeonsConfig(this.roomkind)
		//if this.dungeon == nil {
		//	errcode = fmt.Sprintf("初始化房间[%d] 无效的房间类型[%d]", this.id, this.roomkind)
		//	break
		//}

		// 转盘配置
		//tconfig := GetTurntableConfig(this.roomkind)
		//if tconfig == nil {
		//	errcode = fmt.Sprintf("初始化房间[%d] 无效的转盘类型[%d]", this.id, this.dungeon.Turntableid)
		//	break
		//}

		// 检查格子数是否合理
		//if this.gridsum != 0 && this.gridsum < this.dungeon.Size * 2 + 2 {
		//	errcode = fmt.Sprintf("初始化房间[%d] 格子数太少了[%d]", this.id, this.gridsum)
		//	break
		//}

		// 初始格子道具
		//if errcode = this.InitGridItem(); errcode != "" {
		//	break
		//}

		// 更新房间数量到redis
		key := RoomSizeKey()
		_, err := Redis().SAdd(key, this.id).Result()
		if err != nil {
			errcode = fmt.Sprintf("更新房间数量到redis失败 key:%s , err: %s", key, err)
			break
		}
		log.Info("玩家[%d] 创建房间[%d]完成 类型[%d]", this.ownerid, this.id, this.roomkind)
		return ""
	}

	return
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


