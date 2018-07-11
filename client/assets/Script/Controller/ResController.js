import _ from 'lodash';
import Tools from '../Util/Tools';

var ResController = function () {
    this.spriteFrames = {};
}

ResController.prototype.init = function (cb) {
    // cc.loader.loadResDir('Image/Icon/', cc.SpriteFrame, function (err, ress, urls) {
    //     if (err) {
    //         console.log('[严重错误] 奖励资源加载错误 ' + err);
    //     } else {
    //         for (let i = 0; i < ress.length; i++) {
    //             this.spriteFrames[urls[i]] = ress[i];
    //         }
    //     }
        
    // }.bind(this));
    Tools.invokeCallback(cb);
};

ResController.prototype.getSpriteFrameByName = function (name, cb) {
    let spriteFrame = this.spriteFrames[name];
    if (spriteFrame == null) {
        cc.loader.loadRes(name, cc.SpriteFrame, function (err, res) {
            if (err) {
                Tools.invokeCallback(cb, err);
            } else {
                this.spriteFrames[name] = res;
                Tools.invokeCallback(cb, null, res);
            }
        }.bind(this));
    } else {
        Tools.invokeCallback(cb, null, spriteFrame);
    }
};

ResController.prototype.destoryAllChildren = function (node) {
    if (node && node.children) {
        let children = node.children;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child) {
                child.destroy();
            }
        }
        node.removeAllChildren(true);
    }
}


module.exports = new ResController();