module game {
    export class BattleManager {
        isRetStartGame: boolean = true;
        roomId: number|Long = 0;

        public init() {
            //添加系统消息监听
            NotificationCenter.addObserver(this, this.OnGW2C_RetStartGame, "msg.GW2C_RetStartGame");
            NotificationCenter.addObserver(this, this.OnBT_GameInit, "msg.BT_GameInit");
            NotificationCenter.addObserver(this, this.OnBT_SendBattleUser, "msg.BT_SendBattleUser");
            NotificationCenter.addObserver(this, this.OnBT_GameStart, "msg.BT_GameStart");
        }

        private OnGW2C_RetStartGame(data: msg.GW2C_RetStartGame) {
            this.isRetStartGame = true;
            this.roomId = data.roomid;
            if (data.errcode == "") {
                sendMessage("msg.BT_ReqEnterRoom", msg.BT_ReqEnterRoom.encode({
                    roomid: data.roomid,
                    userid: DataManager.playerModel.getUserId()
                }));
            } else {
                showTips(data.errcode, true);
            }
        }

        private OnBT_GameInit(data: msg.BT_GameInit) {
            
        }

        private OnBT_SendBattleUser(data: msg.BT_SendBattleUser) {
            DataManager.playerModel.setScore(data.gold);
        }

        private OnBT_GameStart(data: msg.BT_GameStart) {
            DataManager.playerModel.battleStart();
            SoundManager.playEffect("play");
            SceneManager.changeScene(SceneType.battle);
        }

        public getRoomId() {
            return this.roomId;
        }

        private static _instance: BattleManager;

        public static getInstance(): BattleManager {
            if (!BattleManager._instance) {
                BattleManager._instance = new BattleManager();
            }
            return BattleManager._instance;
        }
    }

}