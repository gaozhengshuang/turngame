package main

import "fmt"
import "flag"


func main() {
	fmt.Println("vim-go")
	kind := flag.String("k", "", "input '-k' 1.Array 2.map 3.Slice")
	flag.Parse()
	if ( *kind == "" )	{ fmt.Println("you must input '-k'='type' argument"); return }

	if *kind == "0" {
		TestVariableArguments()
	}else if *kind == "1" {
		TestArray()
	}else if *kind == "2" {
		TestMap()
	}else if *kind == "3" {
		TestSlice()
	}
}
