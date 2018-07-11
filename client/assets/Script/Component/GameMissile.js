import _ from 'lodash';
import Tools from '../Util/Tools';
import BullFightDefine from '../Util/BullFightDefine';
import Define from '../Util/Define';
import GameController from '../Controller/GameController';
import NetWorkController from '../Controller/NetWorkController';

cc.Class({
    extends: cc.Component,

    properties: {
        aimSpr: { default: null, type: cc.Sprite },
        missileSpr: { default: null, type: cc.Node },
        speedX: { default: 0.0, type: cc.Float, },
        speedY: { default: 0.0, type: cc.Float },
        rewardNodes: { default: [], type: Array },
        judgeNode: { default: null, type: cc.Node },
        bullFightScene: { default: null, type: cc.Object }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.node.x = BullFightDefine.MISSILE_INIT.POSITIONX;
        // this.node.y = BullFightDefine.MISSILE_INIT.POSITIONY;
        // this.node.runAction(cc.sequence([
        //     cc.moveTo(BullFightDefine.MISSILE_INIT.SHOWTIME, BullFightDefine.MISSILE_INIT.TARGETPOSITINOX, BullFightDefine.MISSILE_INIT.TARGETPOSITIONY),
        //     cc.callFunc(function () {
        //         GameController.ChangeState(BullFightDefine.GAME_STATE.STATE_AIMING);
        //     }, this)
        // ]));
        this.node.x = BullFightDefine.MISSILE_INIT.TARGETPOSITINOX;
        this.node.y = BullFightDefine.MISSILE_INIT.TARGETPOSITIONY + BullFightDefine.MISSILE_INIT.TARGETPOSITIONYADDITION;
        cc.systemEvent.on(Define.EVENT_KEY.CHANGE_GAMESTATE, this.onGameStateChange, this);
        this.rotationAddition = BullFightDefine.MISSILE_INIT.ROTATIONADDITION;
        GameController.ChangeState(BullFightDefine.GAME_STATE.STATE_AIMING);
    },

    start() {

    },

    update(dt) {
        //瞄准
        // if (GameController.state == BullFightDefine.GAME_STATE.STATE_AIMING) {
        //     let rotation = this.node.rotation + this.rotationAddition;
        //     if (rotation >= BullFightDefine.MISSILE_INIT.ROTATION_LIMIT) {
        //         this.rotationAddition = -BullFightDefine.MISSILE_INIT.ROTATIONADDITION;
        //     } else if (rotation <= -BullFightDefine.MISSILE_INIT.ROTATION_LIMIT) {
        //         this.rotationAddition = BullFightDefine.MISSILE_INIT.ROTATIONADDITION;
        //     }
        //     this.node.rotation = rotation;
        //     let angle = Tools.toAngle(rotation);
        //     this.node.x = BullFightDefine.MISSILE_INIT.TARGETPOSITINOX + Math.sin(angle) * BullFightDefine.MISSILE_INIT.TARGETPOSITIONYADDITION;
        //     this.node.y = BullFightDefine.MISSILE_INIT.TARGETPOSITIONY + Math.cos(angle) * BullFightDefine.MISSILE_INIT.TARGETPOSITIONYADDITION;
        // }
        if (GameController.state == BullFightDefine.GAME_STATE.STATE_FLYING) {
            let targetX = this.node.x + this.speedX * dt;
            let targetY = this.node.y + this.speedY * dt;
            this.node.position = cc.v2(targetX, targetY);
            if (targetY >= GameController.flyingTargetPosY) {
                GameController.ChangeState(BullFightDefine.GAME_STATE.STATE_RECOVERY);
            }
        }
    },
    onDestroy() {
        cc.systemEvent.off(Define.EVENT_KEY.CHANGE_GAMESTATE, this.onGameStateChange, this);
    },
    //call func
    getFightInfo() {
        return {
            angle: Tools.toAngle(this.node.rotation),
            x: this.node.x,
            y: this.node.y
        }
    },
    addRewardNode(rewardNode) {
        this.rewardNodes.push(rewardNode);
        //TODO 分散开
        let index = this.rewardNodes.length - BullFightDefine.GAME_INIT.RECOVERCOUNT + 1;
        rewardNode.node.x = this.judgeNode.x + index * 30;
        rewardNode.node.y = this.judgeNode.y + index * 30;
        rewardNode.node.rotation = -this.node.rotation;
        rewardNode.node.parent = this.node;
    },
    removeRewards() {
        let ret = [];
        if (this.rewardNodes.length > 0) {
            for (let i = 0; i < this.rewardNodes.length; i++) {
                this.rewardNodes[i].node.removeFromParent(false);
            }
            ret = this.rewardNodes;
            this.rewardNodes = [];
        }
        return ret;
    },
    getJudgePosition() {
        return this.node.parent.convertToWorldSpaceAR(this.node.position);//cc.p(this.node.x + judgePos.x, this.node.y + judgePos.y);
    },
    setRotation(rotation) {
        this.node.rotation = rotation;
        let angle = Tools.toAngle(rotation);
        this.node.x = BullFightDefine.MISSILE_INIT.TARGETPOSITINOX + Math.sin(angle) * BullFightDefine.MISSILE_INIT.TARGETPOSITIONYADDITION;
        this.node.y = BullFightDefine.MISSILE_INIT.TARGETPOSITIONY + Math.cos(angle) * BullFightDefine.MISSILE_INIT.TARGETPOSITIONYADDITION;
    },
    getWorldPosition() {
        return this.node.parent.convertToWorldSpaceAR(this.node.position);
    },
    init(bullFightScene) {
        this.bullFightScene = bullFightScene;
    },
    //call back
    onGameStateChange(event) {
        if (event.detail.state == BullFightDefine.GAME_STATE.STATE_FLYING) {
            //发射
            let angle = Tools.toAngle(this.node.rotation);
            this.speedX = Math.sin(angle) * BullFightDefine.GAME_INIT.MISSILESPEED;
            this.speedY = Math.cos(angle) * BullFightDefine.GAME_INIT.MISSILESPEED;
            //计算目标位置
            // let targetY = GameController.flyingTargetPosY;
            // let targetX = Math.tan(angle) * (targetY - this.node.y) + this.node.x;
            // let flyTime = Math.abs(targetY - this.node.y) / BullFightDefine.GAME_INIT.MISSILESPEED;
            // this.node.runAction(cc.sequence([
            //     cc.moveTo(flyTime, targetX, targetY),
            //     cc.callFunc(function () {
            //         //收勾了
            //         GameController.ChangeState(BullFightDefine.GAME_STATE.STATE_RECOVERY);
            //     }.bind(this))
            // ]));
        }
        if (event.detail.state == BullFightDefine.GAME_STATE.STATE_RECOVERY) {
            //收到第一个位置
            let angle = Tools.toAngle(this.node.rotation);
            let speedY = Math.cos(angle) * BullFightDefine.GAME_INIT.MISSILESPEED;
            let targetY = GameController.recoveryTargetPosY;
            let targetX = this.node.x - Math.tan(angle) * (this.node.y - targetY);

            let flyTime = Math.abs(targetY - this.node.y) / BullFightDefine.GAME_INIT.MISSILESPEED;
            this.node.runAction(cc.sequence([
                cc.moveTo(flyTime, targetX, targetY),
                cc.callFunc(function () {
                    //发消息 然后接着往回拉
                    if (this.rewardNodes.length > 0) {
                        let items = Tools.getValuesInArray(this.rewardNodes, 'rewardInfo.Id');
                        NetWorkController.send('msg.C2GW_TargetItem', {
                            itemid: items
                        });
                        GameController.ChangeState(BullFightDefine.GAME_STATE.STATE_SHAKING);
                    } else {
                        GameController.ChangeState(BullFightDefine.GAME_STATE.STATE_END);
                    }
                }.bind(this))
            ]));
        }
        if (event.detail.state == BullFightDefine.GAME_STATE.STATE_SHAKING) {
            //收到第二个位置
            let angle = Tools.toAngle(this.node.rotation);
            let speedY = Math.cos(angle) * BullFightDefine.GAME_INIT.MISSILESPEED;
            let speedX = Math.sin(angle) * BullFightDefine.GAME_INIT.MISSILESPEED;
            let targetY = BullFightDefine.MISSILE_INIT.RECOVERYPOSITIONY;
            let targetX = this.node.x - Math.tan(angle) * (this.node.y - targetY);

            let targetY1 = targetY - speedY * 0.1 * BullFightDefine.GAME_INIT.SHAKETIME;
            let targetX1 = targetX - speedX * 0.1 * BullFightDefine.GAME_INIT.SHAKETIME;

            let flyTime = Math.abs(targetY - this.node.y) / BullFightDefine.GAME_INIT.MISSILESPEED;
            this.node.runAction(cc.sequence([
                cc.moveTo(flyTime, targetX, targetY),
                cc.spawn([
                    cc.callFunc(function () {
                        // 拉到这了 开始斗动
                        for (let i = 0; i < this.rewardNodes.length; i++) {
                            let reward = this.rewardNodes[i];
                            reward.playShake();
                        }
                    }.bind(this)),
                    cc.moveTo(BullFightDefine.GAME_INIT.SHAKETIME, targetX1, targetY1)
                ]),
                // cc.delayTime(BullFightDefine.GAME_INIT.SHAKETIME),
                cc.callFunc(function () {
                    let destroyList = [];
                    for (let i = 0; i < this.rewardNodes.length; i++) {
                        let reward = this.rewardNodes[i];
                        reward.stopShake();
                        //没中奖的爆炸吧
                        let canGain = false;
                        let gainRewards = _.cloneDeep(GameController.gainRewards);
                        for (let j = 0; j < gainRewards.length; j++) {
                            if (Tools.getValueInObj(reward, 'rewardInfo.Id') == gainRewards[j]) {
                                //钩中了
                                canGain = true;
                                gainRewards.splice(j, 1);
                            }
                        }
                        if (!canGain) {
                            //没中 移除了
                            // reward.startDisplay();
                            reward.node.removeFromParent(false);
                            this.bullFightScene.removeReward(0.05 * i, reward);
                            destroyList.push(i);
                        }
                    }
                    //倒序删除
                    destroyList.sort(function compare(a, b) {
                        if (a < b) {           // 按某种排序标准进行比较, a 小于 b
                            return 1;
                        }
                        if (a > b) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    });
                    for (let i = 0; i < destroyList.length; i++) {
                        this.rewardNodes.splice(destroyList[i], 1);
                    }
                    GameController.ChangeState(BullFightDefine.GAME_STATE.STATE_END);
                }.bind(this))
            ]));
        }
        if (event.detail.state == BullFightDefine.GAME_STATE.STATE_END) {
            //完全收回来
            //计算速度
            let angle = Tools.toAngle(this.node.rotation);
            let speedY = Math.cos(angle) * BullFightDefine.GAME_INIT.MISSILESPEED;
            let targetY = BullFightDefine.MISSILE_INIT.TARGETPOSITIONY + Math.cos(angle) * BullFightDefine.MISSILE_INIT.TARGETPOSITIONYADDITION;
            let targetX = BullFightDefine.MISSILE_INIT.TARGETPOSITINOX + Math.sin(angle) * BullFightDefine.MISSILE_INIT.TARGETPOSITIONYADDITION;
            let flyTime = Math.abs(targetY - this.node.y) / BullFightDefine.GAME_INIT.MISSILESPEED;
            this.node.runAction(cc.sequence([
                cc.moveTo(flyTime, targetX, targetY),
                cc.callFunc(function () {
                    GameController.ChangeState(BullFightDefine.GAME_STATE.STATE_AIMING);
                }, this)
            ]));
        }
    }
});
