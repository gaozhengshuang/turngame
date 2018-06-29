module game {
    export class EffectButton extends eui.Component {
        private _lastScaleX: number;
        private _lastScaleY: number;
        private _buttonMusic: number;
        protected _showEffect: boolean;

        constructor() {
            super();
            this.touchChildren = false;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this._buttonMusic = 3;
            this._showEffect = true;
        }

        public onTouchBegin(event: egret.TouchEvent): void {
            if (this._buttonMusic) {
                //SoundManager.playEffect(table.TMusicById[this._buttonMusic].Name);
            }
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            if (this._showEffect) {
                if (!this._lastScaleX) {
                    this._lastScaleX = this.scaleX;
                }
                if (!this._lastScaleY) {
                    this._lastScaleY = this.scaleY;
                }
                let scaleX = this._lastScaleX;
                let scaleY = this._lastScaleY;
                if (this._lastScaleX > 0) {
                    scaleX += 0.2;
                } else {
                    scaleX -= 0.2;
                }
                if (this._lastScaleY > 0) {
                    scaleY += 0.2;
                } else {
                    scaleY -= 0.2;
                }
                this.setScale(scaleX, scaleY);
            }
        }

        private onStageTouchEnd(event: egret.Event): void {
            let stage = event.currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            if (this._showEffect) {
                this.setScale(this._lastScaleX || 1, this._lastScaleY || 1);
            }
        }

        protected setScale(scaleX: number, scaleY: number) {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
        }

        public setButtonMusic(value: number) {
            this._buttonMusic = value;
        }
    }

    window["game.EffectButton"] = game.EffectButton;
}