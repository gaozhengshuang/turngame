module game {
    export class BattleBrickBreak extends GameComponent implements PoolItem {
        breakGroup: eui.Group;
        private _timeout: number;
        private _particle: particle.GravityParticleSystem;

        onCreate() {

        }

        onDestroy() {
            if (this._timeout) {
                egret.clearTimeout(this._timeout);
                this._timeout = null;
            }
            this._particle.stop(true);
            this.removeFromParent();
        }


        protected getSkinName() {
            return BattleBrickBreakSkin;
        }

        public setData(brick: BattleBrick) {
            //this._particle = new particle.Particle();
            //this._cubeId = brick.getBrickId();
            var grade = brick.getGrade();
            let texture = RES.getRes(`cube/break/${grade}`);
            if (!this._particle) {
                let config = RES.getRes(`cube/break/posui`);
                this._particle = new particle.GravityParticleSystem(texture, config);
                this.breakGroup.addChild(this._particle);
            }
            this._particle.changeTexture(texture);
            this.x = brick.x;
            this.y = brick.y;
        }

        public setBall(ball: BattleBall) {
            let texture = RES.getRes(`cube/break/${1}`);
            if (!this._particle) {
                let config = RES.getRes(`cube/break/posui`);
                this._particle = new particle.GravityParticleSystem(texture, config);
                this.breakGroup.addChild(this._particle);
            }
            this._particle.changeTexture(texture);
            this.x = ball.x;
            this.y = ball.y;
        }

        public play() {
            let d = defer();
            this._particle.x = 0;
            this._particle.y = 0;
            this._particle.start(500);
            this._timeout = egret.setTimeout(() => {
                d.resolve(true);
                this._timeout = null;
            }, this, 2000);
            return d.promise();
        }
    }
}