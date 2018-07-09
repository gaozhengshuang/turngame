module game {
    export class BadBuff extends eui.Component {
        boxBuffImg: eui.Image;
        badBuffProgressBar: eui.ProgressBar;
        boxshake: egret.tween.TweenGroup;

        public initView() {
            this.badBuffProgressBar.maximum = _breakBadBuffMax;
            this.badBuffProgressBar.minimum = 0;

            this.boxBuffImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boxTouchEvent, this);
        }

        public startShake() {
            this.boxshake.play(0);
        }

        public stopShake() {
            this.boxshake.stop();
        }

        private boxTouchEvent() {
            
        }

        public refreshView(curPower: number) {
            this.badBuffProgressBar.value = curPower;
        }
    }

    window["game.BadBuff"] = game.BadBuff;
}