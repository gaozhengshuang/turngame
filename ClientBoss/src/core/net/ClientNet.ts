module game {
    export class ClientNet {
        public static SOCKET_CONNECT_SUCCESS = "ClientNet_SOCKET_CONNECT_SUCCESS";
        public static SOCKET_CONNECT_CLOSE = "ClientNet_SOCKET_CONNECT_CLOSE";
        socket: egret.WebSocket;
        isConnect: boolean = false;

        public init() {
            this.socket = new egret.WebSocket();
            //设置数据格式为二进制，默认为字符串
            this.socket.type = egret.WebSocket.TYPE_BINARY;
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            window.addEventListener('offline', () => {
                this.onConnectClose();
                this.onSocketClose();
                NetFailed.getInstance().show();
            });
        }

        //添加收到数据侦听，收到数据会调用此方法
        private onReceiveMessage() {
            var _arr: egret.ByteArray = new egret.ByteArray();
            _arr.endian = egret.Endian.LITTLE_ENDIAN;
            this.socket.readBytes(_arr);
            var msgLength = _arr.readShort();
            var mainId = _arr.readShort();
            var cmdDataBA: egret.ByteArray = new egret.ByteArray();
            _arr.readBytes(cmdDataBA);

            this.onNotifyMessage(mainId, cmdDataBA);
        }

        //解析分发消息
        private onNotifyMessage(mainId: number, cmdDataBA: egret.ByteArray) {
            let protoData = table.ProtoIdById[mainId];
            let decoded = msg[protoData.Name.slice(4)].decode(cmdDataBA.bytes);
            NotificationCenter.postNotification(protoData.Name, decoded);
        }

        //添加链接打开侦听，连接成功会调用此方法
        private onSocketOpen() {
            this.isConnect = true;
            NotificationCenter.postNotification(ClientNet.SOCKET_CONNECT_SUCCESS);
        }

        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        private onSocketClose() {
            this.isConnect = false;
            NotificationCenter.postNotification(ClientNet.SOCKET_CONNECT_CLOSE);
        }

        //添加异常侦听，出现异常会调用此方法
        private onSocketError() {
            NetFailed.getInstance().show();
        }

        //连接服务器ByHostPort
        public onConnect(host: string, port: number) {
            this.socket.connect(host, port);
        }

        //连接服务器ByUrl
        public onConnectByUrl(url: string) {
            this.socket.connectByUrl(url);
        }

        //关闭链接
        public onConnectClose() {
            if (this.isConnect)
                this.socket.close();
        }

        //写入数据发送给服务器
        public onWriteBytes(sendMsg: egret.ByteArray) {
            this.socket.writeBytes(sendMsg);
        }

        private static _instance: ClientNet;

        public static getInstance(): ClientNet {
            if (!ClientNet._instance) {
                ClientNet._instance = new ClientNet();
            }
            return ClientNet._instance;
        }
    }

    //向服务端发送消息
    export function sendMessage(msgName: string, msg: protobuf.Writer): void {
        let msgId = findMsgId(msgName);
        if (msgId == 0) {
            egret.error("传入了错误的消息名或Proto文件没有初始化");
            return;
        }
        let buffer = msg.finish();

        let sendMsg: egret.ByteArray = new egret.ByteArray();
        let dataMsg: egret.ByteArray = new egret.ByteArray(buffer);
        sendMsg.endian = egret.Endian.LITTLE_ENDIAN;
        sendMsg.writeShort(dataMsg.length + 4); //消息组合(内容+包头4字节)
        sendMsg.writeShort(msgId); //消息ID
        sendMsg.writeBytes(dataMsg);
        ClientNet.getInstance().onWriteBytes(sendMsg);
    }

    export function findMsgId(msgName: string): number {
        if (table.ProtoIdByName[msgName]) {
            return table.ProtoIdByName[msgName].Id;
        }
        return 0;
    }
    
    export function ajax(url, args, method = "GET") {
        let d = defer();
        var x = new XMLHttpRequest();
        var params = "";
        if (args) {
            var p = [];
            for (var a in args) {
                var v = args[a];
                p.push(a + "=" + encodeURIComponent(v));
            }
            params = p.join("&");
        }
        if (method === 'POST') {
            x.open(method, url);
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        else {
            if (params)
                url = url + "?" + params;
            params = null;
            x.open(method, url);
        }
        x.onload = function () {
            var is_error = x.status >= 400 || (!x.status && !x.responseText);
            var err = null;
            if (is_error) {
                var statusText = x.statusText;
                if (x.status == 0)
                    statusText = "timeout";
                d.reject(new Error(statusText));
            }
            d.resolve(x.responseText);
        };
        x.send(params || null);
        return d.promise();
    }

    export async function SendHttp(msgName: string, msgJson: any = {}) {
        let ip = $neiNetIp;
        let r = <string>await ajax(ip + msgName, msgJson, "POST");
        let json = JSON.parse(r);
        if (json.code != 200) {
            showTips(json.msg, true);
            return null;
        }
        return json;
    }


    export function ajaxJson(url, params) {
        let d = defer();
        var x = new XMLHttpRequest();
        x.open('POST', url);
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        x.onload = function () {
            var is_error = x.status >= 400 || (!x.status && !x.responseText);
            var err = null;
            if (is_error) {
                var statusText = x.statusText;
                if (x.status == 0)
                    statusText = "timeout";
                d.reject(new Error(statusText));
            }
            d.resolve(x.responseText);
        };
        x.send(params || null);
        return d.promise();
    }

    export async function postHttpByJson(ip: string, msgJson: any = {}) {
        let r = <string>await ajaxJson(ip, msgJson);
        let json = JSON.parse(r);
        if (json.status != 0) {
            showTips(json.msg, true);
            return null;
        }
        return json;
    }
}