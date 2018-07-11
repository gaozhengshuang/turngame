import _ from 'lodash';
import ConfigController from '../Controller/ConfigController';
import GameController from '../Controller/GameController';

import BullFightDefine from '../Util/BullFightDefine';
import Define from '../Util/Define';
import Tools from '../Util/Tools';

cc.Class({
    extends: cc.Component,

    properties: {
        cartPrefab: { default: null, type: cc.Prefab },
        cartParent: { default: null, type: cc.Node },
        direction: { default: 0, type: cc.Integer, },
        initSpeed: { default: 0, type: cc.Integer },
        speed: { default: 0, type: cc.Integer },
        cartNodes: { default: [], type: Array },
        tcartTotalWeight: { default: 0, type: cc.Integer },
        tcartConfig: { default: [], type: Array },
        itemConfig: { default: [], type: Array },
        nextRewardTime: { default: 0.0, type: cc.Float },
        passRewardTime: { default: 0.0, type: cc.Float },
        boundary: { default: 0, type: cc.Integer },
        interval: { default: 0, type: cc.Integer },
    },

    onLoad() {
        cc.systemEvent.on(Define.EVENT_KEY.CHANGE_GAMESTATE, this.onGameStateChange, this);
        this.boundary = cc.winSize.width / 2 + BullFightDefine.GAME_INIT.CARWIDTH / 2 + BullFightDefine.GAME_INIT.EXTRAWIDTH;
    },

    start() {

    },

    update(dt) {
        let addition = this.speed * dt;
        if (this.direction == BullFightDefine.REWARD_DIR.LEFT) {
            addition = -addition;
        }
        let destroyList = [];
        for (let i = 0; i < this.cartNodes.length; i++) {
            //更新位置
            let cartNode = this.cartNodes[i];
            cartNode.node.x += addition;
            if (this.direction == BullFightDefine.REWARD_DIR.LEFT) {
                if (cartNode.node.x < -(this.boundary)) {
                    //要销毁
                    cartNode.node.destroy();
                    destroyList.push(i);
                }
            } else {
                if (cartNode.node.x > this.boundary) {
                    //要销毁
                    cartNode.node.destroy();
                    destroyList.push(i);
                }
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
            this.cartNodes.splice(destroyList[i], 1);
        }

        //看看要不要生成一个奖励
        if (this.passRewardTime >= this.nextRewardTime) {
            //生成奖励
            this.cartNodes.push(this.createCartNode(
                this.randomReward(),
                this.direction == BullFightDefine.REWARD_DIR.LEFT ?
                    (this.boundary) : -(this.boundary)
            ));
            this.passRewardTime = 0.0;
            this.nextRewardTime = this.interval / this.speed;
        } else {
            this.passRewardTime += dt;
        }
    },
    onDestroy() {
        cc.systemEvent.off(Define.EVENT_KEY.CHANGE_GAMESTATE, this.onGameStateChange, this);
    },
    //call function
    init(index, opts) {
        this.node.y = opts.POSITIONY;
        this.direction = opts.DIRECTION;
        this.initSpeed = opts.SPEED;
        this.speed = opts.SPEED;
        this.interval = opts.INTERVAL;

        this.nextRewardTime = 0.0;
        this.tcartConfig = [];
        let tcartConfigs = ConfigController.GetConfig('TCart');

        for (let i = 0; i < tcartConfigs.length; i++) {
            let config = tcartConfigs[i];
            if (_.indexOf(config.Show, 3 - index) != -1) {
                this.tcartTotalWeight += config.ShowPer;
                this.tcartConfig.push(_.cloneDeep(config));
            }
        }
    },
    judgeHit(position) {
        let curPos = this.cartParent.convertToNodeSpaceAR(position);
        for (let i = 0; i < this.cartNodes.length; i++) {
            let cartNode = this.cartNodes[i];
            let dis = cc.pDistance(cartNode.node.position, curPos);
            if (dis < BullFightDefine.GAME_INIT.HITDISTANCE) {
                return cartNode;
            }
        }
        return null;
    },
    prejudgeHit(position, delay) {
        let addition = this.speed * delay;
        if (this.direction == BullFightDefine.REWARD_DIR.LEFT) {
            addition = -addition;
        }
        let cusPos = this.cartParent.convertToNodeSpaceAR(position);
        for (let i = 0; i < this.cartNodes.length; i++) {
            let cartNode = this.cartNodes[i];
            let dis = Math.abs(cartNode.node.x + addition - curPos.x);
            if (dis < BullFightDefine.GAME_INIT.HITDISTANCE) {
                return cartNode;
            }
        }
        return null;
    },
    adjustSpeedForDisHit(position, delay) {

    },

    //call back
    onGameStateChange(event) {
        if (event.detail.state == BullFightDefine.GAME_STATE.STATE_END) {
            //恢复速度
            this.speed = this.initSpeed;
        }
    },
    //private function
    randomReward() {
        let adjustWeight = 0;
        let adjustId = 0;
        if (GameController.rewardTipInfo != null && GameController.rewardTipInfo.item != null) {
            if (_.findIndex(this.tcartConfig, { Id: GameController.rewardTipInfo.item.Id }) != -1) {
                // 这一行里有这个物品
                adjustId = GameController.rewardTipInfo.item.Id;
                adjustWeight = GameController.rewardTipInfo.item.ShowPer * 10;
            }
        }
        let result = Tools.getRandomInt(0, this.tcartTotalWeight + adjustWeight);
        for (let i = 0; i < this.tcartConfig.length; i++) {
            let config = this.tcartConfig[i];
            let calculationPer = config.ShowPer + (config.Id == adjustId ? adjustWeight : 0);
            if (result < calculationPer) {
                return config;
            } else {
                result -= calculationPer;
            }
        }
        //完蛋了，出问题了
        return null;
    },
    createCartNode(config, posx) {
        let cart = cc.instantiate(this.cartPrefab);
        let bullFightCart = cart.getComponent('BullFightCart');
        bullFightCart.init(config, posx, this.direction);
        cart.parent = this.cartParent;
        return bullFightCart;
    }
});
