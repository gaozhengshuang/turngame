import Tools from '../../Util/Tools';

var GameComponent = require('../GameComponent');
cc.Class({
    extends: GameComponent,

    properties: {
        clickFunc: { default: null, type: Function },
        phoneLabel: { default: null, type: cc.Label },
        phone: { default: '', type: String }
    },

    onLoad() {

    },

    start() {

    },

    update(dt) {

    },
    init(phone, clickFunc) {
        this.phone = phone;
        this.clickFunc = clickFunc;
        this.phoneLabel.string = phone;
    },

    onItemClick(event) {
        Tools.invokeCallback(this.clickFunc, this.phone);
    }
});
