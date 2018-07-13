import Game from '../../Game';

import CardNodeView from '../Card/CardNodeView';
import GameResult from '../GameResult';
import GameCoupon from '../GameCoupon';
cc.Class({
    extends: cc.Component,

    properties: {
        cardNodePrefab: { default: null, type: cc.Prefab },
        cardNodeParent: { default: null, type: cc.Node },
        cardNodes: { default: [], type: [CardNodeView] },
        targetCanvas: { default: null, type: cc.Canvas },
        turnBackEndCount: { default: 0, type: cc.Integer },
        shuffleEndCount: { default: 0, type: cc.Integer },
        turnFrontEndCount: { default: 0, type: cc.Integer },
        gameResult: { default: null, type: GameResult },
        playButton: { default: null, type: cc.Button },
        timesTipPrefab: { default: null, type: cc.Prefab },
        gameCoupon: { default: null, type: GameCoupon },
    },

    onLoad() {
        let canvas = this.targetCanvas;
        let designResolution = canvas.designResolution
        var viewSize = cc.view.getFrameSize()
        if (viewSize.width / viewSize.height > designResolution.width / designResolution.height) {
            canvas.fitHeight = true;
            canvas.fitWidth = false;
        }
        else {
            canvas.fitHeight = false;
            canvas.fitWidth = true
        }

        this._createCards();

        Game.NotificationController.On(Game.Define.EVENT_KEY.CHANGE_GAMESTATE, this, this.onGameStateChange);
        this.node.runAction(cc.sequence([
            cc.delayTime(0.5),
            cc.callFunc(function () {
                this.cardNodeParent.removeComponent(cc.Layout);
                Game.GameController.ChangeState(Game.TurnDefine.GAME_STATE.STATE_IDLE);
            }, this)
        ]));
        this.playButton.interactable = false;
    },

    start() {
        // Game.AudioController.PlayMusic('Bg');
    },

    update(dt) {
    },

    onDestroy() {
        Game.NotificationController.Off(Game.Define.EVENT_KEY.CHANGE_GAMESTATE, this, this.onGameStateChange);
    },

    onGameStateChange(state) {
        if (state == Game.TurnDefine.GAME_STATE.STATE_IDLE) {
            this.playButton.interactable = true;
        } else {
            this.playButton.interactable = false;
        }
        switch (state) {
            case Game.TurnDefine.GAME_STATE.STATE_IDLE: {
                Game.GameController.RestartRound();
                this.gameResult.RestartRound();
                break;
            }
            case Game.TurnDefine.GAME_STATE.STATE_SHUFFLE: {
                this.shuffleEndCount = 0;
                for (let i = 0; i < this.cardNodes.length; i++) {
                    let cardNodeView = this.cardNodes[i];
                    cardNodeView.Shuffle(this._shuffleEndWhenShuffle.bind(this));
                }
                break;
            }
            case Game.TurnDefine.GAME_STATE.STATE_ENDING: {
                //剩余的都反过来吧
                Game.GameController.FillAllNumbers();
                this.turnFrontEndCount = 3;
                let index = 0;
                for (let i = 0; i < this.cardNodes.length; i++) {
                    let cardNodeView = this.cardNodes[i];
                    if (!cardNodeView.IsFront()) {
                        cardNodeView.Init(i, Game.GameController.allNumbers[i]);
                        cardNodeView.TurnFront(this._turnFrontEndWhenEnding.bind(this), true, index * 0.1);
                        index++;
                    }
                }
                //加数值咯
                this.gameCoupon.UpdateCoupon();
                let totalTime = Game.GameController.GetTotalTimes();
                if (totalTime > 0) {
                    Game.UserModel.AddCurGainCount(Game.GameController.GetTotalGain());
                    let node = cc.instantiate(this.timesTipPrefab);
                    let timesTip = node.getComponent('TimesTip');
                    this.node.addChild(node);
                    timesTip.Init(totalTime);
                }
                break;
            }
            case Game.TurnDefine.GAME_STATE.STATE_ENDED: {
                setTimeout(function () {
                    Game.GameController.ChangeState(Game.TurnDefine.GAME_STATE.STATE_IDLE);
                }, 1000);
            }
            default:
                break;
        }
    },
    onPlayClick(event) {
        this.turnBackEndCount = 0;
        Game.GameController.ChangeState(Game.TurnDefine.GAME_STATE.STATE_STARTING);
        for (let i = 0; i < this.cardNodes.length; i++) {
            let cardNodeView = this.cardNodes[i];
            cardNodeView.TurnBack(this._turnBackEndWhenIdle.bind(this), true, i * 0.1);
        }
        Game.NetWorkController.Send('msg.C2GW_StartTiger', { type: Game.GameController.selectIndex });
    },
    _createCards() {
        for (let i = 0; i < 12; i++) {
            let node = cc.instantiate(this.cardNodePrefab);
            this.cardNodeParent.addChild(node);
            let cardNodeView = node.getComponent('CardNodeView');
            this.cardNodes.push(cardNodeView);
            cardNodeView.Init(i, i % 4);
            cardNodeView.TurnFront(function () { }, false);
        }
    },
    _turnBackEndWhenIdle() {
        this.turnBackEndCount++;
        if (this.turnBackEndCount >= this.cardNodes.length) {
            Game.GameController.ChangeState(Game.TurnDefine.GAME_STATE.STATE_SHUFFLE);
        }
    },
    _shuffleEndWhenShuffle() {
        this.shuffleEndCount++;
        if (this.shuffleEndCount >= this.cardNodes.length) {
            Game.GameController.ChangeState(Game.TurnDefine.GAME_STATE.STATE_READY);
        }
    },
    _turnFrontEndWhenEnding() {
        this.turnFrontEndCount++;
        if (this.turnFrontEndCount >= this.cardNodes.length) {
            Game.GameController.ChangeState(Game.TurnDefine.GAME_STATE.STATE_ENDED);
        }
    }
});
