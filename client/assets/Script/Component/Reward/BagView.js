import _ from 'lodash';

import ConfigController from '../../Controller/ConfigController';
import NetWorkController from '../../Controller/NetWorkController';
import NotificationController from '../../Controller/NotificationController';
import ResController from '../../Controller/ResController';

import User from '../../Model/User';
import Item from '../../Model/Item';
import Tools from '../../Util/Tools';
import Define from '../../Util/Define';

import BagItemGroup from './BagItemGroup';
import GameComponent from '../GameComponent';

cc.Class({
    extends: GameComponent,

    properties: {
        bagItemGroupPrefab: { default: null, type: cc.Prefab },
        bagItemGroupParent: { default: null, type: cc.Node },
        bagItemGroups: { default: [], type: [BagItemGroup] },
        selectCountLabel: { default: null, type: cc.Label },
        itemCount: { default: 0, type: cc.Integer },
        selectAllTagNode: { default: null, type: cc.Node },
        itemConfgs: { default: [], type: [Object] },
        tipLabel: { default: null, type: cc.Label },
        closeFunc: { default: null, type: Function },
        changeTabFunc: { default: null, type: Function },
        inputPhoneViewPrefab: { default: null, type: cc.Prefab },
        itemScrollView: { default: null, type: cc.ScrollView },
        priceLabel: { default: null, type: cc.Label },
        priceNode: { default: null, type: cc.Node },
        scrollItemIndex: { default: 0, type: cc.Integer },
        scrollItemInfos: { default: [], type: Array },
        intervalId: { default: null, type: Object },
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        cc.systemEvent.on(Define.EVENT_KEY.BAG_SELECTITEM, this.onBagSelectItem, this);

        this.updateItems = this.onUpdateItems.bind(this);
        NotificationController.addNotification(Define.EVENT_KEY.USERINFO_UPDATEITEMS, this.updateItems);
    },

    start() {
        this.itemConfgs = ConfigController.GetConfig('ItemBaseData');
        // this.priceNode.runAction(cc.repeatForever(cc.sequence([
        //     cc.spawn([
        //         cc.scaleTo(1, 1.1),
        //         cc.fadeTo(1, 255),
        //     ]),
        //     cc.spawn([
        //         cc.scaleTo(1, 1),
        //         cc.fadeTo(1, 180),
        //     ])
        // ])));
    },

    update(dt) {

    },

    onDestroy() {
        cc.systemEvent.off(Define.EVENT_KEY.BAG_SELECTITEM, this.onBagSelectItem, this);

        NotificationController.removeNotification(Define.EVENT_KEY.USERINFO_UPDATEITEMS, this.updateItems);
        this._clearInterval();
    },

    init(closeFunc, changeTabFunc) {
        this.closeFunc = closeFunc;
        this.changeTabFunc = changeTabFunc;
        this.onUpdateItems();
    },

    onBagSelectItem(isSelect) {
        let selectedItems = [];
        for (let i = 0; i < this.bagItemGroups.length; i++) {
            selectedItems = _.concat(selectedItems, this.bagItemGroups[i].getSelectedItems());
        }
        this.selectCountLabel.string = '(' + selectedItems.length + ')';
        if (selectedItems.length == this.itemCount && selectedItems.length > 0) {
            this.selectAllTagNode.active = true;
        } else {
            this.selectAllTagNode.active = false;
        }
        if (_.isBoolean(isSelect) && isSelect) {
            if (selectedItems.length > 0) {
                NotificationController.postNotification(Define.EVENT_KEY.TIP_TIPS, { text: '已选中所有商品，请提取' });
            } else {
                NotificationController.postNotification(Define.EVENT_KEY.TIP_TIPS, { text: '您还没有可兑换的商品' });
            }
        }
    },

    onCloseBagView() {
        Tools.invokeCallback(this.closeFunc);
    },

    onSelectAll() {
        let isSelect = false;
        for (let i = 0; i < this.bagItemGroups.length; i++) {
            if (this.selectAllTagNode.active) {
                this.bagItemGroups[i].unselectAll();
            } else {
                this.bagItemGroups[i].selectAll();
                isSelect = true;
            }
        }
        this.onBagSelectItem(isSelect);
    },

    onApplyForMail() {
        //申请邮寄 下面的代码是获得所有选中的物品
        let selectedItems = [];
        for (let i = 0; i < this.bagItemGroups.length; i++) {
            selectedItems = _.concat(selectedItems, this.bagItemGroups[i].getSelectedItems());
        }

        let virtualList = [];
        let entityList = [];
        let diamondList = [];
        for (let i = 0; i < selectedItems.length; i++) {
            let itemInfo = selectedItems[i];
            let deliveryGoods = { itemid: itemInfo.id, num: itemInfo.num };
            switch (Item.getItemType(itemInfo.id)) {
                case Define.ITEM_TYPE.TYPE_VIRTUAL: {
                    virtualList.push(deliveryGoods);
                    break;
                }
                case Define.ITEM_TYPE.TYPE_ENTITY: {
                    entityList.push(deliveryGoods);
                    break;
                }
                case Define.ITEM_TYPE.TYPE_DIAMOND: {
                    diamondList.push(deliveryGoods);
                    break;
                }
                default:
                    break;
            }
        }

        if (virtualList.length == 0 && entityList.length == 0 && diamondList.length == 0) {
            this.showTips({ text: '请选择需要邮寄的物品' });
            return;
        }
        if (virtualList.length > 0) {
            let node = cc.instantiate(this.inputPhoneViewPrefab);
            node.parent = this.node.parent;
            let inputPhoneView = node.getComponent('InputPhoneView');
            inputPhoneView.init(this.onExchange.bind(this, virtualList, entityList, diamondList));
        }
        else {
            this.onExchange(virtualList, entityList, diamondList);
        }
    },

    onExchange(virtualList, entityList, diamondList, phone) {
        //确认兑换
        User.getTvmToken(function (token) {
            if (virtualList.length > 0) {
                NetWorkController.send('msg.C2GW_ReqDeliveryGoods', { list: virtualList, token: token, phone: phone });
            }
            if (entityList.length > 0) {
                NetWorkController.send('msg.C2GW_ReqDeliveryGoods', { list: entityList, token: token });
            }
            if (diamondList.length > 0) {
                NetWorkController.send('msg.C2GW_ReqDeliveryDiamond', { list: diamondList, token: token });
            }
        });
    },

    onPersonalInfo() {
        //个人信息
        Tools.invokeCallback(this.changeTabFunc);
    },

    onUpdateItems() {
        this.selectCountLabel.string = '(0)';
        this.selectAllTagNode.active = false;
        this.bagItemGroups = [];
        ResController.destoryAllChildren(this.bagItemGroupParent);
        //更新数据
        this.scrollItemInfos = Item.getOwnerItems();
        this.itemCount = Item.getExchangeItemCount();
        this.scrollItemIndex = 0;
        // if (infoList.length < 16) {
        //     //补充到16个
        //     infoList = _.concat(infoList, _.fill(Array(16 - infoList.length), {}));
        // }
        // let grouplength = Math.ceil(infoList.length / 4.0);
        // for (let i = 0; i < grouplength; i++) {
        //     let subInfoList = infoList.slice(i * 4, (i * 4) + 4);
        //     let bagItemGroupNode = cc.instantiate(this.bagItemGroupPrefab);
        //     bagItemGroupNode.parent = this.bagItemGroupParent;
        //     let bagItemGroup = bagItemGroupNode.getComponent('BagItemGroup');
        //     bagItemGroup.init(subInfoList);
        //     this.bagItemGroups.push(bagItemGroup);
        // }

        this.intervalId = setInterval(this._createScrollItem.bind(this), 30);
        this.bagItemGroupParent.height = 130 * this.scrollItemInfos.length;
        // for (let i = 0; i < infoList.length; i++) {
        //     let bagItemGroupNode = cc.instantiate(this.bagItemGroupPrefab);
        //     bagItemGroupNode.parent = this.bagItemGroupParent;
        //     let bagItemGroup = bagItemGroupNode.getComponent('BagItemGroup');
        //     bagItemGroup.init([infoList[i]]);
        //     this.bagItemGroups.push(bagItemGroup);
        // }
        this.itemScrollView.scrollToTop();
    },

    _createScrollItem() {
        let info = this.scrollItemInfos[this.scrollItemIndex];
        if (info) {
            let bagItemGroupNode = cc.instantiate(this.bagItemGroupPrefab);
            bagItemGroupNode.parent = this.bagItemGroupParent;
            let bagItemGroup = bagItemGroupNode.getComponent('BagItemGroup');
            bagItemGroup.init([info]);
            this.bagItemGroups.push(bagItemGroup);
        }
        this.scrollItemIndex++;
        if (this.scrollItemIndex >= this.scrollItemInfos.length) {
            this._clearInterval();
        }
    },
    _clearInterval() {
        if (this.intervalId != null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
});
