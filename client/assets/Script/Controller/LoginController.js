import async from 'async';

import NetWorkController from './NetWorkController';
import ConfigController from "./ConfigController";
import Tools from "../Util/Tools";
import moment from "moment/moment";
import Define from "../Util/Define";
import Platform from '../Util/Platform';

var LoginController = function () {
    this.sendHeartBeatTime = 0;
    this.revHeartBeat = 0;
    this.loginServerUrl = '';
    this.loginedToGate = false;

    this.userid = null;
    //断线重连标志位
    this.reconnecting = false;
}

LoginController.prototype.init = function (cb) {
    NetWorkController.addListener('msg.GW2C_HeartBeat', this.onGW2C_HeartBeat.bind(this));
    NetWorkController.addListener('msg.L2C_RetLogin', this.onL2C_RetLogin.bind(this));
    cc.systemEvent.on(Define.EVENT_KEY.CONNECT_TO_GATESERVER, this.onLoginedToGate, this);
    cc.systemEvent.on(Define.EVENT_KEY.NET_OPEN, this.onNetOpen, this);
    cc.systemEvent.on(Define.EVENT_KEY.NET_CLOSE, this.onNetClose, this);
    Tools.invokeCallback(cb, null);
}

LoginController.prototype.connectToLoginServer = function (cb) {
    let url = 'ws://' + Platform.LoginHost + ':' + Platform.LoginPort + '/' + Platform.LoginSuffix;
    this.loginServerUrl = url;
    NetWorkController.connect(url, cb);
}

//回调函数
LoginController.prototype.onGW2C_HeartBeat = function (msgid, data) {
    console.log(new Date() + '[网络消息] 接收心跳包');
    this.revHeartBeat = moment().unix();
}

LoginController.prototype.onL2C_RetLogin = function (msgid, data) {
    //连接gate server
    let UserModel = require('../Model/User');
    let url = 'ws://' + data.gatehost.ip + ':' + data.gatehost.port + '/ws_handler';
    async.waterfall([
        function (anext) {
            //第一步断开websocket
            NetWorkController.close(anext);
        },
        function (anext) {
            //第二步 连接gateserver
            NetWorkController.connect(url, anext);
        },
        function (anext) {
            //第三步 发送登录消息
            NetWorkController.send('msg.C2GW_ReqLogin', {
                account: UserModel.getAccount(),
                verifykey: data.verifykey,
                token: UserModel.loginInfo.token
            }, function (err) {
                anext(err);
            })
        }.bind(this)
    ], function (err) {
        if (err) {
            console.log('[严重错误] ' + err);
        }
    }.bind(this));
}

LoginController.prototype.onLoginedToGate = function (event) {
    let UserModel = require('../Model/User');
    this.userid = UserModel.getUserId();
    this.loginedToGate = true;
    this.reconnecting = false;
    this.revHeartBeat = moment().unix();
}

LoginController.prototype.onNetOpen = function (event) {
    this.sendHeartBeatTime = moment().unix();
}

LoginController.prototype.onNetClose = function (event) {
    if (this.loginedToGate) {
        this.loginedToGate = false;
        this.showNetFailed();
    }
}
/**
 * 自动登录 凡是websocket断开后都需要重新登录 [重要函数]
 */
LoginController.prototype.autoLogin = function (reason) {
    let UserModel = require('../Model/User');
    if (UserModel.loginInfo != null && !this.reconnecting) {
        this.reconnecting = true;
        console.log(new Date() + ' [断线重连] 原因 ' + reason);
        this.connectToLoginServer(this.autoLoginCallBack.bind(this));
    }
}

LoginController.prototype.autoLoginCallBack = function () {
    //登录
    let UserModel = require('../Model/User');
    NetWorkController.send('msg.C2L_ReqLogin', UserModel.loginInfo);
}

LoginController.prototype.update = function (dt) {
    let curTime = moment().unix();
    let UserModel = require('../Model/User');
    if (this.loginedToGate) {
        //这个状态下需要检测心跳
        if ((NetWorkController.sock != null && NetWorkController.sock.readyState == WebSocket.OPEN)) {
            //发送心跳包了
            if (curTime - this.sendHeartBeatTime > Define.HEART_BEAT.INTERVAL) {
                if (this.userid == null) {
                    this.userid = UserModel.getUserId();
                }
                if (this.userid != null) {
                    console.log(new Date() + '[网络消息] 发送心跳包');
                    NetWorkController.send('msg.C2GW_HeartBeat', {
                        uid: this.userid,
                        time: moment().unix()
                    })
                    this.sendHeartBeatTime = curTime;
                }
            }
            //检查心跳包
            if (this.userid == null) {
                this.userid = UserModel.getUserId();
            }
            if (this.userid != null) {
                //说明登录gate成功了
                if (this.revHeartBeat > 0 && curTime - this.revHeartBeat > Define.HEART_BEAT.TIMEOUT) {
                    console.log('超时了');
                    this.autoLogin('心跳超时');
                    this.loginedToGate = false;
                }
            }
        } else {
            //说明有问题了，启动自动登录流程
            this.autoLogin('socket 状态有问题');
            this.loginedToGate = false;
        }
    }
}

LoginController.prototype.showNetFailed = function () {
    cc.loader.loadRes("Prefab/NetFailedView", function (err, prefab) {
        if (err) {
            console.log('[严重错误] 奖励资源加载错误 ' + err);
        } else {
            var newNode = cc.instantiate(prefab);
            cc.director.getScene().getChildByName('Canvas').addChild(newNode);
        }
    });
}

module.exports = new LoginController();