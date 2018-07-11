import Define from '../../Util/Define';
import GameComponent from '../GameComponent';
import Item from '../../Model/Item';
import NotificationController from '../../Controller/NotificationController';
import ResController from '../../Controller/ResController';

import PriceLabelView from './PriceLabelView';

cc.Class({
    extends: GameComponent,

    properties: {
        itemSpr: { default: null, type: cc.Sprite },
        selectedNode: { default: null, type: cc.Node },
        selected: { default: false, type: Boolean },
        countLabel: { default: null, type: cc.Label },
        nameLabel: { default: null, type: cc.Label },
        exchangeNode: { default: null, type: cc.Node },
        canExchange: { default: false, type: Boolean },
        itemInfo: { default: null, type: Object },
        itemConfig: { default: null, type: Object },
        exchangeAnima: { default: null, type: cc.Animation },
        priceLabelView: { default: null, type: PriceLabelView },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.selectedNode.active = false;
        this.itemSpr.node.active = false;
        this.countLabel.node.active = false;
        this.exchangeNode.active = false;
    },

    start() {
    },

    update(dt) {

    },

    onClickItem(event) {
        event.stopPropagationImmediate();
        if (this.itemInfo == null || this.itemInfo.id == null) {
            return;
        }
        if (!this.canExchange) {
            NotificationController.postNotification(Define.EVENT_KEY.TIP_TIPS, { text: '碎片数量不足,还不能兑换' });
            return;
        }
        if (this.isSelected()) {
            this.unselect();
        } else {
            this.select();
        }
        cc.systemEvent.dispatchEvent(new cc.Event.EventCustom(Define.EVENT_KEY.BAG_SELECTITEM));
    },

    isSelected() {
        return this.selected;
    },
    select() {
        if (this.itemInfo == null || this.itemInfo.id == null) {
            return;
        }
        if (!this.canExchange) {
            return;
        }
        this.selected = true;
        this.selectedNode.active = true;
    },
    unselect() {
        if (this.itemInfo == null || this.itemInfo.id == null) {
            return;
        }
        this.selected = false;
        this.selectedNode.active = false;
    },
    init(item) {
        if (item != null) {
            this.itemConfig = item;
            let info = Item.getItemById(item.Id);
            let itemCount = 0;

            this.countLabel.node.active = true;
            if (info != null && info.num > 0) {
                this.itemInfo = info;
                itemCount = info.num;
                if (info.num >= item.Exchange) {
                    //可以兑换了
                    this.exchangeNode.active = true;
                    this.canExchange = true;
                    this.exchangeAnima.play('exchange');
                }
                this.countLabel.string = itemCount + '/' + item.Exchange;
                this.priceLabelView.init(item.Price,Math.ceil(Item.calculatePrice(item)));
            } else {
                this.countLabel.string = '未获得';
                this.priceLabel.string = '';
            }
            if (item.Id) {
                this.nameLabel.string = item.Name;

                ResController.getSpriteFrameByName('Image/Icon/' + item.Id, function (err, res) {
                    if (err) {
                        console.log('[严重错误] 奖励资源加载错误 ' + err);
                    } else {
                        this.itemSpr.spriteFrame = res;
                        this.itemSpr.node.active = true;
                        if (this.itemInfo == null) {
                            this.itemSpr._sgNode.setState(1);
                        }
                    }
                }.bind(this));
            }
            this.updateBgs(info);
        }
    },
    updateBgs(info) {
    },
});
