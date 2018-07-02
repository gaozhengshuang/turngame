module game {
    export class LoginScene extends SceneComponent {
        nameLabel: eui.EditableText;
        btn_register: eui.Label;
        passwordLabel: eui.EditableText;
        loginButton: IconButton;

        protected getSkinName() {
            return LoginSceneSkin;
        }

        protected init() {
            this.loginButton.icon = "login/loginBtn";
        }

        protected beforeShow() {
            this._touchEvent = [
                {target: this.loginButton, callBackFunc: this.loginHandle},
                {target: this.btn_register, callBackFunc: this.registerHandle}
            ];
            
            if (egret.localStorage.getItem("userName") && egret.localStorage.getItem("password")) {
                this.nameLabel.text = egret.localStorage.getItem("userName");
                this.passwordLabel.text = egret.localStorage.getItem("password");
            }
            this.passwordLabel.inputType = egret.TextFieldInputType.PASSWORD;
            this.passwordLabel.displayAsPassword = true;
        }

        private async loginHandle() {
            let realName = deleteBlank(this.nameLabel.text);
            if (realName == "") {
                showTips("请输入您的用户名!", true);
                return;
            }

            loginUserInfo = {
                account: this.nameLabel.text,
                passwd: this.passwordLabel.text
            };
            LoginManager.getInstance().login();

            egret.localStorage.setItem("userName", this.nameLabel.text);
            egret.localStorage.setItem("password", this.passwordLabel.text);
        }

        private registerHandle() {
            openPanel(PanelType.register);
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