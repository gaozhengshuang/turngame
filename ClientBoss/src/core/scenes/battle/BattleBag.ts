module game {
    export class BattleBag extends PanelComponent {
        closeButton: IconButton;
        luckyButton: IconButton;
        bagScr: eui.Scroller;
        bagList: eui.List;
        nogiftTips: eui.Label;

        private _listProvider: eui.ArrayCollection;

        protected getSkinName() {
            return BattleBagSkin;
        }

        protected init() {
            this.closeButton.icon = "lucky/luckycloseBtn";
            this.luckyButton.icon = "lucky/luckyBtn";

            this._listProvider = new eui.ArrayCollection();
            this.bagList.dataProvider = this._listProvider;
            this.bagList.itemRenderer = BattleBagItem;
        }

        protected beforeShow() {
            this._touchEvent = [
                {target: this.closeButton, callBackFunc: this.closeHandle},
                {target: this.luckyButton, callBackFunc: this.luckyHandle},
            ];
            this.registerEvent();

            this.updateList();
        }

        protected beforeRemove() {
            this.removeEvent();
        }

        private registerEvent() {
            NotificationCenter.addObserver(this, this.updateList, PlayerModel.BAG_UPDATE);
        }

        private removeEvent() {
            NotificationCenter.removeObserver(this, PlayerModel.BAG_UPDATE);
        }

        public updateList() {
            this._listProvider.removeAll();
            for (let v of DataManager.playerModel.getBag()) {
                this._listProvider.addItem(v);
            }
            this.bagScr.viewport.scrollV = 0;

            this.nogiftTips.visible = DataManager.playerModel.getBag().length == 0;
        }

        private closeHandle() {
            this.remove();
        }

        private luckyHandle() {
            this.closeHandle();
            openPanel(PanelType.lucky);
        }

        private static _instance: BattleBag;

        public static getInstance(): BattleBag {
            if (!BattleBag._instance) {
                BattleBag._instance = new BattleBag();
            }
            return BattleBag._instance;
        }
    }
}