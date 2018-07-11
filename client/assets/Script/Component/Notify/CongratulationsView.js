cc.Class({
    extends: cc.Component,

    properties: {
        congratulationsItemPrefab: { default: null, type: cc.Prefab },
        congratulationsItemParent: { default: null, type: cc.Node },
        lightSprNode: { default: null, type: cc.Node },
        fireworkAnimation: { default: null, type: cc.Animation },
        congratulationPopAnimation: { default: null, type: cc.Animation },
        loaded: { default: false, type: Boolean }
    },

    onLoad() {
        this.lightSprNode.runAction(cc.repeatForever(cc.rotateBy(6, 360)));
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onMouseDown, this);
        this.fireworkAnimation.on('stop', function () {
            this.congratulationPopAnimation.play('congratulationPop');
        }.bind(this));
        this.congratulationPopAnimation.on('stop', function () {
            this.loaded = true;
        }.bind(this));
    },

    start() {
    },

    update(dt) {
    },

    onDestroy() {
        this.node.off(cc.Node.EventType.MOUSE_UP, this.onMouseDown, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onMouseDown, this);
    },

    onMouseDown(event) {
        event.stopPropagationImmediate();
        if (this.loaded) {
            this.node.destroy();
        }
    },

    init(names) {
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            let node = cc.instantiate(this.congratulationsItemPrefab);
            node.parent = this.congratulationsItemParent;
            let congratulationsItemView = node.getComponent('CongratulationsItemView');
            congratulationsItemView.init(name);
        }
    }
});
