import Game from '../Game';

cc.Class({
    extends: cc.Component,

    properties: {
        selectIndex: { default: 0, type: cc.Integer },
        curGainLabel: { default: null, type: cc.Label },
        totalGainLabel: { default: null, type: cc.Label },
        curTargetNum: { default: 0, type: cc.Integer },
        totalTargetNum: { default: 0, type: cc.Integer },
        updateGain: { default: [], type: cc.Boolean },
        diffGain: { default: 0, type: cc.Integer },
        playInterval: { default: 0, type: cc.Integer },
        passedInterval: { default: 0, type: cc.Integer },
        addButton: { default: null, type: cc.Button },
        reduceButton: { default: null, type: cc.Button },
        betLabel: { default: null, type: cc.Label },
        betNumber: { default: Game.TurnDefine.BET_CONFIG.BET_INIT, type: cc.Integer },
    },

    
    onLoad() {
        this.SetBetNumber(Game.TurnDefine.BET_CONFIG.BET_INIT);
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATECURGAIN, this, this.onUpdateCurGain);
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATETOTALGAIN, this, this.onUpdateTotalGain);
        Game.NotificationController.On(Game.Define.EVENT_KEY.CHANGE_GAMESTATE, this, this.onGameStateChange);
        this.curGainLabel.string = Game.UserModel.curGainCount;
        this.totalGainLabel.string = Game.UserModel.totalGainCount || 0;
        this.updateGain = false;
    },

    start() {
    },

    update(dt) {
        if (this.updateGain) {
            //更新咯
            this.passedInterval += dt;
            let curGain = 0;
            let totalGain = 0;
            if (this.passedInterval < this.playInterval) {
                curGain = Math.floor(this.curTargetNum - this.diffGain * (this.playInterval - this.passedInterval) / this.playInterval);
                totalGain = Math.floor(this.totalTargetNum - this.diffGain * (this.playInterval - this.passedInterval) / this.playInterval);
            } else {
                curGain = this.curTargetNum;
                totalGain = this.totalTargetNum;
                this.updateGain = false;
                Game.GameController.ChangeState(Game.TurnDefine.GAME_STATE.STATE_ENDED);
                this.curGainLabel.node.runAction(cc.scaleTo(0.3, 1, 1));
                this.totalGainLabel.node.runAction(cc.scaleTo(0.3, 1, 1));
            }
            this.curGainLabel.string = curGain;
            this.totalGainLabel.string = totalGain;
        }
    },

    onDestroy() {
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATECURGAIN, this, this.onUpdateCurGain);
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATETOTALGAIN, this, this.onUpdateTotalGain);
        Game.NotificationController.Off(Game.Define.EVENT_KEY.CHANGE_GAMESTATE, this, this.onGameStateChange);
    },

    onAddButtonClick(event) {
        let newVal = this.betNumber + Game.TurnDefine.BET_CONFIG.BET_ADDITION;
        newVal = Math.max(Math.min(newVal, Game.TurnDefine.BET_CONFIG.BET_MAX, Math.floor(Game.UserModel.GetCostCurrency() / 1000) * 1000), Game.TurnDefine.BET_CONFIG.BET_INIT);
        this.SetBetNumber(newVal);
    },
    onReduceButtonClick(event) {
        let newVal = this.betNumber - Game.TurnDefine.BET_CONFIG.BET_ADDITION;
        newVal = Math.max(newVal, Game.TurnDefine.BET_CONFIG.BET_INIT);
        this.SetBetNumber(newVal);
    },
    onUpdateCurGain(count, immediately) {
        if (immediately) {
            this.curGainLabel.string = count;
        } else {
            this.curTargetNum = count;
        }
    },
    onUpdateTotalGain(count, immediately) {
        if (immediately) {
            this.totalGainLabel.string = count;
        } else {
            this.totalTargetNum = count;
        }
    },
    onGameStateChange(state) {
        if (state == Game.TurnDefine.GAME_STATE.STATE_IDLE) {
            this.addButton.interactable = true;
            this.reduceButton.interactable = true;
            let newValue = Math.max(Math.min(this.betNumber, Game.TurnDefine.BET_CONFIG.BET_MAX, Math.floor(Game.UserModel.GetCostCurrency() / 1000) * 1000), Game.TurnDefine.BET_CONFIG.BET_INIT);
            this.SetBetNumber(newValue);
        } else {
            this.addButton.interactable = false;
            this.reduceButton.interactable = false;
        }
        if (state == Game.TurnDefine.GAME_STATE.STATE_ADDGOLD) {
            //加数字咯
            this.updateGain = true;
            this.diffGain = Math.max(0, (this.totalTargetNum || 0) - (parseInt(this.totalGainLabel.string) || 0));
            this.passedInterval = 0;
            this.playInterval = this.diffGain / 70000 + 1;
            this.curGainLabel.node.runAction(cc.scaleTo(0.3, 1.2, 1.2));
            this.totalGainLabel.node.runAction(cc.scaleTo(0.3, 1.2, 1.2));
        }
    },
    SetBetNumber(value) {
        this.betNumber = value;
        let info = Game.Tools.CalculateCouponStr(value);
        this.betLabel.string = info.num + info.suffix;
    },
});
