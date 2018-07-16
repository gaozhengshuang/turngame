var Define = {
    GAME_STATE: {
        STATE_PREPARING: 0,
        STATE_PREPARED: 1,
        STATE_IDLE: 2,
        STATE_STARTING: 3,
        STATE_SHUFFLE: 4,
        STATE_READY: 5,
        STATE_WAITTINGRESULT: 6,
        STATE_TURNFRONT: 7,
        STATE_ENDING: 8,
        STATE_ADDGOLD: 9,
        STATE_ENDED: 10
    },
    BET_CONFIG: {
        BET_INIT: 1000,
        BET_ADDITION: 1000,
        BET_MAX: 100000,
    }
}

module.exports = Define;
