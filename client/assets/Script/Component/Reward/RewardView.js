import ResController from '../../Controller/ResController';
const tabInfo = [
    {
        prefabName: 'bagViewPrefab',
        componentName: 'BagView',
        jumpIndex: 1,
    },
    {
        prefabName: 'packageViewPrefab',
        componentName: 'PackageView',
        jumpIndex: 0,
    }
]

cc.Class({
    extends: cc.Component,

    properties: {
        bagViewPrefab: { default: null, type: cc.Prefab },
        packageViewPrefab: { default: null, type: cc.Prefab },
        curView: { default: null, type: cc.Object },
        infoNode: { default: null, type: cc.Node },
        loaded: { default: false, type: Boolean }
    },

    onLoad() {
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onMouseUp, this);
    },

    start() {
        this.changeTabView(0, true);
    },

    update(dt) {

    },

    onDestroy() {
        this.node.off(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onMouseUp, this);
    },
    onMouseUp(event) {
        event.stopPropagationImmediate();
        if (this.loaded) {
            this.closeRewardView();
        }
    },
    closeRewardView() {
        this.loaded = false;
        this.infoNode.runAction(cc.spawn([
            cc.sequence([
                cc.scaleTo(0.1, 0.9, 0.9),
                cc.scaleTo(0.1, 1.2, 1.2),
                cc.scaleTo(0.3, 0, 0),
                cc.callFunc(function () {
                    this.node.destroy();
                }.bind(this))
            ]),
            cc.sequence([
                cc.delayTime(0.2),
                cc.moveTo(0.3, 250, -568)
            ])
        ]));
    },
    changeTabView(key, anima) {
        if (this.infoNode) {
            this.infoNode.destroy();
        }
        let node = cc.instantiate(this[tabInfo[key].prefabName]);
        node.parent = this.node;
        let view = node.getComponent(tabInfo[key].componentName);
        this.curView = view;

        if (anima) {
            node.scaleX = 0;
            node.scaleY = 0;
            node.y = -568;
            node.x = 250;
            node.runAction(
                cc.spawn([
                    cc.sequence([
                        cc.scaleTo(0.3, 1.2, 1.2),

                        cc.scaleTo(0.1, 0.9, 0.9),
                        cc.scaleTo(0.1, 1, 1),
                        cc.callFunc(function () {
                            view.init(this.closeRewardView.bind(this), this.changeTabView.bind(this, tabInfo[key].jumpIndex, false));
                            this.loaded = true;
                        }.bind(this))
                    ]),
                    cc.moveTo(0.3, 0, 0)
                ]));
        } else {
            view.init(this.closeRewardView.bind(this), this.changeTabView.bind(this, tabInfo[key].jumpIndex, false));
        }
        this.infoNode = node;
    }
});
