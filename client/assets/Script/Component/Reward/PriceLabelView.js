import _ from 'lodash';
import Define from '../../Util/Define';
import Tools from '../../Util/Tools';

import GameComponent from '../GameComponent';
cc.Class({
    extends: GameComponent,

    properties: {
        totalPriceShadowLabel: { default: null, type: cc.Label },
        totalPriceLabel: { default: null, type: cc.Label },
        containPriceShadowLabel: { default: null, type: cc.Label },
        containPriceLabel: { default: null, type: cc.Label },
    },

    onLoad() {
    },

    start() {

    },

    update(dt) {

    },
    init(totalPrice, containPrice) {
        this.totalPriceShadowLabel.string = totalPrice;
        this.totalPriceLabel.string = totalPrice;
        this.containPriceShadowLabel.string = containPrice;
        this.containPriceLabel.string = containPrice;
    }
});
