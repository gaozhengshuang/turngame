declare var platform;

module game {
    export function run() {
        // gameConfig.curStage().once(egret.TouchEvent.TOUCH_BEGIN, () => {
        //     initWebAudio();
        // }, this);

        window.onerror = function (message: string, filename?: string, lineno?: number, colno?: number, error?: Error): void {
            let msg = `${message} @${filename} line: ${lineno} col:${colno}`;
            if (error)
                msg += `\n${error.stack}`;
            //todo 客户端错误上传
        };
        //配置表加载
        DataManager.init();
        SoundManager.init();

        createMainScene();
    }

    let inited = false;

    export async function createMainScene() {
        if (game.$isWx) {
            WXLogin();
            platform.showShareMenu();
            SceneManager.changeScene(SceneType.main, false);
        } else {
            SceneManager.changeScene(SceneType.login, false);
        }
    }

    export async function WXLogin() {
        const loginRes = await platform.login();
        const playerInfo: WxUserInfo = await platform.getUserInfo();
        let userInfo = DataManager.playerModel.userInfo;
        userInfo.token = loginRes.code;
        userInfo.name = playerInfo.nickName;
        userInfo.face = playerInfo.avatarUrl;
    }
}

window["game"] = game;