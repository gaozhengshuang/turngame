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
	ExcelOut string
}


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func init() {
	util.DoCmdLineParse(&g_CmdLineArgs)
	if g_CmdLineArgs.Root == ""      { panic("-----input '-root' cmdline argu-----") }
	if g_CmdLineArgs.ExcelOut == ""      { panic("-----input '-excel' cmdline argu-----") }
	//g_CmdLineArgs.ExcelOut = "index.xlsx"
}


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func main() {
	fmt.Println("==>>开始分析目录...")
	root := "/home/ecs-user/minehero/protocol"
	//root := g_CmdLineArgs.Root
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


	//
	fmt.Println("==>>开始生成excel")
	WriteExcelFile(protofiles)
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
	//fmt.Printf("%#v\n", strings.Trim(elements[1], ";\n"))	// 去除首尾的分号和换行符
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
	style.Font = *xlsx.NewFont(12, "Verdana")
	style.Fill = *xlsx.NewFill("solid", "009BBB59", "00000000")
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
	err = file.Save(g_CmdLineArgs.ExcelOut)
	if err != nil {
		panic(err.Error())
	}
	fmt.Printf("==>>生成文件 %s\n", g_CmdLineArgs.ExcelOut)
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

	row = sheet.AddRow()
	cell = row.AddCell()
	cell.Value = "ObjectType"
	cell = row.AddCell()
	cell.Value = "FieldName"
	cell = row.AddCell()
	cell.Value = "FieldType"
	cell = row.AddCell()
	cell.Value = "Value"
	cell = row.AddCell()
	cell.Value = "Alias"
	cell = row.AddCell()
	cell.Value = "Default"
	cell = row.AddCell()
	cell.Value = "Meta"
	cell = row.AddCell()
	cell.Value = "Comment"

	row = sheet.AddRow()
	cell = row.AddCell()
	cell.Value = "对象类型"
	cell.SetStyle(style)
	cell = row.AddCell()
	cell.Value = "字段名"
	cell.SetStyle(style)
	cell = row.AddCell()
	cell.Value = "字段类型"
	cell.SetStyle(style)
	cell = row.AddCell()
	cell.Value = "枚举值"
	cell.SetStyle(style)
	cell = row.AddCell()
	cell.Value = "别名"
	cell.SetStyle(style)
	cell = row.AddCell()
	cell.Value = "默认值"
	cell.SetStyle(style)
	cell = row.AddCell()
	cell.Value = "特性"
	cell.SetStyle(style)
	cell = row.AddCell()
	cell.Value = "注释"
	cell.SetStyle(style)

}
