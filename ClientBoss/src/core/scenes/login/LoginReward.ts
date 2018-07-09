module game {
    export class LoginReward extends PanelComponent {
        btn_ok: IconButton;

        protected getSkinName() {
            return LoginRewardSkin;
        }

        protected init() {
            this.btn_ok.icon = "lucky/loginrewardBtn";
            this._touchEvent = [
                {target: this.btn_ok, callBackFunc: this.OnClickOk},
            ];
        }

        private OnClickOk() {
            this.remove();
        }

        private static _instance: LoginReward;

        public static getInstance(): LoginReward {
            if (!LoginReward._instance) {
                LoginReward._instance = new LoginReward();
            }
            return LoginReward._instance;
        }
    }
}