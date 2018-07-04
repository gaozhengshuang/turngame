module game {
    export var leaveTime: number;
    export var gameFrame: number = 1 / 60;
    export var testP1: number;
    export var testP2: number;
    export var testSpeed: number;
    export var wxCode: string = "";
    export var wxState: string = "";

    //游戏内配置支持
    export var _buyLucky: number = 2000;    //转一次奖消耗金币数量
    export var _maxSp: number = 250;       //大招点击次数
    export var _paddlePrice: number = 20;      //每发子弹消耗的金币数
    export var _maxEvent: number = 300;     //出现事件金币段
    export var _eventAddMin: number = 100;     //前多少金币出现增益
    export var _spaceFire: number = 5000;       //无限火力金币数
    export var _boomUseScore: number = 500;     //炸弹扣除金币数
    export var _goldSharkCrush: number = 0.01;     //击碎黄金鲨的概率 1=100%
    export var _eventDifferent: number = 0.5;   //出现增益事件的概率 1=100%
    export var _goodBuffPro: number[] = [0.8, 0.2, 0, 0, 0];        //增益事件个数出现概率(总和为1即100%)
    export var _badBuffPro: number[] = [0.35, 0.35, 0.15, 0.10, 0.05];         //减益事件个数出现概率(总和为1即100%)

    //临时配置
    export var _eventCdByMoney: number[] = [0, 10000, 20000];  //Cd时间根据当前分数设置(分数和时间的内容长短要保持一致)
    export var _timeBoomTime: number[] = [40, 30, 20];         //炸弹
    export var _blackHoleTime: number[] = [60, 45, 30];         //黑洞
    export var _fireWallTime: number[] = [60, 45, 30];         //火墙
    export var _iceTime: number[] = [45, 35, 25];         //冰冻
}