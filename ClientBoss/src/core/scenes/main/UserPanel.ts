module game {
    export class UserPanel extends PanelComponent {
        closeButton: IconButton;

        labelName: eui.Label;
        labelId: eui.Label;
        labelInvitationcode: eui.Label;

        protected getSkinName() {
            return UserPanelSkin;
        }

        protected init() {
            this.closeButton.icon = "lucky/luckycloseBtn";
        }

        protected beforeShow() {
            this._touchEvent = [
                {target: this.closeButton, callBackFunc: this.backHandle},
            ];

            this.initUser();
        }

        protected beforeRemove() {
        }

        private initUser() {
            let userInfo = DataManager.playerModel.userInfo;
            this.labelId.text = `${userInfo.userid}`;
            this.labelInvitationcode.text = "TJ"+userInfo.userid;
        }

        private backHandle() {
            this.remove();
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