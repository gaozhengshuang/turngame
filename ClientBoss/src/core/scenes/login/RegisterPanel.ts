module game {
    export class RegisterPanel extends PanelComponent {
        nameLabel: eui.EditableText;
        authCodeLabel: eui.EditableText;
        passwordLabel: eui.EditableText;
        passwordokLabel: eui.EditableText;
        comeonLabel: eui.EditableText;

        registerButton: IconButton;
        btn_login: eui.Label;
        btn_authCode: eui.Label;

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
            this.passwordokLabel.inputType = egret.TextFieldInputType.PASSWORD;
        }

        private registerHandle() {
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
            
            sendMessage("msg.C2L_ReqRegistAccount", msg.C2L_ReqRegistAccount.encode({
                phone: this.nameLabel.text,
                passwd: this.passwordLabel.text,
                authcode: this.authCodeLabel.text,
                invitationcode: ""
            }));
        }

        private authCodeHandle() {
            sendMessage("msg.C2L_ReqRegistAuthCode", msg.C2L_ReqRegistAuthCode.encode({phone: this.nameLabel.text}));
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