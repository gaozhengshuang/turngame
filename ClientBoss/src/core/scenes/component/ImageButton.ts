module game {
    export class ImageButton extends EffectButton {
        bgDisplay: eui.Image;
        private _bg: string;
        set bg(value: string) {
            this._bg = value;
            if (this.bgDisplay) {
                this.bgDisplay.source = value;
            }
        }

        imageDisplay: eui.Image;
        private _image: string;
        set image(value: string) {
            this._image = value;
            if (this.imageDisplay) {
                this.imageDisplay.source = value;
            }
        }

        set imageScale(value: number) {
            if (this.imageDisplay) {
                this.imageDisplay.scaleY = this.imageDisplay.scaleX = value
            }
        }

        setBgSize(number: number, number2: number) {
            if (this.bgDisplay) {
                this.bgDisplay.width = number;
                this.bgDisplay.height = number2;
            }
        }

        set bgScale(value: number) {
            if (this.bgDisplay) {
                this.bgDisplay.scaleY = this.bgDisplay.scaleX = value
            }
        }
    }
}