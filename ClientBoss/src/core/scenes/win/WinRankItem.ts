module game {
    export class WinRankItem extends GameComponent {
        avatar: Avatar;
        rankLabel: eui.Label;
        nameLabel: eui.Label;
        scoreLabel: eui.Label;

        protected getSkinName() {
            return WinRankItemSkin;
        }

        public setInfo(info: IRankInfo) {
            let isSelf = info.userid == DataManager.playerModel.userInfo.userid;
            this.avatar.setAvatar(info.face, isSelf);
            this.nameLabel.text = info.name;
            this.scoreLabel.text = info.score.toString();
            this.rankLabel.text = `${info.rank}`;
        }
    }
}