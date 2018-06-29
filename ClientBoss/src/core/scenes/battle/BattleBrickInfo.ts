module game {
    export class BattleBrickInfo extends GameComponent {
        brickImage: eui.Image;
        priceLabel: eui.Label;

        protected getSkinName() {
            return BattleBrickInfoSkin;
        }

        public setData(brickId: number, p: number[], ball: number) {
            this.brickImage.source = `cube/${brickId}/${p[3]}`;
            this.priceLabel.textFlow = [
                {text: `${ball}`, style: {fontFamily: "DynoBold"}},
            ]
        }
    }
}