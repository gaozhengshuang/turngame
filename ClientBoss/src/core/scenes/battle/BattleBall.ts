module game {
    import ballCollisionGroup = gameConfig.ballCollisionGroup;
    import wallCollisionGroup = gameConfig.wallCollisionGroup;
    import paddleCollisionGroup = gameConfig.paddleCollisionGroup;
    import brickCollisionGroup = gameConfig.brickCollisionGroup;

    export class BattleBall extends BattleBody {
        ballImage: eui.Image;

        public meetFire: boolean = false;
        public body: p2.Body;
        private _shape: p2.Circle;

        public ballId: number;
        private _ballData: table.ITBallDefine;

        public battleBodyType: BattleBodyType;
        private _hitCount: number;
        public isPenetration: boolean;

        protected init() {
            this.body = new p2.Body();
            this._shape = new p2.Circle();
            this.body.displays = [this];
            this.body.type = p2.Body.DYNAMIC;
            this.body.damping = 0;
            this.body.mass = 1;
            this.battleBodyType = BattleBodyType.ball;
            this._shape.radius = 16 / gameConfig.factor;
            this._shape.material = BattleScene.getInstance().ballMaterial;
            this._shape.collisionGroup = ballCollisionGroup;
            this._shape.collisionMask = wallCollisionGroup | paddleCollisionGroup | brickCollisionGroup;
            this.body.addShape(this._shape);
        }

        public setData(ballId: number, material: p2.Material, isPenetration: boolean) {
            this.meetFire = false;
            this.isPenetration = isPenetration;
            this._hitCount = 0;
            this.ballId = ballId;
            this._ballData = table.TBallById[ballId];
            if (isPenetration) {
                this.ballImage.source = `ball/3`;
            } else {
                this.ballImage.source = `ball/${ballId}`;
            }
            if (ballId == 1) {
                this.width = this.height = 28;
                this.anchorOffsetX = this.anchorOffsetY = this.width / 2;
            } else {
                this.width = this.height = 34;
                this.anchorOffsetX = this.anchorOffsetY = this.width / 2;
            }
            if (isPenetration) {
                this.playRotation();
            }
        }

        private playRotation() {
            egret.Tween.get(this.ballImage, {loop: true}).to({rotation: 360}, 1000);
        }

        public resetPosition(info: number[]) {
            this.x = info[0];
            this.y = info[1];
            this.body.position = [this.x / gameConfig.factor, this.y / gameConfig.factor];
        }

        public setBaseBall(baseBall?: BattleBall) {
            this.x = baseBall.x;
            this.y = baseBall.y - 34.5;
            this.body.position = [this.x / gameConfig.factor, this.y / gameConfig.factor];
            let speedX: number;
            let speedY: number;
            Math.random();
            Math.random();
            Math.random();
            let random = Math.random();
            if (random < 0.5) {
                speedX = Math.random() * 5 + 5;
            } else {
                speedX = -Math.random() * 5 + 5;
            }
            if (baseBall.body.velocity[1] > 0) {
                speedY = testSpeed;
            } else {
                speedY = -testSpeed;
            }
            this.body.velocity = [speedX, speedY];
        }

        public lastVelocity;
        public lastPosition;

        public updateView() {
            this.lastVelocity = [this.body.velocity[0], this.body.velocity[1]];
            this.lastPosition = [this.body.position[0], this.body.position[1]];
            this.x = this.body.position[0] * gameConfig.factor;
            this.y = this.body.position[1] * gameConfig.factor;
        }

        protected getSkinName() {
            return BattleBallSkin;
        }

        onDestroy() {
            egret.Tween.removeTweens(this.ballImage);
            if (this.body.world) {
                this.body.world.removeBody(this.body);
            }
            this.removeFromParent();
            this._hitCount = 0;
            this.meetFire = false;
            this.y = 800;
        }

        public getDamage() {
            let d = 0;
            if (this._ballData) {
                d = this._ballData.Atk;
            }
            return d;
        }

        public getPrice() {
            let p = 0;
            if (this._ballData) {
                p = this._ballData.Price;
            }
            return p;
        }

        public addHitCount() {
            this._hitCount++;
            if (this.body.velocity[1] <= 0 && this.body.velocity[1] > -10) {
                this.body.velocity[1] = -15;
            } else if (this.body.velocity[1] > 0 && this.body.velocity[1] < 10) {
                this.body.velocity[1] = 15;
            }
        }

        public resetV() {
            this.body.velocity = [this.lastVelocity[0], this.lastVelocity[1]];
            this.body.position = [this.lastPosition[0], this.lastPosition[1]];
            this.x = this.body.position[0] * gameConfig.factor;
            this.y = this.body.position[1] * gameConfig.factor;
        }
    }
}