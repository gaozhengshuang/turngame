import NetWorkController from '../../Controller/NetWorkController';
import LoginController from '../../Controller/LoginController';
import GameController from '../../Controller/GameController';
import UserModel from '../../Model/User';
import Define from '../../Util/Define';
import Platform from '../../Util/Platform';

var GameComponent = require('../GameComponent');
cc.Class({
    extends: GameComponent,

    properties: {
        percentLabel: { default: null, type: cc.Label },
        loadingScene: { default: false, type: Boolean },
        targetCanvas: { default: null, type: cc.Canvas },
        loadProgressBar: { default: null, type: cc.ProgressBar },
    },

    onLoad() {
        let canvas = this.targetCanvas;
        let designResolution = canvas.designResolution
        var viewSize = cc.view.getFrameSize()
        if (viewSize.width / viewSize.height > designResolution.width / designResolution.height) {
            canvas.fitHeight = true;
            canvas.fitWidth = false;
        }
        else {
            canvas.fitHeight = false;
            canvas.fitWidth = true
        }

        this.loadingScene = false;
        this.loginComplete = this.onLoginComplete.bind(this);
        cc.systemEvent.on(Define.EVENT_KEY.CONNECT_TO_GATESERVER, this.loginComplete);
        cc.systemEvent.on(Define.EVENT_KEY.LOADED_COMPLETE, this.onLoadedComplete, this);
    },

    onDestroy() {
        cc.systemEvent.off(Define.EVENT_KEY.CONNECT_TO_GATESERVER, this.loginComplete);
        cc.systemEvent.off(Define.EVENT_KEY.LOADED_COMPLETE, this.onLoadedComplete, this);
    },

    start() {
    },

    update(dt) {
        if (GameController.totalLoading == 0 || this.loadingScene) {
            return;
        }
        let percent = (GameController.loaded / GameController.totalLoading).toFixed(2);
        this.percentLabel.string = Math.ceil(percent * 100) + '%';
        this.loadProgressBar.progress = percent;
        if (GameController.loaded == GameController.totalLoading) {
            //加载完了
            this.loadingScene = true;
            if (Platform.PLATFORM == 'Normal') {
                cc.director.loadScene("LoginScene");
            } else {
                cc.director.loadScene("GameScene");
            }

        }
    },

    onLoadedComplete(event) {
        if (Platform.PLATFORM != 'Normal') {
            var tvmTimeout = setTimeout(function () {
                LoginController.showNetFailed();
            }.bind(this), 2000);
            UserModel.getUser(function (usr) {
                console.log('dddddddddddddddddd');
                clearTimeout(tvmTimeout);
                if (usr == null) {
                    cc.director.loadScene("LoginScene");
                    return;
                }
                let loginInfo = { token: usr.token, account: usr.tvmid, face: usr.avatar, nickname: usr.nickname }
                UserModel.loginInfo = loginInfo;
                LoginController.connectToLoginServer(function () {
                    NetWorkController.send('msg.C2L_ReqLogin', loginInfo);
                }.bind(this));
            }.bind(this));
        }
    },

    onLoginComplete() {
        GameController.LoadedComplete();
    },
});
