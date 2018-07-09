module game {
    export class LoginReward extends PanelComponent {
        btn_ok: LabelButton;

        protected getSkinName() {
            return LoginRewardSkin;
        }

        protected init() {
            this.btn_ok.bg = "lucky/luckyBtn";
            this._touchEvent = [
                {target: this.btn_ok, callBackFunc: this.OnClickOk},
            ];
            this.btn_ok.label = "领取";
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