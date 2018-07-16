
cc.Class({
    extends: cc.Component,

    properties: {
        infoLabel: { default: null, type: cc.Label },
    },

    flap(info, alive, delay = 0) {
        this.infoLabel.string = info;
        this.node.runAction(cc.sequence([
            cc.hide(),
            cc.delayTime(delay == null ? 0.1 : delay),
            cc.show(),
            cc.spawn([
                cc.moveTo(alive, cc.p(this.node.x, this.node.y + 150)),
                cc.fadeTo(alive, 0),
            ]),
            cc.removeSelf()
        ]));
    },
});
