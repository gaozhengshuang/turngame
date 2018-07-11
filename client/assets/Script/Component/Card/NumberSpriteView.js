import Game from '../../Game';
cc.Class({
    extends: cc.Component,

    properties: {
        numberSprite: { default: null, type: cc.Sprite },
        numberSpriteFrames: { default: [], type: [cc.SpriteFrame] },
        value: { default: 0, type: cc.Integer },
    },

    onLoad() {
    },

    start() {
    },

    update(dt) {
    },

    Init(value) {
        this.value = value;
        this.numberSprite.spriteFrame = this.numberSpriteFrames[value];
    }
}); 
