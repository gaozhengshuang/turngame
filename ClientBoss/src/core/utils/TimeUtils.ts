module game {
    export let week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    export let weekNumber = ["7", "1", "2", "3", "4", "5", "6"];
    export let timeDelay: number = 0;

    export function s2hms(second: number) {
        let h = Math.floor(second / 3600);
        let m = Math.floor(second % 3600 / 60);
        let s = Math.floor(second % 3600 % 60);
        return h + ":" + (m >= 10 ? m : `0${m}`) + ":" + (s >= 10 ? s : `0${s}`);
    }

    export function s2ms(second: number) {
        let m = Math.floor(second % 3600 / 60);
        let s = Math.floor(second % 3600 % 60);
        return (m >= 10 ? m : `0${m}`) + ":" + (s >= 10 ? s : `0${s}`);
    }

    export function s2s(second: number) {
        let s = Math.floor(second);
        return (s >= 10 ? s.toString() : `0${s}`);
    }

    /**
     * yyyy.MM.dd hh.mm.ss
     * @param date
     * @param fmt
     * @returns {string}
     */
    export function formatTime(date: Date, fmt: string = "yyyy.MM.dd  hh:mm:ss") {
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    export function getNowTime() {
        let time = new Date();
        time.setTime(time.getTime() + timeDelay);
        return time;
    }

    export function sDh(second: number) {
        let d = Math.floor(second / (3600 * 24));
        let h = Math.floor(second % (3600 * 24) / 3600);
        if (h > 0) {
            return d + "天  " + h + "小时";
        } else {
            let m = Math.floor(second % (3600 * 24) % 3600 / 60);
            let s = Math.floor(second % (3600 * 24) % 3600 % 60);
            return d + "天  " + h + "时" + (m >= 10 ? m : `0${m}`) + "分" + (s >= 10 ? s : `0${s}`) + "秒";
        }
    }
}