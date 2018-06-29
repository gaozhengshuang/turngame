module gameJson {export var global:Iglobal = JSON.parse('{"//":"发短信","string":"string field","int":20170927,"float":2017.0927,"bool":true,"objArray":[{"item":1001,"name":"新手礼包1"},{"item":1002,"name":"新手礼包2"},{"item":1003,"name":"新手礼包3"}],"strArray":["hello1","hello2","hello3"],"intArray":[8001,8002,8003,8004],"disconclean":0,"hearbeat":{"timeout":30000},"newuser":{"yuanbao":0,"coupon":0},"Delivery":{"UrlAPITest":"http://210.73.214.214:80/Api/V8/ReqDeliveryItem_PP","UrlAPI":"http://103.244.233.249:80/Api/V8/ReqDeliveryItem_PP","Cost":100,"Freelimit":2},"PickYuanbaoNotice":100,"PresentFreeStep":5,"RechargeCallback":"http://210.73.214.67:19000","HongBaoAPI":{"secret2":"topjump","key2":"topjump","getaddress2":"http://open.std.tvmopt.com/public/user/GetDeliveryAddresses","recharge2":"http://open.std.tvmopt.com/public/finance/MultiRecharge","secret":"cec2795b1ce550ca63a27d3f1d61c91291d9bee2f5c1b1346dba011cae266607","key":"tope7b61803d1091f9b5e0bdcf2f486e","getaddress":"https://open.yx.tvyouxuan.com/public/user/GetDeliveryAddresses","recharge":"https://open.yx.tvyouxuan.com/public/finance/MultiRecharge","CharacterCreation":"https://open.yx.tvyouxuan.com/public/event/CharacterCreation","Online":"https://open.yx.tvyouxuan.com/public/event/Online","Battles":"https://open.yx.tvyouxuan.com/public/event/Battles","CharacterLevel":"https://open.yx.tvyouxuan.com/public/event/CharacterLevel","ConsumeMoney":"https://open.yx.tvyouxuan.com/public/event/ConsumeMoney","LootMoney":"https://open.yx.tvyouxuan.com/public/event/LootMoney","Victory":"https://open.yx.tvyouxuan.com/public/event/Victory","FinanceQuery":"https://open.yx.tvyouxuan.com/public/finance/Query","DecrCoins":"https://open.yx.tvyouxuan.com/public/finance/DecrCoins","IncrDiamonds":"https://open.yx.tvyouxuan.com/public/finance/IncrDiamonds","CheckWechatBound":"https://open.yx.tvyouxuan.com/public/user/CheckWechatBound"},"IntranetFlag":false,"Sms":{"UrlAPI":"http://211.147.239.62:9051/api/v1.0.0/message/mass/send","Account":"shjf@shjf","Passwd":"00ecUAHi","AuthCodeContent":"欢迎来到弹弹乐，您的验证码是"}}');export interface Iglobal {
  '//': string;
  string: string;
  int: number;
  float: number;
  bool: boolean;
  objArray: ObjArray[];
  strArray: string[];
  intArray: number[];
  disconclean: number;
  hearbeat: Hearbeat;
  newuser: Newuser;
  Delivery: Delivery;
  PickYuanbaoNotice: number;
  PresentFreeStep: number;
  RechargeCallback: string;
  HongBaoAPI: HongBaoAPI;
  IntranetFlag: boolean;
  Sms: Sms;
}export interface Sms {
  UrlAPI: string;
  Account: string;
  Passwd: string;
  AuthCodeContent: string;
}export interface HongBaoAPI {
  secret2: string;
  key2: string;
  getaddress2: string;
  recharge2: string;
  secret: string;
  key: string;
  getaddress: string;
  recharge: string;
  CharacterCreation: string;
  Online: string;
  Battles: string;
  CharacterLevel: string;
  ConsumeMoney: string;
  LootMoney: string;
  Victory: string;
  FinanceQuery: string;
  DecrCoins: string;
  IncrDiamonds: string;
  CheckWechatBound: string;
}export interface Delivery {
  UrlAPITest: string;
  UrlAPI: string;
  Cost: number;
  Freelimit: number;
}export interface Newuser {
  yuanbao: number;
  coupon: number;
}export interface Hearbeat {
  timeout: number;
}export interface ObjArray {
  item: number;
  name: string;
}}