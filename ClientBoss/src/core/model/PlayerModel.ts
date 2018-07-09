module game {
    export class PlayerModel extends BaseModel {
        static MUSIC_CHANGE = "PlayerModel_MUSIC_CHANGE";
        static SOUND_CHANGE = "PlayerModel_SOUND_CHANGE";
        static GOLD_UPDATE = "PlayerModel_GOLD_UPDATE";
        static SCORE_UPDATE = "PlayerModel_SCORE_UPDATE";
        static ADD_OR_USE_GOLD = "PlayerModel_ADD_OR_USE_GOLD";
        static GOLD_NOT_ENOUGH = "PlayerModel_GOLD_NOT_ENOUGH";
        static PENETRATION_UPDATE = "PlayerModel_PENETRATION_UPDATE";
        static TOP_UPDATE = "PlayerModel_TOP_UPDATE";
        static BAG_UPDATE = "PlayerModel_BAG_UPDATE";

        public penetration: number = 0;
        private _gold: number = 50;
        public userInfo: IUserInfo = {face: "1", name: "", userid: 0, rank: 0, money: 0, openid: ""};
        public bagList: Array<msg.IItemData> = [];

        public RegisterEvent() {
            NotificationCenter.addObserver(this, this.OnGW2C_RetUserInfo, "msg.GW2C_SendUserInfo");
            NotificationCenter.addObserver(this, this.OnGW2C_SendWechatInfo, "msg.GW2C_SendWechatInfo")
            NotificationCenter.addObserver(this, this.OnGW2C_UpdateGold, "msg.GW2C_UpdateGold");
            NotificationCenter.addObserver(this, this.OnGW2C_AddPackageItem, "msg.GW2C_AddPackageItem");
            NotificationCenter.addObserver(this, this.OnGW2C_RemovePackageItem, "msg.GW2C_RemovePackageItem");
            NotificationCenter.addObserver(this, this.OnGW2C_FreePresentNotify, "msg.GW2C_FreePresentNotify");
        }

        private OnGW2C_RetUserInfo(data: msg.IGW2C_SendUserInfo) {
            this.userInfo.money = data.base.money;
            this.userInfo.name = data.entity.name;
            this.userInfo.userid = data.entity.id;
            this.userInfo.openid = data.base.wechat.openid;
            this.bagList = data.item.items;
        }

        private OnGW2C_SendWechatInfo(data: msg.GW2C_SendWechatInfo) {
            this.userInfo.openid = data.openid;
        }

        private OnGW2C_UpdateGold(data: msg.GW2C_UpdateGold) {
            this.userInfo.money = data.num;
            this.setScore(data.num);
        }

        private OnGW2C_AddPackageItem(data: msg.GW2C_AddPackageItem) {
            this.addBag(data.itemid, data.num);
            NotificationCenter.postNotification(PlayerModel.BAG_UPDATE);
        }

        private OnGW2C_RemovePackageItem(data: msg.GW2C_RemovePackageItem) {
            this.deleteBag(data.itemid, data.num);
            NotificationCenter.postNotification(PlayerModel.BAG_UPDATE);
        }

        private OnGW2C_FreePresentNotify(data: msg.GW2C_FreePresentNotify) {
            LoginReward.getInstance().show();
        }

        public setScore(count: number) {
            this.userInfo.money = count;
            this.postNotification(PlayerModel.SCORE_UPDATE);
        }

        public getScore() {
            return this.userInfo.money;
        }

        public useScore(count: number) {
            this.userInfo.money -= count;
            if (this.userInfo.money < 0) {
                this.userInfo.money = 0;
            }
            this.postNotification(PlayerModel.SCORE_UPDATE);
        }

        public addScore(count: number) {
            this.userInfo.money += count;
            this.postNotification(PlayerModel.SCORE_UPDATE);
        }

        public getGold() {
            return this._gold;
        }

        public useGold(count: number, reason: Array<egret.ITextElement> = null) {
            this._gold -= count;
            if (this._gold < 0) {
                this._gold = 0;
            }
            this.postNotification(PlayerModel.GOLD_UPDATE);
            if (reason)
                this.postNotification(PlayerModel.ADD_OR_USE_GOLD, reason);
        }

        public addGold(count: number, reason: Array<egret.ITextElement> = null) {
            this._gold += count;
            this.postNotification(PlayerModel.GOLD_UPDATE);
            if (reason)
                this.postNotification(PlayerModel.ADD_OR_USE_GOLD, reason);
        }

        public addBag(itemId: number, itemNum: number) {
            let isPush = true;
            for (let i = 0; i < this.bagList.length; i++) {
                if (this.bagList[i].id == itemId) {
                    this.bagList[i].num += itemNum;
                    isPush = false;
                    break;
                }
            }

            if(isPush) {
                this.bagList.push({id: itemId, num: itemNum});
            }
        }

        public deleteBag(itemId: number, itemNum: number) {
            for (let i = 0; i < this.bagList.length; i++) {
                if (this.bagList[i].id == itemId) {
                    this.bagList[i].num -= itemNum;

                    if (this.bagList[i].num <= 0) {
                        this.bagList.splice(i,1);
                    }
                    break;
                }
            }
        }

        public getBag() {
            return this.bagList;
        }

        get musicState() {
            let r = egret.localStorage.getItem("music");
            if (!r) {
                egret.localStorage.setItem("music", "on");
                r = "on"
            }
            return r;
        }

        changeMusicState() {
            let r = egret.localStorage.getItem("music");
            if (r == "on") {
                r = "off";
                showTips(Lang.guanbiyinyue);
            } else {
                r = "on";
                showTips(Lang.dakaiyinyue);
            }
            egret.localStorage.setItem("music", r);
            this.postNotification(PlayerModel.MUSIC_CHANGE);
        }

        get soundState() {
            let r = egret.localStorage.getItem("sound");
            if (!r) {
                egret.localStorage.setItem("sound", "on");
                r = "on"
            }
            return r;
        }

        changeSoundState() {
            let r = egret.localStorage.getItem("sound");
            if (r != "on") {
                r = "on";
                showTips(Lang.dakaiyinxiao);
            } else {
                r = "off";
                showTips(Lang.guanbiyinxiao);
            }
            egret.localStorage.setItem("sound", r);
            this.postNotification(PlayerModel.SOUND_CHANGE);
        }

        public battleStart() {
            this.penetration = 0;
        }

        public async battleEnd(type: number = 1) {
            SoundManager.playEffect("jiesuan");
            let sendInfo: IUpdateScore = {
                face: this.userInfo.face,
                name: this.userInfo.name,
                openid: this.userInfo.userid+"",
                score: this.getScore(),
                token: ""
            };
            let r: IHttpRetInfo = await SendHttp($uploadScore, sendInfo);
            if (r) {
                this.updateUserInfo(r.msg.userInfo);
                let isTop = r.msg.userInfo.score == this.getScore();
                let winPanel = WinScene.getInstance();
                winPanel.setScore(isTop, this.getScore(), r.msg.ranklist);
                openPanel(PanelType.win);
            }
        }

        public addPenetration(num: number) {
            this.penetration = num;
            this.postNotification(PlayerModel.PENETRATION_UPDATE);
        }

        public usePenetration(num: number) {
            this.penetration -= num;
            this.postNotification(PlayerModel.PENETRATION_UPDATE);
        }

        public async openRankPanel(){
            let sendInfo: IGetRankList = {
                face: this.userInfo.face,
                name: this.userInfo.name,
                openid: this.userInfo.userid+"",
                start: 0,
                stop: 1,
                token: ""
            };
            let r: IHttpRetInfo = await SendHttp($getRankList, sendInfo);
            if (r) {
                this.updateUserInfo(r.msg.userInfo);
                openPanel(PanelType.rank);
            }
        }

        public async requireRank(begin: number) {
            let sendInfo: IGetRankList = {
                face: this.userInfo.face,
                name: this.userInfo.name,
                openid: this.userInfo.userid+"",
                start: begin,
                stop: begin + 50,
                token: ""
            };
            let r: IHttpRetInfo = await SendHttp($getRankList, sendInfo);
            if (r) {
                this.updateUserInfo(r.msg.userInfo);
                NotificationCenter.postNotification("msg.GW2C_RetSort", r.msg.ranklist);
            }
        }

        private updateUserInfo(info: IRankInfo) {
            this.userInfo.userid = info.userid;
            this.userInfo.name = info.name;
            this.userInfo.face = info.face;
            this.userInfo.rank = info.rank;
            this.userInfo.money = info.score;
            this.postNotification(PlayerModel.TOP_UPDATE);
        }

        public async getPlayerGoods() {
            let r = <string>await ajax(`${$goodsIp}${$goodsPath}`, {uid: this.getUserId(), state: 0, gameid: 10002});
            let json = JSON.parse(r);
            if (json.code == 0 || json.msg == "操作成功") {
                return json.data;
            }
            return [];
        }

        public guideFinish() {
            if (egret.localStorage.getItem("guide")) {
                return true;
            } else {
                return false;
            }
        }

        public getUserId() {
            return this.userInfo.userid;
        }

        public getOpenId() {
            return this.userInfo.openid;
        }
    }
}