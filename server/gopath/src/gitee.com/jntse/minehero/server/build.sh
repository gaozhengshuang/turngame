#!/bin/bash
#报错就停止
set -e
cmd=$1
case $cmd in
svn)
    svn up

    cd $JUMPGAME_ROOT
    svn up

    cd $JUMPGAME_TOOLKIT
    svn up
;;
esac

cd $JUMPGAME_SERVER/server
mkdir -p ./bin
rm -f ./bin/*
compile() {
    cd $1/
    gob
    cp -v $1 ../bin/
    cd ../
}
svn info > version.txt
./maketbl.sh
compile gateserver
compile loginserver
compile matchserver
compile roomserver


