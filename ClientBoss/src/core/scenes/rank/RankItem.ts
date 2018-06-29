module game {
    export class RankItem extends eui.ItemRenderer {
        avatar: Avatar;
        rankLabel: eui.Label;
        nameLabel: eui.Label;
        scoreLabel: eui.Label;
        itemBg: eui.Image;
        data: IRankInfo;

        constructor() {
            super();
            this.skinName = RankItemSkin;
        }

        protected dataChanged() {
            this.setData(this.data);
            if (this.data.rank % 50 == 0) {
                RankPanel.getInstance().updateRank(this.data.rank);
            }
        }

        public setData(data: IRankInfo) {
            if (data.rank) {
                let rank = data.rank;
                this.rankLabel.text = `${rank}.`;
                this.scoreLabel.text = `${data.score}`;
                switch (rank) {
                    case 1:
                        this.rankLabel.textColor = 0xfa0011;
                        break;
                    case 2:
                        this.rankLabel.textColor = 0xe3ad31;
                        break;
                    case 3:
                        this.rankLabel.textColor = 0x7394f5;
                        break;
                    default:
                        this.rankLabel.textColor = 0x9c62ff;
                        break;
                }
            } else {
                this.rankLabel.text = "未入榜";
                this.rankLabel.textColor = 0x9c62ff;
                this.scoreLabel.text = "";
            }
            this.setItemBg(data.rank);
            this.avatar.setAvatar(data.face, false);
            this.nameLabel.text = data.name;
        }

        public setItemBg(rank:number) {
            this.itemBg.visible = rank%2 == 0
        }
    }
}