module game {
    export class SoundManager {
        //static MUSIC_LOOP_FINISH = "SoundManager_MUSIC_LOOP_FINISH";
        static playMusic: boolean = true;
        static playSound: boolean = true;
        private static sdbg: egret.Sound;
        private static channelBG: egret.SoundChannel;
        private static channelTeach: egret.SoundChannel;
        private static currentMusic: string;
        private static currentLoop: boolean;
        private static currentSound: string;
        private static currentTeach: string;

        public static init() {
            BINDING_EXEC(DataManager.playerModel, this, () => {
                let musicState = DataManager.playerModel.musicState;
                this.playMusic = musicState == "on";
                if (!this.playMusic) {
                    this.stopBgSound();
                } else {
                    this.resumeBgSound();
                }
            }, PlayerModel.MUSIC_CHANGE);
            BINDING_EXEC(DataManager.playerModel, this, () => {
                let musicState = DataManager.playerModel.soundState;
                this.playSound = musicState == "on";
            }, PlayerModel.SOUND_CHANGE);
        }

        /**播放音效*/
        public static async playEffect(name: string, volume: number = 1) {
            if (!this.playSound) return;
            this.currentSound = name;
            RES.getResAsync(`music/${name}`, (value: egret.Sound) => {
                if (this.currentSound == name) {
                    if (!value) return;
                    let sound_eff = value;
                    sound_eff.type = egret.Sound.EFFECT;
                    let channel: egret.SoundChannel = sound_eff.play(0, 1);
                    channel.volume = volume;
                }
            }, this);
        }

        /**播放背景音乐*/
        public static playBgSound(name: string, loop: boolean = true) {
            this.currentMusic = name;
            this.currentLoop = loop;
            if (!this.playMusic) return;
            this.stopBgSound();
            RES.getResAsync(`music/${name}`, (value: egret.Sound) => {
                if (this.currentMusic == name) {
                    if (!value) return;
                    this.stopBgSound();
                    this.sdbg = value;
                    this.sdbg.type = egret.Sound.MUSIC;
                    if (loop) {
                        this.channelBG = this.sdbg.play(0, 0);
                        this.channelBG.removeEventListener(egret.Event.SOUND_COMPLETE, this.musicLoopFinish, this);
                    } else {
                        this.channelBG = this.sdbg.play(0, 1);
                        this.channelBG.addEventListener(egret.Event.SOUND_COMPLETE, this.musicLoopFinish, this);
                    }
                    this.channelBG.volume = 0.5;
                }
            }, this);
        }

        //播放教程
        public static playTech(name: string) {
            this.currentTeach = name;
            if (!this.playMusic) return;
            this.stopTeach();
            RES.getResAsync(`music/${name}`, (value: egret.Sound) => {
                if (this.currentTeach == name) {
                    if (!value) return;
                    let sound = value;
                    sound.type = egret.Sound.EFFECT;
                    this.channelTeach = sound.play(0, 1);
                }
            }, this);
        }

        private static musicLoopFinish() {
            //NotificationCenter.getInstance().postNotification(SoundManager.MUSIC_LOOP_FINISH);
        }

        /**停止背景音乐*/
        public static stopBgSound() {
            if (this.channelBG) {
                this.channelBG.stop();
            }
        }

        public static hideBgSound() {
            if (this.channelBG) {
                this.channelBG.volume = 0;
            }
        }

        public static showBgSound() {
            if (this.channelBG) {
                this.channelBG.volume = 0.5;
            }
        }

        public static stopTeach() {
            if (this.channelTeach) {
                this.channelTeach.stop();
            }
        }

        public static resumeTeach() {
            if (this.currentTeach) {
                this.playTech(this.currentTeach);
            }
        }

        public static resumeBgSound() {
            if (this.currentMusic) {
                this.playBgSound(this.currentMusic, this.currentLoop);
            }
        }
    }
}