import Item from '../Model/Item';
import ResController from '../Controller/ResController';
import GameController from '../Controller/GameController';
cc.Class({
    extends: cc.Component,

    properties: {
        iconSpr: { default: null, type: cc.Sprite },
        tipLabel: { default: null, type: cc.Label },
        tipAnima: { default: null, type: cc.Animation }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {

    },

    update(dt) { },

    init() {
        this.node.active = false;
    },

    RestartRound() {
        let info = Item.getCanExchangeSoon();
        GameController.rewardTipInfo = info;
        if (info == null) {
            if (this.node.active) {
                this.node.stopAllActions();
                this.node.active = false;
            }
        } else {
            if (!this.node.active) {
                this.node.active = true;
                this.tipAnima.play('rewardTip');
                this.node.runAction(cc.repeatForever(cc.sequence([
                    cc.spawn([
                        cc.scaleTo(0.5, 0.8),
                        cc.fadeTo(0.5, 150),
                    ]),
                    cc.spawn([
                        cc.scaleTo(0.5, 1),
                        cc.fadeTo(0.5, 255),
                    ])
                ])));
            }
            ResController.getSpriteFrameByName('Image/Icon/' + info.item.Id, function (err, res) {
                if (err) {
                    console.log('[严重错误] 奖励资源加载错误 ' + err);
                } else {
                    this.iconSpr.spriteFrame = res;
                }
            }.bind(this));
            this.tipLabel.string = '还差' + info.last + '个可兑换';
        }
    }
});
