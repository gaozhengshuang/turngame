// hello.go
package main // package declaration,must only
import (     // import packages
	"fmt"
	"os"
	"runtime"
	"runtime/debug"
	"net"
	"bufio"
)

// 将导入的包匿名，否则在程序中又没有使用到其内部的符号，那么编译器将报错
import _ "log"
import  "time"

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
	debug.FreeOSMemory()
	runtime.GC()

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


	// 新建一个连接
	for i := 0; i < 1; i++	{
		go makeNewConnection()
		time.Sleep(time.Millisecond)
	}


	select {
	case <-chanclose:
		println("shutdown...")
		time.Sleep(time.Millisecond*100)
	}
}

func SendData(buf []byte, conn net.Conn) bool	{
	len, er := conn.Write(buf)
	if er != nil {
		printf("client[%s] senddata error, len=%d err=%s\n", conn.LocalAddr(), len ,er)
		return false
	}
	printf("client[%s] senddata ok len=%d\n", conn.LocalAddr(), len)
	return true
}

func RecvData(buf []byte, conn net.Conn) bool	{
	//conn.SetReadDeadline(time.Now().Add(time.Millisecond * 1))	// 设置接受超时，超时没有数据接收会报错
	len, er := conn.Read(buf)
	if er != nil {
		printf("client[%s] recvdata error, len=%d er=%s\n", conn.LocalAddr(), len, er)
		if nerr, convertok := er.(net.Error); convertok && nerr.Timeout() { return true }
		return false
	}
	printf("client[%s] recvdata len=%d buf=\"%s\"\n", conn.LocalAddr(), len, string(buf[:len]))
	return true
}

// 新建一个连接
func makeNewConnection()	{
	var newconn net.Conn
	var isConnectedOk bool = false
	for {

		time.Sleep(time.Millisecond*2000)
		if isConnectedOk == false	{
			// 在server端backlog满时(未及时accept)，客户端将阻塞在Dial上
			conn, err := net.Dial("tcp", g_ip + ":" + g_port) // tcp ipv4
			if err != nil {
				fmt.Println("error dialing:", err.Error())
				continue
			}

			newconn = conn
			isConnectedOk = true
			ch := make(chan string)
			printf("client[%s] connected[%s] ok\n", conn.LocalAddr(), conn.RemoteAddr())
			go handleSession(newconn, ch)

			// 断开后通知重连
			closemsg := <-ch
			isConnectedOk = false
			printf("client[%s] disconnect flag=%s\n", conn.LocalAddr(), closemsg)
		}

	}
}

func handleSession(newconn net.Conn, ch chan string)	{

	for {
		time.Sleep(time.Millisecond* 100)

		// 发送数据 阻塞
		//wbuf := []byte("client send cmd=login account=user passwd=12345")
		wbuf := make([]byte, 1024, 1024)
		copy(wbuf, []byte("clientcmd=heartbeat packet"))
		if SendData(wbuf, newconn) == false {
			newconn.Close()
			ch <- "Session send close"
			break
		}

		// 接收数据，阻塞
		rbuf := make([]byte, 100)
		if RecvData(rbuf, newconn) == false {
			newconn.Close()
			ch <- "Session recv close"
			break
		}
	}
}

