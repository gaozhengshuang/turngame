module game {
    export class LuckyItem extends eui.Component {
        itemImg: eui.Image;
        itemName: eui.Label;

        setItem(path: string, name: string) {
            if (this.itemImg) {
                this.itemImg.source = path;
            }

            if (this.itemName) {
                this.itemName.text = name;
            }
        }
    }

    window["game.LuckyItem"] = game.LuckyItem;
}