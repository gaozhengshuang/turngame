import async from 'async';
import _ from 'lodash';

import Define from '../Util/Define';
import Tools from '../Util/Tools';
import NotificationController from '../Controller/NotificationController';

const audioName = [
    'Bg',
    'Congratulation',
    'Fire'
];
let AudioController = function () {
    this.audioClips = {};
    this.audio = null;
    this.effectIds = [];
    this.disableMusic = cc.sys.localStorage.getItem(Define.DATA_KEY.DISABLE_MUSIC) == 'true';
    this.disableEffect = cc.sys.localStorage.getItem(Define.DATA_KEY.DISABLE_EFFECT) == 'true';
    this.audioName = '';
};

AudioController.prototype.init = function (cb) {
    NotificationController.addNotification(Define.EVENT_KEY.MUSIC_CHANGE, this.onChangeMusic.bind(this));
    NotificationController.addNotification(Define.EVENT_KEY.EFFECT_CHANGE, this.onChangeEffect.bind(this));
    async.timesSeries(audioName.length, function (n, tnext) {
        cc.loader.loadRes('Audio/' + audioName[n], cc.AudioClip, function (err, res) {
            if (err) {
                tnext(err);
            } else {
                this.audioClips[audioName[n]] = res;
                tnext(null);
            }
        }.bind(this));
    }.bind(this), function (err) {
        Tools.invokeCallback(cb, err);
    }.bind(this));
}

AudioController.prototype.update = function (dt) {
    let audiostate = cc.audioEngine.getState(this.audio);
    if (audiostate == cc.audioEngine.AudioState.PAUSED || audiostate == cc.audioEngine.AudioState.ERROR) {
        cc.audioEngine.stop(this.audio);
        this.audio == null;
    }
}

AudioController.prototype.playAudio = function (name) {
    this.audioName = name;
    if (this.disableMusic) {
        return;
    }
    this.audio = cc.audioEngine.play(this.audioClips[name], true, 1);
    cc.audioEngine.setFinishCallback(this.audio, this._onMusicFinish.bind(this));
}

AudioController.prototype.playEffect = function (name) {
    if (this.disableEffect) {
        return;
    }
    let id = cc.audioEngine.play(this.audioClips[name], false, 2);
    this.effectIds.push(id);
    cc.audioEngine.setFinishCallback(id, this._onEffectFinish.bind(this, id));
};

AudioController.prototype.onChangeMusic = function (disable) {
    this.disableMusic = disable;
    if (disable) {
        if (this.audio != null) {
            cc.audioEngine.stop(this.audio);
            this.audio = null;
        }
    } else {
        if (this.audioName != '') {
            this.playAudio(this.audioName);
        }
    }
}
AudioController.prototype.onChangeEffect = function (disable) {
    this.disableEffect = disable;
    if (disable) {
        for (let i = 0; i < this.effectIds.length; i++) {
            cc.audioEngine.stop(this.effectIds[i]);
        }
        this.effectIds = [];
    }
}

AudioController.prototype._onMusicFinish = function () {
    this.audio = null;
    this.audioName = '';
}

AudioController.prototype._onEffectFinish = function (id) {
    _.remove(this.effectIds, function (n) {
        return n == id;
    });
}

module.exports = new AudioController();