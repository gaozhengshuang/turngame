module gameConfig {
    //是否在线
    export let isOnLine: boolean = navigator.onLine;

    export const enum RankType {
        friend = 1,
        world = 2,
    }

    export const enum FunctionType {
        openRank = 1,
        setUserRank = 2,
    }

    //全局字体颜色表--可以扩展
    export let TextColors = {
        white: 0xFFFFFF,//白色
        milkWhite: 0xF4EBB9,//乳白色
        grayWhite: 0xceb6a2,//灰白色
        yellow: 0xffff00,//金黄色 
        lightYellow: 0xffd375,//淡黄色
        orangeYellow: 0xff9900,//橘黄色//道具名称 //玩家姓名
        red: 0xf11300,//红色
        green: 0x00e500,//绿色 
        blue: 0x1a94d7,//蓝色 
        grayBlue: 0x2f5177,//墨蓝色 
        purple: 0xe938f2,//紫色 
        pink: 0xFF3030,//粉色 
        black: 0x2e2d2d,//黑色
        golden: 0xFFD700, //金色,
        pinkRed: 0xFF678E,//桃红
    };

    //全局字体大小表--可以扩展
    export let LabelFontSize = {
        littleSize: 12,//小型字体大小
        middleSize: 18,//中型字体大小
        normalSize: 24,//正常字体大小
        bigSize: 36//大型字体大小
    };

    //是不是微信浏览
    export function isWeiXin(): boolean {
        let ua = window.navigator.userAgent.toLowerCase();
        let microStr = "" + ua.match(/MicroMessenger/i);
        if (microStr == "null") {
            return false;
        } else if (microStr == "micromessenger") {
            return true;
        }
    }

    //是不是大屏
    export function isBigScreen(): boolean {
        return (document.body.clientHeight / document.body.clientWidth > 1.32);
    }

    //获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook
    export function systemType(): string {
        let ua = window.navigator.userAgent.toLowerCase();
        let microStr = "" + ua.match(/MicroMessenger/i);
        if (("" + ua.match(/windows nt/i)) == "windows nt") {
            return "windows";
        } else if (("" + ua.match(/iphone/i)) == "iphone") {
            return "ios";
        } else if (("" + ua.match(/android/i)) == "android") {
            return "android";
        } else if (("" + ua.match(/ipad/i)) == "ipad") {
            return "ipad";
        } else if (("" + ua.match(/linux/i)) == "linux") {
            return "linux";
        } else if (("" + ua.match(/mac/i)) == "mac") {
            return "mac";
        } else if (("" + ua.match(/ucbrower/i)) == "ucbrower") {
            return "ucbrower";
        } else {
            egret.log("未知系统类型");
        }
    }

    export function isPC() {
        return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? false : true;
    }

    //获得平台类型 如 微信、qqzone、qq、微博、校内、facebook
    export function platformType(): string {
        let ua = window.navigator.userAgent.toLowerCase();
        if (("" + ua.match(/micromessenger/i)) == "micromessenger") {
            return "micromessenger";
        } else if (("" + ua.match(/qzone/i)) == "qzone") {
            return "qzone";
        } else if (("" + ua.match(/weibo/i)) == "weibo") {
            return "weibo";
        } else if (("" + ua.match(/qq/i)) == "qq") {
            return "qq";
        } else if (("" + ua.match(/renren/i)) == "renren") {
            return "renren";
        } else if (("" + ua.match(/txmicroblog/i)) == "txmicroblog") {
            return "txmicroblog";
        } else if (("" + ua.match(/douban/i)) == "douban") {
            return "douban";
        } else {
            return "other";
        }
    }

    //当前舞台
    export function curStage(): egret.Stage {
        return egret.MainContext.instance.stage;
    }

    //当前游戏宽度
    export function curWidth(): number {
        return egret.MainContext.instance.stage.stageWidth;
    }

    //当前游戏宽度
    export function curHeight(): number {
        return egret.MainContext.instance.stage.stageHeight;
    }

    export function checkIsPhone(phone: string) {
        const reg = /^1[3,5,8]\d{9}$/;
        return reg.test(phone);
    }

    export var factor: number = 30;
    export var perBrickSize: number = 36;
    export var paddleMoveX: number = 350;
    export var ballCollisionGroup = Math.pow(2, 0);
    export var wallCollisionGroup = Math.pow(2, 1);
    export var brickCollisionGroup = Math.pow(2, 2);
    export var buffCollisionGroup = Math.pow(2, 3);
    export var paddleCollisionGroup = Math.pow(2, 4);
    export var hang = 15;

    export function isIphoneX() {
        return window.screen.availWidth == 375 && window.screen.availHeight == 812;
    }
}