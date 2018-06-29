module game {
    const TWO_PI = Math.PI * 2;
    let vertices = [];

    export function triangulate(imgWidth: number, imgHeight: number) {
        let rings = [
            {
                r: 50,
                c: 12
            },
            {
                r: 150,
                c: 12
            },
            {
                r: 300,
                c: 12
            },
            {
                r: 1200,
                c: 12
            }
        ], x, y, centerX = imgWidth / 2, centerY = imgHeight / 2;
        vertices.push([
            centerX,
            centerY
        ]);
        for (let ring of rings) {
            let radius = ring.r, count = ring.c, variance = radius * 0.25;
            for (let i = 0; i < count; i++) {
                x = Math.cos(i / count * TWO_PI) * radius + centerX + randomRange(-variance, variance);
                y = Math.sin(i / count * TWO_PI) * radius + centerY + randomRange(-variance, variance);
                vertices.push([
                    x,
                    y
                ]);
            }
        }
        for (let v of vertices) {
            v[0] = clamp(v[0], 0, imgWidth);
            v[1] = clamp(v[1], 0, imgHeight);
        }
        vertices.forEach(function (v) {
            v[0] = clamp(v[0], 0, imgWidth);
            v[1] = clamp(v[1], 0, imgHeight);
        });
        return Delaunay.triangulate(vertices);
    }

    export function shatter(indices: number[], image: egret.Bitmap) {
        let fragmentList = [];
        let p0, p1, p2, fragment: GameFragment;
        for (let i = 0; i < indices.length; i += 3) {
            p0 = vertices[indices[i + 0]];
            p1 = vertices[indices[i + 1]];
            p2 = vertices[indices[i + 2]];
            fragment = new GameFragment(p0, p1, p2, image);
            fragmentList.push(fragment);
        }
        return fragmentList;
    }

    export class GameFragment {
        private v0: number[];
        private v1: number[];
        private v2: number[];
        private box: fragmentBox;
        private centroid: number[];
        private renderTexture: egret.RenderTexture;
        private baseImage: egret.Bitmap;
        public bitmap: egret.Bitmap;

        constructor(v0: number[], v1: number[], v2: number[], baseImage: egret.Bitmap) {
            this.v0 = v0;
            this.v1 = v1;
            this.v2 = v2;
            this.baseImage = baseImage;
            this.computeBoundingBox();
            this.computeCentroid();
            this.createCanvas();
            this.clip();
        }

        private createCanvas() {
            this.renderTexture = new egret.RenderTexture();
        }

        private clip() {
            const shp: egret.Shape = new egret.Shape();
            shp.graphics.beginFill(0xff0000, 1);
            shp.graphics.moveTo(this.v0[0], this.v0[1]);
            shp.graphics.lineTo(this.v1[0], this.v1[1]);
            shp.graphics.lineTo(this.v2[0], this.v2[1]);
            shp.graphics.endFill();
            this.renderTexture = new egret.RenderTexture();
            this.renderTexture.drawToTexture(this.baseImage);
            this.bitmap = new egret.Bitmap(this.renderTexture);
            this.bitmap.mask = shp;
        }

        private computeBoundingBox() {
            let xMin = Math.min(this.v0[0], this.v1[0], this.v2[0]),
                xMax = Math.max(this.v0[0], this.v1[0], this.v2[0]),
                yMin = Math.min(this.v0[1], this.v1[1], this.v2[1]),
                yMax = Math.max(this.v0[1], this.v1[1], this.v2[1]);
            this.box = {
                x: xMin,
                y: yMin,
                w: xMax - xMin,
                h: yMax - yMin
            };
        }

        private computeCentroid() {
            let x = (this.v0[0] + this.v1[0] + this.v2[0]) / 3, y = (this.v0[1] + this.v1[1] + this.v2[1]) / 3;
            this.centroid = [
                x,
                y
            ];
        }


    }

    export interface fragmentBox {
        x: number,
        y: number,
        w: number,
        h: number
    }
}