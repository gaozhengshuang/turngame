module game {
    import buffCollisionGroup = gameConfig.buffCollisionGroup;
    import paddleCollisionGroup = gameConfig.paddleCollisionGroup;

    export class BattleBuff extends BattleBody {
        buffImage: eui.Image;
        goldLabel: eui.BitmapLabel;

        public body: p2.Body;
        private _shape: p2.Box;
        public buffId: number;
        private _buffData: table.ITBirckItemDefine;
        public now: number;

        protected init() {
            this.body = new p2.Body();
            this.body.displays = [this];
            this.body.type = p2.Body.DYNAMIC;
            this.battleBodyType = BattleBodyType.buff;
        }

        protected getSkinName() {
            return BattleBuffSkin;
        }

        public setData(buffData: table.ITBirckItemDefine, x: number, y: number, material: p2.Material) {
            this.buffImage.source = `buff/${buffData.Id}`;
            this.buffId = buffData.Id;
            this._buffData = buffData;
            if (buffData.Id == 3) {
                this.width = 76;
                this.height = 60;
                this.goldLabel.visible = true;
                this.goldLabel.text = "1";
            } else {
                this.width = this.height = 38;
                this.goldLabel.visible = false;
            }
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            this._shape = new p2.Box({width: this.width / gameConfig.factor, height: this.height / gameConfig.factor});
            this.x = x;
            this.y = y;
            let bodyX = x / gameConfig.factor;
            let bodyY = y / gameConfig.factor;
            this.body.position = [bodyX, bodyY];
            this._shape.collisionGroup = buffCollisionGroup;
            this._shape.collisionMask = paddleCollisionGroup;
            this._shape.material = material;
            this.body.addShape(this._shape);
        }

        public updateView() {
            this.x = this.body.position[0] * gameConfig.factor;
            this.y = this.body.position[1] * gameConfig.factor;
        }

        onDestroy() {
            if (this.body.world) {
                this.body.world.removeBody(this.body);
            }
            if (this.body.shapes.length > 0) {
                for (let shape of this.body.shapes) {
                    this.body.removeShape(shape);
                }
            }
            this.removeFromParent();
        }
    }
}