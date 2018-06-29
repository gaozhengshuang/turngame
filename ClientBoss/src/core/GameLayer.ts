module game {
    export class GameLayer extends eui.UILayer {
        /**
         * 场景层 如 战场、主城、副本战场之类的
         * @type {eui.UILayer}
         */
        static sceneLayer: eui.UILayer = new eui.UILayer();
        /**
         * 主UI层 如 底部功能栏
         * @type {eui.UILayer}
         */
        static mainLayer: eui.UILayer = new eui.UILayer();
        /**
         * 战斗场景层
         * @type {eui.UILayer}
         */
        static battleLayer: eui.UILayer = new eui.UILayer();
        /**
         * 弹窗层 如 设置、背包、装备之类的
         * @type {eui.UILayer}
         */
        static panelLayer: eui.UILayer = new eui.UILayer();
        /**
         * 特效层 如 闪烁、飘字之类的
         * @type {eui.UILayer}
         */
        static effectLayer: eui.UILayer = new eui.UILayer();
        static teachLayer: eui.UILayer = new eui.UILayer();
        /**
         * 加载遮罩层 场景切换的时候加载资源UI
         * @type {eui.UILayer}
         */
        static loadLayer: eui.UILayer = new eui.UILayer();
        static maskLayer: eui.UILayer = new eui.UILayer();

        constructor() {
            super();
            this.init();
        }

        private init() {
            this.touchThrough = true;
            GameLayer.sceneLayer.touchEnabled = false;
            GameLayer.mainLayer.touchEnabled = false;
            GameLayer.battleLayer.touchEnabled = false;
            GameLayer.panelLayer.touchEnabled = false;
            GameLayer.effectLayer.touchEnabled = false;
            GameLayer.teachLayer.touchEnabled = false;
            GameLayer.maskLayer.touchEnabled = false;
            GameLayer.loadLayer.touchEnabled = false;

            GameLayer.sceneLayer.touchThrough = true;
            GameLayer.mainLayer.touchThrough = true;
            GameLayer.battleLayer.touchThrough = true;
            GameLayer.panelLayer.touchThrough = true;
            GameLayer.effectLayer.touchThrough = true;
            GameLayer.teachLayer.touchThrough = true;
            GameLayer.maskLayer.touchThrough = true;
            GameLayer.loadLayer.touchThrough = true;

            this.addChild(GameLayer.sceneLayer);
            this.addChild(GameLayer.mainLayer);
            this.addChild(GameLayer.battleLayer);
            this.addChild(GameLayer.panelLayer);
            this.addChild(GameLayer.effectLayer);
            this.addChild(GameLayer.teachLayer);
            this.addChild(GameLayer.loadLayer);
            this.addChild(GameLayer.maskLayer);
        }
    }
}