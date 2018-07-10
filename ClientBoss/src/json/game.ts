module gameJson {export var game:Igame = JSON.parse('{"//":"免费赠送规则，每天1次，少于500，赠送1000","LuckDrawPrice":10,"FreePresentRule":{"Count":1,"FloorTrigger":500,"Money":1000}}');export interface Igame {
  '//': string;
  LuckDrawPrice: number;
  FreePresentRule: FreePresentRule;
}export interface FreePresentRule {
  Count: number;
  FloorTrigger: number;
  Money: number;
}}