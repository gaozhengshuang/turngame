module game {
    export class BadBuff extends eui.Component {
        boxBuffImg: eui.Image;
        badBuffProgressBar: eui.ProgressBar;
        boxshake: egret.tween.TweenGroup;

        _curPower: number;
        _playInterval: number;

        public initView() {
            this.badBuffProgressBar.maximum = _breakBadBuffMax;
            this.badBuffProgressBar.minimum = 0;

            this._playInterval = null

            this.boxBuffImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boxTouchEvent, this);
        }

        public startShake() {
            this.boxshake.play(0);
        }

        public stopShake() {
            this.boxshake.stop();
        }

        public playBoxAni() {
            let _currentIndex = 6;
            this._playInterval = egret.setInterval(() => {
                _currentIndex++;
                if (_currentIndex > 6) {
                    _currentIndex = 0;
                }
                this.boxBuffImg.source = `lucky/badBox/000${_currentIndex}`;
            }, this, 150);
        }

        private boxTouchEvent() {
            if (this._curPower >= _breakBadBuffMax) {
                let _addScoreIndex = lootEvent(_breakBadBuffAddPro);
                let _score = _breakBadBuffAdd[_addScoreIndex-1];
                DataManager.playerModel.addScore(_score);

                if (this._playInterval) {
                    this.boxBuffImg.source = "ui/boxBuff1";
                    egret.clearInterval(this._playInterval);
                    this._playInterval = null;
                }

                BattleScene.getInstance().setBadPower(0);
                this.refreshView(0);

                BattleScene.getInstance().openBadBox(_score);
            } else {
                showTips("能量积满时，将获得大量金币...", true);
            }
        }

        public refreshView(power: number) {
            this._curPower = power;
            this.badBuffProgressBar.value = power;

            if (this._curPower >= _breakBadBuffMax) {
                if (this._playInterval == null) {
                    this.playBoxAni();
                }
            }
        }
    }

    window["game.BadBuff"] = game.BadBuff;
}