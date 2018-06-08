package main
import (
	"fmt"
	"time"
	"io/ioutil"
	"net/http"
	_"context"
)

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type HttpResponseHandle func(w http.ResponseWriter, urlpath string, rawquery string, body []byte)
type HttpServerResponse struct {
	handler	HttpResponseHandle
}

func NewHttpServerResponse(cb HttpResponseHandle) *HttpServerResponse {
	return &HttpServerResponse{handler:cb }
}

func (this *HttpServerResponse) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	fmt.Println("########################################################")
	fmt.Printf("r=%#v\n", r)
	fmt.Println("########################################################")
	fmt.Printf("URL=%#v\n", r.URL)
	fmt.Printf("URL.path=%#v\n", r.URL.Path)
	fmt.Printf("URL.RawQuery=%#v\n", r.URL.RawQuery)
	fmt.Println("###########################")
	fmt.Printf("RequestURI=%#v\n", r.RequestURI)
	fmt.Printf("Method=%#v\n", r.Method)
	fmt.Printf("Local=%#v\n", r.Host)
	fmt.Printf("Remote=%#v\n", r.RemoteAddr)
	fmt.Printf("Header=%#v\n", r.Header)
	fmt.Println("########################################################")
	//body, err := ioutil.ReadAll(r.Body); 
	//if err != nil { panic(err) }
	//fmt.Printf("Body=%#v\n", string(body))
	//fmt.Println("########################################################")
	//w.WriteHeader(http.StatusOK)
	//w.Write([]byte("hello golang"))

	body , err := ioutil.ReadAll(r.Body)
	if err != nil { 
		fmt.Printf("http request err=%s\n",err)
		return
	}
	this.handler(w, r.URL.Path, r.URL.RawQuery, body)
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type HttpServer struct {
	server 	*http.Server
	handler http.Handler
	ip 		string
	port	int32
	start 	bool
	quit 	bool
	cb		HttpResponseHandle
	ch_quit	chan int32
}

func NewHttpServer() *HttpServer {
	return new(HttpServer)
}

func (this *HttpServer) Init(ip string, port int32, cb HttpResponseHandle) {
	addr := fmt.Sprintf("%s:%d", ip, port)	// ip=""监听全部地址
	this.ip ,this.port = ip, port
	this.ch_quit = make(chan int32)			// block

	// 路由handler (不同的URL可以由不同的handler处理)
	mux := &http.ServeMux{}
	this.handler = mux
	mux.Handle("/", NewHttpServerResponse(cb))
	//this.RegistHanlder("/sendgmcmd", NewHttpServerResponse(HttpServerResponseGmCmd))
	//this.RegistHanlder("/mail", NewHttpServerResponse(HttpServerResponseMail))
	//this.RegistHanlder("/onlinereport", NewHttpServerResponse(HttpServerResponseOnlineReport))
	//this.RegistHanlder("/notice", NewHttpServerResponse(HttpServerResponseNotice))

	// 简单handler
	//this.handler = http.FileServer(http.Dir("/home/ecs-user/gopath/src/testhttp"))	// 文件服务器
	//this.handler = NewHttpServerResponse(cb)

	this.server  = &http.Server {
		Addr:           addr,
		Handler:        this.handler,	// 如果Handler是nil可以使用ServerMux路由
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	fmt.Printf("http listening %s:%d ...\n", ip, port) 
}

func (this *HttpServer) RegistHanlder(pattern string, handler http.Handler) {
	mux, ok := this.handler.(*http.ServeMux)
	if ok == false { return }
	mux.Handle(pattern, handler)
}

func (this *HttpServer) Start() bool {
	if this.start == true { return false }
	go func() {
		this.start = true
		re := this.server.ListenAndServe()
		fmt.Printf("ListenAndServe return: '%v'\n", re)
		this.quit = true
		this.ch_quit <- 1
	}()

	// 等待http监听是否成功
	timerwait := time.NewTimer(time.Millisecond * 20)
	select {
	case <-this.ch_quit:
		return false
	case <-timerwait.C:
		//go this.MainLoop()
		fmt.Println("ListenAndServe ok")
		break
	}
	return true
}

func (this *HttpServer) Close() {
	if this.start == false { return }
	this.server.Close()
	//this.server.Shutdown(context.Background())
	<-this.ch_quit
}

//func (this *HttpServer) MainLoop() {
//	for {
//		time.Sleep(time.Millisecond*10)
//	}
//}



