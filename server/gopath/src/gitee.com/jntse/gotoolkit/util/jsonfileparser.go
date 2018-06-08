package util
import _ "fmt"
import "os"
import "encoding/json"

func JsonConfParser(file string, conf interface{}) error {
	hfile, openerr := os.Open(file)
	if openerr != nil  {
		//fmt.Printf("JsonParser Open File Error: '%s'\n", openerr)
		return openerr
	}
	defer hfile.Close()

	fileinfo, _:= hfile.Stat()
	buf := make([]byte, fileinfo.Size())
	_, readerr := hfile.Read(buf)
	if readerr != nil {
		return readerr
	}

	uerr := json.Unmarshal(buf, conf)
	if uerr != nil {
		return uerr
	}
	return nil
}
