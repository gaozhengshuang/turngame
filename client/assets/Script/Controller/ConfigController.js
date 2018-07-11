import Define from '../Util/Define';
import Tools from '../Util/Tools';


var ConfigController = function () {
    this.configs = {};
}

ConfigController.prototype.init = function (cb) {
    cc.loader.loadResDir('Json/', function (err, datas) {
        if (err) {
            Tools.invokeCallback(cb, err);
            return;
        }
        for (let i = 0; i < datas.length; i++) {
            let data = datas[i];
            delete data.Tool;
            delete data.Version;
            for (let j in data) {
                this.configs[j] = data[j];
            }
        }
        Tools.invokeCallback(cb, null);

    }.bind(this))
};

ConfigController.prototype.GetConfig = function (key) {
    return this.configs[key];
}

ConfigController.prototype.GetConfigByIndex = function (key, index) {
    if (this.configs[key] == null) {
        return null;
    }
    return this.configs[key][index];
}

var ctl = null;
if (ctl == null) {
    ctl = new ConfigController();
}
module.exports = ctl;