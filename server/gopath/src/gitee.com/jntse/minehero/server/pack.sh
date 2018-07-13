#!/bin/bash
#报错就停止
#set -e

##编译新版本
./build.py

##拷贝文件
mkdir -p ./release
mkdir -p ./pack
rm -rf release/*
mkdir -p ./release/conf
mkdir -p ./release/bin
mkdir -p ./release/tbl/excel
mkdir -p ./release/tbl/json

cp -v gateserver/gateserver ./release/bin/
cp -v loginserver/loginserver ./release/bin/
cp -v matchserver/matchserver ./release/bin/
cp -v roomserver/roomserver ./release/bin/
cp -v watch.sh ./release/
cp -v runserver.sh ./release/
cp -v version.txt ./release/

cp -r conf/* ./release/conf/
cp -r tbl/excel/* ./release/tbl/excel
cp -r tbl/json/* ./release/tbl/json
find ./release/conf/ -iname "*.example" | xargs rm -f

filename=webgame-release-`date +%Y%m%d%H%M`.`uname -m`.tar.gz
tar -czvf pack/$filename ./release/
today=`date +%Y%m%d`

## 测试环境版本
wainum=$(ssh wbturn@210.73.214.68 "ls -d -l /home/wbturn/version/${today}R* | wc -l")
wainum=$((wainum + 1))
waibuildDirName=${today}R${wainum}_PP
echo $waibuildDirName

ssh wbturn@210.73.214.68 "mkdir -p /home/wbturn/version/${waibuildDirName}"
scp pack/$filename wbturn@210.73.214.68:/home/wbturn/version/${waibuildDirName}
ssh wbturn@210.73.214.68 "cd /home/wbturn/version/${waibuildDirName}/ && tar xzvf *.tar.gz"
ssh wbturn@210.73.214.68 "rm /home/wbturn/version/${waibuildDirName}/release/conf -rf"
ssh wbturn@210.73.214.68 "cp /home/wbturn/version/config/conf /home/wbturn/version/${waibuildDirName}/release/ -rvf"
ssh wbturn@210.73.214.68 "cp /home/wbturn/version/config/runserver.sh /home/wbturn/version/${waibuildDirName}/release/ -rvf"
ssh wbturn@210.73.214.68 "cp /home/wbturn/version/config/watch.sh /home/wbturn/version/${waibuildDirName}/release/ -rvf"

#ssh wbturn@210.73.214.69 "mkdir -p /home/wbturn/version/${waibuildDirName}"
#scp pack/$filename wbturn@210.73.214.69:/home/wbturn/version/${waibuildDirName}
#ssh wbturn@210.73.214.69 "cd /home/wbturn/version/${waibuildDirName}/ && tar xzvf *.tar.gz"
#ssh wbturn@210.73.214.69 "rm /home/wbturn/version/${waibuildDirName}/release/conf -rf"
#ssh wbturn@210.73.214.69 "cp /home/wbturn/version/config/conf /home/wbturn/version/${waibuildDirName}/release/ -rvf"
#ssh wbturn@210.73.214.69 "cp /home/wbturn/version/config/runserver.sh /home/wbturn/version/${waibuildDirName}/release/ -rvf"
#ssh wbturn@210.73.214.69 "cp /home/wbturn/version/config/watch.sh /home/wbturn/version/${waibuildDirName}/release/ -rvf"
