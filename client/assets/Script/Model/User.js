import _ from 'lodash';

import Define from '../Util/Define';
import Platform from '../Util/Platform';
import Tools from '../Util/Tools';
import NetWorkController from '../Controller/NetWorkController';
import NotificationController from '../Controller/NotificationController';
import HttpUtil from '../Util/HttpUtil';

var UserModel = function () {
    this.loginInfo = null;
    this.userInfo = {};
    this.platformCoins = 0;
}

UserModel.prototype.init = function (cb) {
    NetWorkController.addListener('msg.GW2C_SendUserInfo', this.onGW2C_SendUserInfo.bind(this));
    NetWorkController.addListener('msg.GW2C_RetLogin', this.onGW2C_RetLogin.bind(this));
    NetWorkController.addListener('msg.GW2C_SendUserPlatformMoney', this.onGW2C_SendUserPlatformMoney.bind(this));
    NetWorkController.addListener('msg.GW2C_RetDeliveryDiamond', this.onGW2C_RetDeliveryDiamond.bind(this));

    Tools.invokeCallback(cb);
}
/**
 * 消息处理接口
 */

UserModel.prototype.onGW2C_RetLogin = function (msgid, data) {
    console.log(data);
    if (data.errcode != null) {
        NotificationController.postNotification(Define.EVENT_KEY.TIP_TIPS, { text: data.errcode });
        //返回登录界面
    }
}

UserModel.prototype.onGW2C_SendUserInfo = function (msgid, data) {
    this.userInfo = data;
}

UserModel.prototype.onGW2C_SendUserPlatformMoney = function (msgid, data) {
    this.platformCoins = data.coins || 0;
    NotificationController.postNotification(Define.EVENT_KEY.USERINFO_UPDATECOINS, this.platformCoins);
}
/**
 * 对外接口
 */
UserModel.prototype.getUserId = function () {
    return Tools.getValueInObj(this.userInfo, 'entity.id');
    // return 1010008;
}

UserModel.prototype.getAccount = function () {
    return Tools.getValueInObj(this.loginInfo, 'account');
}

UserModel.prototype.getTvmToken = function (cb) {
    if (Platform.PLATFORM == 'Normal') {
        Tools.invokeCallback(cb, '');
    } else {
        if (!Tools.invokeCallback(window.GetCurrentUser, function (usr) {
            Tools.invokeCallback(cb, usr.token);
        })) {
            Tools.invokeCallback(cb, null);
        }
    }
}
UserModel.prototype.getUser = function (cb) {
    if (Platform.PLATFORM == 'Normal') {
        Tools.invokeCallback(cb, null);
    } else {
        console.log('aaaaaaaaaaaaa');
        if (!Tools.invokeCallback(window.GetCurrentUser, function (usr) {
            console.log('bbbbbbbbbbbbbbbb');
            Tools.invokeCallback(cb, usr);
        })) {
            console.log('cccccccccccccccc');
            Tools.invokeCallback(cb, null);
        }
    }
}

UserModel.prototype.getPlayerGoods = function (cb) {
    HttpUtil.HTTPGet(Platform.GOODSPATH, { uid: this.getUserId(), state: 0 }, function (retJson) {
        console.log(retJson);
        if (retJson.code == 0 || retJson.msg == "操作成功") {
            Tools.invokeCallback(cb, retJson.data);
        } else {
            Tools.invokeCallback(cb, []);
        }
    });
}


UserModel.prototype.onGW2C_RetDeliveryDiamond = function (msgid, data) {
    let content = '提取钻石:' + data.diamond + '个，提取钻石券:' + data.diamondparts + '个，折算钻石' + (data.total - data.diamond) +
        '个，本次共提取钻石' + data.total + '个';
    NotificationController.postNotification(Define.EVENT_KEY.TIP_TIPS, { text: content, alive: 5 });
}

module.exports = new UserModel();