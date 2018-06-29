module game {
    export class SceneComponent extends GameComponent {
        protected _isShow:boolean = false;
        public async loadRes() {

        }

        public show() {
            this.beforeShow();
            this.resetSize();
            this.addEventAndNotify();
            GameLayer.sceneLayer.addChild(this);
            this._isShow = true;
        }

        protected beforeShow() {

        }

        protected resetSize() {
            this.width = gameConfig.curWidth();
            this.height = gameConfig.curHeight();
        }

        public remove() {
            this.beforeRemove();
            this.removeEventAndNotify();
            this.removeFromParent();
            this._isShow = false;
        }

        protected beforeRemove() {

        }
    }
}