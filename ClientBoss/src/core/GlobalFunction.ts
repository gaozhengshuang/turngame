module game {
    //显示等待界面
    export function showWaitPanel(type = 0) {
        gameConfig.curStage().touchChildren = false;
        //game.WaitPanel.getInstance().show();
    }

    //移除界面
    export function hideWaitPanel() {
        gameConfig.curStage().touchChildren = true;
        //game.WaitPanel.getInstance().hide();
    }

    //获取html文本
    export function getTextFlow(str: string): egret.ITextElement[] {
        let styleParser = new egret.HtmlTextParser();
        return styleParser.parser(str);
    }

    export let TipsPool: ObjectPool<egret.TextField> = new ObjectPool<egret.TextField>(egret.TextField);
    export let TipsImagePool: ObjectPool<eui.Image> = new ObjectPool<eui.Image>(eui.Image);

    export function showTips(str: string = "", isWarning: boolean = false, moveY: number = 220, y?: number, textColor?: number): void {
        let effectTips = TipsPool.createObject();

        effectTips.size = 30;
        if (y) {
            effectTips.y = y;
        } else {
            effectTips.y = gameConfig.curHeight() / 2;
        }
        if (textColor) {
            effectTips.textColor = textColor;
            effectTips.stroke = 0;
        } else {
            effectTips.stroke = 2;
            if (isWarning) {
                effectTips.strokeColor = gameConfig.TextColors.red;
            } else {
                effectTips.strokeColor = gameConfig.TextColors.blue;
            }
            effectTips.textColor = gameConfig.TextColors.white;
        }
        effectTips.alpha = 1;

        effectTips.text = str;
        effectTips.x = gameConfig.curWidth() / 2 - effectTips.width / 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;

        if (!GameLayer.maskLayer.contains(effectTips)) {
            GameLayer.maskLayer.addChild(effectTips);
        }

        let onComplete2: Function = function () {
            if (GameLayer.maskLayer.contains(effectTips)) {
                GameLayer.maskLayer.removeChild(effectTips);
                TipsPool.destroyObject(effectTips);
            }
        };

        effectTips.visible = true;
        egret.Tween.get(effectTips).to({
            alpha: 1
        }, 500).wait(500).to({alpha: 1}, 500).call(onComplete2, this);
        egret.Tween.get(effectTips).to({
            y: effectTips.y - moveY,
        }, 800, egret.Ease.backOut);
    }

    export function showTipsImage(id: number): void {
        let effectTips = TipsImagePool.createObject();


        effectTips.y = gameConfig.curHeight() / 2;
        effectTips.alpha = 0;
        effectTips.source = `lang/${id}`;
        effectTips.horizontalCenter = 0;

        if (!GameLayer.effectLayer.contains(effectTips)) {
            GameLayer.effectLayer.addChild(effectTips);
        }

        let onComplete2: Function = function () {
            if (GameLayer.effectLayer.contains(effectTips)) {
                GameLayer.effectLayer.removeChild(effectTips);
                TipsImagePool.destroyObject(effectTips);
            }
        };

        effectTips.visible = true;
        egret.Tween.get(effectTips).to({
            alpha: 1
        }, 500).wait(500).to({alpha: 0}, 500).call(onComplete2, this);
        egret.Tween.get(effectTips).to({
            y: effectTips.y - 220,
        }, 800, egret.Ease.backOut);
    }

    export function delay(time: number) {
        let d = defer();
        egret.setTimeout(() => {
            d.resolve(null);
        }, this, time);
        return d.promise();
    }

    export function parseCSV(csv: string): Array<Array<string>> {
        let lines = [];
        let line = [];
        let inQuote = false;
        let str = "";
        for (let i = 0; i < csv.length; ++i) {
            let c = csv[i];
            if (!inQuote) {
                if (c == ",") {
                    line.push(str);
                    str = "";
                } else if (c == "\n") {
                    line.push(str);
                    str = "";
                    lines.push(line);
                    line = [];
                } else if (c == "\"")
                    inQuote = true;
                else
                    str += c;
            } else {
                if (c == "\"") {
                    if (i < csv.length - 1 && csv[i + 1] == "\"")
                        str += c;
                    inQuote = false;
                } else
                    str += c;
            }
        }
        return lines;
    }

    export function splitStringToNumberArray(str: string, splitStr: string = "|", splitStr2 = ";") {
        let strArray = str.split(splitStr);
        let numberArray = [];
        for (let i = 0; i < strArray.length; i++) {
            if (strArray[i] == "") continue;
            if (strArray[i].indexOf(splitStr2) > -1) {
                numberArray.push(splitStringToNumberArray(strArray[i], splitStr2));
            } else {
                numberArray.push(Number(strArray[i]));
            }
        }
        return numberArray;
    }

    export function loadUrl(url: string, type?: string) {
        let d = defer<any>();
        RES.getResByUrl(url, (data, _url) => {
            if (data) {
                d.resolve(data);
            }
            else {
                d.reject({message: "IOError:" + _url});
            }
        }, this, type);

        return d.promise();
    }

    export function loadRes(res: string) {
        let d = defer();
        RES.getResAsync(res, (data, key) => {
            if (data) {
                d.resolve(data);
            } else {
                d.reject({message: "IOError:" + res})
            }
        }, this);
        return d.promise();
    }

    export interface LootItem<T> {
        Id: number;
        pro: number;
        data?: T;
    }

    export function loot<T>(totalInfo: Array<any>, rand?: Random): LootItem<T> {
        let totalPercent: number = 0;
        let i: number;
        for (i = 0; i < totalInfo.length; i++) {
            totalPercent += totalInfo[i].pro;
        }
        let randomNum = 0;
        if (rand) {
            randomNum = rand.Next(0, totalPercent);
        } else {
            randomNum = Math.random() * totalPercent;
        }
        let value = 0;
        for (i = 0; i < totalInfo.length; i++) {
            value += totalInfo[i].pro;
            if (randomNum < value) {
                return totalInfo[i];
            }
        }
    }

    export function lootEvent(event: number[]): number {
        let randomNum = Math.random();
        let value = 0;
        let pos = 1;
        for (let i = 0; i < event.length; i++) {
            value += event[i];
            if (randomNum < value) {
                pos = i + 1;
                break;
            }
        }
        return pos;
    }

    export function lootPro(event: ProInfo[]): number {
        let randomNum = Math.random();
        let info = {id:6, pro:0.33};
        let value = 0;
        for (let i = 0; i < event.length; i++) {
            value += event[i].pro;
            if (randomNum < value) {
                info = event[i];
                break;
            }
        }
        return info.id;
    }

    export function setNumber(num: number): string {
        let tempNum: string = Math.floor(num).toString();
        let len = tempNum.length;
        switch (len) {
            case 1://个
            case 2://十
            case 3://百
            case 4://千
            case 5://万
                return tempNum;
            case 6://十万
            case 7://百万
            case 8://千万
                var num1 = Math.floor(num / 10000);
                var num2 = Math.floor((num - num1 * 10000) / 1000).toString().slice(0, 1);
                if (num2 == "0") {
                    tempNum = num1 + "万";
                } else {
                    tempNum = num1 /*+ "." + num2 */ + "万";
                }
                break;
            default:
                var num1 = Math.floor(num / 100000000);
                var num2 = Math.floor((num - num1 * 100000000) / 10000).toString();
                if (num2 == "0") {
                    tempNum = num1 + "亿";
                } else {
                    tempNum = num1 + "亿" + num2 + "万";
                }
                break;
        }
        return tempNum;
    }

    export function formatString(str: string, ...parms) {
        if (!str || !parms || parms.length == 0) return;
        for (let i = 0; i < parms.length; i++) {
            if (parms[i] == null) continue;
            str = str.replace(`{${i}}`, parms[i].toString())
        }
        return str;
    }

    export function copyObject(object: any, r: any = null) {
        r = r || {};
        for (let i in object) {
            if (object.hasOwnProperty(i)) {
                if (typeof object[i] === "object") {
                    if (!object[i]) {
                        r[i] = null;
                    } else {
                        r[i] = (object[i].constructor === Array) ? [] : {};
                        copyObject(object[i], r[i]);
                    }
                } else {
                    r[i] = object[i];
                }
            }
        }
        return r;
    }

    export interface Dictionary<TValue> {
        [key: string]: TValue;

        [key: number]: TValue;
    }

    export function ToNumber(val: string): number {
        if (!val)
            return undefined;
        return Number(val);
    }

    export let DarkRectPool: ObjectPool<eui.Rect> = new ObjectPool<eui.Rect>(eui.Rect);

    export function checkPointAtRect(pointX: number, pointY: number, rectX: number, rectY: number, rectWidth: number, rectHeight: number) {
        return pointX >= rectX && pointX <= (rectX + rectWidth) && pointY >= rectY && pointY <= (rectY + rectHeight);
    }

    export function parseColorText(str: string): Array<egret.ITextElement> {
        if (!str) return [];
        let colorArray = str.match(/\[(.+?)\]/g);
        let textArray = str.split(/\[.*?\]/);
        let resultArray = [];
        if (colorArray) {
            for (let i = 0; i < colorArray.length; i++) {
                colorArray[i] = colorArray[i].substr(1, colorArray[i].length - 2);
            }
            for (let i = 1; i < textArray.length; i++) {
                resultArray.push({text: textArray[i], style: {textColor: parse16Color(colorArray[i - 1])}});
            }
        } else {
            for (let i = 0; i < textArray.length; i++) {
                resultArray.push({text: textArray[i], color: 0x000000});
            }
        }
        return resultArray;
    }

    export function parse16Color(colorStr: string) {
        if (colorStr.indexOf("#") > -1) {
            colorStr = colorStr.replace("#", "0x");
        } else {
            colorStr = "0x" + colorStr;
        }
        return Number(colorStr);
    }

    export function createColorText(str: string) {
        let textArray = parseColorText(str);
        let levelThreeReedLabel = new eui.Label();
        levelThreeReedLabel.textFlow = [];
        for (let i = 0; i < textArray.length; i++) {
            levelThreeReedLabel.textFlow.push(textArray[i])
        }
        levelThreeReedLabel.lineSpacing = 10;
        return levelThreeReedLabel;
    }

    export function angle(startX: number, startY: number, endX: number, endY: number) {
        let diff_x = endX - startX,
            diff_y = endY - startY;
        //返回角度,不是弧度
        return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
    }

    export function deleteBlank(str: string) {
        return str.replace(/\s+/g, "");
    }

    export function randomRange(min, max) {
        return min + (max - min) * Math.random();
    }

    export function clamp(x, min, max) {
        return x < min ? min : x > max ? max : x;
    }
}