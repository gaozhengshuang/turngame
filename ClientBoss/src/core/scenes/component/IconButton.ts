module game {
    export class IconButton extends EffectButton {
        iconDisplay: eui.Image;
        private _icon: string;
        set icon(value: string) {
            this._icon = value;
            if (this.iconDisplay) {
                this.iconDisplay.source = value;
            }
        }
    }

    window["game.IconButton"] = game.IconButton;
}