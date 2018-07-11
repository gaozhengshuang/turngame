import async from 'async';
import _ from 'lodash';

import ConfigController from '../../Controller/ConfigController';
import NotificationController from '../../Controller/NotificationController';
import GameController from '../../Controller/GameController';
import NetWorkController from '../../Controller/NetWorkController';
import LoginController from '../../Controller/LoginController';
import AudioController from '../../Controller/AudioController';
import ResController from '../../Controller/ResController';
import Define from '../../Util/Define';
import Platform from '../../Util/Platform';
import UserModel from '../../Model/User';
import ItemModel from '../../Model/Item';


var GameComponent = require('../GameComponent');
cc.Class({
    extends: GameComponent,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // cc.director.setDisplayStats(false);
        cc.game.addPersistRootNode(this.node);
        //初始化游戏
        this.loaded = false;
        this.ctls = [
            ConfigController,
            NotificationController,
            NetWorkController,
            GameController,
            AudioController,
            LoginController,
            ResController
        ];

        this.models = [
            UserModel,
            ItemModel
        ];
        GameController.totalLoading = this.ctls.length + this.models.length + (Platform.PLATFORM == 'Normal' ? 0 : 1);
        async.waterfall([
            function (anext) {
                //初始化controller
                async.timesSeries(this.ctls.length, function (n, tnext) {
                    GameController.LoadedComplete();
                    let ctl = this.ctls[n];
                    if (ctl.init && _.isFunction(ctl.init)) {
                        ctl.init(function (err) {
                            tnext(err);
                        });
                    } else {
                        console.log(ctl);
                        console.log('[警告] 该controller没有init方法');
                        tnext(null);
                    }
                }.bind(this), function (err) {
                    anext(err);
                }.bind(this));
            }.bind(this),
            function (anext) {
                //初始化model
                async.timesSeries(this.models.length, function (n, tnext) {
                    GameController.LoadedComplete();
                    let model = this.models[n];
                    if (model.init && _.isFunction(model.init)) {
                        model.init(function (err) {
                            tnext(err);
                        });
                    } else {
                        console.log(model);
                        console.log('[警告] 该model没有init方法');
                        tnext(null);
                    }
                }.bind(this), function (err) {
                    anext(err);
                }.bind(this));
            }.bind(this),
        ], function (err) {
            if (err) {
                console.log(err);
            } else {
                this.loaded = true;
                cc.systemEvent.dispatchEvent(new cc.Event.EventCustom(Define.EVENT_KEY.LOADED_COMPLETE));
            }
        }.bind(this));

        this.windowEvent();
    },

    start() {
    },

    update(dt) {
        if (this.loaded) {
            for (let i = 0; i < this.ctls.length; i++) {
                let ctl = this.ctls[i];
                if (!!ctl.update && typeof ctl.update === 'function') {
                    ctl.update(dt);
                }
            }
        }
    },

    //系统前后台
    windowEvent() {
        window.onbeforeunload = function () {
        }
    }
});
