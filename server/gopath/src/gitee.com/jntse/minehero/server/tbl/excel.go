/// [注：本文件为自动生成，不需要人为编辑，若有修改，请通过配置py脚本来重新生成.]
/// @author xiejian
/// @generate date: GENE_DATE

package tbl
import "gitee.com/jntse/minehero/server/tbl/excel"

type IBaseExcel interface {
	Load(filename string) error
	Reload() error
}

// --------------------------------------------------------------------------
/// @brief 为excel config 实例取一个别名
// --------------------------------------------------------------------------
var MusicBase = table.InsMusicBaseTable
var LevelBasee = table.InsLevelBaseeTable
var Cart = table.InsCartTable
var TbirckInfobase = table.InsTbirckInfobaseTable
var TBirckBase = table.InsTBirckBaseTable
var ProtoMsgIndex = table.InsProtoMsgIndexTable
var Tiger = table.InsTigerTable
var DungeonsBase = table.InsDungeonsBaseTable
var TBallGiftbase = table.InsTBallGiftbaseTable
var NoticeBase = table.InsNoticeBaseTable
var RechargeBase = table.InsRechargeBaseTable
var TGiftProbase = table.InsTGiftProbaseTable
var TBirckItembase = table.InsTBirckItembaseTable
var FootBall = table.InsFootBallTable
var SignBase = table.InsSignBaseTable
var NameBase = table.InsNameBaseTable
var TBallBase = table.InsTBallBaseTable
var TaskBase = table.InsTaskBaseTable
var TurntableBase = table.InsTurntableBaseTable
var ShopBase = table.InsShopBaseTable
var TbirckRefreshbase = table.InsTbirckRefreshbaseTable
var ItemBase = table.InsItemBaseTable
var RandomNameBase = table.InsRandomNameBaseTable

