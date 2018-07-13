import Game from '../Game';
cc.Class({
    extends: cc.Component,

    properties: {
        firstNode: { default: null, type: cc.Node },
        secondNode: { default: null, type: cc.Node },
        thirdNode: { default: null, type: cc.Node },
        numSpritePrefab: { default: null, type: cc.Prefab },
        timesTipPrefab: { default: null, type: cc.Prefab }
    },

    onLoad() {
        Game.NotificationController.On(Game.Define.EVENT_KEY.CHANGE_GAMESTATE, this, this.onGameStateChange);
    },

    start() {
    },

    update(dt) {
    },

    onDestroy() {
        Game.NotificationController.Off(Game.Define.EVENT_KEY.CHANGE_GAMESTATE, this, this.onGameStateChange);
    },

    RestartRound() {
        Game.ResController.DestoryAllChildren(this.firstNode);
        Game.ResController.DestoryAllChildren(this.secondNode);
        Game.ResController.DestoryAllChildren(this.thirdNode);
    },
    InitHistoryInfo(index, value) {
        let node = cc.instantiate(this.numSpritePrefab);
        let parent = this._getParentByIndex(index);
        parent.addChild(node);
        let numSpriteView = node.getComponent('NumberSpriteView');
        numSpriteView.Init(value);
    },
    onGameStateChange(state) {
        if (state == Game.TurnDefine.GAME_STATE.STATE_TURNFRONT) {
            let info = Game.GameController.clickInfo[Game.GameController.turnCount];
            if (info.value != 0) {
                let node = cc.instantiate(this.numSpritePrefab);
                let parent = this._getParentByIndex(Game.GameController.turnCount);
                node.position = parent.convertToNodeSpaceAR(info.pos);
                parent.addChild(node);
                let numSpriteView = node.getComponent('NumberSpriteView');
                numSpriteView.Init(info.value);
                node.runAction(cc.moveTo(0.5, 0, 0).easing(new cc.easeOut(3)));
            }
        }
    },

    _getParentByIndex(index) {
        switch (index) {
            case 0:
                return this.firstNode;
            case 1:
                return this.secondNode;
            case 2:
                return this.thirdNode;
            default:
                return null;
        }
    }
});
