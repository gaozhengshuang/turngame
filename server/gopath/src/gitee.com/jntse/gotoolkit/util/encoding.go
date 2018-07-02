package util
import (
	"fmt"
	"crypto/md5"
	"crypto/sha256"
)

func MD5(src string) string {
	signbytes := []byte(src)
	md5array  := md5.Sum(signbytes) // md5加密
	md5bytes  := []byte(md5array[:])
	return fmt.Sprintf("%x", md5bytes)
}

func SHA256(src string) string {
	signbytes := []byte(src)
	sha256array := sha256.Sum256(signbytes) // sha-256
	sha256bytes	:= []byte(sha256array[:])
	return fmt.Sprintf("%x", sha256bytes)
}

