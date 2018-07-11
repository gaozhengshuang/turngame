var Define = {
    GAME_STATE: {
        STATE_PREPARING: 0,
        STATE_AIMING: 1,
        STATE_FLYING: 2,
        STATE_RECOVERY: 3,
        STATE_SHAKING: 4,
        STATE_END: 5,
    },
    GAME_RESULT: {
        RESULT_BINGO: 0,
        RESULT_MISS: 1,
    },
    REWARD_DIR: {
        LEFT: 0,
        RIGHT: 1
    },
    MISSILE_INIT: {
        SHOWTIME: 0.4,
        POSITIONX: 0,
        POSITIONY: -800,
        TARGETPOSITINOX: 0,
        TARGETPOSITIONY: -500,
        TARGETPOSITIONYADDITION: 80,
        ROTATIONADDITION: 1,
        ROTATION_LIMIT: 25,
        RECOVERYPOSITIONX: 0,
        RECOVERYPOSITIONY: -200,
    },
    REWARD_INIT: [
        {
            POSITIONY: 220,
            DIRECTION: 0,
            SPEED: 140,
            INTERVAL: 170
        },
        {
            POSITIONY: 90,
            DIRECTION: 1,
            SPEED: 120,
            INTERVAL: 200
        },
        {
            POSITIONY: -40,
            DIRECTION: 0,
            SPEED: 100,
            INTERVAL: 200
        },
    ],
    GAME_INIT: {
        MISSILESPEED: 600,
        HITDISTANCE: 60,
        REWARDINTERVAL: [120, 150],
        CARWIDTH: 122,
        EXTRAWIDTH: 200,
        SHAKERADIUS: 10,
        SHAKETIME: 1.0,
        FLYTARGETPOSYADDITION: 20,
        RECOVERYPOSYADDITION: -30,
        RECOVERCOUNT: 3,
    }
}

module.exports = Define;
