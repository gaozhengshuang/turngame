import _ from 'lodash';
import moment from 'moment';

import Define from '../Util/Define';
import Tools from '../Util/Tools';
import ConfigController from './ConfigController';
import ProtoMsg from '../Util/ProtoMsg';
import { stringify } from 'querystring';

var NetWorkController = function () {
    this.sock = null;
    this.listeners = {};
    this.protoIndexById = {};
    this.protoIndexByName = {};

    this.connectedCallback = null;
    this.closeedCallback = null;
}

NetWorkController.prototype.init = function (cb) {
    let protoIndexs = ConfigController.GetConfig('ProtoId');
    if (protoIndexs == null) {
        Tools.invokeCallback(cb, 'proto配置错误');
        return;
    }
    for (let i = 0; i < protoIndexs.length; i++) {
        let index = protoIndexs[i];
        let checks = Tools.checkParams(index, ['Id', 'Name']);
        if (checks.length > 0) {
            console.log('proto Index 参数检查失败 ' + index);
            continue;
        }
        this.protoIndexById[index.Id] = index.Name;
        this.protoIndexByName[index.Name] = index.Id;
    }
    Tools.invokeCallback(cb, null);
};

NetWorkController.prototype.connect = function (url, cb) {
    this.connectedCallback = cb;
    this.sock = new WebSocket(url);
    this.sock.onmessage = this.onMessage.bind(this);
    this.sock.onerror = this.onError.bind(this);
    this.sock.onopen = this.onOpen.bind(this);
    this.sock.onclose = this.onClose.bind(this);
}

NetWorkController.prototype.send = function (name, obj, cb) {
    if (this.sock == null || this.sock.readyState != WebSocket.OPEN) {
        return;
    }
    if (this.protoIndexByName[name] == null) {
        Tools.invokeCallback(cb, '没找到消息 ' + name);
        return;
    }
    let proto = Tools.getValueInObj(ProtoMsg, name);
    if (proto == null) {
        Tools.invokeCallback(cb, '没有消息体 : ' + proto);
        return;
    }
    let message = proto.fromObject(obj);
    let result = proto.verify(message);
    if (result != null) {
        Tools.invokeCallback(cb, '消息内容错误 : ' + result);
        return;
    }
    let msg = proto.encode(message).finish();
    let id = this.protoIndexByName[name];
    let head = new Uint8Array([(msg.length + 4) & 0xff, (msg.length + 4) >> 8, id & 0xff, id >> 8,]);
    let info = new Uint8Array(msg.length + 4);
    console.log('发送 ' + name + ' 消息');
    info.set(head, 0);
    info.set(msg, 4);
    this.sock.send(info);
    Tools.invokeCallback(cb, null);
};

NetWorkController.prototype.sendTest = function (id, msg) {
    let head = new Uint8Array([(msg.length + 4) & 0xff, (msg.length + 4) >> 8, id & 0xff, id >> 8,]);
    let info = new Uint8Array(msg.length + 4);
    info.set(head, 0);
    info.set(msg, 4);
    this.sock.send(info);
}

NetWorkController.prototype.close = function (cb) {
    if (this.sock == null || this.sock.readyState != WebSocket.OPEN) {
        Tools.invokeCallback(cb, '连接不可用');
        return;
    }
    this.closeedCallback = cb;
    this.sock.close();
}

NetWorkController.prototype.addListener = function (name, cb) {
    if (this.protoIndexByName[name] == null) {
        return '没找到消息 ' + name;
    }
    let id = this.protoIndexByName[name];
    let listenerlist = this.listeners[id];
    if (listenerlist == null) {
        listenerlist = [];
        this.listeners[id] = listenerlist;
    }
    listenerlist.push(cb);
    return null;
}

NetWorkController.prototype.removeListener = function (name, cb) {
    if (this.protoIndexByName[name] == null) {
        return '没找到消息 ' + name;
    }
    let id = this.protoIndexByName[name];
    let listenerlist = this.listeners[id];
    if (listenerlist != null) {
        _.remove(listenerlist, function (listen) {
            return cb == listen;
        })
    }
    return null;
}

//事件函数
NetWorkController.prototype.onMessage = function (obj) {
    let reader = new FileReader();
    reader.readAsArrayBuffer(obj.data);
    reader.onload = function () {
        var uint8View = new Uint8Array(reader.result);
        let length = (uint8View[0] & 0xff) + (uint8View[1] << 8);
        let msgid = (uint8View[2] & 0xff) + (uint8View[3] << 8);
        var msg = uint8View.subarray(4);
        if (length != uint8View.length) {
            console.log('长度不匹配 包体长度 : ' + uint8View.length + ' 消息长度 : ' + length);
        } else {
            let protoName = this.protoIndexById[msgid];
            if (protoName == null) {
                console.log('没有消息类型 : ' + msgid);
                return;
            }
            //解析proto数据
            let proto = Tools.getValueInObj(ProtoMsg, protoName);
            if (proto == null) {
                console.log('没有消息体 : ' + protoName);
                return;
            }
            let message = proto.decode(msg);
            let obj = proto.toObject(message);
            console.log('收到 ' + protoName + ' 消息');
            //调用监听函数
            let listenerlist = this.listeners[msgid];
            if (listenerlist != null) {
                for (let i = 0; i < listenerlist.length; i++) {
                    let listener = listenerlist[i];
                    Tools.invokeCallback(listener, msgid, obj);
                }
            }
        }
    }.bind(this);
}

NetWorkController.prototype.onClose = function () {
    console.log(new Date() + '[网络消息] socket closed');
    this.sock = null;
    Tools.invokeCallback(this.closeedCallback);
    this.closeedCallback = null;
    cc.systemEvent.dispatchEvent(new cc.Event.EventCustom(Define.EVENT_KEY.NET_CLOSE));
}

NetWorkController.prototype.onOpen = function (info) {
    console.log(new Date() + '[网络消息] socket opend ' + stringify(info));
    Tools.invokeCallback(this.connectedCallback);
    this.connectedCallback = null;
    cc.systemEvent.dispatchEvent(new cc.Event.EventCustom(Define.EVENT_KEY.NET_OPEN));
}

NetWorkController.prototype.onError = function (err) {
    console.log(new Date() + '[网络消息] socket error ' + err);
    this.connectedCallback = null;
    cc.systemEvent.dispatchEvent(new cc.Event.EventCustom(Define.EVENT_KEY.NET_CLOSE));
}

module.exports = new NetWorkController();