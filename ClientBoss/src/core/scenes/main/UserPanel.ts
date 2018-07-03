module game {
    export class UserPanel extends PanelComponent {
        closeButton: IconButton;
        wxButton: IconButton;
        btn_copy: IconButton;
        img_comeTask: eui.Image;
        img_gameTask: eui.Image;
        img_becomeonTask: eui.Image;

        img_wxybd: eui.Image;
        labelName: eui.Label;
        labelId: eui.Label;
        labelInvitationcode: eui.Label;

        protected getSkinName() {
            return UserPanelSkin;
        }

        protected init() {
            this.closeButton.icon = "lucky/luckycloseBtn";
            this.wxButton.icon = "login/wxwbd";
            this.btn_copy.icon = "user/copyButton";
        }

        protected beforeShow() {
            this._touchEvent = [
                {target: this.closeButton, callBackFunc: this.backHandle},
                {target: this.wxButton, callBackFunc: this.wxHandle},
                {target: this.btn_copy, callBackFunc: this.copyHandle},
            ];

            this.initUser();
        }

        protected beforeRemove() {
        }

        private initUser() {
            let userInfo = DataManager.playerModel.userInfo;
            this.labelId.text = `${userInfo.userid}`;
            this.labelInvitationcode.text = "TJ"+userInfo.userid;

            this.img_wxybd.visible = DataManager.playerModel.getOpenId() != "";
            this.wxButton.visible = DataManager.playerModel.getOpenId() == "";
            
            this.img_comeTask.visible = false;
            this.img_gameTask.visible = false;
            this.img_becomeonTask.visible = false;
        }

        private backHandle() {
            this.remove();
        }

        private wxHandle() {
            let appid = "wx03789100061e5d6c";
            let redirect_uri = "http%3a%2f%2fjump.test.giantfun.cn%2ftantanle";
            let state = egret.localStorage.getItem("userName")+"-"+egret.localStorage.getItem("password");
            let wxUrl = "https://open.weixin.qq.com/connect/qrconnect?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_login&state="+state;
            window.location.href = wxUrl;
        }

        private copyHandle() {

        }

        private static _instance: UserPanel;

        public static getInstance(): UserPanel {
            if (!UserPanel._instance) {
                UserPanel._instance = new UserPanel();
            }
            return UserPanel._instance;
        }
    }
}