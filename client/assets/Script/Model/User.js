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

UserModel.prototype.Init = function (cb) {
    NetWorkController.AddListener('msg.GW2C_SendUserInfo', this.onGW2C_SendUserInfo.bind(this));
    NetWorkController.AddListener('msg.GW2C_RetLogin', this.onGW2C_RetLogin.bind(this));
    NetWorkController.AddListener('msg.GW2C_SendUserPlatformMoney', this.onGW2C_SendUserPlatformMoney.bind(this));
    NetWorkController.AddListener('msg.GW2C_RetDeliveryDiamond', this.onGW2C_RetDeliveryDiamond.bind(this));

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
}

UserModel.prototype.onGW2C_SendUserPlatformMoney = function (msgid, data) {
    this.platformCoins = data.coins || 0;
    NotificationController.Emit(Define.EVENT_KEY.USERINFO_UPDATECOINS, this.platformCoins);
}

UserModel.prototype.onGW2C_RetDeliveryDiamond = function (msgid, data) {
    let content = '提取钻石:' + data.diamond + '个，提取钻石券:' + data.diamondparts + '个，折算钻石' + (data.total - data.diamond) +
        '个，本次共提取钻石' + data.total + '个';
    NotificationController.postNotification(Define.EVENT_KEY.TIP_TIPS, { text: content, alive: 5 });
}

module.exports = new UserModel();