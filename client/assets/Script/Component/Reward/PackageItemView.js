import ResController from '../../Controller/ResController';

cc.Class({
    extends: cc.Component,

    properties: {
        itemSpr: { default: null, type: cc.Sprite },
        nameLabel: { default: null, type: cc.Label },
        countLabel: { default: null, type: cc.Label },
        timeLabel: { default: null, type: cc.Label },
    },

    onLoad() {
        this.nameLabel.string = '';
        this.countLabel.string = '';
        this.timeLabel.string = '';
    },

    start() {

    },

    update(dt) {

    },
    init(info) {
        this.nameLabel.string = info.itemname;
        this.countLabel.string = '数量:' + info.count;
        this.timeLabel.string = '下单时间:' + info.time;
        ResController.getSpriteFrameByName('Image/Icon/' + info.itemid, function (err, res) {
            if (err) {
                console.log('[严重错误] 奖励资源加载错误 ' + err);
            } else {
                this.itemSpr.spriteFrame = res;
            }
        }.bind(this));
    }
});
