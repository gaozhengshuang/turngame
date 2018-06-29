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

        public penetration: number = 0;
        private _gold: number = 50;
        private _score: number = 0;
        public userInfo: IUserInfo = {score: 0, face: "1", name: "", openid: "", rank: 0, token: ""};
        public bagList: Array<bagInfo> = [];

        public getScore() {
            return this._score;
        }

        public useScore(count: number) {
            this._score -= count;
            if (this._score < 0) {
                this._score = 0;
            }
            this.postNotification(PlayerModel.SCORE_UPDATE);
        }

        public addScore(count: number) {
            this._score += count;
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

        public addBag(itemId: number) {
            let isPush = true;
            for (let i = 0; i < this.bagList.length; i++) {
                if (this.bagList[i].id == itemId) {
                    this.bagList[i].num += 1;
                    isPush = false;
                    break;
                }
            }

            if(isPush) {
                this.bagList.push({id: itemId, num: 1});
            }
        }

        public getBag() {
            return this.bagList;
        }

        public cleanBag() {
            this.bagList = [];
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
            this._score = 1000;
            this._gold = 100;
            this.penetration = 0;
        }

        public async battleEnd(type: number = 1) {
            SoundManager.playEffect("jiesuan");
            let sendInfo: IUpdateScore = {
                face: this.userInfo.face,
                name: this.userInfo.name,
                openid: this.userInfo.openid,
                score: this._score,
                token: this.userInfo.token
            };
            let r: IHttpRetInfo = await SendHttp($uploadScore, sendInfo);
            if (r) {
                this.updateUserInfo(r.msg.userInfo);
                let isTop = r.msg.userInfo.score == this._score;
                let winPanel = WinScene.getInstance();
                winPanel.setScore(isTop, this._score, r.msg.ranklist);
                openPanel(PanelType.win);
            }

            if ($isWx) {
                wx.getOpenDataContext().postMessage({
                    openid: DataManager.playerModel.userInfo.openid,
                    functionType: gameConfig.FunctionType.setUserRank,
                    score: this._score
                });
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
                openid: this.userInfo.openid,
                start: 0,
                stop: 1,
                token: this.userInfo.token
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
                openid: this.userInfo.openid,
                start: begin,
                stop: begin + 50,
                token: this.userInfo.token
            };
            let r: IHttpRetInfo = await SendHttp($getRankList, sendInfo);
            if (r) {
                this.updateUserInfo(r.msg.userInfo);
                NotificationCenter.postNotification("msg.GW2C_RetSort", r.msg.ranklist);
            }
        }

        private updateUserInfo(info: IRankInfo) {
            this.userInfo.openid = info.openid;
            this.userInfo.name = info.name;
            this.userInfo.face = info.face;
            this.userInfo.rank = info.rank;
            this.userInfo.score = info.score;
            this.postNotification(PlayerModel.TOP_UPDATE);
        }

        public guideFinish() {
            if (egret.localStorage.getItem("guide")) {
                return true
            } else {
                return false;
            }
        }
    }

    export interface WxUserInfo {
        nickName: string;
        avatarUrl: string;
        gender: number;
        province: string;
        city: string;
        country: string;
    }

    export interface bagInfo {
        id: number;
        num: number;
    }
}