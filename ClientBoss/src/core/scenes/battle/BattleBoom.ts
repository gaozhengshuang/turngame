module game {
    export class BattleBoom extends GameComponent implements PoolItem {
        boomImage: eui.Image;
        private _currentIndex: number = 0;
        private _playInterval: number;

        onCreate() {
        }

        onDestroy() {
            if (this._playInterval) {
                egret.clearInterval(this._playInterval);
                this._playInterval = null;
            }
            this.removeFromParent();
        }


        protected getSkinName() {
            return BattleBoomSkin;
        }

        public play() {
            let d = defer();
            this._currentIndex = 0;
            this.boomImage.scaleX = this.boomImage.scaleY = 1.5;
            this.boomImage.source = `cube/boom/0000${this._currentIndex}`;
            this._playInterval = egret.setInterval(() => {
                this._currentIndex++;
                if (this._currentIndex > 7) {
                    d.resolve(null);
                    return;
                }
                this.boomImage.source = `cube/boom/0000${this._currentIndex}`;
            }, this, 80);
            return d.promise();
        }

        public playBall(){
            let d = defer();
            this._currentIndex = 0;
            this.boomImage.scaleX = this.boomImage.scaleY = 1;
            this.boomImage.source = `ball/break/0000${this._currentIndex}`;
            this._playInterval = egret.setInterval(() => {
                this._currentIndex++;
                if (this._currentIndex > 7) {
                    d.resolve(null);
                    return;
                }
                this.boomImage.source = `ball/break/0000${this._currentIndex}`;
            }, this, 80);
            return d.promise();
        }
    }
}