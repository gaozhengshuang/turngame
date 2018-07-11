import _ from 'lodash';

import GameController from '../../Controller/GameController';
import NetWorkController from '../../Controller/NetWorkController';
import NotificationController from '../../Controller/NotificationController';
import AudioController from '../../Controller/AudioController';
import User from '../../Model/User';
import Item from '../../Model/Item';

import BullFightDefine from '../../Util/BullFightDefine';
import Define from '../../Util/Define';
import Platform from '../../Util/Platform';

import RewardTipView from '../RewardTipView';

cc.Class({
    extends: cc.Component,

    properties: {
        missilePrefab: { default: null, type: cc.Prefab },
        missileParent: { default: null, type: cc.Node },
        gameMissile: { default: null, type: cc.Object },
        rewardGroupPrefab: { default: null, type: cc.Prefab },
        rewardGroupParent: { default: null, type: cc.Node },
        bagViewPrefab: { default: null, type: cc.Prefab },
        rewardGroups: { default: [], type: Array },
        couponLabel: { default: null, type: cc.Label },
        bagNode: { default: null, type: cc.Node },
        bezierCtrl1Node: { default: null, type: cc.Node },
        bezierCtrl2Node: { default: null, type: cc.Node },
        spoolNode: { default: null, type: cc.Node },
        trash1Node: { default: null, type: cc.Node },
        bezierCtrl3Node: { default: null, type: cc.Node },
        bezierCtrl4Node: { default: null, type: cc.Node },
        trash2Node: { default: null, type: cc.Node },
        bezierCtrl5Node: { default: null, type: cc.Node },
        bezierCtrl6Node: { default: null, type: cc.Node },
        toastPosY: { default: 0, type: cc.Integer },
        dirIndex: { default: 0, type: cc.Integer },
        beltAniation: { default: null, type: cc.Animation },
        targetCanvas: { default: null, type: cc.Canvas },
        costLabel: { default: null, type: cc.Label },
        rewardTipView: { default: null, type: RewardTipView },
        congratulationsPrefab: { default: null, type: cc.Prefab },
        resultPrefab: { default: null, type: cc.Prefab },
        discountTipNode: { default: null, type: cc.Node }
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


        this.rewardTipView.init();

        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);

        cc.systemEvent.on(Define.EVENT_KEY.CHANGE_GAMESTATE, this.onGameStateChange, this);

        this.changeCostString = this.onChangeCostString.bind(this);
        this.userInfoCouponChange = this.onUserInfoCouponChange.bind(this);
        NotificationController.addNotification(Define.EVENT_KEY.USERINFO_UPDATECOINS, this.userInfoCouponChange);
        NotificationController.addNotification(Define.EVENT_KEY.CHANGE_COSTSTRING, this.changeCostString);

        //创建绳套
        let missile = cc.instantiate(this.missilePrefab);
        missile.parent = this.missileParent;
        this.gameMissile = missile.getComponent('GameMissile');
        this.gameMissile.init(this);
        //创建奖励条
        let maxHeight = 0;
        let minHeight = 600;
        for (let i = 0; i < BullFightDefine.REWARD_INIT.length; i++) {
            let rewardGroup = cc.instantiate(this.rewardGroupPrefab);
            let bullFightRewardGroup = rewardGroup.getComponent('BullFightRewardGroup');
            bullFightRewardGroup.init(i, BullFightDefine.REWARD_INIT[i]);
            rewardGroup.parent = this.rewardGroupParent;
            this.rewardGroups.push(bullFightRewardGroup);
            if (BullFightDefine.REWARD_INIT[i].POSITIONY > maxHeight) {
                maxHeight = BullFightDefine.REWARD_INIT[i].POSITIONY;
            }
            if (BullFightDefine.REWARD_INIT[i].POSITIONY < minHeight) {
                minHeight = BullFightDefine.REWARD_INIT[i].POSITIONY;
            }
        }
        GameController.flyingTargetPosY = maxHeight + BullFightDefine.GAME_INIT.FLYTARGETPOSYADDITION;
        GameController.recoveryTargetPosY = minHeight + BullFightDefine.GAME_INIT.RECOVERYPOSYADDITION;

        this.toastPosY = 498;
        this.onChangeCostString(GameController.nextCost);
        this.couponLabel.string = this.getCouponStr(User.platformCoins);
    },

    start() {
        AudioController.playAudio('Bg');
    },

    update(dt) {
        if (GameController.state == BullFightDefine.GAME_STATE.STATE_RECOVERY ||
            GameController.state == BullFightDefine.GAME_STATE.STATE_FLYING) {
            //判断一下能不能钩到什么奖励
            if (GameController.hitRewards.length >= BullFightDefine.GAME_INIT.RECOVERCOUNT) {
                return;
            }
            for (let i = 0; i < this.rewardGroups.length; i++) {
                let group = this.rewardGroups[i];
                let cart = group.judgeHit(this.gameMissile.getJudgePosition());
                if (cart != null) {
                    //命中购物车了
                    if (cart.hasReward()) {
                        //购物车里有奖品
                        let reward = cart.removeReward();
                        //连在钩子上
                        GameController.hitRewards.push(reward);
                        this.gameMissile.addRewardNode(reward);
                        if (GameController.state == BullFightDefine.GAME_STATE.STATE_FLYING) {
                            GameController.ChangeState(BullFightDefine.GAME_STATE.STATE_RECOVERY);
                        }
                    }
                }
            }
        }
    },

    onDestroy() {
        this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.off(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);

        cc.systemEvent.off(Define.EVENT_KEY.CHANGE_GAMESTATE, this.onGameStateChange, this);

        NotificationController.removeNotification(Define.EVENT_KEY.USERINFO_UPDATECOINS, this.userInfoCouponChange);
        NotificationController.removeNotification(Define.EVENT_KEY.CHANGE_COSTSTRING, this.changeCostString);
    },
    //call func
    removeReward(delay, reward) {
        this.node.addChild(reward.node);
        //set position;
        reward.node.position = this.node.convertToNodeSpaceAR(this.gameMissile.node.convertToWorldSpaceAR(reward.node.position));
        //run action
        let config = Item.getConfigById(reward.rewardInfo.Id);
        let name = config != null ? (config.Name + (config.Exchange > 1 ? ' 碎片' : '')) : '';

        let brzier = this.dirIndex == 0 ? [this.bezierCtrl3Node.position, this.bezierCtrl4Node.position, this.trash1Node.position]
            : [this.bezierCtrl5Node.position, this.bezierCtrl6Node.position, this.trash2Node.position];
        this.dirIndex++;
        if (this.dirIndex > 1) {
            this.dirIndex = 0;
        }
        reward.node.runAction(cc.sequence([
            cc.delayTime(delay),
            cc.callFunc(function () {
                this.showResultTip({ text: name, result: BullFightDefine.GAME_RESULT.RESULT_MISS, y: this.calcResultTipY() });
                // NotificationController.postNotification(Define.EVENT_KEY.TIP_RESULT, { text: name, result: BullFightDefine.GAME_RESULT.RESULT_MISS, y: this.calcResultTipY() });
            }.bind(this)),
            cc.spawn([
                cc.bezierTo(1, brzier),
                cc.scaleBy(1, 0.5),
                cc.rotateTo(1, 1800)
            ]),
            cc.removeSelf(true)
        ]));
    },
    //call back
    onGameStateChange(event) {
        if (event.detail.state == BullFightDefine.GAME_STATE.STATE_AIMING) {
            GameController.RestartRound();
            this.rewardTipView.RestartRound();
            // this.couponLabel.string = GameController.round.toString();
            //钩子上如果还有reward,飘到背包里
            if (this.gameMissile != null) {
                let rewards = this.gameMissile.removeRewards();
                if (rewards.length > 0) {
                    let tipCount = 0;
                    for (let i = 0; i < rewards.length; i++) {
                        let config = Item.getConfigById(rewards[i].rewardInfo.Id);
                        let name = config != null ? (config.Name + (config.Exchange > 1 ? ' 碎片' : '')) : '';
                        if (rewards[i].rewardInfo.Exchange > 1) {
                            //飘提示框
                            let item = Item.getItemById(rewards[i].rewardInfo.Id);
                            let count = item == null ? 1 : item.num % rewards[i].rewardInfo.Exchange;
                            if (count == 0) {
                                //正好可兑换 恭喜你
                                // NotificationController.postNotification(Define.EVENT_KEY.TIP_TIPS, { text: '恭喜您，集齐 ' + name + ' 碎片，可以前往兑换。', delay: tipCount * 0.5 + 0.1 });
                            } else {
                                // NotificationController.postNotification(Define.EVENT_KEY.TIP_TIPS, { text: '获得 ' + name + ' 碎片，再获得 ' + (rewards[i].rewardInfo.Exchange - count) + '  个可以兑换。', delay: tipCount * 0.5 + 0.1 });
                            }
                            tipCount++;
                        }
                        this.node.addChild(rewards[i].node);
                        //run action
                        //set position;
                        // rewards[i].node.position = cc.v2(BullFightDefine.MISSILE_INIT.TARGETPOSITINOX, BullFightDefine.MISSILE_INIT.TARGETPOSITIONY + BullFightDefine.MISSILE_INIT.TARGETPOSITIONYADDITION);
                        rewards[i].node.position = this.node.convertToNodeSpaceAR(this.gameMissile.node.convertToWorldSpaceAR(rewards[i].node.position));
                        //run action
                        rewards[i].node.runAction(cc.sequence([
                            cc.delayTime(0.2 * i),
                            cc.callFunc(function () {
                                this.showResultTip({ text: name, result: BullFightDefine.GAME_RESULT.RESULT_BINGO, y: this.calcResultTipY() });
                                // NotificationController.postNotification(Define.EVENT_KEY.TIP_RESULT, { text: name, result: BullFightDefine.GAME_RESULT.RESULT_BINGO, y: this.calcResultTipY() });
                            }.bind(this)),
                            cc.spawn([
                                cc.bezierTo(1, [this.bezierCtrl1Node.position, this.bezierCtrl2Node.position, this.bagNode.position]),
                                cc.scaleBy(1, 0.5),
                                cc.rotateTo(1, -1800)
                            ]),
                            cc.removeSelf(true)
                        ]));
                    };
                }
            }
        } else if (event.detail.state == BullFightDefine.GAME_STATE.STATE_END) {
            this.onChangeCostString(GameController.nextCost);
            //看看有没有可以兑换的
            let exchangeNames = [];
            let countById = {};
            for (let i = 0; i < GameController.gainRewards.length; i++) {
                let id = GameController.gainRewards[i];
                if (countById[id] == null) {
                    countById[id] = 1;
                } else {
                    countById[id]++;
                }
            }
            for (let key in countById) {
                let count = countById[key];
                let info = Item.getItemById(parseInt(key));
                let config = Item.getConfigById(parseInt(key));
                if (config && config.Exchange > 1) {
                    if (info && info.num > 0) {
                        let preExchangeTime = Math.floor((info.num - count) / config.Exchange);
                        let curExchangeTime = Math.floor(info.num / config.Exchange);
                        console.log('之前可兑换数量 ' + preExchangeTime + ' 现在可兑换数量' + curExchangeTime);
                        if (preExchangeTime != curExchangeTime) {
                            exchangeNames.push('Image/Icon/' + config.Id);
                        }
                    }
                }
            }
            if (exchangeNames.length > 0) {
                this.onOpenCongratulationsView(exchangeNames);
            }
        }
        if (event.detail.state == BullFightDefine.GAME_STATE.STATE_SHAKING) {
            this.toastPosY = 498;
            this.beltAniation.play('belt');
        }
        if (event.detail.state != BullFightDefine.GAME_STATE.STATE_SHAKING) {
            this.beltAniation.setCurrentTime(0, 'belt');
            this.beltAniation.stop();
        }
    },

    onUserInfoCouponChange(coupon) {
        this.couponLabel.string = this.getCouponStr(coupon);
    },

    onMouseDown(event) {
        if (GameController.state == BullFightDefine.GAME_STATE.STATE_AIMING) {
            //钱够不够了
            let myCoupon = User.platformCoins || 0;
            // if (myCoupon == null || myCoupon < GameController.nextCost) {
            //     NotificationController.postNotification(Define.EVENT_KEY.TIP_TIPS, { text: '您的货币不足' });
            //     return;
            // }
            //发射就好了
            AudioController.playEffect('Fire');
            User.getTvmToken(function (token) {
                NetWorkController.send('msg.C2GW_StartThrow', { token: token }, );
            });
            //计算角度
            let result = cc.v2(event.getLocationX(), event.getLocationY()).sub(this.node.convertToWorldSpaceAR(this.spoolNode));
            let angle = cc.pAngleSigned(cc.v2(0, 1), result);
            let rotation = ((Math.PI * 2 - angle) * 180 / Math.PI) % 360;
            if (rotation > 180) {
                rotation -= 360;
            }
            rotation = Math.max(Math.min(BullFightDefine.MISSILE_INIT.ROTATION_LIMIT, rotation), -BullFightDefine.MISSILE_INIT.ROTATION_LIMIT);
            this.gameMissile.setRotation(rotation);
            GameController.ChangeState(BullFightDefine.GAME_STATE.STATE_FLYING);
        }
    },

    onOpenBagView(event) {
        event.stopPropagationImmediate();
        let node = cc.instantiate(this.bagViewPrefab);
        this.node.addChild(node);
        // node.parent = this.node;
    },

    onOpenCongratulationsView(names) {
        AudioController.playEffect('Congratulation');
        let node = cc.instantiate(this.congratulationsPrefab);
        node.parent = this.node;
        let congratulationsView = node.getComponent('CongratulationsView');
        congratulationsView.init(names);
    },

    onChangeCostString(cost) {
        if (cost != Platform.FIGHT_COST) {
            if (!this.discountTipNode.active) {
                this.discountTipNode.active = true;
            }
            if (this.discountTipNode.getNumberOfRunningActions() == 0) {
                this.discountTipNode.runAction(cc.repeatForever(
                    cc.sequence([
                        cc.spawn([
                            cc.scaleTo(0.5, 0.8),
                            cc.fadeTo(0.5, 150),
                        ]),
                        cc.spawn([
                            cc.scaleTo(0.5, 1),
                            cc.fadeTo(0.5, 255),
                        ])
                    ])
                ));
            }
        } else {
            if (this.discountTipNode.active) {
                this.discountTipNode.stopAllActions()
                this.discountTipNode.active = false;
            }
        }
        this.costLabel.string = '消耗金币:' + cost;
    },

    calcResultTipY() {
        let ret = this.toastPosY;
        this.toastPosY -= 100;
        return ret;
    },
    showResultTip(data) {
        let node = cc.instantiate(this.resultPrefab);
        node.y = data.y;
        node.parent = this.node;
        let resultTipView = node.getComponent('ResultTipView');
        resultTipView.fly(data.text, data.result);
    },
    getCouponStr(coupon) {
        coupon = _.isString(coupon) ? parseInt(coupon) : coupon;
        if (coupon > 9999) {
            let ret = (coupon / 1000).toFixed(2);
            ret = ret == Math.floor(ret) ? Math.floor(ret) : ret;
            return ret + 'k';
        }
        return coupon;
    }
});
