cc.Class({
    extends: cc.Component,

    properties: {
        headSprite: { default: null, type: cc.Sprite },
        infoLabel: { default: null, type: cc.RichText },
    },

    fly(info, positiony) {
        this.node.active = false;
        cc.loader.load(info.face, function (err, texture) {
            if (err) {
                console.log('[严重错误] 头像加载错误 ' + err);
            } else {
                this.headSprite.spriteFrame = new cc.SpriteFrame(texture);
                //加载好了，播放吧
                this.node.active = true;
                this.node.x = 330 + this.node.width / 2;
                this.node.y = positiony;
                this.node.runAction(cc.sequence([
                    cc.moveBy(5, -(660 + this.node.width), 0),
                    cc.removeSelf(true),
                ]))
            }
        }.bind(this));
        this.infoLabel.string = info.text;
    },
});
