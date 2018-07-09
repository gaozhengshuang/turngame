module game {
    export class CommonDialog extends PanelComponent {
        btn_goPay: LabelButton;
        btn_close: IconButton;
        txt_content: eui.Label;
        _func: Function;
        open_tip: egret.tween.TweenGroup;

        protected getSkinName() {
            return CommonDialogSkin;
        }

        protected init() {
            this.btn_goPay.bg = "lucky/luckyBtn";
            this.btn_close.icon = "lucky/luckycloseBtn";
            this._touchEvent = [
                {target: this.btn_close, callBackFunc: this.OnClosePanel},
                {target: this.btn_goPay, callBackFunc: this.OnClickGo},
            ];
        }

        public OnShowPanel(contentTxt: string, btnTxt: string, func: Function = null, textFlow: Array<egret.ITextElement> = null) {
            if (textFlow) {
                this.txt_content.textFlow = textFlow;
            } else {
                this.txt_content.text = contentTxt;
            }
            this.btn_goPay.label = btnTxt;
            this._func = func;
            this.show();
            this.open_tip.play(0);
        }

        private OnClickGo() {
            if (this._func) {
                this._func();
            }
            this.OnClosePanel();
        }

        private OnClosePanel() {
            this.remove();
        }

        private static _instance: CommonDialog;

        public static getInstance(): CommonDialog {
            if (!CommonDialog._instance) {
                CommonDialog._instance = new CommonDialog();
            }
            return CommonDialog._instance;
        }
    }
}