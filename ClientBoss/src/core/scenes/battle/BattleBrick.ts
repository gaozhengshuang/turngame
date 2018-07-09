module game {
    import brickCollisionGroup = gameConfig.brickCollisionGroup;
    import ballCollisionGroup = gameConfig.ballCollisionGroup;

    export class BattleBrick extends BattleBody implements PoolItem, BattleBody {
        brickImage: eui.Image;
        crackImage: eui.Image;
        shakeAnim: egret.tween.TweenGroup;
        showAnim: egret.tween.TweenGroup;
        countdownLabel: eui.Label;
        public blackHoleList: Array<BattleBlackHole>;

        public body: p2.Body;
        private _shape: p2.Capsule;
        private _hp: number;
        public brickInfo: MapGridInfo;
        private _brickData: table.ITBirckDefine;
        private _brickInfoData: table.ITBirckInfoDefine;

        private _hitTime: number;
        private _breakScore: number;
        private _maxHp: number;
        private _31Hp: number;
        private _32Hp: number;
        private _grade: number;
        private _score: number;
        private _frozen: boolean;
        public frozenBrick: BattleBrick;

        public battleBodyType: BattleBodyType;
        public brickColor: string;
        public brickColorNumber: number;
        public direction: number;
        public speed: number;
        public buffType: BrickType;
        public canMove: boolean;
        private _buffCountdown: number;
        public needCountdown: boolean;
        public leftFirewall: BattleFirewall[];
        public rightFirewall: BattleFirewall[];

        private _playInterval: number;

        protected init() {
            this.body = new p2.Body();
            this.body.displays = [this];
            this.body.type = p2.Body.STATIC;
            this.battleBodyType = BattleBodyType.brick;
        }

        protected getSkinName() {
            return BattleBrickSkin;
        }

        public setData(brickInfo: MapGridInfo, material: p2.Material, direction: number, infoData: table.ITBirckInfoDefine, type: BrickType) {
            this.frozenBrick = null;
            this._frozen = false;
            this.leftFirewall = [];
            this.rightFirewall = [];
            this.direction = direction;
            this.brickImage.scaleX = this.crackImage.scaleX = direction == 0 || type != BrickType.boom ? 1 : -1;
            this.brickInfo = brickInfo;
            this._brickInfoData = infoData;
            this.buffType = type;
            this.canMove = true;
            switch (this.buffType) {
                case BrickType.timeBoom:
                case BrickType.blackHole:
                case BrickType.fireWall:
                case BrickType.ice:
                    this.canMove = false;
                    break;
            }
            let prices = splitStringToNumberArray(this._brickInfoData.Info, ";", "-");
            let p = prices[Math.floor(Math.random() * prices.length)];
            this._maxHp = p[0];
            this._31Hp = this._maxHp / 3;
            this._32Hp = this._31Hp * 2;
            this._brickData = table.TBirckById[this._brickInfoData.Brickid];
            this.width = this._brickData.Wide;
            this.height = this._brickData.High;
            this._shape = new p2.Capsule();
            this._shape.length = 36 / gameConfig.factor;
            this._shape.radius = 18 / gameConfig.factor;
            this._shape.material = material;
            this._shape.collisionGroup = brickCollisionGroup;
            this._shape.collisionMask = ballCollisionGroup;
            this.body.addShape(this._shape);

            this.breakScore = p[1];
            this._score = p[2];
            this.grade = p[3];
            this.hp = p[0];
            let x = this.brickInfo.column * gameConfig.perBrickSize;
            let y = this.brickInfo.row * gameConfig.perBrickSize;
            this.x = x;
            this.y = y;
            this.resetPosition();
            this.initCountDown();
            this.blackHoleList = [];
            switch (this.buffType) {
                case BrickType.blackHole:
                case BrickType.fireWall:
                case BrickType.ice:
                    this.runBuff();
                    break;
            }
        }

        private initCountDown() {
            this.needCountdown = false;
            this.countdownLabel.visible = false;
            this.countdownLabel.x = 0;
            this.countdownLabel.horizontalCenter = 0;

            switch (this.buffType) {
                case BrickType.timeBoom:
                case BrickType.blackHole:
                case BrickType.fireWall:
                case BrickType.ice:
                    this.needCountdown = true;
                    this.countdownLabel.visible = true;
                    this._buffCountdown = this.getBuffTime();
                    this.countdownLabel.text = s2ms(this._buffCountdown / 60);
                    break;
            }
            if (this.buffType == BrickType.blackHole) {
                this.countdownLabel.x = -2;
                this.countdownLabel.textColor = gameConfig.TextColors.red;
            } else if (this.buffType == BrickType.ice) {
                this.countdownLabel.x = 1;
                this.countdownLabel.horizontalCenter = 1;
                this.countdownLabel.textColor = gameConfig.TextColors.white;
            } else if (this.buffType == BrickType.timeBoom) {
                this.countdownLabel.x = -1;
                this.countdownLabel.horizontalCenter = -1;
                this.countdownLabel.textColor = 0xf6ff00;
            } else if (this.buffType == BrickType.fireWall) {
                this.countdownLabel.textColor = 0x4fff34;
            } else {
                this.countdownLabel.textColor = 0xFF0000;
            }
        }

        public minusCountdown() {
            this._buffCountdown--;
            if (this._buffCountdown < 0) {
                this._buffCountdown = this.getBuffTime();
                this.runBuff();
            }
            switch (this.buffType) {
                case BrickType.timeBoom:
                    if (this.countdownLabel.text == "alarm") return;
                    this.countdownLabel.text = s2ms(this._buffCountdown / 60);
                    break;
                case BrickType.blackHole:
                    this.countdownLabel.text = s2s(this._buffCountdown / 60);
                    break;
                case BrickType.fireWall:
                    this.countdownLabel.text = s2s(this._buffCountdown / 60);
                    break;
                case BrickType.ice:
                    this.countdownLabel.text = s2s(this._buffCountdown / 60);
                    break;
            }
        }

        private runBuff() {
            switch (this.buffType) {
                case BrickType.timeBoom:
                    this.needCountdown = false;
                    BattleScene.getInstance().showTimeBoom(this);
                    break;
                case BrickType.blackHole:
                    SoundManager.playEffect("heidong", 0.5);
                    BattleScene.getInstance().addBlackHole(this);
                    break;
                case BrickType.fireWall:
                    BattleScene.getInstance().addFire(this);
                    break;
                case BrickType.ice:
                    SoundManager.playEffect("bingqiang", 0.5);
                    BattleScene.getInstance().addIce(this);
                    break;
            }
        }

        private getBuffTime() {
            let time = 0;
            switch (this.buffType) {
                case BrickType.timeBoom:
                    time = _timeBoomTime[BattleScene.getInstance().getCurScoreTimeSp()] * 60;
                    break;
                case BrickType.blackHole:
                    time = _blackHoleTime[BattleScene.getInstance().getCurScoreTimeSp()] * 60;
                    break;
                case BrickType.fireWall:
                    time = _fireWallTime[BattleScene.getInstance().getCurScoreTimeSp()] * 60;
                    break;
                case BrickType.ice:
                    time = _iceTime[BattleScene.getInstance().getCurScoreTimeSp()] * 60;
                    break;
            }
            return time;
        }

        public resetPosition() {
            let bodyX = (this.x + this.width / 2) / gameConfig.factor;
            let bodyY = (this.y + this.height / 2) / gameConfig.factor;
            this.body.position = [bodyX, bodyY];
        }

        private set breakScore(value: number) {
            this._breakScore = value;
        }

        public getGrade() {
            return this._grade;
        }

        public getBrickId() {
            return this._brickData.Id;
        }

        public getBuffType() {
            return this.buffType;
        }

        private set grade(value: number) {
            this.speed = 0.6;
            if (this.buffType == BrickType.normal) {
                switch (value) {
                    case 1:
                        this.brickColor = "白色";
                        this.brickColorNumber = gameConfig.TextColors.white;
                        break;
                    case 2:
                        this.brickColor = "绿色";
                        this.brickColorNumber = gameConfig.TextColors.green;
                        break;
                    case 3:
                        this.brickColor = "蓝色";
                        this.brickColorNumber = gameConfig.TextColors.blue;
                        break;
                    case 4:
                        this.brickColor = "紫色";
                        this.brickColorNumber = gameConfig.TextColors.purple;
                        break;
                    case 5:
                        this.brickColor = "橙色";
                        this.brickColorNumber = gameConfig.TextColors.orangeYellow;
                        break;
                }
                this.brickImage.source = `cube/${this._brickData.Id}/${value}`;
            } else if (this.buffType == BrickType.goldShark) {
                this.brickImage.source = `cube/goldShark/00001`;

                let _currentIndex = 0
                this._playInterval = egret.setInterval(() => {
                    _currentIndex++;
                    if (_currentIndex > 5) {
                        _currentIndex = 0;
                    }
                    this.brickImage.source = `cube/goldShark/0000${_currentIndex}`;
                }, this, 200);
            } else {
                this.brickImage.source = `cube/${this.buffType}`;
            }
            this._grade = value;
        }

        private set hp(value: number) {
            this._hp = value;
            if (this._hp > this._32Hp) {
                this.crackImage.visible = false;
            } else if (this._hp > this._31Hp) {
                this.crackImage.visible = true;
                this.crackImage.source = "cube/crack1";
            } else if (this._hp > 0) {
                this.crackImage.visible = true;
                this.crackImage.source = "cube/crack2";
            } else if (this._hp == 0) {
                this.crackImage.visible = true;
                this.crackImage.source = "cube/crack3";
            }
            if (value < 0) {
                BattleScene.getInstance().destroyBrick(this);
            }
        }

        public hitBySp() {
            if (this._frozen) return;
            if (this._hp > 0)
                this.hp = 0;
        }

        onDestroy() {
            if (this.body.world) {
                this.body.world.removeBody(this.body);
            }
            if (this.body.shapes.length > 0) {
                for (let shape of this.body.shapes) {
                    this.body.removeShape(shape);
                }
            }
            if (this._playInterval) {
                egret.clearInterval(this._playInterval);
                this._playInterval = null;
            }
            this.removeFromParent();
        }

        public hitByBall(ball: BattleBall, time: number, over: boolean = false) {
            let now = time;
            if (this._hitTime == now) return;
            if (!this._frozen) {
                BattleScene.getInstance().addHit(this);
            }
            this.shakeAnim.play(0);
            this._hitTime = now;
            if (over) {
                this.hp = -1;
            } else {
                if (this._frozen) return;
                if (this._grade != 6) {
                    let damage = ball.getDamage();
                    let nowHp = this._hp - damage;
                    this.hp = nowHp;
                } else {
                    if (ball.isPenetration) { //贯穿弹无法打烂黄金鲨
                        let popImg = new eui.Image();
                        popImg.x = this.brickImage.x - 23;
                        popImg.y = this.brickImage.y - 18;
                        this.addChild(popImg);

                        let _currentIndex = 0
                        let _playSharkPop = egret.setInterval(() => {
                            _currentIndex++;
                            if (_currentIndex > 6) {
                                this.removeChild(popImg);
                                egret.clearInterval(_playSharkPop);
                                _playSharkPop = null;
                                return;
                            }
                            popImg.source = `cube/sharkPop/0000${_currentIndex}`;
                        }, this, 150);
                    } else {
                        if (Math.random() <= _goldSharkCrush) {
                            this.hp = -1;
                        }
                    }
                }
            }
        }

        public getRewardBall() {
            return this._brickInfoData.Bullet;
        }

        public getBreakScore() {
            return this._breakScore;
        }

        public getScore() {
            return this._score;
        }

        public frozen(brick: BattleBrick) {
            if (this.brickInfo.row == 0) return;
            this.frozenBrick = brick;
            this._frozen = true;
            this.crackImage.visible = true;
            this.crackImage.source = `cube/frozen`;
        }

        public unFrozen() {
            this.frozenBrick = null;
            this._frozen = false;
            this.hp = this._hp;
        }

        public isGoldShark() {
            return this.buffType == BrickType.goldShark;
        }

        public isBadBuff() {
            return this._brickInfoData.kind == 2;
        }
    }

    export const enum BrickType {
        //普通
        normal = 1,
        //双倍积分
        doubleScore = 2,
        //定时炸弹
        timeBoom = 3,
        //炸弹
        boom = 4,
        //黑洞
        blackHole = 5,
        //火墙
        fireWall = 6,
        //冰冻
        ice = 7,
        //贯穿弹
        penetration = 8,
        //黄金鲨
        goldShark = 9,
    }
}