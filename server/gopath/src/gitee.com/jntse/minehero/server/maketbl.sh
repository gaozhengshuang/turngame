#报错就停止
set -e
#!/bin/bash

#配置路径
TBL_EXCEL=$JUMPGAME_ROOT/docs/excel
TBL_JSON=$JUMPGAME_ROOT/docs/json
PROTOCOL_PATH=$JUMPGAME_ROOT/protocol
#TBL_EXCEL=../config/excel
#TBL_JSON=../config/json
#PROTOCOL_PATH=../protocol


cd $JUMPGAME_ROOT/protocol
./gen_protogo.sh


cd $JUMPGAME_SERVER
# 工具生成protobuf协议index配置
./tools/gen_pbindex/gen_pbindex -root=$PROTOCOL_PATH -output=$TBL_EXCEL/proto_index.xlsx


# 输出路径
OUT_TBL_EXCEL_SERVER=./server/tbl/excel
OUT_TBL_EXCEL_CLIENT=$JUMPGAME_ROOT/docs/tbl
OUT_TBL_JSON_SERVER=./server/tbl/json
rm -rf $OUT_TBL_EXCEL_CLIENT $OUT_TBL_EXCEL_SERVER $OUT_TBL_JSON_SERVER
mkdir -p $OUT_TBL_EXCEL_CLIENT $OUT_TBL_EXCEL_SERVER $OUT_TBL_JSON_SERVER

# protobuf版本 2.0/3.0
PROTOBUF_VER=2

#// --------------------------------------------------------------------------
#/// @brief 定义生成函数
#/// @param 表格归属的结构体所在的结构的名称
#/// @param 生成文件名
#/// @param 表格文件名
#// --------------------------------------------------------------------------
maketbl_server() {
    tabtoy -mode=exportorv2 -protover=$PROTOBUF_VER --combinename=$1 -go_out=$OUT_TBL_EXCEL_SERVER/$2.go -json_out=$OUT_TBL_EXCEL_SERVER/$2.json \
           -lua_out=$OUT_TBL_EXCEL_CLIENT/$2.lua -proto_out=$OUT_TBL_EXCEL_CLIENT/$2.proto $TBL_EXCEL/$3 

    #tabtoy -mode=exportorv2 -protover=$PROTOBUF_VER --combinename=$1 -go_out=$OUT_TBL_EXCEL_SERVER/$2.go -csharp_out=$OUT_EXCEL_GO/$2.cs \ 
    #       -proto_out=$OUT_EXCEL_GO/$2.proto -json_out=$OUT_TBL_EXCEL_SERVER/$2.json  -lua_out=$OUT_TBL_EXCEL_SERVER/$2.lua \ 
    #       -pbt_out=$OUT_TBL_EXCEL_SERVER/$2.pbt $TBL_EXCEL/$3

    #dlv exec tabtoy -- -mode=exportorv2 -protover=$PROTOBUF_VER --combinename=$1 -go_out=$OUT_TBL_EXCEL_SERVER/$2.go -json_out=$OUT_TBL_EXCEL_SERVER/$2.json $TBL_EXCEL/$3

    echo "make excel config $3" 
}

#// --------------------------------------------------------------------------
#/// @brief 打表
#// --------------------------------------------------------------------------
maketbl_server ProtoMsgIndex proto_index proto_index.xlsx
maketbl_server ItemBase itembase TItem.xlsx
maketbl_server DungeonsBase dungeons TDungeons.xlsx
maketbl_server ShopBase shopbase TShop.xlsx
maketbl_server RandomNameBase randomname TRandomName.xlsx
maketbl_server TurntableBase turntable TTurntableNew.xlsx
maketbl_server SignBase signbase TSign.xlsx
maketbl_server RechargeBase recharge TRecharge.xlsx
maketbl_server NoticeBase noticebase TNotice.xlsx
maketbl_server MusicBase music TMusic.xlsx
maketbl_server LevelBasee levelbase TLevel.xlsx
maketbl_server NameBase namebase TName.xlsx


#// --------------------------------------------------------------------------
#/// @brief 参数1 包名
#/// @brief 参数2 主结构名称
#/// @brief 参数3 文件名
#// --------------------------------------------------------------------------
make_json() { 
    cp $TBL_JSON/$3 $OUT_TBL_JSON_SERVER
    gojson -fmt=json -pkg=$1 -name=$2 -subStruct=true -input=$TBL_JSON/$3 -o=$OUT_TBL_JSON_SERVER/$3.go
    echo "make json config $2" 
}

make_json table Global global.json 
make_json table Room room.json 


echo "make all res finish!"
