module game {
    export function ajax(url, args, method = "GET") {
        let d = defer();
        var x = new XMLHttpRequest();
        var params = "";
        if (args) {
            var p = [];
            for (var a in args) {
                var v = args[a];
                p.push(a + "=" + encodeURIComponent(v));
            }
            params = p.join("&");
        }
        if (method === 'POST') {
            x.open(method, url);
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        else {
            if (params)
                url = url + "?" + params;
            params = null;
            x.open(method, url);
        }
        x.onload = function () {
            var is_error = x.status >= 400 || (!x.status && !x.responseText);
            var err = null;
            if (is_error) {
                var statusText = x.statusText;
                if (x.status == 0)
                    statusText = "timeout";
                d.reject(new Error(statusText));
            }
            d.resolve(x.responseText);
        };
        x.send(params || null);
        return d.promise();
    }

    export async function SendHttp(msgName: string, msgJson: any = {}) {
        let ip = $neiNetIp;
        if ($isWx) {
            ip = $netIp;
        }
        let r = <string>await ajax(ip + msgName, msgJson, "POST");
        let json = JSON.parse(r);
        if (json.code != 200) {
            showTips(json.msg, true);
            return null;
        }
        return json;
    }
}