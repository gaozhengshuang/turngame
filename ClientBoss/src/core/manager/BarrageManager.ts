module game {
    export class BarrageManager {
        runTime: number = 10;
        delayTime: number = 1;
        systemNotice: Array<SystemNotice>;
        noticeRunY: Array<NoticeRunY>;
        _posY: number[] = [200, 280, 360];
        _curSystem: number = 0;

        public init() {
            //初始化滚动数据
            this.systemNotice = new Array<SystemNotice>();
            this.noticeRunY = new Array<NoticeRunY>();
            for (let i = 0; i < this._posY.length; i++) {
                this.noticeRunY.push({
                    index: i,
                    isRun: false
                });
            }

            //添加系统消息监听
            // NotificationCenter.addObserver(this, this.OnGW2C_MsgNotice, "msg.GW2C_MsgNotice");
            NotificationCenter.addObserver(this, this.OnGW2C_MsgNotify, "msg.GW2C_MsgNotify");
        }

        // private OnGW2C_MsgNotice(data: msg.IGW2C_MsgNotice) {
        //     if (data.type == 1)
        //         this.addNotice(data.face, data.text);
        // }

        private OnGW2C_MsgNotify(data: msg.IGW2C_MsgNotify) {
            showTips(data.text);
        }

        // public addNotice(headPath: string, text: string) {
        //     this.systemNotice.push({
        //         headPath: headPath,
        //         text: text,
        //     });

        //     this.runNotice();
        // }

        // private runNotice() {
        //     if (this.systemNotice.length > 0) {
        //         for (let i = 0; i < this.noticeRunY.length; i++) {
        //             let runInfo = this.noticeRunY[i];
        //             if (!runInfo.isRun) {
        //                 this.noticeRunY[i].isRun = true;

        //                 let notice = this.systemNotice[this._curSystem++];
        //                 let barragePanel = new BarragePanel();
        //                 barragePanel.ShowBarrage(notice.headPath, notice.text);
        //                 GameLayer.effectLayer.addChild(barragePanel);
        //                 this.run(barragePanel, runInfo.index);
        //                 break;
        //             }
        //         }
        //     }
        // }

        // private run(gameObj: GameComponent, indexY: number) {
        //     this._curSystem--;
        //     this.systemNotice.splice(0, 1);

        //     gameObj.x = 900;
        //     gameObj.y = this._posY[indexY];
        //     egret.Tween.get(gameObj).to({x: -640}, this.runTime * 1000).wait(this.delayTime * 1000).call(() => {
        //         this.noticeRunY[indexY].isRun = false;
        //         gameObj.removeFromParent();
        //         if (this.systemNotice.length > 0) {
        //             this.runNotice();
        //         }
        //     });
        // }

        private static _instance: BarrageManager;

        public static getInstance(): BarrageManager {
            if (!BarrageManager._instance) {
                BarrageManager._instance = new BarrageManager();
            }
            return BarrageManager._instance;
        }
    }

    export interface SystemNotice {
        headPath: string,
        text: string
    }

    export interface NoticeRunY {
        index: number,
        isRun: boolean
    }
}