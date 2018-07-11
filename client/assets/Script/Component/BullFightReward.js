import BullFightDefine from '../Util/BullFightDefine';
import Tools from '../Util/Tools';
import IdPool from '../Util/IdPool';
import ResController from '../Controller/ResController';

cc.Class({
    extends: cc.Component,

    properties: {
        rewardInfo: { default: null, type: cc.Object },
        itemSpr: { default: null, type: cc.Sprite },
        playingShake: { default: false, type: Boolean },
        originPos: { default: null, type: cc.v2 },
        uid: { default: 0, type: cc.Integer },
    },

    onLoad() {
        this.uid = IdPool.getId('BullFightReward');
    },

    start() {

    },

    update(dt) {
        if (this.playingShake) {
            let additionX = Tools.getRandomInt(-BullFightDefine.GAME_INIT.SHAKERADIUS, BullFightDefine.GAME_INIT.SHAKERADIUS);
            let additionY = Tools.getRandomInt(-BullFightDefine.GAME_INIT.SHAKERADIUS, BullFightDefine.GAME_INIT.SHAKERADIUS);
            this.node.x = this.originPos.x + additionX;
            this.node.y = this.originPos.y + additionY;
        }
    },
    init(config) {
        this.rewardInfo = config;
        ResController.getSpriteFrameByName('Image/Icon/' + config.Id, function (err, res) {
            if (err) {
                console.log('[严重错误] 奖励资源加载错误 ' + err);
            } else {
                this.itemSpr.spriteFrame = res;
            }
        }.bind(this));
    },
    playShake() {
        this.originPos = cc.v2(this.node.x, this.node.y);
        this.playingShake = true;
    },
    stopShake() {
        this.playingShake = false;
        this.node.position = this.originPos;
    },
});
