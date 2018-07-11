import _ from 'lodash';

import Define from '../Util/Define';
import Tools from '../Util/Tools';
import ConfigController from '../Controller/ConfigController';
import NetWorkController from '../Controller/NetWorkController';
import NotificationController from '../Controller/NotificationController';

let VirtualTypes = [2, 5, 6];
let DiamondTypes = [10];

var ItemModel = function () {
    this.items = {};

    this.tcartConfigs = [];
    this.itemConfigs = [];
    this.maxExchange = 0;
}

ItemModel.prototype.init = function (cb) {
    let tcartConfigs = ConfigController.GetConfig('TCart');
    this.itemConfigs = ConfigController.GetConfig('ItemBaseData');
    for (let i = 0; i < tcartConfigs.length; i++) {
        let tcart = tcartConfigs[i];
        let item = _.find(this.itemConfigs, { Id: tcart.Id });
        this.tcartConfigs.push(_.merge(_.cloneDeep(tcart), _.cloneDeep(item)));
        if (tcart.Exchange > this.maxExchange) {
            this.maxExchange = tcart.Exchange;
        }
    }
    NetWorkController.addListener('msg.GW2C_SendUserInfo', this.onGW2C_SendUserInfo.bind(this));
    NetWorkController.addListener('msg.GW2C_AddPackageItem', this.onGW2C_AddPackageItem.bind(this));
    NetWorkController.addListener('msg.GW2C_RemovePackageItem', this.onGW2C_RemovePackageItem.bind(this));
    Tools.invokeCallback(cb);
}
/**
 * 消息处理接口
 */


ItemModel.prototype.onGW2C_SendUserInfo = function (msgid, data) {
    this.items = Tools.getValueInObj(data, 'item.items') || [];
    this.sortItem();
    cc.systemEvent.dispatchEvent(new cc.Event.EventCustom(Define.EVENT_KEY.CONNECT_TO_GATESERVER));
}

ItemModel.prototype.onGW2C_AddPackageItem = function (msgid, data) {
    let index = _.findIndex(this.items, { id: data.itemid });
    if (index == -1) {
        this.items.push({ id: data.itemid, num: data.num });
    } else {
        let item = this.items[index];
        item.num += data.num;
    }
    this.sortItem();
    NotificationController.postNotification(Define.EVENT_KEY.USERINFO_UPDATEITEMS);
}
ItemModel.prototype.onGW2C_RemovePackageItem = function (msgid, data) {
    let index = _.findIndex(this.items, { id: data.itemid });
    if (index == -1) {
        console.log('[严重错误] 玩家物品数据缺失 ' + data.itemid);
    } else {
        let item = this.items[index];
        item.num -= data.num;
        if (item.num <= 0) {
            this.items.splice(index, 1);
        }
    }
    this.sortItem();
    NotificationController.postNotification(Define.EVENT_KEY.USERINFO_UPDATEITEMS);
}

ItemModel.prototype.sortItem = function () {
    this.tcartConfigs = _.sortBy(this.tcartConfigs, this.compareFunc.bind(this));
}

ItemModel.prototype.compareFunc = function (o) {
    let lastNum = o.Exchange == 1 ? 0 : o.Exchange;
    let info = this.getItemById(o.Id);
    if (info && info.num) {
        if (info.num >= o.Exchange) {
            //可以兑换了
            lastNum = - o.ItemValue;
        } else if (info.num == 0) {
            lastNum = this.maxExchange;
        } else {
            lastNum = o.Exchange - info.num;
        }
    } else {
        lastNum = this.maxExchange;
    }
    return lastNum;
}
/**
 * 对外接口
 */

ItemModel.prototype.getItemById = function (id) {
    return _.find(this.items, { id: id });
}

ItemModel.prototype.getConfigById = function (id) {
    return _.find(this.tcartConfigs, { Id: id });
}

ItemModel.prototype.getOwnerItems = function () {
    let result = [];
    for (let i = 0; i < this.tcartConfigs.length; i++) {
        let config = this.tcartConfigs[i];
        let info = this.getItemById(config.Id);
        if (info && info.num > 0) {
            result.push(_.cloneDeep(config));
        }
    }
    return result;
}

ItemModel.prototype.getExchangeItemCount = function () {
    let count = 0;
    for (let i = 0; i < this.tcartConfigs.length; i++) {
        let config = this.tcartConfigs[i];
        let info = this.getItemById(config.Id);
        if (info && info.num) {
            if (info.num >= config.Exchange) {
                //可以兑换了
                count++;
            }
        }
    }
    return count;
}

ItemModel.prototype.getCanExchangeSoon = function () {
    let ret = null;
    let retList = [];
    for (let i = 0; i < this.items.length; i++) {
        let item = this.items[i];
        let config = this.getConfigById(item.id);
        if (config.Exchange > 1) {
            let diff = config.Exchange - (item.num % config.Exchange);
            if (diff / config.Exchange <= 0.5) {
                //快要可以兑换了
                retList.push({
                    item: _.cloneDeep(config),
                    last: diff
                });
            }
        }
    }
    if (retList.length <= 0) {
        return null;
    }
    return retList[Tools.getRandomInt(0, retList.length)];
}

ItemModel.prototype.calculatePrice = function (config) {
    let info = this.getItemById(config.Id);
    if (info && info.num) {
        return config.Id == 10002 ? (config.Price * info.num) : (config.Price * info.num / config.Exchange);
    }
    return 0;
}

ItemModel.prototype.getItemType = function (id) {
    let config = this.getConfigById(id);
    if (config) {
        if (_.indexOf(VirtualTypes, config.Type) != -1) {
            return Define.ITEM_TYPE.TYPE_VIRTUAL;
        } else if (_.indexOf(DiamondTypes, config.Type) != -1) {
            return Define.ITEM_TYPE.TYPE_DIAMOND;
        }
        return Define.ITEM_TYPE.TYPE_ENTITY;
    }
    return Define.ITEM_TYPE.TYPE_NONE;
}

module.exports = new ItemModel();
