import Tools from '../Util/Tools';

var NotificationController = function () {
    this.notifiEvent = [];
}

NotificationController.prototype.init = function (cb) {
    Tools.invokeCallback(cb, null);
};

NotificationController.prototype.addNotification = function (event, func) {
    var _func = function (event) {
        if (event.detail != "" || event.detail != null) {
            func(event.detail);
        } else {
            func();
        }
    }
    this.notifiEvent.push({ event: event, func: func, _func: _func });

    cc.systemEvent.on(event, _func);
};

NotificationController.prototype.removeNotification = function (event, func) {
    for (i = 0; i < this.notifiEvent.length; i++) {
        var notifi = this.notifiEvent[i];
        if (notifi.event == event && notifi.func == func) {
            cc.systemEvent.off(event, notifi._func);
            break;
        }
    }
}

NotificationController.prototype.postNotification = function (event, data) {
    let eventCustom = new cc.Event.EventCustom(event);
    if (data != null) {
        eventCustom.detail = data;
    }
    cc.systemEvent.dispatchEvent(eventCustom);
};

module.exports = new NotificationController();