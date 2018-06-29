module game {
    export class BattleBlackHole extends GameComponent implements PoolItem {
        showAnim: egret.tween.TweenGroup;
        holeImage: eui.Image;
        private _currentIndex: number = 0;
        public linkHole: BattleBlackHole;
        public checkBall: BlackHoleCheckInfo[] = [];
        private _playInterval: number;

        onCreate() {
            this._currentIndex = 0;
            this.playAnim();
        }

        private playAnim() {
            this.holeImage.source = `cube/blackHole/0000${this._currentIndex}`;
            this._playInterval = egret.setInterval(() => {
                this._currentIndex++;
                if (this._currentIndex > 7) {
                    this._currentIndex = 0;
                }
                this.holeImage.source = `cube/blackHole/0000${this._currentIndex}`;
            }, this, 100);
        }

        onDestroy() {
            if (this._playInterval) {
                egret.clearInterval(this._playInterval);
                this._playInterval = null;
            }
            this.linkHole = null;
            this.removeFromParent();
        }

        public setLink(hole: BattleBlackHole) {
            this.linkHole = hole;
        }

        public checkMeet(pointX: number, pointY: number) {
            return checkPointAtRect(pointX, pointY, this.x, this.y, this.width, this.height);
        }

        public meetBall(ball: BattleBall, time: number) {
            let info = {checkTime: time, ball: ball};
            this.checkBall.push(info);
            this.linkHole.checkBall.push(info);
            ball.x = this.linkHole.x + 36;
            ball.y = this.linkHole.y + 18;
            ball.body.position = [ball.x / gameConfig.factor, ball.y / gameConfig.factor];
        }


        protected getSkinName() {
            return BattleBlackHoleSkin;
        }

        public isCheck(ball: BattleBall, time: number) {
            let isCheck: boolean = false;
            for (let i = this.checkBall.length - 1; i >= 0; i--) {
                let info = this.checkBall[i];
                if (info.ball == ball) {
                    if (time - info.checkTime <= 2000) {
                        isCheck = true;
                        break;
                    } else {
                        this.checkBall.splice(i, 1);
                    }
                }
            }
            return isCheck;
        }
    }

    export interface BlackHoleCheckInfo {
        ball: BattleBall;
        checkTime: number;
    }
}