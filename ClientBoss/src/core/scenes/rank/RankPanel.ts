module game {
    export class RankPanel extends PanelComponent {
        rankNameLabel: eui.Label;
        rankScroller: eui.Scroller;
        friendButton: IconButton;
        worldButton: IconButton;
        selfWorldGroup: eui.Group;
        backButton: IconButton;
        rankList: eui.List;
        rankbg: eui.Image;

        worldGroup: eui.Group;
        friendGroup: eui.Group;

        private _currentType: gameConfig.RankType;
        private _rankData: eui.ArrayCollection;
        private _selfRankItem: RankItem;
        private _onload: boolean = false;

        protected init() {
            this.friendButton.icon = "ui/rank/haoyou";
            this.worldButton.icon = "ui/rank/shijie";
            this.backButton.icon = "ui/win/back";
            this._rankData = new eui.ArrayCollection();
            this.rankList.itemRenderer = RankItem;
            this.rankList.dataProvider = this._rankData;

            this.friendGroup.addEventListener(egret.Event.ADDED_TO_STAGE,(event:egret.Event)=>{
                this.worldHandle();
            },this);
        }

        protected beforeShow() {
            this._touchEvent = [
                {target: this.friendButton, callBackFunc: this.friendHandle},
                {target: this.worldButton, callBackFunc: this.worldHandle},
                {target: this.backButton, callBackFunc: this.backHandle},
            ];
            this._notify = [
                {
                    source: DataManager.playerModel,
                    target: this,
                    callBackFunc: this.updateSelf,
                    notifyName: PlayerModel.TOP_UPDATE,
                    execute: false
                }
            ];
            NotificationCenter.addObserver(this, this.updateList, "msg.GW2C_RetSort");
        }

        private updateList(rankList: IRankInfo[]) {
            if (this._onload) {
                this._onload = false;
            }
            for (let v of rankList) {
                this._rankData.addItem(v);
            }
        }

        private friendHandle() {
            if(this._currentType == gameConfig.RankType.friend) return;
            this.friendGroup.visible = true;
            this.worldGroup.visible = false;

            this._rankData.removeAll();
            this.rankNameLabel.text = "好友排行榜";
            this._currentType = gameConfig.RankType.friend;
            this.openFriendRegion();
        }

        private updateSelf() {
            this.selfWorldGroup.removeChildren();
            let info = DataManager.playerModel.userInfo;
            if (info) {
                if (!this._selfRankItem) {
                    this._selfRankItem = new RankItem();
                }
                this._selfRankItem.setData({
                    rank: info.rank,
                    score: info.score,
                    name: info.name,
                    openid: info.openid,
                    face: info.face
                });
                this.selfWorldGroup.addChild(this._selfRankItem);
            }
        }

        public updateRank(rank: number) {
            if (this._onload) return;
            if (this._rankData.length > rank) return;
            this._onload = true;
            DataManager.playerModel.requireRank(rank);
        }

        private worldHandle() {            
            if(this._currentType == gameConfig.RankType.world) return;
            this.friendGroup.visible = false;
            this.worldGroup.visible = true;

            this._rankData.removeAll();
            this.rankNameLabel.text = "世界排行榜";
            this._currentType = gameConfig.RankType.world;
            this.rankScroller.viewport.scrollV = 0;
            DataManager.playerModel.requireRank(0);
            this.updateSelf();
            // this.closeFirendRegion();
        }

        private backHandle() {
            // this.closeFirendRegion();
            this._currentType = 0;
            this.remove();
        }

        protected getSkinName() {
            return RankPanelSkin;
        }

        private static _instance: RankPanel;

        public static getInstance(): RankPanel {
            if (!RankPanel._instance) {
                RankPanel._instance = new RankPanel();
            }
            return RankPanel._instance;
        }

//---------------------------------------------------------WX---------------------------------------------------------------------------------
        //微信子域
        private bitmapdata: egret.BitmapData;
        private bitmap: egret.Bitmap;
        private rankingListMask: egret.Shape;
        private openFriendRegion() {
            this.bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
            this.bitmapdata.$deleteSource = false;
            const texture = new egret.Texture();
            texture._setBitmapData(this.bitmapdata);
            this.bitmap = new egret.Bitmap(texture);
            this.bitmap.width = this.friendGroup.stage.stageWidth;
            this.bitmap.height = this.friendGroup.stage.stageHeight;
            this.friendGroup.addChild(this.bitmap);

            egret.startTick(this.tickFirendRegion, this);
            wx.getOpenDataContext().postMessage({
                isDisplay: true,
                openid: DataManager.playerModel.userInfo.openid,
                functionType: gameConfig.FunctionType.openRank
            });
        }

        private closeFirendRegion() {
            egret.stopTick(this.tickFirendRegion, this);
            if (this.bitmap && this.bitmap.parent) {
                this.bitmap.parent.removeChild(this.bitmap);
                this.bitmap = null;
            }

            wx.getOpenDataContext().postMessage({
                isDisplay: false,
                openid: DataManager.playerModel.userInfo.openid,
                functionType: gameConfig.FunctionType.openRank
            });
        }

        private tickFirendRegion(timeStarmp: number) {
            egret.WebGLUtils.deleteWebGLTexture(this.bitmapdata.webGLTexture);
            this.bitmapdata.webGLTexture = null;
            return false;
        }
    }
}