module game {
    export class BattleRewardBall extends GameComponent implements PoolItem {
        rewardLabel: eui.Label;

        onCreate() {
        }

        onDestroy() {
        }

        protected getSkinName() {
            return BattleRewardBallSkin;
        }

        protected init() {
            this.touchChildren = false;
            this.touchEnabled = false;
        }

        public setData(num: number) {
            this.rewardLabel.textFlow = [
                {text: `${num > 0 ? "+" : ""}`},
                {text: `${num}`, style: {fontFamily: "DynoBold"}}
            ];
        }
    }
}