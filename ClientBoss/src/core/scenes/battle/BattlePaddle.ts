module game {
    export class BattlePaddle extends BattleBody implements PoolItem {
        paddleGroup: eui.Group;
        costLabel: eui.Label;
        cannonImage: eui.Image;
        shotAnim: egret.tween.TweenGroup;
        boomImage: eui.Image;
        waveMask: eui.Image;
        waveImage: eui.Image;
        spLabel: eui.Label;
        bg: eui.Image;
        spImage: eui.Image;
        ball1: eui.Image;
        ball2: eui.Image;
        ball3: eui.Image;
        group: eui.Group;

        private _currentIndex: number = 0;
        private _playInterval: number;
        private _waveInterval: number;
        private _currentWave: number;

        private _isWuxian:boolean = false;

        protected init() {
            this.boomImage.visible = false;
            this.battleBodyType = BattleBodyType.paddle;
            this.waveImage.mask = this.waveMask;
        }

        public setData(id: number) {
            this.width = 197;
            this.height = 251;
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2 + 27.5;
            this._currentWave = 0;
            this._waveInterval = egret.setInterval(() => {
                this.playWave();
            }, this, 160);
            this.waveImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchWave, this);
        }

        private touchWave() {
            BattleScene.getInstance().useSp();
        }

        public playWave() {
            this.waveImage.source = `paddle/wave/0000${this._currentWave}`;
            this._currentWave++;
            if (this._currentWave > 9) {
                this._currentWave = 0;
            }
        }

        public resetPosition(mainY: number) {
            this.x = gameConfig.curWidth() / 2;
            this.y = gameConfig.curHeight() - 200 - mainY;
        }

        public setImageRotation(r: number) {
            this.paddleGroup.rotation = r;
        }

        protected getSkinName() {
            return BattlePaddleSkin;
        }

        onDestroy() {
            this.stopSpAnim();
            this.waveImage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchWave, this);
            egret.clearInterval(this._waveInterval);
            if (this._playInterval) {
                egret.clearInterval(this._playInterval);
                this._playInterval = null;
            }
            this.boomImage.visible = false;
            this.removeFromParent();
        }

        public setPrice(value: number) {

        }

        public playShot() {
            if (this.onChange) return;
            this.shotAnim.play(0);
        }

        public playBoom() {
            this.boomImage.visible = true;
            this._currentIndex = 0;
            this.boomImage.source = `cube/redBoom/0000${this._currentIndex}`;
            this._playInterval = egret.setInterval(() => {
                this._currentIndex++;
                if (this._currentIndex > 7) {
                    this.boomImage.visible = false;
                    egret.clearInterval(this._playInterval);
                    this._playInterval = null;
                    return;
                }
                this.boomImage.source = `cube/redBoom/0000${this._currentIndex}`;
            }, this, 80);
        }

        public setSp(percent: number) {
            if (percent < 0) {
                this.spLabel.text = `无限炮弹`;
            } else {
                this.costLabel.visible = true;
                let p = Math.floor(percent * 100);
                this.costLabel.text = `${p}%`;
                let y = 173 - 1.14 * p;
                egret.Tween.get(this.waveImage, null, null, true).to({y: y}, 500, egret.Ease.quadOut);
                if (p == 100) {
                    this.playSpAnim();
                    this.waveImage.touchEnabled = true;
                    this.spLabel.text = `点击发射`;
                } else {
                    this.waveImage.touchEnabled = false;
                    this.spLabel.text = `能量`;
                    this.stopSpAnim();
                }
            }
        }

        public setBigBoomTime(spCool: number) {
            let y = 59 + 1.14 * ((1 - (spCool/500)) * 100);
            this.costLabel.text = `${Math.ceil(spCool/100)}`;
            egret.Tween.get(this.waveImage, null, null, true).to({y: y}, 500, egret.Ease.quadOut);
        }

        private _spCurrentIndex: number = 0;
        private _spPlayInterval: number;

        public playSpAnim() {
            if (this._spPlayInterval) return;
            this._spCurrentIndex = 0;
            this.spImage.visible = true;
            this.spImage.source = `paddle/sp/0000${this._spCurrentIndex}`;
            this._spPlayInterval = egret.setInterval(() => {
                this._spCurrentIndex++;
                if (this._spCurrentIndex > 7) {
                    this._spCurrentIndex = 0;
                    this.stopSpAnim();
                }
                this.spImage.source = `paddle/sp/0000${this._spCurrentIndex}`;
            }, this, 60);
        }

        public stopSpAnim() {
            if (!this._spPlayInterval) return;
            egret.clearInterval(this._spPlayInterval);
            this._spPlayInterval = null;
            this.spImage.visible = false;
        }

        public updatePenetrationNum(num: number, force: boolean = false) {
            if (this.onChange && !force) return;
            if (this.cannonImage.source == "paddle/pao2" && num <= 0) {
                this.playChangeAnim();
            } else {
                this.bg.source = num > 0 ? "paddle/bg2" : "paddle/bg";
                this.cannonImage.source = num > 0 ? "paddle/pao2" : "paddle/pao";
                this.ball1.visible = num >= 1;
                this.ball2.visible = num >= 2;
                this.ball3.visible = num >= 3;
            }
        }

        private onChange: boolean = false;

        public playChangeAnim() {
            if (this.onChange) return;
            this.onChange = true;
            egret.Tween.get(this.group).to({y: 81.5}, 250).call(() => {
                let num = DataManager.playerModel.penetration;
                if (num <= 0 && this.cannonImage.source == "paddle/pao2") {
                    if(this._isWuxian){
                        this.cannonImage.source = "paddle/wuxianpao";
                        this.bg.source = "paddle/wuxianpaobg";
                    }else{
                        this.cannonImage.source = "paddle/pao";
                        this.cannonImage.source = "paddle/bg";
                    }
                }
                this.updatePenetrationNum(num, true);
            }).to({y: -4}, 250).call(() => {
                this.onChange = false;
                this.updatePenetrationNum(DataManager.playerModel.penetration);
            });
        }

        public updateWuxianPao(wuxian:boolean) {
            this._isWuxian = wuxian;
            if(wuxian){
                this.cannonImage.source = "paddle/wuxianpao";
                this.bg.source = "paddle/wuxianpaobg";
            }else{
                this.cannonImage.source = "paddle/pao";
                this.bg.source = "paddle/bg";
            }
        }
    }
}