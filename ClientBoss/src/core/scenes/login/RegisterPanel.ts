module game {
    export class RegisterPanel extends PanelComponent {
        nameLabel: eui.EditableText;
        authCodeLabel: eui.EditableText;
        passwordLabel: eui.EditableText;
        passwordokLabel: eui.EditableText;
        comeonLabel: eui.EditableText;

        yzmbtnLabel: eui.Label;

        registerButton: IconButton;
        btn_login: eui.Label;
        btn_authCode: eui.Image;

        protected getSkinName() {
            return RegisterPanelSkin;
        }

        protected init() {
            this.registerButton.icon = "login/registerBtn";
        }

        protected beforeShow() {
            this._touchEvent = [
                {target: this.registerButton, callBackFunc: this.registerHandle},
                {target: this.btn_authCode, callBackFunc: this.authCodeHandle},
                {target: this.btn_login, callBackFunc: this.closeHandle},
            ];

            this.passwordLabel.inputType = egret.TextFieldInputType.PASSWORD;
            this.passwordLabel.displayAsPassword = true;
            this.passwordokLabel.inputType = egret.TextFieldInputType.PASSWORD;
            this.passwordokLabel.displayAsPassword = true;
        }

        private async registerHandle() {
            if (deleteBlank(this.nameLabel.text) == "") {
                showTips("请输入您的手机号!", true);
                return;
            }

            if (deleteBlank(this.authCodeLabel.text) == "") {
                showTips("请输入您的验证码!", true);
                return;
            }

            if (deleteBlank(this.passwordLabel.text) == "" || deleteBlank(this.passwordokLabel.text) == "") {
                showTips("请输入您的密码!", true);
                return;
            }

            if (this.passwordLabel.text != this.passwordokLabel.text) {
                showTips("两次输入的密码不一致!", true);
                return;
            }
            
            let strJson = JSON.stringify({
                "gmcmd": "registaccount",
                "phone": this.nameLabel.text,
                "passwd": this.passwordLabel.text,
                "authcode": this.authCodeLabel.text,
                "invitationcode": this.comeonLabel.text,
            });
            let r = await postHttpByJson($registIp, strJson);
            if (r) {
                this.closeHandle();

                loginUserInfo = {
                    account: this.nameLabel.text,
                    passwd: this.passwordLabel.text
                };
                LoginManager.getInstance().login();

                egret.localStorage.setItem("userName", this.nameLabel.text);
                egret.localStorage.setItem("password", this.passwordLabel.text);
            }
        }

        private async authCodeHandle() {
            if (deleteBlank(this.nameLabel.text) == "") {
                showTips("请输入您的手机号!", true);
                return;
            }

            let strJson = JSON.stringify({
                "gmcmd": "registauthcode",
                "phone": this.nameLabel.text
            });
            let r = await postHttpByJson($registIp, strJson);
            if (r) {
                this.btn_authCode.touchEnabled = false;

                let _currentIndex = 0;
                let _timeleft = 60;
                let _playInterval = egret.setInterval(() => {
                    _currentIndex++;
                    if (_currentIndex > 60) {
                        egret.clearInterval(_playInterval);
                        _playInterval = null;
                        this.btn_authCode.touchEnabled = true;
                        this.yzmbtnLabel.text = '获取验证码';
                    } else {
                        this.yzmbtnLabel.text = `${_timeleft - _currentIndex}s后重新获取`;
                    }
                }, this, 1000);
            }
        }

        private closeHandle() {
            this.remove();
        }

        private static _instance: RegisterPanel;

        public static getInstance(): RegisterPanel {
            if (!RegisterPanel._instance) {
                RegisterPanel._instance = new RegisterPanel();
            }
            return RegisterPanel._instance;
        }
    }
}