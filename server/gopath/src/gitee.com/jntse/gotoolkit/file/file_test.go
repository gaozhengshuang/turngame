package utfile_test
import (
	"testing"
	"fmt"
	"gitee.com/jntse/gotoolkit/file"
)

func TestFilePathScanner(t *testing.T) {
	scanner := utfile.NewFilePathScanner()
	scanner.Init("./")
	err := scanner.Scan()
	if err != nil {	
		fmt.Println(err)
		return
	}
	
	for _, k := range scanner.Files {
		fmt.Println(k)
	}
}


