module game {
    export class LabelButton extends EffectButton {
        bgDisplay: eui.Image;
        private _bg: string;
        set bg(value: string) {
            this._bg = value;
            if (this.bgDisplay) {
                this.bgDisplay.source = value;
            }
        }

        labelDisplay: eui.Label;
        private _label: string;
        set label(value: string) {
            this._label = value;
            if (this.labelDisplay) {
                this.labelDisplay.text = value;
            }
        }

        set labelSize(value: number) {
            if (this.labelDisplay) {
                this.labelDisplay.size = value;
            }
        }
    }

    window["game.LabelButton"] = game.LabelButton;
}