module game {
    export class SceneManager {
        private static _curSceneType: SceneType;
        private static _curScene: SceneComponent;
        private static _lastSceneType: SceneType;

        public static async changeScene(sceneType: SceneType, force: boolean = false, userdata: any = null) {
            if (this._curSceneType == sceneType && !force) return;
            if (this._curScene) {
                this._lastSceneType = this._curSceneType;
                this._curScene.remove();
                this._curScene = null;
            }
            this._curSceneType = sceneType;
            switch (sceneType) {
                case SceneType.battle:
                    this._curScene = BattleScene.getInstance();
                    BattleScene.getInstance().setData(userdata);
                    break;
                case SceneType.main:
                    this._curScene = MainScene.getInstance();
                    break;
                case SceneType.login:
                    this._curScene = LoginScene.getInstance();
                    break;
            }
            if (this._curScene) {
                await this._curScene.loadRes();
                this._curScene.show();
            }
        }

        public static backLastScene() {
            if (this._lastSceneType) {
                this.changeScene(this._lastSceneType);
            }
        }
    }

    export const enum SceneType {
        battle,
        main,
        login
    }
}