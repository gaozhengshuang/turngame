import Game from '../../Game';

import CardNodeView from '../Card/CardNodeView';
cc.Class({
    extends: cc.Component,

    properties: {
        cardNodePrefab: { default: null, type: cc.Prefab },
        cardNodeParent: { default: null, type: cc.Node },
        cardNodes: { default: [], type: [CardNodeView] },
        targetCanvas: { default: null, type: cc.Canvas },
    },

    onLoad() {
        let canvas = this.targetCanvas;
        let designResolution = canvas.designResolution
        var viewSize = cc.view.getFrameSize()
        if (viewSize.width / viewSize.height > designResolution.width / designResolution.height) {
            canvas.fitHeight = true;
            canvas.fitWidth = false;
        }
        else {
            canvas.fitHeight = false;
            canvas.fitWidth = true
        }

        this._createCards();

        Game.NotificationController.On(Game.Define.EVENT_KEY.CHANGE_GAMESTATE, this, this.onGameStateChange);
    },

    start() {
        AudioController.playAudio('Bg');
    },

    update(dt) {
    },

    onDestroy() {
        Game.NotificationController.Off(Game.Define.EVENT_KEY.CHANGE_GAMESTATE, this, this.onGameStateChange);
    },

    onGameStateChange(state) {
        switch (state) {
            case Game.TurnDefine.GAME_STATE.STATE_PREPARING: {
                break;
            }
        }
    },

    _createCards() {
        for (let i = 0; i < 12; i++) {
            let node = cc.instantiate(this.cardNodeParent);
            this.cardNodeParent.addChild(node);
            let cardNodeView = node.getComponent('CardNodeView');
            this.cardNodes.push(cardNodeView);
            cardNodeView.Init(i, i % 4);
        }
        this.cardNodeParent.removeComponent(cc.Layout);
    },
    _restartRound() {
        for (let i = 0; i < this.cardNodes.length; i++) {
            let cardNodeView = this.cardNodes[i];
            cardNodeView.Init(i, i % 4);
        }
    }
});
