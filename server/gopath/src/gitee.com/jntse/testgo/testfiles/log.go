package main
import "log"
import "os"
import "path"
import "gitee.com/jntse/testgo/helloworld/common"

func TestPrintLog()	{
	common.PrintSeparateLine("TestPrintLog")
	defer common.PrintSeparateLine("TestPrintLog")

	// 创建文件
	fileName := "./log/golog.log"
	os.MkdirAll(path.Dir(fileName), os.ModePerm)	//  创建目录
	logFile, err := os.OpenFile(fileName, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)	// 文件追加方式打开
	if ( err != nil )	{
		log.Fatalln("create file error !")
		return
	}
	defer logFile.Close()


	/* log flag 枚举定义
	const (
		// For example, flags Ldate | Ltime (or LstdFlags) produce,
		//	2009/01/23 01:23:23 message
		// while flags Ldate | Ltime | Lmicroseconds | Llongfile produce,
		//	2009/01/23 01:23:23.123123 /a/b/c/d.go:23: message
		Ldate         = 1 << iota     // the date in the local time zone: 2009/01/23
		Ltime                         // the time in the local time zone: 01:23:23
		Lmicroseconds                 // microsecond resolution: 01:23:23.123123.  assumes Ltime.
		Llongfile                     // full file name and line number: /a/b/c/d.go:23
		Lshortfile                    // final file name element and line number: d.go:23. overrides Llongfile
		LUTC                          // if Ldate or Ltime is set, use UTC rather than the local time zone
		LstdFlags     = Ldate | Ltime // initial values for the standard logger
	)
	*/

	// 创建一个日志对象
	debugLog := log.New(logFile,"[Debug]",log.LstdFlags)
	debugLog.Println("A debug message here")

	//配置一个日志格式的前缀
	debugLog.SetPrefix("[Info]")
	debugLog.Println("A Info Message here ")

	//增加一个Flag参数
	debugLog.SetFlags(debugLog.Flags() | log.Llongfile)
	debugLog.Println("A full file name and line number prefix")

	//去除一个flag
	debugLog.SetFlags(debugLog.Flags() & ^log.Llongfile)
	debugLog.Printf("A remove flag %s", "'Llongfile'")

	//短文件名flag
	debugLog.SetFlags(debugLog.Flags() | log.Lshortfile)
	debugLog.Printf("A final file name element and line number prefix")

}
