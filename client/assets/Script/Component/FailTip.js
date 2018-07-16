import Game from '../Game';
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
    },

    start() {
    },

    update(dt) {
    },
    Init(cb) {
        this.node.scale = 0;
        //开始播动画吧
        this.node.runAction(cc.sequence([
            cc.spawn([
                cc.moveBy(1.4, 0, 250).easing(new cc.easeOut(3)),
                cc.sequence([
                    cc.scaleTo(0.8, 1.2, 1.2).easing(new cc.easeIn(3)),
                    cc.scaleTo(0.1, 0.9, 0.9),
                    cc.scaleTo(0.1, 1, 1),
                    cc.fadeOut(0.4)
                ])
            ]),
            cc.callFunc(function () {
                Game.Tools.InvokeCallback(cb);
            }),
            cc.removeSelf(),
        ]));
    }
});
