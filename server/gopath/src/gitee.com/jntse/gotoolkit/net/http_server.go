package network
import (
	"time"
	"io/ioutil"
	"net/http"
	"gitee.com/jntse/gotoolkit/log"
)

type HttpResponseHandle func(w http.ResponseWriter, urlpath string, rawquery string, body []byte)

// --------------------------------------------------------------------------
/// @brief Http Response Handler 包装器
// --------------------------------------------------------------------------
type HttpResponseHandleWarpper struct {
	handler	HttpResponseHandle
}

func NewHttpResponseHandleWarpper(cb HttpResponseHandle) *HttpResponseHandleWarpper {
	return &HttpResponseHandleWarpper{handler:cb }
}

// 注意：ServeHTTP会在一个新的协程里调用，如果想要单线程处理可以将数据push到主线程chan中
func (this *HttpResponseHandleWarpper) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	//log.Trace("########################################################")
	//log.Trace("r=%#v", r)
	//log.Trace("########################################################")
	//log.Trace("URL=%#v", r.URL)
	//log.Trace("URL.path=%#v", r.URL.Path)
	//log.Trace("URL.RawQuery=%#v", r.URL.RawQuery)
	//log.Trace("###########################")
	//log.Trace("RequestURI=%#v", r.RequestURI)
	//log.Trace("Method=%#v", r.Method)
	//log.Trace("Local=%#v", r.Host)
	//log.Trace("Remote=%#v", r.RemoteAddr)
	//log.Trace("Header=%#v", r.Header)
	//log.Trace("########################################################")
	
	if this.handler == nil {
		log.Error("must regist http response handle func")
		return
	}

	body , err := ioutil.ReadAll(r.Body)
	if err != nil { 
		log.Info("http request err=%s",err)
		return
	}

	this.handler(w, r.URL.Path, r.URL.RawQuery, body)
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
//type http.Handler interface {
//	ServeHTTP(ResponseWriter, *Request)
//}  

type HttpListener struct {
	server 	*http.Server
	handler http.Handler
	conf	HttpListenConf
	start 	bool
	quit 	bool
	ch_quit	chan int32
}

func NewHttpListener(conf HttpListenConf) *HttpListener {
	return &HttpListener{conf:conf}
}

func (this *HttpListener) Name() string {
	return this.conf.Name
}

func (this* HttpListener) Host() *NetHost {
	return &this.conf.Host
}

func (this *HttpListener) Init(cb HttpResponseHandle) {

	this.ch_quit = make(chan int32, 1)			// nonblock

	// 路由handler (不同的URL可以由不同的handler处理)
	mux := &http.ServeMux{}
	this.handler = mux
	mux.Handle("/", NewHttpResponseHandleWarpper(cb))
	//this.RegistResponseHandler("/sendgmcmd", NewHttpResponseHandleWarpper(HttpResponseHandleWarpperGmCmd))
	//this.RegistResponseHandler("/mail", NewHttpResponseHandleWarpper(HttpResponseHandleWarpperMail))
	//this.RegistResponseHandler("/onlinereport", NewHttpResponseHandleWarpper(HttpResponseHandleWarpperOnlineReport))
	//this.RegistResponseHandler("/notice", NewHttpResponseHandleWarpper(HttpResponseHandleWarpperNotice))

	// 简单handler
	//this.handler = http.FileServer(http.Dir("/home/ecs-user/gopath/src/testhttp"))	// 文件服务器
	//this.handler = NewHttpResponseHandleWarpper(cb)

	this.server  = &http.Server {
		Addr:           this.Host().String(),
		Handler:        this.handler,	// 如果Handler是nil可以使用ServerMux路由
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
}

func (this *HttpListener) RegistResponseHandler(pattern string, wrapper http.Handler) {
	mux, ok := this.handler.(*http.ServeMux)
	if ok == false { return }
	mux.Handle(pattern, wrapper)	// 注册到ServeMux中
}

func (this *HttpListener) Start() bool {
	if this.start == true { return false }
	go func() {
		this.start = true
		re := this.server.ListenAndServe()		// block
		log.Error("HttpListener'[%s]' Quit ListenAndServe [%v]...", this.Name(), re)
		this.quit = true
		this.ch_quit <- 1
	}()

	// 等待http监听是否成功
	timerwait := time.NewTimer(time.Millisecond * 20)
	select {
	case <-this.ch_quit:
		log.Error("HttpListener'%s' listen'%s' fail", this.Name(), this.Host().String())
		return false
	case <-timerwait.C:
		log.Info("HttpListener'%s' listen'%s' ok", this.Name(), this.Host().String())
		//go this.MainLoop()
		break
	}
	return true
}

func (this *HttpListener) shutdown() {
	if this.start == false { return }
	if this.quit == true { return }
	this.server.Close()
	//this.server.Shutdown(context.Background())
	<-this.ch_quit
}

//func (this *HttpListener) MainLoop() {
//	for {
//		time.Sleep(time.Millisecond*1)
//	}
//}



