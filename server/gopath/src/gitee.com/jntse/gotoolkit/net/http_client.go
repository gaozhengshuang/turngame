package network
import (
	"strings"
	"io"
	"io/ioutil"
	"net/http"
	_"gitee.com/jntse/gotoolkit/log"
)

// Http请求应答返回数据结构
type HttpResponse struct {
	Code 	int			// 错误码
	Status 	string		// 错误码描述
	Body 	[]byte		// Body内容
}

// --------------------------------------------------------------------------
/// @brief 
///
/// @param kind - "GET" or "POST"
/// @param url  - "http://47.90.41.170:27015/reportonline?game_id=5189&channel_id=1&zone_id=2&number=1"
/// @param body - ""
/// @return 
// --------------------------------------------------------------------------
func SendHttpRequest(kind string, url string, ctype string, body io.Reader) (*HttpResponse, error) {
	//
	client := &http.Client{}
	req, err := http.NewRequest(kind, url, body)
	if err != nil { return nil, err }

	// only post
	if kind == "POST" {
		req.Header.Set("Content-Type", ctype)
		//req.Header.Set("Cookie", "name=anny")
	}

	// "The client must close the response body when finished with it"
	resp, err := client.Do(req)
	if err != nil {  return nil, err }
	defer resp.Body.Close()
	
	rbody, err := ioutil.ReadAll(resp.Body)
	if err != nil { return nil, err }
	return &HttpResponse{Code:resp.StatusCode, Status: resp.Status, Body: rbody}, nil
}

// --------------------------------------------------------------------------
/// 使用示例
/// addr := "http://127.0.0.1:27015"
/// request := "/reportonline?game_id=5189&channel_id=1&zone_id=2&number=1"
/// body := "gmcmd=addbox id=1019"
/// HttpPost(addr + request, body)
// --------------------------------------------------------------------------
func HttpPost(url string, body string) (*HttpResponse, error)	{
	//ctype := "application/json"
	//ctype := "text/plain; charset=utf-8"
	ctype := "application/x-www-form-urlencoded"
	resp, err := SendHttpRequest("POST", url, ctype, strings.NewReader(body))
	//log.Info("HttpPost body:%#v", resp)
	return resp, err
}

// --------------------------------------------------------------------------
/// 使用示例
/// addr := "http://127.0.0.1:27015"
///	request := "/sendgmcmd?action=add&game_id=5189&zone_id=2"
///	HttpGet(addr + request)
// --------------------------------------------------------------------------
func HttpGet(url string) (*HttpResponse, error)	{
	resp, err := SendHttpRequest("GET", url, "", nil)
	//log.Info("HttpGet body:%#v", resp)
	return resp, err
}

