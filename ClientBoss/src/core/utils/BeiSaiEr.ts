module game {
    export class BeiSaiEr {
        private _obj: any = null;

        private pos0: Array<number> = null;
        private pos1: Array<number> = null;
        private pos2: Array<number> = null;

        public setObject(obj) {
            this._obj = obj;
        }

        private get factor() {
            return 0;
        }

        private set factor(value: number) {
            this._obj.x = (1 - value) * (1 - value) * this.pos0[0] + 2 * value * (1 - value) * this.pos1[0] + value * value * this.pos2[0];
            this._obj.y = (1 - value) * (1 - value) * this.pos0[1] + 2 * value * (1 - value) * this.pos1[1] + value * value * this.pos2[1];
        }

        public set p1p2p3(posArr: Array<Array<number>>) {
            this.pos0 = posArr[0];
            this.pos1 = posArr[1];
            this.pos2 = posArr[2];
        }

        public play(time: number, onComplete?: Function, ease?: Function) {
            egret.Tween.get(this)
                .to({factor: 1}, time, ease)
                .call(() => {
                    if (onComplete)
                        onComplete();
                }, this);
        }
    }
}