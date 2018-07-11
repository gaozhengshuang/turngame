import BagItemView from './BagItemView';
var GameComponent = require('../GameComponent');

cc.Class({
    extends: GameComponent,

    properties: {
        bagItemViewPrefab: { default: null, type: cc.Prefab },
        items: { default: [], type: [Object] },
        bagItemViews: { default: [], type: [BagItemView] }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.bagItemViews = [];
    },

    start() {

    },

    update(dt) {

    },

    init(items) {
        this.items = items;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let bagItemNode = cc.instantiate(this.bagItemViewPrefab);
            bagItemNode.parent = this.node;
            let bagItemView = bagItemNode.getComponent('BagItemView');
            bagItemView.init(item);
            this.bagItemViews.push(bagItemView);
        }
    },
    getSelectedItems() {
        let ret = [];
        for (let i = 0; i < this.bagItemViews.length; i++) {
            let bagItemView = this.bagItemViews[i];
            if (bagItemView.isSelected()) {
                ret.push(bagItemView.itemInfo);
            }
        }
        return ret;
    },
    selectAll() {
        for (let i = 0; i < this.bagItemViews.length; i++) {
            let bagItemView = this.bagItemViews[i];
            bagItemView.select();
        }
    },
    unselectAll() {
        for (let i = 0; i < this.bagItemViews.length; i++) {
            let bagItemView = this.bagItemViews[i];
            bagItemView.unselect();
        }
    }
});
