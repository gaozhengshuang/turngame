package main
import (
	"net/http"
	"gitee.com/jntse/gotoolkit/log"
)

func HttpServerResponseCallBack(w http.ResponseWriter, urlpath string, rawquery string, body []byte) {
	log.Info("HttpServerResponseCallBack")

	//
	log.Info("urlpath: %s", urlpath)
	log.Info("rawquery: %s", rawquery)
	log.Info("body: %s", string(body))


	// header 属性设置
	head := w.Header()
	head.Set("Content-Type", "text/plain; charset=utf-8")       // default
	//head.Set("Content-Type", "application/json")
	//head.Set("Content-Type", "application/x-www-form-urlencoded")

	// ret code
	w.WriteHeader(http.StatusOK)
	//w.WriteHeader(http.StatusNotFound)
	w.Write([]byte("hello golang http test"))
}

