import Game from '../Game';
cc.Class({
    extends: cc.Component,

    properties: {
        couponLabel: { default: null, type: cc.Label },
        kSprite: { default: null, type: cc.Node }
    },

    onLoad() {
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATECOINS, this, this.onUpdateCoin);
        this.onUpdateCoin();
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
    onUpdateCoin() {
        let currency = Game.UserModel.GetCostCurrency();
        let info = Game.Tools.CalculateCouponStr(currency);
        this.couponLabel.string = info.num;
        this.kSprite.active = (info.suffix != '');
    }
});
