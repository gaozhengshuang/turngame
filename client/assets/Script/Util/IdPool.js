var IdPool = {}
let IdMap = {};
IdPool.getId = function (key) {
    if (IdMap[key] == null) {
        IdMap[key] = 1;
        return 1;
    } else {
        IdMap[key]++;
        if (IdMap[key] > 1000000) {
            IdMap[key] = 1;
        }
        return IdMap[key];
    }
}

module.exports = IdPool;