package main
import (
	"gitee.com/jntse/gotoolkit/log"
	"time"
	"net/http"
)

func main() {
	// Simple static webserver:
	log.Init("","")
	defer log.Flush()
	log.Info("start httpserver ok")

	myHandler := http.FileServer(http.Dir("/home/ecs-user/gopath/src/testhttp"))
	s := &http.Server{
		Addr:           ":27015",
		Handler:        myHandler,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	log.Fatal("err=%v", s.ListenAndServe())
}
