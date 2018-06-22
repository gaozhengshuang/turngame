package main
import (
	"os"
	"io"
	"bufio"
	"fmt"
	"strings"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/file"
	"github.com/tealeg/xlsx"
)


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type FileProtobuf struct {
	path string
	pkg string
	messages []string
}


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
var g_CmdLineArgs CmdlineArgument
type CmdlineArgument struct {
	Root string
	Output string
}


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func init() {
	util.DoCmdLineParse(&g_CmdLineArgs)
	if g_CmdLineArgs.Root == ""      { panic("-----input '-root' cmdline argu-----") }
	if g_CmdLineArgs.Output == ""      { panic("-----input '-output' cmdline argu-----") }
	//g_CmdLineArgs.Output = "./index.xlsx"
}


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func main() {
	fmt.Println("==>>开始分析目录...")
	//root := "/home/ecs-user/mine/protocol"
	root := g_CmdLineArgs.Root
	scanner := utfile.NewFilePathScanner()
	scanner.Init(root)
	scanner.Keep(".proto")
	err := scanner.Scan()
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Printf("==>>分析目录完成\n")
	fmt.Printf("==>>文件总数[%d]\n", scanner.Num())
	if scanner.Num() == 0 {
		fmt.Println("here is not found .proto file")
		return
	}

	protofiles := make([]*FileProtobuf, 0)
	for _, path := range scanner.Files {
		fileinfo := ParseFile(path)
		protofiles = append(protofiles, fileinfo)
	}
	fmt.Println("==>>分析文件完成")

	//
	var totals int = 0
	for _, v := range protofiles {
		totals += len(v.messages)
	}
	fmt.Printf("==>>消息总数[%d]\n", totals)


	// 检查是否已经生成的proto_index.xlsx，消息没有变化不需要重新生成
	switch {
	default:
		xlFile, err := xlsx.OpenFile(g_CmdLineArgs.Output)
		if err == nil && len(xlFile.Sheets) != 0 {
			sheet := xlFile.Sheets[0]
			totalrow := len(sheet.Rows)
			if totalrow != (totals + 4) {
				break
			}

			namelist := make(map[string]string)
			for i := 4; i < totalrow; i++ {	// 数据从第四行开始	
				row := sheet.Rows[i]
				namelist[row.Cells[1].Value] = row.Cells[1].Value
				//fmt.Println("msgname:", row.Cells[1].Value)
			}
			
			// 检查新旧是否一致
			if !CheckHaveSameMsg(protofiles, namelist) {
				break
			}

			fmt.Println("==>>excel未发生变化<<===")
			return
		}

	}

	//
	fmt.Println("==>>开始生成excel")
	WriteExcelFile(protofiles)
}

// 检查是否已经生成的proto_index.xlsx，消息没有变化不需要重新生成
func CheckHaveSameMsg(protofiles []*FileProtobuf, msglist map[string]string) bool {
	for _, v := range protofiles {
		for _, name := range v.messages {
			fullname := v.pkg + "." + name
			_, ok := msglist[fullname]
			if ok == false {
				return false
			}
		}
	}
	return true
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func ParseFile(path string) *FileProtobuf {
	fmt.Printf("==>>开始分析文件 %s\n", path)
	f, err := os.Open(path)
	if err != nil { panic(err) }
	reader := bufio.NewReader(f)
	fileinfo := &FileProtobuf{path: path}
	for {
		linestr, err := reader.ReadString('\n')
		if err == io.EOF { break }
		ParseLine(linestr, fileinfo)
	}
	return fileinfo 
}


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func ParseLine(str string, fileinfo* FileProtobuf) {
	elements := strings.Split(str," ")
	if len(elements) == 0 {
		return
	}

	if elements[0] == "package" {
		var pkg string = strings.Trim(elements[1], ";\n")
		fileinfo.pkg = pkg
	}

	if elements[0] == "message" {
		var msg string = strings.Trim(elements[1], ";\n")
		fileinfo.messages = append(fileinfo.messages, msg)
	}
}


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func WriteExcelFile(protos []*FileProtobuf) {

	var file  *xlsx.File
	var sheet *xlsx.Sheet
	var row   *xlsx.Row
	var cell  *xlsx.Cell
	var err error

	file = xlsx.NewFile()
	sheet, err = file.AddSheet("proto_id")
	if err != nil {
		panic(err.Error())
	}

	// 第一页
	sheet.SetColWidth(0, 0, 50)
	sheet.SetColWidth(1, 1, 50)
	row = sheet.AddRow()
	cell = row.AddCell()
	cell.Value = "Id"
	cell = row.AddCell()
	cell.Value = "Name"

	row = sheet.AddRow()
	cell = row.AddCell()
	cell.Value = "int32"
	cell = row.AddCell()
	cell.Value = "string"

	row = sheet.AddRow()
	cell = row.AddCell()
	cell.Value = "RepeatCheck:true MakeIndex:true json:\"id\""
	cell = row.AddCell()
	cell.Value = "RepeatCheck:true MakeIndex:true json: \"name\""

	row = sheet.AddRow()
	cell = row.AddCell()
	cell.Value = "本文件自动生成"
	style := xlsx.NewStyle()
	style.Font = *xlsx.NewFont(12, "Verdana")	// 字体
	style.Fill = *xlsx.NewFill("solid", "009BBB59", "00000000")	// 填充颜色
	style.ApplyFont = true
	style.ApplyFill = true
	cell.SetStyle(style)

	cell = row.AddCell()
	cell.SetStyle(style)
	

	//
	var uuid int = 1
	for _, file := range protos {
		for _, msg := range file.messages {
			row = sheet.AddRow()
			cell = row.AddCell()
			//cell.Value = strconv.Itoa(uuid)
			cell.SetInt(uuid)
			cell = row.AddCell()
			cell.Value = file.pkg + "." + msg
			uuid++
		}
	}

	// 第二页
	WriteExcelSecondSheet(file)

	//
	err = file.Save(g_CmdLineArgs.Output)
	if err != nil {
		panic(err.Error())
	}
	fmt.Printf("==>>生成文件 %s\n", g_CmdLineArgs.Output)
}

func WriteExcelSecondSheet(file * xlsx.File) {

	sheet, err := file.AddSheet("@Types")
	sheet.SetColWidth(0, 0, 70)
	if err != nil {
		panic(err.Error())
	}

	// set style
	style := xlsx.NewStyle()
	style.Font = *xlsx.NewFont(12, "Verdana")
	style.Fill = *xlsx.NewFill("solid", "009BBB59", "00000000")
	style.ApplyFont = true
	style.ApplyFill = true

	//
	row := sheet.AddRow()
	cell := row.AddCell()
	cell.Value = "TableName: \"ProtoId\" Package: \"table\" CSClassHeader: \"[System.Serializable]\""

	type CellDetail struct {
		name string
		desc string
	}

	cells := make([]CellDetail, 0)
	cells = append(cells, CellDetail{"ObjectType", "对象类型"})
	cells = append(cells, CellDetail{"FieldName", "字段名"})
	cells = append(cells, CellDetail{"FieldType", "字段类型"})
	cells = append(cells, CellDetail{"Value", "枚举值"})
	cells = append(cells, CellDetail{"Alias", "别名"})
	cells = append(cells, CellDetail{"Default", "默认值"})
	cells = append(cells, CellDetail{"Meta", "特性"})
	cells = append(cells, CellDetail{"Comment", "注释"})

	row = sheet.AddRow()
	for _, v := range cells {
		cell = row.AddCell()
		cell.Value = v.name
	}

	row = sheet.AddRow()
	for _, v := range cells {
		cell = row.AddCell()
		cell.Value = v.desc
		cell.SetStyle(style)
	}
}
