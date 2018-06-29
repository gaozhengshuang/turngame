module game {
    export class WaitPanel extends eui.Component {
        constructor() {
            super();
        }

        private _isShow: boolean = false;

        public show() {
            if (!this._isShow) {
                GameLayer.maskLayer.addChild(this);
                this._isShow = true;
            }
        }

        public hide() {
            if (this._isShow) {
                GameLayer.maskLayer.removeChild(this);
                this._isShow = false;
            }
        }

        private static _instance: WaitPanel;

        public static getInstance(): WaitPanel {
            if (!WaitPanel._instance) {
                WaitPanel._instance = new WaitPanel();
            }
            return WaitPanel._instance;
        }
    }
}