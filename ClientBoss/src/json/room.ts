module gameJson {export var room:Iroom = JSON.parse('{"//":"概率色子点数","griditem":{"YuanbaoRate":25,"ItemRate":3,"CouponRate":20,"FreeYuanbaoRate":35},"diamondroom":[{"grade":1,"total":8,"num":1,"pickpro":"0-1;1800-2;3600-3;5400-4;7200-5;9000-7;10800-9;12600-11;14400-13;16200-15;18000-17;19800-20"}],"diamondparts_to_diamond":10,"diamond_to_coins":10000,"rmb_to_conis":1000,"rmb_to_yuanbao":10,"diamondparts_to_coins":500,"must_be_out_diamond_step":4,"rebate":{"warning_line_min":67,"warning_line_max":73,"min_consume":30000,"group_gird":{"have_empty_parts_diamond":{"empty":20,"parts":62,"diamond":18},"have_parts_diamond":{"parts":83,"diamond":17}}},"step_diamond_probability":[{"step":1,"pro":0},{"step":2,"pro":0},{"step":3,"pro":0},{"step":4,"pro":10},{"step":5,"pro":30},{"step":6,"pro":50},{"step":7,"pro":70},{"step":8,"pro":100}]}');export interface Iroom {
  '//': string;
  griditem: Griditem;
  diamondroom: Diamondroom[];
  diamondparts_to_diamond: number;
  diamond_to_coins: number;
  rmb_to_conis: number;
  rmb_to_yuanbao: number;
  diamondparts_to_coins: number;
  must_be_out_diamond_step: number;
  rebate: Rebate;
  step_diamond_probability: Stepdiamondprobability[];
}export interface Stepdiamondprobability {
  step: number;
  pro: number;
}export interface Rebate {
  warning_line_min: number;
  warning_line_max: number;
  min_consume: number;
  group_gird: Groupgird;
}export interface Groupgird {
  have_empty_parts_diamond: Haveemptypartsdiamond;
  have_parts_diamond: Havepartsdiamond;
}export interface Havepartsdiamond {
  parts: number;
  diamond: number;
}export interface Haveemptypartsdiamond {
  empty: number;
  parts: number;
  diamond: number;
}export interface Diamondroom {
  grade: number;
  total: number;
  num: number;
  pickpro: string;
}export interface Griditem {
  YuanbaoRate: number;
  ItemRate: number;
  CouponRate: number;
  FreeYuanbaoRate: number;
}}