import BullFightDefine from '../../Util/BullFightDefine';
import ResController from '../../Controller/ResController';
cc.Class({
    extends: cc.Component,

    properties: {
        nameLabel: { default: null, type: cc.Label },
        bgSprite: { default: null, type: cc.Sprite },
    },

    fly(info, result, flytime = 5) {
        this.nameLabel.string = info;
        let resName = result == BullFightDefine.GAME_RESULT.RESULT_MISS ? 'Image/Notice/sb' : 'Image/Notice/cg';
        ResController.getSpriteFrameByName(resName, function (err, res) {
            if (err) {
                return;
            } else {
                this.bgSprite.spriteFrame = res;
            }
        }.bind(this));
        // this.node.x = cc.view.getFrameSize().width / 2 + 100;
        this.node.scaleX = 0;
        this.node.scaleY = 0;
        this.node.runAction(cc.sequence([
            // cc.moveBy(flytime, -(cc.view.getFrameSize().width + 700), 0),
            cc.scaleTo(0.15, 1.2, 1.2),
            cc.scaleTo(0.04, 0.9, 0.9),
            cc.scaleTo(0.04, 1, 1),
            cc.delayTime(1),
            cc.fadeTo(0.5, 0),
            cc.removeSelf()
        ]));
    },
});
