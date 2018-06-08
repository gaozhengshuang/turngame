package main 
import "testtabtoy/tblout"

// --------------------------------------------------------------------------
/// @brief 为表格实例取一个别名
// --------------------------------------------------------------------------
var MsgIndex = table.InsProtoMsgIndexTable


// --------------------------------------------------------------------------
/// @brief 自动初始化
// --------------------------------------------------------------------------
var g_TblLoader *TblLoader = nil
func init() {
	g_TblLoader = NewTblLoader()
	g_TblLoader.Init()
}

// 重新加载配置
func Reload() {
	g_TblLoader.Reload()
}

// --------------------------------------------------------------------------
/// @brief 配置管理器
// --------------------------------------------------------------------------
type IBaseTbl interface {
	Load(filename string) error
	Reload() error
}

type TblLoader struct {
	tbls map[string]IBaseTbl
}

func NewTblLoader() *TblLoader {
	loader := new(TblLoader)
	loader.tbls = make(map[string]IBaseTbl)
	return loader
}

func (this *TblLoader) Init() {
	this.LoadData(MsgIndex, "./tblout/proto_id.json")
}

func (this *TblLoader) LoadData(tbl IBaseTbl, file string) {
	err := tbl.Load(file)
	if err != nil { panic(err) }
}

func (this *TblLoader) Reload() {
	for _, v := range this.tbls {
		if err := v.Reload(); err != nil {
			panic(err)
		}
	}
}

