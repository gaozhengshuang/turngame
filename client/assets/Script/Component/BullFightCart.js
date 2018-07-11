import BullFightDefine from '../Util/BullFightDefine';
import Tools from '../Util/Tools';
import IdPool from '../Util/IdPool';
import BullFightReward from './BullFightReward';

cc.Class({
    extends: cc.Component,

    properties: {
        rewardInfo: { default: null, type: cc.Object },
        cartSpr: { default: null, type: cc.Node },
        cartFrontSpr: { default: null, type: cc.Node },
        uid: { default: 0, type: cc.Integer },
        reward: { default: null, type: BullFightReward },
        nameLabel: { default: null, type: cc.Label },
        priceLabel: { default: null, type: cc.Label },
        shaderAnimation: { default: null, type: cc.Animation },
        cartAnimation: { default: null, type: cc.Animation },
    },

    onLoad() {
        this.uid = IdPool.getId('BullFightReward');
    },

    start() {

    },

    update(dt) {
    },
    init(config, posx, direction) {
        this.node.x = posx;
        this.rewardInfo = config;
        if (direction == BullFightDefine.REWARD_DIR.RIGHT) {
            this.cartSpr.scaleX = -1;
            // this.cartFrontSpr.scaleX = -1;
            // this.cartFrontSpr.x = -3;
        }
        this.reward.init(config);
        this.nameLabel.string = config.NameStr;
        this.priceLabel.string = '￥' + config.Price;
        if (config.Price >= 500) {
            // this.shaderAnimation.play('carShaderPurple');
            this.cartAnimation.play('cartGold');
        } else if (config.Price >= 100) {
            // this.shaderAnimation.play('carShaderYellow');
            this.cartAnimation.play('cartSilvery');
        }
    },
    hasReward() {
        return this.reward != null;
    },
    removeReward() {
        let reward = this.reward;
        this.reward.node.removeFromParent(false);
        this.reward = null;
        return reward;
    },

});
