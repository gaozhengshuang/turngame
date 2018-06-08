package main
import (
	"fmt"
	"strings"
	"io/ioutil"
	"io"
	"net/http"
)

// http请求应答结构
type HttpResponse struct {
	Code 	int
	Status 	string
	Body 	[]byte
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

func HttpPost(url string, body string) (*HttpResponse, error)	{
	//ctype := "application/json"
	//ctype := "text/plain; charset=utf-8"
	ctype := "application/x-www-form-urlencoded"
	resp, err := SendHttpRequest("POST", url, ctype, strings.NewReader(body))
	if err != nil {
		fmt.Printf("HttpPost err: %s\n", err)
		return resp, err
	}

	fmt.Printf("HttpPost body:%#v\n", resp)
	return resp, err
}

func HttpGet(url string) (*HttpResponse, error)	{
	resp, err := SendHttpRequest("GET", url, "", nil)
	if err != nil {
		fmt.Printf("HttpGet err: %s\n", err)
		return resp, err
	}

	fmt.Printf("HttpGet body:%#v\n", resp)
	return resp, err
}

