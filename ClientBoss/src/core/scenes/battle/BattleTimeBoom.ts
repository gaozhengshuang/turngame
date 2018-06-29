module game {
    export class BattleTimeBoom extends GameComponent implements PoolItem {
        boomImage: eui.Image;
        private _currentIndex: number = 0;
        private _playInterval: number;

        onCreate() {
            this.touchChildren = this.touchEnabled = false;
        }

        onDestroy() {
            if (this._playInterval) {
                egret.clearInterval(this._playInterval);
                this._playInterval = null;
            }
            this.removeFromParent();
        }


        protected getSkinName() {
            return BattleTimeBoomSkin;
        }

        public play() {
            let d = defer();
            this._currentIndex = 0;
            this.boomImage.source = `cube/timeBoom/0000${this._currentIndex}`;
            this._playInterval = egret.setInterval(() => {
                this._currentIndex++;
                if (this._currentIndex > 4) {
                    d.resolve(null);
                    return;
                }
                this.boomImage.source = `cube/timeBoom/0000${this._currentIndex}`;
            }, this, 80);
            return d.promise();
        }
    }
}