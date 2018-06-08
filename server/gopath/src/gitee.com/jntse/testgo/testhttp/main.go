package main
import (
	"time"
	"fmt"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/net"
	"net/http"
)

func HttpServerResponseCallBack(w http.ResponseWriter, urlpath string, rawquery string, body []byte) {
	fmt.Println("HttpServerResponseCallBack")

	//
	fmt.Printf("urlpath: %s\n", urlpath)
	fmt.Printf("rawquery: %s\n", rawquery)
	fmt.Printf("body: %s\n", string(body))


	// header 属性设置
	//head := w.Header()
	//head.Set("Content-Type", "text/plain; charset=utf-8")		// default
	//head.Set("Content-Type", "application/json")
	//head.Set("Content-Type", "application/x-www-form-urlencoded")

	// ret code
	w.WriteHeader(http.StatusOK)
	//w.WriteHeader(http.StatusNotFound)	// "http: multiple response.WriteHeader calls"
	w.Write([]byte("hello golang http test"))
}

var g_KeyBordInput util.KeyBordInput
func main() {
	fmt.Println("start httpserver ok")

	//
	httpsvr := NewHttpServer()
	httpsvr.Init("127.0.0.1", 27010, HttpServerResponseCallBack)
	if httpsvr.Start() == false {
		return 
	}

	//
	//TestPost()

	// 初始化键盘输入
	g_KeyBordInput.Init()
	g_KeyBordInput.Start()

	for {
		time.Sleep(time.Millisecond)
		select {
		case cmd, _ := <-g_KeyBordInput.C:
			switch cmd {
			case "exit","quit":
				httpsvr.Close()
				return;
			case "close":
				httpsvr.Close()
			case "post":
				TestPost()
			case "get":
				TestGet()
			case "recharge":
				TestRecharge()
			case "additem":
				TestAddItem()
			case "consume":
				TestConsume()
			case "loginstat":
				TestLoginStat()
			case "query":
				TestQuueryPlatformMoney()
			default:
				fmt.Println("没有这个指令")
			}
		}
	}
}

func TestPost() {
	//url := "http://192.168.30.203:19000"
	url := "http://210.73.214.76:19000"
	//request := "/reportonline?game_id=5189&channel_id=1&zone_id=2&number=1"
	//body := "gmcmd=addbox id=1019"
	request := ""
	body := "gmcmd=consume&date=2018-04-09&day=1"
	resp, _ := network.HttpPost(url + request, body)
	fmt.Printf("HttpPost body:%#v\n", resp)
}

func TestGet() {
	url := "http://192.168.30.203:19000"
	//url := "http://127.0.0.1:27015"
	request := "/sendgmcmd?action=add&game_id=5189&zone_id=2"
	resp, _ := HttpGet(url + request)
	fmt.Printf("HttpPost body:%#v\n", resp)
}

func TestRecharge() {
	url := "http://192.168.30.203:19000"
	body := `{"order_id":"1000014_recharge_1523431086192124","tvmid":"wxh5ac32853d4189a5a4cd51b36","amount":1,` + 
		`"transaction_id" :"20180410180825be5f0be641449","time":"2018-04-10 18:08:31","nonce":"215e2bdf3cf78d0eafa215c8dce3afc4",` +
		`"timestamp":1523354902,"sign":"399d184a9938487ddaa4f9bc433b976e"}`
	resp, _ := network.HttpPost(url , body)
	fmt.Printf("HttpPost body:%#v\n", resp)
}

func TestAddItem() {
	url := "http://192.168.30.203:19000"
	//url := "http://210.73.214.76:19000"
	body := `{"gmcmd":"compen", "name":"1000001", "id":"10001", "num":"10"}`
	resp, _ := network.HttpPost(url ,body)
	fmt.Printf("HttpPost body:%#v\n", resp)
}

func TestConsume() {
	//url := "http://192.168.30.203:19000"
	url := "http://210.73.214.75:19000"
	body := `{"gmcmd":"consume", "date":"2018-05-20", "day":"10"}`
	resp, _ := network.HttpPost(url ,body)
	fmt.Printf("HttpPost body:%#v\n", resp)
}

func TestLoginStat() {
	url := "http://210.73.214.75:19000"
	body := `{"gmcmd":"login", "date":"2018-05-20", "day":"15"}`
	resp, _ := network.HttpPost(url, body)
	fmt.Printf("HttpPost body:%#v\n", resp)
}

func TestQuueryPlatformMoney() {
	url := "https://open.yx.tvyouxuan.com/public/finance/Query"
	body := `{"key":"tope7b61803d1091f9b5e0bdcf2f486e","nonce":"1526625470720399","sign":"e5980b020c7feaa8d297a0b1f37f04b9", ` +
	`"timestamp":1526625470,"token":"red_7d82b577a275170d5b39134d3dd33317","tvmid":"wxh5abf0cc614977c20a1cd64d7"}`
	tm1 := util.CURTIMEMS()
	resp, _ := network.HttpPost(url ,body)
	fmt.Printf("HttpPost cost[%dms] code:%d status:%s body:%s\n", util.CURTIMEMS() - tm1, resp.Code, resp.Status, resp.Body)

}
