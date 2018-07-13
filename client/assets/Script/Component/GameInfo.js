import Game from '../Game';
import GameBet from './GameBet';
cc.Class({
    extends: cc.Component,

    properties: {
        gameBets: { default: [], type: [GameBet] },
        selectIndex: { default: 0, type: cc.Integer },
        curGainLabel: { default: null, type: cc.Label },
        totalGainLabel: { default: null, type: cc.Label }
    },

    onLoad() {
        this.onBetClick(null, 1);
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATECURGAIN, this, this.onUpdateCurGain);
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATETOTALGAIN, this, this.onUpdateTotalGain);
        Game.NotificationController.On(Game.Define.EVENT_KEY.CHANGE_GAMESTATE, this, this.onGameStateChange);
        this.curGainLabel.string = Game.UserModel.curGainCount;
        this.totalGainLabel.string = Game.UserModel.totalGainCount;
    },

    start() {
    },

    update(dt) {
    },

    onDestroy() {
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATECURGAIN, this, this.onUpdateCurGain);
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATETOTALGAIN, this, this.onUpdateTotalGain);
        Game.NotificationController.Off(Game.Define.EVENT_KEY.CHANGE_GAMESTATE, this, this.onGameStateChange);
    },

    onBetClick(event, customData) {
        this.selectIndex = customData;
        Game.GameController.selectIndex = customData;
        for (let i = 0; i < this.gameBets.length; i++) {
            let gameBet = this.gameBets[i];
            if (gameBet != null) {
                if (i == customData) {
                    gameBet.Disable();
                } else {
                    gameBet.Enable();
                }
            }
        }
    },
    onUpdateCurGain(count) {
        this.curGainLabel.string = count;
    },
    onUpdateTotalGain(count) {
        this.totalGainLabel.string = count;
    },
    onGameStateChange(state) {
        if (state == Game.TurnDefine.GAME_STATE.STATE_IDLE) {
            for (let i = 0; i < this.gameBets.length; i++) {
                let gameBet = this.gameBets[i];
                if (gameBet != null) {
                    if (i == this.selectIndex) {
                        gameBet.DisableButton();
                    } else {
                        gameBet.EnableButton();
                    }
                }
            }
        } else {
            for (let i = 0; i < this.gameBets.length; i++) {
                let gameBet = this.gameBets[i];
                if (gameBet != null) {
                    gameBet.DisableButton();
                }
            }
        }
    },
    Init(index) {
        if (index == 0) {
            index = 1;
        }
        this.onBetClick(null, index);
    }
});
