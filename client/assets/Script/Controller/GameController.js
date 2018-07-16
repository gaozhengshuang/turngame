import _ from 'lodash';

import Define from '../Util/Define';
import TurnGameDefine from '../Util/TurnGameDefine';
import Tools from '../Util/Tools';

import NotificationController from '../Controller/NotificationController';
import NetWorkController from '../Controller/NetWorkController';
const AllNumbers = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3];

var GameController = function () {
    this.state = TurnGameDefine.GAME_STATE.STATE_PREPARING;
    this.numbers = [];
    this.turnCount = 0;
    this.clickInfo = [];
    this.allNumbers = null;
    this.startComplete = false;
}

GameController.prototype.Init = function (cb) {
    NetWorkController.AddListener('msg.GW2C_GameResult', this, this.onGW2C_GameResult);
    NetWorkController.AddListener('msg.GW2C_MsgNotice', this, this.onGW2C_MsgNotice);
    NetWorkController.AddListener('msg.GW2C_MsgNotify', this, this.onGW2C_MsgNotify);
    Tools.InvokeCallback(cb, null);
}
GameController.prototype.RestartRound = function () {
    this.numbers = [];
    this.turnCount = 0;
    this.clickInfo = [];
    this.allNumbers = _.cloneDeep(AllNumbers);
    this.startComplete = false;
}
GameController.prototype.ChangeState = function (state) {
    if (this.state == state) {
        return;
    }
    this.state = state;
    NotificationController.Emit(Define.EVENT_KEY.CHANGE_GAMESTATE, state);
}
GameController.prototype.InsertArrayValue = function (index, value, pos) {
    this.clickInfo.push({ index, value, pos });
    this.numbers.push(value);
    //将被命运选中的数字移出所有数字的数组
    _.pullAt(this.allNumbers, [_.indexOf(this.allNumbers, value)]);
}
GameController.prototype.FillAllNumbers = function () {
    //都选完了，填充好整个数组吧
    this.allNumbers = _.shuffle(this.allNumbers);
    //倒序插入
    this.clickInfo = _.sortBy(this.clickInfo, function (n) {
        return n.index;
    });
    for (let i = 0; i < this.clickInfo.length; i++) {
        let info = this.clickInfo[i];
        this.allNumbers.splice(parseInt(info.index), 0, info.value);
    }
}
GameController.prototype.GetTotalTimes = function () {
    let result = 1;
    for (let i = 0; i < this.numbers.length; i++) {
        result *= this.numbers[i];
    }
    return result;
}

GameController.prototype.onGW2C_GameResult = function (msgid, data) {
    this.startComplete = true;

    // for (let i = 0; i < data.nums.length; i++) {
    //     this.numbers.push(data.nums[i]);
    // }
    // //将被命运选中的数字移出所有数字的数组
    // for (let i = 0; i < this.numbers.length; i++) {
    //     _.pullAt(this.allNumbers, [_.indexOf(this.allNumbers, this.numbers[i])]);
    // }
}
GameController.prototype.onGW2C_MsgNotice = function (msgid, data) {
    NotificationController.Emit(Define.EVENT_KEY.TIP_BARRAGE, data);
}

GameController.prototype.onGW2C_MsgNotify = function (msgid, data) {
    NotificationController.Emit(Define.EVENT_KEY.TIP_TIPS, data);
}

module.exports = new GameController();