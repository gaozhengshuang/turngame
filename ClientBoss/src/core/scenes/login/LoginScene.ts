module game {
    export class LoginScene extends SceneComponent {
        titleImage: eui.Image;
        nameLabel: eui.EditableText;
        loginButton: LabelButton;

        protected getSkinName() {
            return LoginSceneSkin;
        }

        protected init() {
            this.titleImage.y = gameConfig.curHeight() * 0.1;
            this.loginButton.label = "登陆";
        }

        protected beforeShow() {
            this._touchEvent = [
                {target: this.loginButton, callBackFunc: this.loginHandle}
            ];
            if (egret.localStorage.getItem("userName")) {
                this.nameLabel.text = egret.localStorage.getItem("userName");
            }
        }

        private async loginHandle() {
            let realName = deleteBlank(this.nameLabel.text);
            if (realName == "") {
                showTips("请输入您的用户名!", true);
                return;
            }
            let userInfo = DataManager.playerModel.userInfo;
            userInfo.openid = realName;
            userInfo.name = realName;
            this.loginFinish();
        }

        private loginFinish() {
            SceneManager.changeScene(SceneType.main);
        }

        private static _instance: LoginScene;

        public static getInstance(): LoginScene {
            if (!LoginScene._instance) {
                LoginScene._instance = new LoginScene();
            }
            return LoginScene._instance;
        }
    }
}