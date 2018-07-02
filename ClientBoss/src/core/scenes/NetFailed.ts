module game {
    export class NetFailed extends GameComponent {
        reasonLabel: eui.Label;
        reconnectButton: LabelButton;

        private _isShow: boolean = false;

        protected getSkinName() {
            return NetFailedSkin;
        }

        public show(reason: string = null) {
            if (!this._isShow) {
                this._isShow = true;
                this._touchEvent = [
                    {target: this.reconnectButton, callBackFunc: this.reconnectHandle},
                ];
                this.addEventAndNotify();
                GameLayer.maskLayer.addChild(this);
            }
            this.reconnectButton.label = "点击重新登录";
            this.reasonLabel.visible = false;
            if (reason) {
                this.reasonLabel.visible = true;
                this.reasonLabel.text = `失败原因: ${reason}`;
                showTips(reason, true);
            }
        }

        private async reconnectHandle() {
            this.close();
            SceneManager.changeScene(SceneType.login);
        }

        public close() {
            this.removeEventAndNotify();
            this.removeFromParent();
            this._isShow = false;
        }

        private static _instance: NetFailed;

        public static getInstance(): NetFailed {
            if (!NetFailed._instance) {
                NetFailed._instance = new NetFailed();
            }
            return NetFailed._instance;
        }
    }
}