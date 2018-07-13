import Game from '../../Game';
import NumberSpriteView from './NumberSpriteView';
const HalfTurnTime = 0.2;
cc.Class({
    extends: cc.Component,

    properties: {
        numberSpriteView: { default: null, type: NumberSpriteView },
        backgroudNode: { default: null, type: cc.Node },
        frontNode: { default: null, type: cc.Node },
        value: { default: 0, type: cc.Integer },
        index: { default: 0, type: cc.Integer },
        isFront: { default: [], type: cc.Boolean },
    },

    onLoad() {
        Game.NetWorkController.AddListener('msg.GW2C_AckTakeCardRet', this, this.onGW2C_AckTakeCardRet);
    },

    start() {
    },

    update(dt) {
    },

    onDestroy() {
        Game.NetWorkController.RemoveListener('msg.GW2C_AckTakeCardRet', this, this.onGW2C_AckTakeCardRet);
    },

    Init(index, value) {
        this.index = index;
        this.value = value;
        this.numberSpriteView.Init(value);
    },
    TurnFront(cb, withAnima = false, delay = 0.1) {
        if (withAnima) {
            this.backgroudNode.active = true;
            this.frontNode.active = false;
            this.node.runAction(
                cc.sequence([
                    cc.delayTime(delay),
                    cc.scaleTo(HalfTurnTime, 0, 1),
                    cc.callFunc(function () {
                        this.backgroudNode.active = false;
                        this.frontNode.active = true;
                    }, this),
                    cc.scaleTo(HalfTurnTime, 1, 1),
                    cc.callFunc(function () {
                        this.isFront = true;
                        Game.Tools.InvokeCallback(cb);
                    }.bind(this))
                ])
            );
        } else {
            this.isFront = true;
            this.backgroudNode.active = false;
            this.frontNode.active = true;
            Game.Tools.InvokeCallback(cb);
        }
    },
    TurnBack(cb, withAnima = false, delay = 0.1) {
        if (withAnima) {
            this.backgroudNode.active = false;
            this.frontNode.active = true;
            this.node.runAction(
                cc.sequence([
                    cc.delayTime(delay),
                    cc.scaleTo(HalfTurnTime, 0, 1),
                    cc.callFunc(function () {
                        this.backgroudNode.active = true;
                        this.frontNode.active = false;
                    }, this),
                    cc.scaleTo(HalfTurnTime, 1, 1),
                    cc.callFunc(function () {
                        this.isFront = false;
                        Game.Tools.InvokeCallback(cb);
                    }.bind(this))
                ])
            );
        } else {
            this.isFront = false;
            this.backgroudNode.active = true;
            this.frontNode.active = false;
            Game.Tools.InvokeCallback(cb);
        }
    },
    Shuffle(cb) {
        let oldPos = new cc.Vec2(this.node.x, this.node.y);
        this.node.runAction(cc.repeatForever(
            cc.sequence([
                cc.moveTo(0.5, 0, 0),
                cc.moveTo(0.5, oldPos),
                cc.callFunc(function () {
                    if (Game.GameController.numbers.length >= 3) {
                        //可以停了
                        this.node.stopAllActions();
                        Game.Tools.InvokeCallback(cb);
                    }
                }.bind(this))
            ])
        ));
    },
    IsFront() {
        return this.isFront;
    },
    InitHistoryInfo(value) {
        this.value = value;
        Game.GameController.InsertArrayValue(this.index, this.value, this.node.parent.convertToWorldSpaceAR(this.node.position));
        this.TurnFront(function () { });
    },

    onClickCard(event) {
        if (Game.GameController.state != Game.TurnDefine.GAME_STATE.STATE_READY) {
            return;
        }
        Game.NetWorkController.Send('msg.C2GW_ReqTakeCard', { pos: this.index + 1 });
    },

    onGW2C_AckTakeCardRet(msgid, data) {
        if (Game.GameController.state != Game.TurnDefine.GAME_STATE.STATE_READY) {
            return;
        }
        if (this.index + 1 == data.pos) {
            //就是我自己
            this.value = data.num;
            this.numberSpriteView.Init(this.value);
            Game.GameController.InsertArrayValue(this.index, this.value, this.node.parent.convertToWorldSpaceAR(this.node.position));
            this.TurnFront(this._turnFrontEndWhenClick.bind(this), true);
            Game.GameController.ChangeState(Game.TurnDefine.GAME_STATE.STATE_TURNFRONT);
            Game.GameController.turnCount++;
        }
    },

    _turnFrontEndWhenClick() {
        if (this.value == 0) {
            Game.GameController.ChangeState(Game.TurnDefine.GAME_STATE.STATE_ENDING);
        }
        if (Game.GameController.turnCount >= 3) {
            Game.GameController.ChangeState(Game.TurnDefine.GAME_STATE.STATE_ENDING);
        } else {
            Game.GameController.ChangeState(Game.TurnDefine.GAME_STATE.STATE_READY);
        }
    }
});
