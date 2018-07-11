import Define from '../../Util/Define';
import NotificationController from '../../Controller/NotificationController';

const barragePositionsY = [450, 350];

cc.Class({
    extends: cc.Component,

    properties: {
        tipParentNode: { default: null, type: cc.Node },
        notifyPrefab: { default: null, type: cc.Prefab },
        resultPrefab: { default: null, type: cc.Prefab },
        barragePrefab: { default: null, type: cc.Prefab },
        barragePositionIndex: { default: 0, type: cc.Integer },
    },

    onLoad() {
        cc.game.addPersistRootNode(this.node);
    },

    start() {
        NotificationController.addNotification(Define.EVENT_KEY.TIP_TIPS, this.onShowTips.bind(this));
        NotificationController.addNotification(Define.EVENT_KEY.TIP_RESULT, this.onShowResult.bind(this));
        NotificationController.addNotification(Define.EVENT_KEY.TIP_BARRAGE, this.onBarrage.bind(this))
    },

    update(dt) {
    },

    //漂浮提示代码--------------------------------------start-----------------------------------
    onShowTips(data) {
        if (this.notifyPrefab) {
            let toast = cc.instantiate(this.notifyPrefab);
            toast.x = 0;
            toast.y = 0;
            toast.parent = this.tipParentNode;
            let toastView = toast.getComponent('NotifyView');
            toastView.flap(data.text, data.alive || 3, data.delay || 0.1);
        }
    },
    //漂浮提示代码--------------------------------------end-------------------------------------

    //抓取结果提示代码--------------------------------------start-----------------------------------
    onShowResult(data) {
        if (this.resultPrefab) {
            let node = cc.instantiate(this.resultPrefab);
            node.y = data.y;
            node.parent = this.tipParentNode;
            let resultTipView = node.getComponent('ResultTipView');
            resultTipView.fly(data.text, data.result);
        }
    },
    //抓取结果提示代码--------------------------------------end-----------------------------------

    //弹幕代码--------------------------------------start-----------------------------------
    onBarrage(data) {
        if (this.barragePrefab) {
            let node = cc.instantiate(this.barragePrefab);
            node.parent = this.tipParentNode;
            let barrageView = node.getComponent('BarrageView');
            barrageView.fly(data, this.getBarragePosotionY());
        }
    },
    //弹幕代码--------------------------------------end------------------------------------

    getBarragePosotionY() {
        let ret = barragePositionsY[this.barragePositionIndex];
        this.barragePositionIndex++;
        if (this.barragePositionIndex >= barragePositionsY.length) {
            this.barragePositionIndex = 0;
        }
        return ret;
    }
});
