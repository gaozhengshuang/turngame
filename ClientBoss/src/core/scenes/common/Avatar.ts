module game {
    export class Avatar extends GameComponent {
        avatarImage: eui.Image;
        selectImage: eui.Image;

        protected getSkinName() {
            return AvatarSkin;
        }

        public setAvatar(avatar: string, self: boolean) {
            this.avatarImage.source = avatar;
            this.selectImage.visible = self;
        }
    }
}