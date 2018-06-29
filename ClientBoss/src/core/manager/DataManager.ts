module game {
    export class DataManager {
        static playerModel: PlayerModel;

        public static init() {
            DataManager.playerModel = new PlayerModel();
            table.TBirckInfo = table.TBirckInfo.sort((s1: table.ITBirckInfoDefine, s2: table.ITBirckInfoDefine) => {
                let n1 = splitStringToNumberArray(s1.Info, "-");
                let n2 = splitStringToNumberArray(s2.Info, "-");
                return n1[2] - n2[2];
            })
        }
    }
}