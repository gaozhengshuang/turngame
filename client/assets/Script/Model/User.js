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
    this.curGainCount = 0;
    this.totalGainCount = 0;
}

UserModel.prototype.Init = function (cb) {
    NetWorkController.AddListener('msg.GW2C_SendUserInfo', this, this.onGW2C_SendUserInfo);
    NetWorkController.AddListener('msg.GW2C_RetLogin', this, this.onGW2C_RetLogin);
    NetWorkController.AddListener('msg.GW2C_SendUserPlatformMoney', this, this.onGW2C_SendUserPlatformMoney);
    NetWorkController.AddListener('msg.GW2C_SumGet', this, this.onGW2C_SumGet);
    NetWorkController.AddListener('msg.GW2C_UpdateYuanbao', this, this.onGW2C_UpdateYuanbao);

    Tools.InvokeCallback(cb);
}

/**
 * 对外接口
 */
UserModel.prototype.GetUserId = function () {
    return Tools.GetValueInObj(this.userInfo, 'entity.id');
    // return 1010008;
}

UserModel.prototype.GetAccount = function () {
    return Tools.GetValueInObj(this.loginInfo, 'account');
}

UserModel.prototype.GetTvToken = function (cb) {
    if (Platform.PLATFORM == 'Normal') {
        Tools.InvokeCallback(cb, '');
    } else {
        if (!Tools.InvokeCallback(window.GetCurrentUser, function (usr) {
            Tools.InvokeCallback(cb, usr.token);
        })) {
            Tools.InvokeCallback(cb, null);
        }
    }
}
UserModel.prototype.GetUser = function (cb) {
    if (Platform.PLATFORM == 'Normal') {
        Tools.InvokeCallback(cb, null);
    } else {
        if (!Tools.InvokeCallback(window.GetCurrentUser, function (usr) {
            Tools.InvokeCallback(cb, usr);
        })) {
            Tools.InvokeCallback(cb, null);
        }
    }
}

UserModel.prototype.GetPlayerGoods = function (cb) {
    HttpUtil.HTTPGet(Platform.GOODSPATH, { uid: this.GetUserId(), state: 0 }, function (retJson) {
        if (retJson.code == 0 || retJson.msg == "操作成功") {
            Tools.InvokeCallback(cb, retJson.data);
        } else {
            Tools.InvokeCallback(cb, []);
        }
    });
}

UserModel.prototype.AddCurGainCount = function (count) {
    this.curGainCount += count;
    NotificationController.Emit(Define.EVENT_KEY.USERINFO_UPDATECURGAIN, this.curGainCount);
}
/**
 * 消息处理接口
 */
UserModel.prototype.onGW2C_RetLogin = function (msgid, data) {
    if (data.errcode != null) {
        NotificationController.Emit(Define.EVENT_KEY.TIP_TIPS, { text: data.errcode });
        //返回登录界面
    }
}

UserModel.prototype.onGW2C_SendUserInfo = function (msgid, data) {
    this.userInfo = data;
    console.log(data);
    NotificationController.Emit(Define.EVENT_KEY.CONNECT_TO_GATESERVER);
}

UserModel.prototype.onGW2C_SendUserPlatformMoney = function (msgid, data) {
    this.platformCoins = data.coins || 0;
    // NotificationController.Emit(Define.EVENT_KEY.USERINFO_UPDATECOINS, this._calculateCoupon());
}
UserModel.prototype.onGW2C_UpdateYuanbao = function (msgid, data) {
    this.userInfo.base.yuanbao = data.num;
}

UserModel.prototype.onGW2C_SumGet = function (msgid, data) {
    this.totalGainCount = data.num || 0;
    NotificationController.Emit(Define.EVENT_KEY.USERINFO_UPDATETOTALGAIN, this.totalGainCount);
}

UserModel.prototype._calculateCoupon = function () {
    let aaa = Tools.GetValueInObj(this.userInfo, 'base.yuanbao') || 0;
    // let aaa = this.platformCoins;
    let coupon = _.isString(aaa) ? parseInt(aaa) : aaa;
    if (coupon > 9999) {
        let ret = (coupon / 1000).toFixed(2);
        ret = ret == Math.floor(ret) ? Math.floor(ret) : ret;
        return { num: ret, suffix: 'k' };
    }
    return { num: coupon, suffix: '' };;
}

module.exports = new UserModel();