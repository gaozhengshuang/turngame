import Game from '../Game';
cc.Class({
    extends: cc.Component,

    properties: {
        enableNode: { default: null, type: cc.Node },
        disableNode: { default: null, type: cc.Node },
        betButton: { default: null, type: cc.Button }
    },

    onLoad() {
    },

    start() {
    },

    update(dt) {
    },
    Enable() {
        this.enableNode.active = true;
        this.disableNode.active = false;
        this.EnableButton();
    },
    Disable() {
        this.enableNode.active = false;
        this.disableNode.active = true;
        this.DisableButton();
    },
    EnableButton() {
        this.betButton.interactable = true;
    },
    DisableButton() {
        this.betButton.interactable = false;
    }
});
