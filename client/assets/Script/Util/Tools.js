import _ from 'lodash';

var Tools = {}

Tools.toAngle = function (rotation) {
    return Math.PI * rotation / 180;
}

Tools.toRotation = function (angle) {
    return 180 * angle / Math.PI;
}
/** 
 * 随机一个范围内的数字
 * @function 
 * @param {number} min
 * @param {number} max
 */
Tools.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

Tools.getRandomResule = function () {
    return Math.random() < 0.5;
}

/**
 * Check and invoke callback function
 */
Tools.invokeCallback = function (cb) {
    if (!!cb && typeof cb === 'function') {
        cb.apply(null, Array.prototype.slice.call(arguments, 1));
        return true;
    }
    return false;
};

/**
 * 检查必要的参数
 * @function
 * @param {object} obj
 * @param {Array} params
 * @returns {Array} lostParams
 */
Tools.checkParams = function (obj, params) {
    var lostParams = [];
    for (var i = 0; i < params.length; i++) {
        if (obj[params[i]] == null) {
            lostParams.push(params[i]);
        }
    }
    return lostParams;
}

/**
 * 从object中根据'a.b.c'这样的参数获得值
 * @function
 * @param {object} obj
 * @param {String} key
 * @returns {object} value 
 */
Tools.getValueInObj = function (obj, key) {
    let keys = key.split('.');
    let source = obj;
    for (let i = 0; i < keys.length; i++) {
        if (source == null) {
            return null;
        }
        source = source[keys[i]];
    }
    return source;
}

/** 
 * 随机一个长度的字符串
 * @function 
 * @param {number} len
 */
Tools.getRandomString = function (len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};

/**
 * 获取一个数组中object指定的key值数组
 * @function getValuesInArray
 * @param {Array} arr
 * @param {String} key
 */
Tools.getValuesInArray = function (arr, key) {
    if (_.isArray(arr)) {
        let ret = [];
        for (let i = 0; i < arr.length; i++) {
            let obj = arr[i];
            ret.push(Tools.getValueInObj(obj, key));
        }
        return ret;
    }
    return [];
}

module.exports = Tools;