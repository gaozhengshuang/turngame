#!/bin/bash

exepath=$(dirname $0)
exepath=${exepath/\./$(pwd)}

stopserver() {

    #关闭监控，避免重启
    app=$1

    #关闭进程
    echo "关闭进程 $app..."
    #appid=`pidof $app`
    appid=$(ps ux | grep $app | grep 'conf' | grep 'logname' | grep -v grep | awk '{print $2}')
    if [ -n "$appid" ]; then
        kill -2 $appid
    else
        return
    fi

    while [ true ]
    do
        sleep 0.1s
        #result=`pidof $app`
        result=$(ps ux | grep $app | grep 'conf' | grep 'logname' | grep -v grep | awk '{print $2}')
        if [ -n "$result" ]; then
            echo -n "."
        else
            echo ""
            break
        fi
    done
}

startserver() {
    cd ./bin/
    pprof=$3
    appid=$2
    appname=$1
    logroot=~/log
    fileconf=../conf/conf_${appname}.json
    servername=${appname}server
    logname=${servername}.log
    logpath=${logroot}/${servername}
    #daemonlog=${logroot}/daemon.${servername}.log
    daemondate=`date +%Y-%m-%d-%H-%M-%S`
    daemonlog=${logroot}/daemon.${servername}.${daemondate}.log
    if [[ -n $appid && $appid -ne 0 ]]    #参数非空且不等于0
    then
        fileconf=../conf/${appname}/conf_${appname}.$appid.json
        logname=${servername}${appid}.log
        logpath=$logroot/${servername}${appid}/
        daemonlog=$logroot/daemon.${servername}${appid}.${daemondate}.log
        mkdir -p $logpath
    fi

    mkdir -p ${logpath}
    echo "./${servername} -conf=${fileconf} -logname=${logname} -logpath=${logpath} -loglvl="trace" -eventstat=true -pprof=$pprof -daemon=true \
        -ver=$exepath > ${daemonlog} 2>&1 &"
    ./${servername} -conf=${fileconf} -logname=${logname} -logpath=$logpath -loglvl="trace" -eventstat=true -pprof=$pprof -daemon=true \
        -ver=$exepath > ${daemonlog} 2>&1 &
    sleep 0.3
    echo "."
    cd ../
}

stopall() {
    echo "关闭所有服务器"
    killall watch.sh
    sleep 1
    stopserver loginserver
    stopserver matchserver
    stopserver gateserver
    stopserver roomserver
    echo "关闭服务器完毕"
}

startall() {
    echo ""
    echo "启动服所有务器..."
    startserver match 0 27210

    startserver room 0 27310 
    #startserver room 1 27311
    #startserver room 2 27312
    #startserver room 3 27313

    startserver gate 0 27110 
    #startserver gate 1 27111
    #startserver gate 2 27112
    #startserver gate 3 27113 

    startserver login 0 27010

    sleep 1
    #./watch.sh match 0 27210 > /dev/null 2>&1 &
    #./watch.sh room  0 27310 > /dev/null 2>&1 &
    #./watch.sh gate  0 27110 > /dev/null 2>&1 &
    #./watch.sh login 0 27010 > /dev/null 2>&1 &

    #./watch.sh room  1 27311 > /dev/null 2>&1 &
    #./watch.sh room  2 27312 > /dev/null 2>&1 &
    #./watch.sh room  3 27313 > /dev/null 2>&1 &
    #./watch.sh gate  1 27111 > /dev/null 2>&1 &
    #./watch.sh gate  2 27112 > /dev/null 2>&1 &
    #./watch.sh gate  3 27113 > /dev/null 2>&1 &

    echo "启动服务器完毕"
    ps -x | grep server | grep conf
}

cmd=$1
case $cmd in
close|stop)
    stopall
;;
open|start)
    startall
;;
restart)
    stopall
    startall
;;
*)
    #echo "parmas must be 'open' or 'close'"
    ./runserver.sh restart
;;
esac

