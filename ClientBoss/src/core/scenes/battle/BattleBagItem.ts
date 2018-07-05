module game {
    export class BattleBagItem extends eui.ItemRenderer {
        itemImg: eui.Image;
        itemMask: eui.Image;
        itemName: eui.Label;
        itemNum: eui.Label;
        itemMoney: eui.Label;
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
            let list: msg.IDeliveryGoods[] = [{itemid: this.data.id, num: this.data.num}];
            sendMessage("msg.C2GW_ReqDeliveryGoods", msg.C2GW_ReqDeliveryGoods.encode({list: list, token: ""}));
        }

        protected dataChanged() {
            let _data = table.ItemBaseDataById[this.data.id];
            if (!_data) {
                egret.log(`${this.data.id}找不到道具!`);
                this.visible = false;
                return;
            }

            this.itemImg.source = getItemIconSource(_data.Id);
            this.itemName.text = _data.Name;
            if (_data.Id == 6003) { //(代表这是金币)
                this.itemMoney.text = "";
            } else {
                this.itemMoney.text = "价值："+_data.Sold+"元";
            }
            this.itemNum.text = "X"+this.data.num;
        }
    }
}