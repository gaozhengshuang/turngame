import _ from 'lodash';
import Tools from '../../Util/Tools';
import Define from '../../Util/Define';

import User from '../../Model/User';

import ResController from '../../Controller/ResController';
import NetWorkController from '../../Controller/NetWorkController';
import AudioController from '../../Controller/AudioController';
import NotificationController from '../../Controller/NotificationController';

const TagIndex = {
    TagNone: 0,
    TagPersonal: 1,
    TagUndeal: 2,
    TagDelever: 3,
}

cc.Class({
    extends: cc.Component,

    properties: {
        packageItemPrefab: { default: null, type: cc.Prefab },
        packageItemParent: { default: null, type: cc.Node },
        presonalInfoBtnSpr: { default: null, type: cc.Sprite },
        undealBtnSpr: { default: null, type: cc.Sprite },
        deliverdBtnSpr: { default: null, type: cc.Sprite },
        nomalSpriteFrame: { default: null, type: cc.SpriteFrame },
        pressedSpriteFrame: { default: null, type: cc.SpriteFrame },
        tagIndex: { default: TagIndex.TagNone, type: cc.Integer },
        closeFunc: { default: null, type: Function },
        changeTabFunc: { default: null, type: Function },
        datas: { default: [], type: [Object] },
        listNode: { default: null, type: cc.Node },
        infoNode: { default: null, type: cc.Node },
        headSpr: { default: null, type: cc.Sprite },
        nameLabel: { default: null, type: cc.Label },
        idLabel: { default: null, type: cc.Label },
        packageScrollView: { default: null, type: cc.ScrollView },
        personalLabelNode: { default: null, type: cc.Node },
        undealLabelNode: { default: null, type: cc.Node },
        deliverLabelNode: { default: null, type: cc.Node },
        markerNode: { default: null, type: cc.Node },
        priceLabel: { default: null, type: cc.Label },
        historyInfoParentNode: { default: null, type: cc.Node },
        historyListScrollView: { default: null, type: cc.ScrollView },
        musicButtonSprite: { default: null, type: cc.Sprite },
        effectButtonSprite: { default: null, type: cc.Sprite },
        musicSprite: { default: null, type: cc.Sprite },
        effectSprite: { default: null, type: cc.Sprite },
        enableSpriteFrame: { default: null, type: cc.SpriteFrame },
        disableSpriteFrame: { default: null, type: cc.SpriteFrame },
        musicEnableSpriteFrame: { default: null, type: cc.SpriteFrame },
        musicDisableSpriteFrame: { default: null, type: cc.SpriteFrame },
        effectEnableSpriteFrame: { default: null, type: cc.SpriteFrame },
        effectDisableSpriteFrame: { default: null, type: cc.SpriteFrame },
    },

    onLoad() {
        this.OnGW2C_RetUserInfo = this.onGW2C_RetUserInfo.bind(this);
        NetWorkController.addListener('msg.GW2C_RetUserInfo', this.OnGW2C_RetUserInfo);
        if (AudioController.disableMusic) {
            this.musicButtonSprite.spriteFrame = this.disableSpriteFrame;
            this.musicSprite.spriteFrame = this.musicDisableSpriteFrame;
        } else {
            this.musicButtonSprite.spriteFrame = this.enableSpriteFrame;
            this.musicSprite.spriteFrame = this.musicEnableSpriteFrame;
        }

        if (AudioController.disableEffect) {
            this.effectButtonSprite.spriteFrame = this.disableSpriteFrame;
            this.effectSprite.spriteFrame = this.effectDisableSpriteFrame;
        } else {
            this.effectButtonSprite.spriteFrame = this.enableSpriteFrame;
            this.effectSprite.spriteFrame = this.effectEnableSpriteFrame;
        }
    },
    start() {
        User.getPlayerGoods(function (datas) {
            this.datas = datas;
            this.onFreshView();
        }.bind(this));
        this.onClickPersonalInfo();
    },

    update(dt) {

    },
    onDestroy() {
        NetWorkController.removeListener('msg.GW2C_RetUserInfo', this.OnGW2C_RetUserInfo);
    },
    init(closeFunc, changeTabFunc) {
        this.closeFunc = closeFunc;
        this.changeTabFunc = changeTabFunc;
    },

    onClickPersonalInfo(event) {
        if (this.tagIndex == TagIndex.TagPersonal) {
            return;
        }
        this.tagIndex = TagIndex.TagPersonal;
        this.presonalInfoBtnSpr.spriteFrame = this.pressedSpriteFrame;
        this.undealBtnSpr.spriteFrame = this.nomalSpriteFrame;
        this.deliverdBtnSpr.spriteFrame = this.nomalSpriteFrame;
        this.infoNode.active = true;
        this.listNode.active = false;
        this.markerNode.x = -182;
        this.personalLabelNode.color = new cc.Color(255, 81, 81);
        this.undealLabelNode.color = new cc.Color(255, 255, 255);
        this.deliverLabelNode.color = new cc.Color(255, 255, 255);
        this.onFreshView();
    },

    onClickUndeal(event) {
        if (this.tagIndex == TagIndex.TagUndeal) {
            return;
        }
        this.tagIndex = TagIndex.TagUndeal;
        this.presonalInfoBtnSpr.spriteFrame = this.nomalSpriteFrame;
        this.undealBtnSpr.spriteFrame = this.pressedSpriteFrame;
        this.deliverdBtnSpr.spriteFrame = this.nomalSpriteFrame;
        this.infoNode.active = false;
        this.listNode.active = true;
        this.markerNode.x = 0;
        this.personalLabelNode.color = new cc.Color(255, 255, 255);
        this.undealLabelNode.color = new cc.Color(255, 81, 81);
        this.deliverLabelNode.color = new cc.Color(255, 255, 255);
        this.onFreshView();
    },

    onClickDeliverd(event) {
        if (this.tagIndex == TagIndex.TagDelever) {
            return;
        }
        this.tagIndex = TagIndex.TagDelever;
        this.presonalInfoBtnSpr.spriteFrame = this.nomalSpriteFrame;
        this.undealBtnSpr.spriteFrame = this.nomalSpriteFrame;
        this.deliverdBtnSpr.spriteFrame = this.pressedSpriteFrame;
        this.infoNode.active = false;
        this.listNode.active = true;
        this.markerNode.x = 182;
        this.personalLabelNode.color = new cc.Color(255, 255, 255);
        this.undealLabelNode.color = new cc.Color(255, 255, 255);
        this.deliverLabelNode.color = new cc.Color(255, 81, 81);
        this.onFreshView();
    },

    onClickMusic(event) {
        let disable = !AudioController.disableMusic;
        if (disable) {
            this.musicButtonSprite.spriteFrame = this.disableSpriteFrame;
            this.musicSprite.spriteFrame = this.musicDisableSpriteFrame;
        } else {
            this.musicButtonSprite.spriteFrame = this.enableSpriteFrame;
            this.musicSprite.spriteFrame = this.musicEnableSpriteFrame;
        }
        cc.sys.localStorage.setItem(Define.DATA_KEY.DISABLE_MUSIC, disable ? 'true' : 'false');
        NotificationController.postNotification(Define.EVENT_KEY.MUSIC_CHANGE, disable);
    },
    onClickEffect(event) {
        let disable = !AudioController.disableEffect;
        if (disable) {
            this.effectButtonSprite.spriteFrame = this.disableSpriteFrame;
            this.effectSprite.spriteFrame = this.effectDisableSpriteFrame;
        } else {
            this.effectButtonSprite.spriteFrame = this.enableSpriteFrame;
            this.effectSprite.spriteFrame = this.effectEnableSpriteFrame;
        }
        cc.sys.localStorage.setItem(Define.DATA_KEY.DISABLE_EFFECT, disable ? 'true' : 'false');
        NotificationController.postNotification(Define.EVENT_KEY.EFFECT_CHANGE, disable);
    },

    onClosePachageView() {
        Tools.invokeCallback(this.closeFunc);
    },

    onCheckAddr() {
        window["OpenDeliveryAddresses"]();
    },

    onBagInfo() {
        Tools.invokeCallback(this.changeTabFunc);
    },
    onGW2C_RetUserInfo(msgid, data) {
        this.priceLabel.string = data.sum + '元';
        this.updateHistoryList(data.list || []);
    },

    onFreshView() {
        switch (this.tagIndex) {
            case TagIndex.TagPersonal:
                NetWorkController.send('msg.C2GW_ReqUserInfo', {});
                cc.loader.load(User.loginInfo.face.slice(0, -4), function (err, texture) {
                    if (err) {
                    } else {
                        this.headSpr.spriteFrame = new cc.SpriteFrame(texture);
                    }
                }.bind(this));
                this.nameLabel.string = User.loginInfo.nickname;
                this.idLabel.string = 'Id:' + User.getUserId();
                break;
            case TagIndex.TagUndeal:
                let infosa = this.filterdatas([0, 1]);
                ResController.destoryAllChildren(this.packageItemParent);
                for (let i = 0; i < infosa.length; i++) {
                    let node = cc.instantiate(this.packageItemPrefab);
                    node.parent = this.packageItemParent;
                    let packageItemView = node.getComponent('PackageItemView');
                    packageItemView.init(infosa[i]);
                }
                this.packageScrollView.scrollToTop();
                break;
            case TagIndex.TagDelever:
                let infosb = this.filterdatas([2, 3]);
                ResController.destoryAllChildren(this.packageItemParent);
                for (let i = 0; i < infosb.length; i++) {
                    let node = cc.instantiate(this.packageItemPrefab);
                    node.parent = this.packageItemParent;
                    let packageItemView = node.getComponent('PackageItemView');
                    packageItemView.init(infosb[i]);
                }
                this.packageScrollView.scrollToTop();
                break;
            default:
                break;
        }
    },
    filterdatas(states) {
        let ret = [];
        for (let i = 0; i < this.datas.length; i++) {
            let data = this.datas[i];
            if (_.indexOf(states, parseInt(data.recordstate)) != -1) {
                ret.push(data);
            }
        }
        return ret;
    },
    updateHistoryList(lists) {
        this.historyInfoParentNode.removeAllChildren(true);
        for (let i = 0; i < lists.length; i++) {
            let node = new cc.Node('RichText');
            let richText = node.addComponent(cc.RichText);
            richText.string = lists[i];
            richText.fontSize = 19;
            node.width = 540;
            node.height = 45;
            node.anchorX = 0;
            node.x = -270;
            node.parent = this.historyInfoParentNode;
        }
        this.historyListScrollView.scrollToTop();
    },
});
