import Game from '../../Game';
import NumberSpriteView from './NumberSpriteView';
cc.Class({
    extends: cc.Component,

    properties: {
        numberSpriteView: { default: null, type: NumberSpriteView },
        backgroudNode: { default: null, type: cc.Node },
        frontNode: { default: null, type: cc.Node },
        value: { default: 0, type: cc.Integer },
        index: { default: 0, type: cc.Integer }
    },

    onLoad() {
    },

    start() {
    },

    update(dt) {
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
                    cc.scaleTo(0.5, 0, 1),
                    cc.callFunc(function () {
                        this.backgroudNode.active = false;
                        this.frontNode.active = true;
                    }, this),
                    cc.scaleTo(0.5, 1, 1),
                    cc.callFunc(function () {
                        Game.Tools.InvokeCallback(cb);
                    })
                ])
            );
        } else {
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
                    cc.scaleTo(0.5, 0, 1),
                    cc.callFunc(function () {
                        this.backgroudNode.active = true;
                        this.frontNode.active = false;
                    }, this),
                    cc.scaleTo(0.5, 1, 1),
                    cc.callFunc(function () {
                        Game.Tools.InvokeCallback(cb);
                    })
                ])
            );
        } else {
            this.backgroudNode.active = true;
            this.frontNode.active = false;
            Game.Tools.InvokeCallback(cb);
        }
    },

    onClickCard(event) {

    }
});
