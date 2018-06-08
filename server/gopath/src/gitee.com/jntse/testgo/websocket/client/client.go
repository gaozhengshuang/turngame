// Copyright 2015 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"flag"
	"log"
	"net/url"
	"os"
	"os/signal"
	"time"
	"fmt"

	"github.com/gorilla/websocket"
)

var addr = flag.String("addr", "127.0.0.1:8080", "http service address")

func main() {
	flag.Parse()
	log.SetFlags(0)

	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt)

	// 连接服务器
	url_server := url.URL{Scheme: "ws", Host: *addr, Path: "/service_echo"}
	log.Printf("connecting to %s", url_server.String())
	conn, _, err := websocket.DefaultDialer.Dial(url_server.String(), nil)
	if err != nil {
		log.Fatal("dial:", err)
		return
	}
	defer conn.Close()


	// 接收线程
	done := make(chan struct{})
	readLoop := func() {
		defer fmt.Println("quit readLoop")
		defer conn.Close()
		defer close(done)
		for {
			_, message, err := conn.ReadMessage()
			if err != nil {
				log.Println("read:", err)
				return
			}
			log.Printf("recv: %s", message)
		}
	}
	go readLoop()


	// 发送线程
	sendLoop := func() {
		defer fmt.Println("quit sendLoop")
		ticker := time.NewTicker(time.Second)
		defer ticker.Stop()
		for {
			select {
			case <-ticker.C:
				//err := conn.WriteMessage(websocket.TextMessage, []byte(t.String()))
				err := conn.WriteMessage(websocket.TextMessage, []byte("hello"))
				if err != nil {
					log.Println("write:", err)
					return
				}
			case <-done:
				return
			}
		}
	}
	go sendLoop()


	// 主线程
	mainLoop := func() {
		defer fmt.Println("quit mainLoop")
		for {
			select {
			case <-interrupt:
				log.Println("interrupt")
				// To cleanly close a connection, a client should send a close
				// frame and wait for the server to close the connection.
				closeCode := websocket.FormatCloseMessage(websocket.CloseNormalClosure, "client quit ^.^ ")
				err := conn.WriteMessage(websocket.CloseMessage, closeCode)
				fmt.Printf("Write CloseMessage: %v\n", closeCode)
				if err != nil {
					log.Println("write close:", err)
					return
				}
				select {
				case <-done:
				case <-time.After(time.Second):
				}
				conn.Close()
				return
			}
		}
	}

	mainLoop()
}
