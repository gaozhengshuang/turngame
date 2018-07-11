import UserModel from '../Model/User';
import NetWorkController from '../Controller/NetWorkController';
import LoginController from '../Controller/LoginController';
import Define from '../Util/Define';
import Platform from '../Util/Platform';

var GameComponent = require('./GameComponent');
cc.Class({
    extends: GameComponent,

    properties: {
    },

    onLoad() {
        cc.systemEvent.on(Define.EVENT_KEY.CONNECT_TO_GATESERVER, this.onClosePanel, this);
    },

    start() {
    },

    update(dt) {
    },

    onDestroy() {
        cc.systemEvent.off(Define.EVENT_KEY.CONNECT_TO_GATESERVER, this.onClosePanel);
    },

    onClickResetNet() {
        if (Platform.PLATFORM == 'Normal') {
            LoginController.connectToLoginServer(function () {
                NetWorkController.send('msg.C2L_ReqLogin', UserModel.loginInfo);
            }.bind(this));
        } else {
            window["GetCurrentUser"](function (usr) {
                let loginInfo = { token: usr.token, account: usr.tvmid, face: usr.avatar, nickname: usr.nickname }
                UserModel.loginInfo = loginInfo;
                LoginController.connectToLoginServer(function () {
                    NetWorkController.send('msg.C2L_ReqLogin', loginInfo);
                }.bind(this));
            });
        }
    },

    onClosePanel() {
        this.node.destroy();
    }
});