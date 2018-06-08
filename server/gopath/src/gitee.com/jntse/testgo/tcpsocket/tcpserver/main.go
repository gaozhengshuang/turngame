// hello.go
package main // package declaration,must only
import (     // import packages
	"fmt"
	"os"
	"runtime"
	"net"
	"bufio"
	"time"
)

// 将导入的包匿名，否则在程序中又没有使用到其内部的符号，那么编译器将报错
import _ "log"

var printf  = fmt.Printf
var println = fmt.Println
var g_ip = "47.90.41.170"
//var g_ip = "127.0.0.1"
var g_port = "27015"

func init()	{
	println("enter main.go init")
}

func printline(str string) {
	fmt.Printf("-----------------------[%s]---------------------\n", str)
}

func KeyBoardControler(ch chan int)	{
	println("starting keyboard controler...")
	inputReader := bufio.NewReader(os.Stdin)
	for {
		input, err := inputReader.ReadString('\n')
		if err != nil {
			println("keyboard err=", err)
			continue
		}

		switch input {
		case "exit\n":
			println("start shutdown...")
			ch <- 1
		case "quit\n":
			println("start shutdown...")
			ch <- 1
		default:
			println("keyboard input=",input)
		}
	}
}

func main() {
	printline("main")
	defer printline("main")

	// 命令行参数
	if len(os.Args) > 1 {
		for i, k := range os.Args {
			fmt.Printf("命令行参数argu[%d]=%s\n", i, k) // 依次打印每个参数
		}
	}

	// 获取系统信息
	numCPU := runtime.NumCPU();
	println("logical cpu num=", numCPU)

	// 设置最大'并行'执行的Goroutine数目
	runtime.GOMAXPROCS(numCPU)


	// 键盘监控协程
	chanclose := make(chan int, 1)
	go KeyBoardControler(chanclose)


	// 开始监听
	go startListen()


	// 退出
	select {
	case <-chanclose:
		println("shutdown...")
		time.Sleep(time.Millisecond*100)
	}
}

// 监听协程
func startListen()	{

	fmt.Println("starting the server ...")
	//listener, errlisten := net.Listen("tcp", g_ip + ":" + g_port)
	tcpaddr, errresolve := net.ResolveTCPAddr("tcp", g_ip + ":" + g_port)
	if errresolve != nil {
		fmt.Println("error ResolveTCPAddr:", errresolve)
		return
	}
	listener, errlisten := net.ListenTCP("tcp", tcpaddr)
	if errlisten != nil {
		fmt.Println("error listening:", errlisten.Error())
		return //终止程序
	}
	defer listener.Close()
	var connSet []net.Conn

	for {
		// 在server端backlog满时(未及时accept)，客户端将阻塞在Dial上
		time.Sleep(time.Millisecond*1000)

		// 设置超时，避免Accpet协程阻塞
		listener.SetDeadline(time.Now().Add(time.Millisecond * 10))
		conn, err := listener.AcceptTCP()		// 阻塞直到一个新连接请求达到
		if err != nil {
			if nerr, convertok := err.(net.Error); convertok && nerr.Timeout() {
				continue	
			} else {
				fmt.Println("error accepting:", err.Error())
				continue
			}
		}
		printf("session connected ok, remoteaddr=%v count=%d\n", conn.RemoteAddr(), len(connSet))

		// 做一些初始化
		conn.SetKeepAlive(true)
		conn.SetKeepAlivePeriod(1 * time.Minute)
		conn.SetNoDelay(true)
		conn.SetWriteBuffer(128 * 1024)
		conn.SetReadBuffer(128 * 1024)


		// 新链接移交给单独协程处理
		go handleAccept(conn)
	}
}

// 会话建立协程
func handleAccept(conn net.Conn)	{

	// ticker
	defer conn.Close()

	//
	for {
		time.Sleep(time.Millisecond)

		// recv 阻塞
		buf := make([]byte, 1024)
		_, err := recvData(buf, conn)
		if err != nil {
			printf("session[%s] disconnected by recv\n", conn.RemoteAddr())
			break;
		}

		// send 阻塞
		wbuf := []byte("servercmd=heartbeat packet")
		_, err = sendData(wbuf, conn)
		if err != nil {
			printf("session[%s] disconnected by send\n", conn.RemoteAddr())
			break;
		}
	}
}

func recvData(buf []byte, conn net.Conn) (len int, err error)	{
	len, err = conn.Read(buf)
	if err != nil {
		printf("session[%s] recvdata error, len=%d er=%v\n", conn.RemoteAddr(), len, err)
	}else {
		printf("session[%s] recvdata len=%d buf=\"%s\"\n", conn.RemoteAddr(), len, string(buf[:len]))
	}
	return;
}


func sendData(buf []byte, conn net.Conn) (len int, err error)	{
	len, err = conn.Write(buf)
	if err != nil {
		printf("session[%s] senddata error, len=%d err=%v\n", conn.RemoteAddr(), len ,err)
	}else {
		printf("session[%s] senddata ok len=%d\n", conn.RemoteAddr(), len)
	}
	return;
}


