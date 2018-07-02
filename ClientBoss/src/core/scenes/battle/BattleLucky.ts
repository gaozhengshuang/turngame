module game {
    export class BattleLucky extends PanelComponent {
        closeButton: IconButton;
        startButton: IconButton;
        bagButton: IconButton;
        luckyLight: eui.Image;

        gift_1: LuckyItem;
        gift_2: LuckyItem;
        gift_3: LuckyItem;
        gift_4: LuckyItem;
        gift_5: LuckyItem;
        gift_6: LuckyItem;
        gift_7: LuckyItem;
        gift_8: LuckyItem;
        gift_9: LuckyItem;
        gift_10: LuckyItem;
        gift_11: LuckyItem;
        gift_12: LuckyItem;

        private _playInterval: number;
        private _giftPro: number[];
        private _isStart: boolean;
        private _lightIndex: number;
        private _giftIndex: number;

        protected getSkinName() {
            return BattleLuckySkin;
        }

        protected init() {
            this.closeButton.icon = "lucky/luckycloseBtn";
            this.startButton.icon = "lucky/luckyBtn";
            this.bagButton.icon = "lucky/bagBtn";

            this.initGift();
        }

        protected beforeShow() {
            this._isStart = false;
            this._lightIndex = 0;
            this._giftIndex = 0;
            this.luckyLight.x = this.gift_1.x;
            this.luckyLight.y = this.gift_1.y;

            this._touchEvent = [
                {target: this.closeButton, callBackFunc: this.backHandle},
                {target: this.startButton, callBackFunc: this.startLuckyHandle},
                {target: this.bagButton, callBackFunc: this.bagHandle},
            ];
        }

        protected beforeRemove() {
            if (this._playInterval) {
                egret.clearInterval(this._playInterval);
                this._playInterval = null;
            }
        }

        private initGift() {
            this._giftPro = [];
            for (let i = 0; i < table.TBallGift.length; i++) {
                let giftInfo = table.TBallGift[i];
                this["gift_"+(i+1)].setItem(giftInfo.Path, giftInfo.Name);
                this._giftPro.push(giftInfo.Pro/10000);
            }
        }

        private backHandle() {
            this.remove();
        }

        private startLuckyHandle() {
            if (this._isStart) {
                return;
            }

            if (DataManager.playerModel.getScore() >= _buyLucky) {
                DataManager.playerModel.useScore(_buyLucky);
                this.showStartLucky();
            } else {
                showTips("需要消耗"+_buyLucky+"金币抽奖一次");
            }
        }

        private showStartLucky() {
            let lastGiftIndex = this._giftIndex;
            this._giftIndex = lootEvent(this._giftPro);
            let posIndex = this._giftIndex + (this._giftPro.length * (Math.floor(Math.random() * 3) + 5)) + (this._giftPro.length - lastGiftIndex); 
            let _currentIndex = 0;
            
            let space = 200;
            let interval: Function = function() {
                if (_currentIndex > posIndex - 10) {
                    space += 20;
                } else {
                    space -= _currentIndex*10;
                    if (space < 30) {
                        space = 30;
                    }
                }
                return space;
            }.bind(this);

            let playStart: Function = function() {
                this._isStart = true;

                this._playInterval = egret.setInterval(() => {
                    _currentIndex++;
                    if (_currentIndex > posIndex) {
                        playEnd();
                    } else {
                        this._lightIndex++;
                        if (this._lightIndex > 12) {
                            this._lightIndex = 1;
                        }
                        this.luckyLight.x = this["gift_"+this._lightIndex].x;
                        this.luckyLight.y = this["gift_"+this._lightIndex].y;
                    }

                    if (this._playInterval) {
                        egret.clearInterval(this._playInterval);

                        if (this._isStart) {
                            playStart();
                        }
                    }
                }, this, interval());
            }.bind(this);

            let playEnd: Function = function() {
                this._isStart = false;
                let giftInfo = table.TBallGiftById[this._giftIndex];
                if (giftInfo) {
                    showTips("恭喜您获得: "+ giftInfo.Name);
                    if (giftInfo.PushBag == 1) {
                        DataManager.playerModel.addBag(giftInfo.Id);
                    }
                }
            }.bind(this);

            playStart();
        }

        private bagHandle() {
            if (this._isStart) {
                showTips("抽奖中,请稍后再试..");
                return;
            }

            this.backHandle();
            openPanel(PanelType.bag);
        }

        private static _instance: BattleLucky;

        public static getInstance(): BattleLucky {
            if (!BattleLucky._instance) {
                BattleLucky._instance = new BattleLucky();
            }
            return BattleLucky._instance;
        }
    }
}