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
            
        }

        private authCodeHandle() {

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