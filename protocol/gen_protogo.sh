#报错就停止
set -e

#!/bin/bash
pbmsg_path=$JUMPGAME_SERVER/pbmsg
rm $pbmsg_path"/*" -rvf
mkdir -pv $pbmsg_path

#protoc -I=./ --go_out=$pbmsg_path *.proto
#protoc -I=./ --gogo_out=$pbmsg_path *.proto
protoc -I=./ --gofast_out=$pbmsg_path *.proto
#protoc -I=./ --gogofast_out=$pbmsg_path *.proto
#protoc -I=./ --gogofaster_out=$pbmsg_path *.proto
#protoc -I=./ --gogoslick_out=$pbmsg_path *.proto
echo $pbmsg_path
ls $pbmsg_path -al
echo "generate all .proto -> proto.go 成功"


##bin/define
#protoc -I=./ --go_out=./../protogo/define define.proto 
#protoc -I=./ --go_out=./../protogo/bin serialize.proto account.proto
#
##login
#protoc -I=./ --go_out=import_path=msgc2l:./../protogo/loginserver/client clientlogin.proto define.proto 
#protoc -I=./ --go_out=import_path=msg:./../protogo/loginserver/gate gatelogin.proto define.proto
#
##gate
#protoc -I=./ --go_out=import_path=c2gw:./../protogo/gateserver/client clientgate.proto define.proto serialize.proto
#protoc -I=./ --go_out=import_path=msg:./../protogo/gateserver/login gatelogin.proto define.proto
#protoc -I=./ --go_out=import_path=msg:./../protogo/gateserver/match gatematch.proto define.proto
#
##match
#protoc -I=./ --go_out=import_path=msg:./../protogo/matchserver/gate gatematch.proto define.proto
#protoc -I=./ --go_out=import_path=msg:./../protogo/matchserver/room matchroom.proto define.proto

