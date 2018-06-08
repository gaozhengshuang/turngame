package main

import (
	"os"
	"fmt"
	"io/ioutil"
	"path/filepath"
	"gitee.com/jntse/gotoolkit/util"
)

type CmdlineArgument struct {
	Path string
}

func FileWalkExec(path string, f os.FileInfo, err error) error {
	if f == nil 	{ return err }
	if f.IsDir() 	{ return nil }
	fmt.Printf("name=%s size=%d byte path=%s\n", f.Name(), f.Size(), path)
	return nil
}

func main() {
	args := &CmdlineArgument{}
	util.DoCmdLineParse(args)
	if args.Path == "" { panic("input cmdline arg -path") }

	//
	err := filepath.Walk(args.Path, FileWalkExec)
	if err != nil {
		fmt.Printf("filepath walk return %v\n", err)
	}

	//
	list, err := ioutil.ReadDir(args.Path)
	if err != nil {
		fmt.Printf("ioutil read dir return %v\n", err)
	}
	for _, v := range list {
		fmt.Printf("%#v\n", v)
	}
}
