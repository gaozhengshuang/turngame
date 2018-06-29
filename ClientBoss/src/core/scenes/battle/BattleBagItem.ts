module game {
    export class BattleBagItem extends eui.ItemRenderer {
        itemImg: eui.Image;
        itemMask: eui.Image;
        itemName: eui.Label;
        itemNum: eui.Label;
        itemMoney: eui.Label;
        itemDesc: eui.Label;
        getButton: IconButton;
        data;

        constructor() {
            super();
            this.skinName = BattleBagItemSkin;
            this.getButton.icon = "lucky/bagget";

            this.getButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getHandle, this);

            this.itemImg.mask = this.itemMask;
        }

        private getHandle() {
            for (let i = 0; i < DataManager.playerModel.getBag().length; i++) {
                let bagInfo = DataManager.playerModel.getBag()[i];
                if (bagInfo.id == this.data.id) {
                    let giftInfo = table.TBallGiftById[bagInfo.id];
                    if (giftInfo.Num > 1) { //临时代码 (代表这是金币)
                        DataManager.playerModel.addScore(bagInfo.num * giftInfo.Num);
                    }

                    DataManager.playerModel.getBag().splice(i,1);
                    showTips("提取奖品成功!");
                    break;
                }
            }

            BattleBag.getInstance().updateList();
        }

        protected dataChanged() {
            let _data = table.TBallGiftById[this.data.id];
            if (!_data) {
                egret.log(`${this.data.id}找不到道具!`);
                this.visible = false;
                return;
            }

            this.itemImg.source = _data.Path;
            this.itemName.text = _data.Name;
            this.itemDesc.text = _data.Info;
            if (_data.Num > 1) { //临时代码 (代表这是金币)
                this.itemMoney.text = "";
            } else {
                this.itemMoney.text = "价值："+_data.Cost+"元";
            }
            this.itemNum.text = "X"+this.data.num;
        }
    }
}