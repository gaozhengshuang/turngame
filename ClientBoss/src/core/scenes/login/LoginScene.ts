module game {
    export class LoginScene extends SceneComponent {
        nameLabel: eui.EditableText;
        passwordLabel: eui.EditableText;
        loginButton: IconButton;
        closeButton: IconButton;

        protected getSkinName() {
            return LoginSceneSkin;
        }

        protected init() {
            this.loginButton.icon = "login/loginBtn";
            this.closeButton.icon = "lucky/luckycloseBtn";
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

            LoginManager.getInstance().login();
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