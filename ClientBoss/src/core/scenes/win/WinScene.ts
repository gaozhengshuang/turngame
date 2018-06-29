module game {
    export class WinScene extends PanelComponent {
        newRecordGroup: eui.Group;
        recordLabel: eui.Label;
        normalGroup: eui.Group;
        scoreLabel: eui.Label;
        rankGroup: eui.Group;
        rankLabel: eui.Label;
        backButton: IconButton;
        againButton: IconButton;
        shareButton: IconButton;

        private _rankItemList: WinRankItem[];

        protected init() {
            this._rankItemList = [];
            this.recordLabel.fontFamily = this.scoreLabel.fontFamily = "DynoBold";
            this.backButton.icon = "ui/win/back";
            this.againButton.icon = "ui/win/again";
            this.shareButton.icon = "ui/win/fenxiang";
        }

        protected getSkinName() {
            return WinSceneSkin;
        }

        protected beforeShow() {
            this._touchEvent = [
                {target: this.backButton, callBackFunc: this.backHandle},
                {target: this.rankLabel, callBackFunc: this.rankHandle},
                {target: this.againButton, callBackFunc: this.againHandle},
                {target: this.shareButton, callBackFunc: this.shareHandle},
            ]
        }

        private backHandle() {
            SceneManager.changeScene(SceneType.main);
            this.remove();
        }

        private rankHandle() {
            DataManager.playerModel.openRankPanel();
        }

        private againHandle() {
            DataManager.playerModel.battleStart();
            SceneManager.changeScene(SceneType.battle, true);
            this.remove();
        }

        private shareHandle() {
            this.shareWx();
        }

        private async shareWx() {
            const shareRes = await platform.shareAppMessage();
        }

        private static _instance: WinScene;

        public static getInstance(): WinScene {
            if (!WinScene._instance) {
                WinScene._instance = new WinScene();
            }
            return WinScene._instance;
        }

        public setScore(top: boolean, score: number, rankList: IRankInfo[]) {
            this.rankGroup.removeChildren();
            this.newRecordGroup.visible = top;
            this.normalGroup.visible = !top;
            this.recordLabel.text = this.scoreLabel.text = `${score}`;
            for (let i = 0; i < rankList.length; i++) {
                let item = this._rankItemList[i];
                if (!item) {
                    item = new WinRankItem();
                    this._rankItemList[i] = item;
                }
                item.setInfo(rankList[i]);
                this.rankGroup.addChild(item);
            }
        }
    }
}