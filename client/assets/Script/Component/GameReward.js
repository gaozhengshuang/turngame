import Game from '../Game';
cc.Class({
    extends: cc.Component,

    properties: {
        goldSpriteFrame: { default: null, type: cc.SpriteFrame }
    },

    onLoad() {
    },

    start() {
    },

    update(dt) {
    },

    PlayDropGold(gainTimes, cb) {
        let times = Math.ceil(gainTimes / 9);
        for (let i = 0; i < times; i++) {
            let node = new cc.Node('Sprite');
            let sp = node.addComponent(cc.Sprite);
            sp.spriteFrame = this.goldSpriteFrame;
            this.node.addChild(node);
        }
        this.node.y = 640 + 1280 * times / 2;
        this.node.runAction(cc.sequence([
            cc.moveBy(times * 1, 0, -(1280 + 1280 * times)),
            cc.callFunc(function () {
                Game.ResController.DestoryAllChildren(this.node);
                Game.Tools.InvokeCallback(cb);
            }, this),
        ]));
    }
});
