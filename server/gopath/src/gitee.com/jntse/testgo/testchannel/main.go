package main
import (
	"fmt"
	"flag"
)

var g_kind = flag.String("k", "", "input '-k' 1.Array 2.map 3.Slice")
func main() {
	flag.Parse()
	if ( *g_kind == "" )	{ fmt.Println("you must input '-k'='type' argument"); return }

	TestChannels()
}
