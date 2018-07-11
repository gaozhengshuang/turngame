import ResController from '../../Controller/ResController';
cc.Class({
    extends: cc.Component,

    properties: {
        itemSprite: { default: null, type: cc.Sprite }
    },

    onLoad() {
    },

    start() {
    },

    update(dt) { },

    init(name) {
        ResController.getSpriteFrameByName(name, function (err, res) {
            if (!err) {
                this.itemSprite.spriteFrame = res;
            }
        }.bind(this));
    }
});
