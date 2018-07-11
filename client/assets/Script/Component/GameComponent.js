import Define from '../Util/Define';
import NotificationController from '../Controller/NotificationController';

cc.Class({
    extends: cc.Component,

    addPrefab(resPrefab){
        cc.loader.loadRes(resPrefab, function (err, prefab) {
            if (err) {
                console.log('[严重错误] 奖励资源加载错误 ' + err);
            } else {
                var newNode = cc.instantiate(prefab);
                cc.director.getScene().getChildByName('Canvas').addChild(newNode);
            }
        });
    },

    showTips(data){
        NotificationController.postNotification(Define.EVENT_KEY.TIP_TIPS, data);
    },

    showBarrage(data){
        NotificationController.postNotification(Define.EVENT_KEY.TIP_BARRAGE, data);
    }
});