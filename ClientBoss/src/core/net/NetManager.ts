module game {
    export var $netIp: string = "https://bf.giantfun.cn";
    export var $neiNetIp: string = "https://bfp.giantfun.cn";
    export var $shuangshuangIp: string = "http://192.168.30.202";
    export var $kaiIp: string = "http://192.168.30.206:30002";
    export var $isWx: boolean = false;

    export var _netIp: string = "210.73.214.67";
    export var _netPort: string = "10110";

    export interface IUpdateScore {
        token: string;
        openid: string;
        face: string;
        name: string;
        score: number;
    }

    export interface IGetRankList {
        token: string;
        openid: string;
        face: string;
        name: string;
        start: number;
        stop: number;
    }

    export interface IHttpRetInfo {
        code: string;
        msg: IMsgInfo;
    }

    export interface IMsgInfo {
        ranklist: IRankInfo[];
        userInfo: IRankInfo;
    }

    export interface IRankInfo {
        openid: string;
        face: string;
        name: string;
        score: number;
        rank: number;
    }

    export interface IUserInfo {
        openid: string;
        face: string;
        name: string;
        score: number;
        rank: number;
        token: string;
    }

    export var $uploadScore = "/score/uploadScore";
    export var $getRankList = "/score/getRankList";
}