package main
import "fmt"
import "os"
import "os/signal"
import "syscall"
import "sync"
import "time"


type SignalHandle func()
type tSignal struct {
	handlers	map[os.Signal]SignalHandle
	ch 			chan os.Signal
	synquit 	sync.WaitGroup
	running 	bool
}


func CreateNewtSignal() *tSignal {
	t := new(tSignal)
	t.Init()
	return t
}


func (t *tSignal) Init() {
	t.handlers = make(map[os.Signal]SignalHandle)
	t.ch = make(chan os.Signal, 1)
}


// --------------------------------------------------------------------------
/// @brief 
// syscall.SIGINT
// syscall.SIGQUIT
// syscall.SIGABRT
// syscall.SIGTERM
// syscall.SIGPIPE
// syscall.SIGHUP
// --------------------------------------------------------------------------
func (t* tSignal) Regist(id os.Signal, handler SignalHandle ) {
	t.handlers[id] = handler
	signal.Notify(t.ch, id)
}


func (t* tSignal) Start() {
	if t.running { panic("tSignal is running already") }
	t.running = true
	t.synquit.Add(1)
	go t.run()
}


func (t *tSignal) run() {
	defer t.synquit.Done()
	for ;; {
		time.Sleep(time.Millisecond * 10)
		select {
		case id, open := <-t.ch:
			if open == false {
				fmt.Println("tSignal coroutine quit")
				return
			}
			t.handle(id)
		}
	}
}


func (t *tSignal) handle(id os.Signal) {
	fmt.Printf("\nreceive a signal '%s'\n", id)
	f, rfind := t.handlers[id]
	if rfind == true { f() }
	//switch signal {
	//case syscall.SIGHUP:
	//case syscall.SIGINT:
	//case syscall.SIGQUIT:
	//}
}


func (t *tSignal) Close() {
	close(t.ch)
	t.synquit.Wait()
}


var gQuit bool
func SignalInt() 	{ gQuit = true; fmt.Println("SignalInt")  }
func SignalQuit() 	{ gQuit = true; fmt.Println("SignalQuit") }
func SignalAbrt() 	{ gQuit = true; fmt.Println("SignalAbrt") }
func SignalTerm() 	{ gQuit = true; fmt.Println("SignalTerm") }
func SignalPipe() 	{ gQuit = true; fmt.Println("SignalPipe") }
func SignalHup() 	{ gQuit = true; fmt.Println("SignalHup")  }


func main() {
	sighandler := CreateNewtSignal()
	sighandler.Regist(syscall.SIGINT,  SignalInt)
	sighandler.Regist(syscall.SIGTERM, SignalTerm)
	sighandler.Regist(syscall.SIGHUP,  SignalHup)
	sighandler.Regist(syscall.SIGQUIT, SignalQuit)
	sighandler.Regist(syscall.SIGABRT, SignalAbrt)
	sighandler.Regist(syscall.SIGPIPE, SignalPipe)
	sighandler.Start()

	gQuit = false
	for {
		if gQuit == true { break }
		time.Sleep(time.Millisecond * 10)
	}
	sighandler.Close()
}


