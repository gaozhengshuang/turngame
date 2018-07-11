import _ from 'lodash';

import Define from '../Util/Define';
import Platfrom from '../Util/Platform';
import BullFightDefine from '../Util/BullFightDefine';
import Tools from '../Util/Tools';

import NetWorkController from '../Controller/NetWorkController';
import NotificationController from '../Controller/NotificationController';

var GameController = function () {
    this.score = 0;
    this.state = BullFightDefine.GAME_STATE.STATE_PREPARING;
    this.hitRewards = [];       //拉回来的奖励 
    this.gainRewards = [];      //真的能获得的奖励
    this.flyingTargetPosY = 0;
    this.recoveryTargetPosY = 0;
    this.totalLoading = 0;
    this.loaded = 0;
    this.round = 0;
    this.nextCost = Platfrom.FIGHT_COST;
    this.rewardTipInfo = null;
}

GameController.prototype.init = function (cb) {
    NetWorkController.addListener('msg.GW2C_MsgNotice', this.onGW2C_MsgNotice.bind(this));
    NetWorkController.addListener('msg.GW2C_MsgNotify', this.onGW2C_MsgNotify.bind(this));
    NetWorkController.addListener('msg.GW2C_HitTarget', this.onGW2C_HitTarget.bind(this));
    NetWorkController.addListener('msg.GW2C_FreeThrow', this.onGW2C_FreeThrow.bind(this));
    Tools.invokeCallback(cb, null);
}

GameController.prototype.RestartRound = function () {
    this.round++;
    this.hitRewards = [];
    this.gainRewards = [];
}

GameController.prototype.ChangeState = function (state) {
    if (this.state == state) {
        return;
    }
    this.state = state;
    if (state == BullFightDefine.GAME_STATE.STATE_END) {
        this.nextCost = Platfrom.FIGHT_COST;
    }
    let event = new cc.Event.EventCustom(Define.EVENT_KEY.CHANGE_GAMESTATE);
    event.detail = { state: state };
    cc.systemEvent.dispatchEvent(event);
}


GameController.prototype.LoadedComplete = function () {
    this.loaded += 1;
}

GameController.prototype.onGW2C_MsgNotice = function (msgid, data) {
    NotificationController.postNotification(Define.EVENT_KEY.TIP_BARRAGE, data);
}

GameController.prototype.onGW2C_MsgNotify = function (msgid, data) {
    NotificationController.postNotification(Define.EVENT_KEY.TIP_TIPS, data);
}

GameController.prototype.onGW2C_HitTarget = function (msgid, data) {
    this.gainRewards = data.itemid || [];
};


GameController.prototype.onGW2C_FreeThrow = function (msgid, data) {
    console.log(data);
    this.nextCost = data.cost;
    NotificationController.postNotification(Define.EVENT_KEY.CHANGE_COSTSTRING, data.cost);
}
module.exports = new GameController();