module game {
    export class BattleWall extends BattleBody {
        protected init() {
            this.battleBodyType = BattleBodyType.wall;
        }
    }
}
