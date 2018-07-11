import UserModel from '../../Model/User';
import NetWorkController from '../../Controller/NetWorkController';
import LoginController from '../../Controller/LoginController';
import Define from '../../Util/Define';

var GameComponent = require('../GameComponent');
cc.Class({
    extends: GameComponent,

    properties: {
        accEditBox: { default: null, type: cc.EditBox, },
        targetCanvas: { default: null, type: cc.Canvas }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // let canvas = this.targetCanvas;
        // let designResolution = canvas.designResolution
        // var viewSize = cc.view.getFrameSize()
        // if (viewSize.width / viewSize.height > designResolution.width / designResolution.height) {
        //     canvas.fitHeight = true;
        //     canvas.fitWidth = false;
        // }
        // else {
        //     canvas.fitHeight = false;
        //     canvas.fitWidth = true
        // }
        this.loginComplete = this.onLoginComplete.bind(this);
        cc.systemEvent.on(Define.EVENT_KEY.CONNECT_TO_GATESERVER, this.loginComplete);
    },

    start() {

    },

    update(dt) {

    },

    onDestroy() {
        cc.systemEvent.off(Define.EVENT_KEY.CONNECT_TO_GATESERVER, this.loginComplete);
    },

    onStartGame() {
        if (this.accEditBox.string == '') {
            return;
        }
        this.onLoginPlatfrom();
        // UserModel.onGW2C_RetDeliveryDiamond(1, { diamond: 2, diamondparts: '10', total: 4 });
    },

    onLoginPlatfrom() {
        let loginInfo = {
            account: this.accEditBox.string,
            nickname: this.accEditBox.string,
            face: '',
            token: ''
        }
        UserModel.loginInfo = loginInfo;
        LoginController.connectToLoginServer(function () {
            NetWorkController.send('msg.C2L_ReqLogin', loginInfo);
        }.bind(this));
    },

    onLoginComplete(msgid, data) {
        cc.director.loadScene("GameScene");
    },
});
