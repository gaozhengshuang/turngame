import Game from '../Game';
cc.Class({
    extends: cc.Component,

    properties: {
        couponLabel: { default: null, type: cc.Label },
        kSprite: { default: null, type: cc.Node }
    },

    onLoad() {
        // Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATECOINS, this, this.onUpdateCoin);
        this.UpdateCoupon();
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
    UpdateCoupon() {
        let info = Game.UserModel._calculateCoupon();
        this.couponLabel.string = info.num;
        this.kSprite.active = (info.suffix != '');
    }

    // onUpdateCoin(info) {
    //     this.couponLabel.string = info.num;
    //     this.kSprite.active = (info.suffix != '');
    // }
});
