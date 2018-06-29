module game {
    export abstract class PanelComponent extends GameComponent {
        protected _isShow: boolean = false;
        public darkRect: eui.Rect;

        public removeDarkRect() {
            if (this.darkRect) {
                DarkRectPool.destroyObject(this.darkRect);
                if (this.darkRect.parent) {
                    this.darkRect.parent.removeChild(this.darkRect);
                }
                this.darkRect = null;
            }
        }

        public show() {
            if (this._isShow) {
                return;
            }
            this.beforeShow();
            this.resetSize();
            this.addEventAndNotify();
            this.playShowEffect();
            this._isShow = true;
        }

        protected beforeShow() {

        }

        protected resetSize() {
            this.width = gameConfig.curWidth();
            this.height = gameConfig.curHeight();
        }

        protected playShowEffect(dark: boolean = true, effectType: number = 1, isAlert: boolean = false) {
            const panel = this;
            panel.scaleX = 1;
            panel.scaleY = 1;
            panel.x = 0;
            panel.y = 0;
            panel.alpha = 1;

            if (dark) {
                let darkRect = DarkRectPool.createObject();
                darkRect.fillAlpha = 0.5;
                darkRect.fillColor = 0;
                darkRect.width = gameConfig.curWidth();
                darkRect.height = gameConfig.curHeight();
                darkRect.touchChildren = false;
                darkRect.touchEnabled = true;
                darkRect.visible = true;
                egret.Tween.get(darkRect).to({alpha: 1}, 150);
                GameLayer.panelLayer.addChild(darkRect);
                panel.darkRect = darkRect;
            }

            GameLayer.panelLayer.addChild(panel);

            let popUpWidth = panel.width;
            let popUpHeight = panel.height;

            let leftX: number = gameConfig.curWidth() / 2 - popUpWidth / 2;
            let upY: number = gameConfig.curHeight() / 2 - popUpHeight / 2;
            // if (effectType != 0) {
            //     effectType = Math.floor(Math.random() * 6) + 1;
            // }
            effectType = 0;
            switch (effectType) {
                case 0:
                    break;
                case 1:
                    panel.alpha = 0;
                    panel.scaleX = 0.5;
                    panel.scaleY = 0.5;
                    panel.x = panel.x + popUpWidth / 4;
                    panel.y = panel.y + popUpHeight / 4;
                    egret.Tween.get(panel).to({
                        alpha: 1,
                        scaleX: 1,
                        scaleY: 1,
                        x: panel.x - popUpWidth / 4,
                        y: panel.y - popUpHeight / 4
                    }, 300, egret.Ease.backOut);
                    break;
                case 2:
                    panel.alpha = 0;
                    panel.scaleX = 0.5;
                    panel.scaleY = 0.5;
                    panel.x = panel.x + popUpWidth / 4;
                    panel.y = panel.y + popUpHeight / 4;
                    egret.Tween.get(panel).to({
                        alpha: 1,
                        scaleX: 1,
                        scaleY: 1,
                        x: panel.x - popUpWidth / 4,
                        y: panel.y - popUpHeight / 4
                    }, 600, egret.Ease.elasticOut);
                    break;
                case 3:
                    if (isAlert) {
                        panel.x = -popUpWidth;
                        egret.Tween.get(panel).to({x: leftX}, 500, egret.Ease.cubicOut);
                    } else {
                        panel.x = -popUpWidth;
                        egret.Tween.get(panel).to({x: 0}, 500, egret.Ease.cubicOut);
                    }
                    break;
                case 4:
                    if (isAlert) {
                        panel.x = popUpWidth;
                        egret.Tween.get(panel).to({x: leftX}, 500, egret.Ease.cubicOut);
                    } else {
                        panel.x = popUpWidth;
                        egret.Tween.get(panel).to({x: 0}, 500, egret.Ease.cubicOut);
                    }
                    break;
                case 5:
                    if (isAlert) {
                        panel.y = -popUpHeight;
                        egret.Tween.get(panel).to({y: upY}, 500, egret.Ease.cubicOut);
                    } else {
                        panel.y = -popUpHeight;
                        egret.Tween.get(panel).to({y: 0}, 500, egret.Ease.cubicOut);
                    }
                    break;
                case 6:
                    if (isAlert) {
                        panel.y = 1100;
                        egret.Tween.get(panel).to({y: upY}, 500, egret.Ease.cubicOut);
                    } else {
                        panel.y = popUpHeight;
                        egret.Tween.get(panel).to({y: 0}, 500, egret.Ease.cubicOut);
                    }
                    break;
                default:
                    if (isAlert) {
                        panel.x = -popUpWidth;
                        egret.Tween.get(panel).to({x: leftX}, 500, egret.Ease.cubicOut);
                    } else {
                        panel.x = -popUpWidth;
                        egret.Tween.get(panel).to({x: 0}, 500, egret.Ease.cubicOut);
                    }
                    break;
            }
        }

        public remove() {
            if (!this._isShow) {
                return;
            }
            this.beforeRemove();
            this.removeEventAndNotify();
            this.playRemoveEffect();
            this._isShow = false;
        }

        protected beforeRemove() {

        }

        protected playRemoveEffect() {
            const panel = this;
            const stage = panel.stage;
            panel.removeDarkRect();
            stage.touchChildren = false;
            let effectType = 1;
            switch (effectType) {
                case 0:
                    break;
                case 1:
                    egret.Tween.get(panel).to({
                        alpha: 0,
                        scaleX: 0,
                        scaleY: 0,
                        x: panel.x + panel.width / 2,
                        y: panel.y + panel.height / 2
                    }, 300);
                    break;
                case 3:
                    egret.Tween.get(panel).to({x: panel.width}, 400, egret.Ease.cubicOut);
                    break;
                case 4:
                    egret.Tween.get(panel).to({x: -panel.width}, 400, egret.Ease.cubicOut);
                    break;
                case 5:
                    egret.Tween.get(panel).to({y: panel.height}, 400, egret.Ease.cubicOut);
                    break;
                case 6:
                    egret.Tween.get(panel).to({y: -panel.height}, 400, egret.Ease.cubicOut);
                    break;
                default:
                    egret.Tween.get(panel).to({y: -panel.height}, 400, egret.Ease.cubicOut);
                    break;
            }
            let waitTime = 400;
            if (effectType == 0) {
                waitTime = 0;
            }
            egret.setTimeout(() => {
                stage.touchChildren = true;
                panel.removeFromParent();
            }, this, waitTime);
        }
    }
}