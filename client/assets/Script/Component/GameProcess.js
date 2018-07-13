import Game from '../Game';
cc.Class({
    extends: cc.Component,

    properties: {
        playButton: { default: null, type: cc.Button },
        tipNodes: { default: [], type: [cc.Node] },
    },

    onLoad() {
        Game.NotificationController.On(Game.Define.EVENT_KEY.CHANGE_GAMESTATE, this, this.onGameStateChange);
    },
    onDestroy() {
        Game.NotificationController.Off(Game.Define.EVENT_KEY.CHANGE_GAMESTATE, this, this.onGameStateChange);
    },

    start() {
    },

    update(dt) {
    },
    onGameStateChange(state) {
        if (Game.TurnDefine.GAME_STATE.STATE_IDLE == Game.GameController.state) {
            this.playButton.interactable = true;
        } else {
            this.playButton.interactable = false;
        }
        switch (state) {
            case Game.TurnDefine.GAME_STATE.STATE_IDLE: {
                this.playButton.node.active = true;
                for (let i = 0; i < this.tipNodes.length; i++) {
                    let node = this.tipNodes[i];
                    node.active = false;
                }
                break;
            }
            case Game.TurnDefine.GAME_STATE.STATE_READY: {
                this.playButton.node.active = false;
                for (let i = 0; i < this.tipNodes.length; i++) {
                    let node = this.tipNodes[i];
                    if (i == Game.GameController.turnCount) {
                        node.active = true;
                        node.stopAllActions();
                        node.scale = 1;
                        node.runAction(cc.repeatForever(
                            cc.sequence([
                                cc.spawn([
                                    cc.scaleTo(0.5, 1.2, 1.2).easing(new cc.easeOut(2)),
                                    cc.fadeTo(0.5, 200).easing(new cc.easeOut(2))
                                ]),
                                cc.spawn([
                                    cc.scaleTo(0.5, 1, 1).easing(new cc.easeIn(2)),
                                    cc.fadeTo(0.5, 255).easing(new cc.easeIn(2))
                                ])
                            ])
                        ));
                    } else {
                        node.active = false;
                    }
                }
            }
        }
    }
});
