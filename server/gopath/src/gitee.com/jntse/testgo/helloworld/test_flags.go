package main
import (
	"flag"
	"fmt"
	"os"
)
import "gitee.com/jntse/testgo/helloworld/common"

var Input_pstrName = flag.String("name", "gerry", "input ur name")
var Input_piAge = flag.Int("age", 20, "input ur age")
var Input_flagvar int

func Init() {
	flag.IntVar(&Input_flagvar, "flagname", 1234, "help message for flagname")
}

func TestFlags() {
	common.PrintSeparateLine("TestFlags")
	defer common.PrintSeparateLine("TestFlags")

	Init()
	flag.Parse()

	// 命令行参数
	if len(os.Args) > 1 {
		for i, k := range os.Args {
			fmt.Printf("命令行参数argu[%d]=%s\n", i, k) // 依次打印每个参数
		}
	}else {
		fmt.Println("没有输入命令参数")
	}

	fmt.Printf("args=%s, num=%d\n", flag.Args(), flag.NArg())
	for i := 0; i != flag.NArg(); i++ {
		fmt.Printf("arg[%d]=%s\n", i, flag.Arg(i))
	}

	fmt.Printf("name=%s\n",*Input_pstrName)
	fmt.Printf("age=%d\n",*Input_piAge)
	fmt.Printf("flagname=%d\n",Input_flagvar)
}
