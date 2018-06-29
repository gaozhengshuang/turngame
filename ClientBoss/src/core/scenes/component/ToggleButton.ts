module game {
    export class ToggleButton extends EffectButton {
        iconDisplay: eui.Image;
        private _normalIcon: string;
        private _selectIcon: string;
        private _select: boolean = false;

        public setIcon(normal: string, select: string) {
            this._normalIcon = normal;
            this._selectIcon = select;
            this.select = this._select;
        }

        set select(value: boolean) {
            this._select = value;
            if (!this.iconDisplay) return;
            if (value) {
                this.iconDisplay.source = this._selectIcon;
            } else {
                this.iconDisplay.source = this._normalIcon;
            }
        }
    }

    window["game.ToggleButton"] = game.ToggleButton;
}