package util
import (
	"fmt"
	"crypto/md5"
)

func MD5(src string) string {
	signbytes := []byte(src)
	md5array  := md5.Sum(signbytes) // md5加密
	md5bytes  := []byte(md5array[:])
	//md5string := fmt.Sprintf("%x", md5bytes)
	return fmt.Sprintf("%x", md5bytes)
}


