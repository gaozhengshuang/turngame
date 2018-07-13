import Game from '../Game';
cc.Class({
    extends: cc.Component,

    properties: {
        couponLabel: { default: null, type: cc.Label },
        kSprite: { default: null, type: cc.Node }
    },

    onLoad() {
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATECOINS, this, this.onUpdateCoin);
        let info = Game.UserModel._calculateCoupon();
        this.onUpdateCoin(info.num, info.suffix);
    },

    start() {
    },

    update(dt) {
    },

    onDestroy() {
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATECOINS, this, this.onUpdateCoin);
    },
    onRechargeClick(event) {
        Game.Tools.InvokeCallback(window.OpenSystemRecharge)
    },
    onUpdateCoin(num, suffix) {
        this.couponLabel.string = num;
        this.kSprite.active = (suffix != '');
    }
});
