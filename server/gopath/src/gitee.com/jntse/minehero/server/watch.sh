#! /bin/sh
#进程名字可修改
PRO_NAME=${1}server
exepath=$(dirname $0)
exepath=${exepath/\./$(pwd)}


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
    echo "./${servername} -conf=${fileconf} -logname=${logname} -logpath=${logpath} -loglvl="trace" -eventstat=true -pprof=$pprof -daemon=true -ver=$exepath > ${daemonlog} 2>&1 &"
    nohup ./${servername} -conf=${fileconf} -logname=${logname} -logpath=$logpath -loglvl="trace" -eventstat=true -pprof=$pprof -daemon=true -ver=$exepath > ${daemonlog} 2>&1 &
    sleep 0.3
    echo "."
    cd ../
}


while true ; do

    sleep 3
    #    用ps获取$PRO_NAME进程数量
    appid=$2
    if [[ -n $appid && $appid -ne 0 ]]
    then
        NUM=`ps ux | grep ${PRO_NAME}${appid} | grep conf | grep logname | grep -v grep |wc -l`
    else
        NUM=`ps ux | grep ${PRO_NAME} | grep conf | grep logname | grep -v grep |wc -l`
    fi
    #  echo $NUM
    #    少于1，重启进程
    if [ "${NUM}" -lt "1" ];then
        echo "${PRO_NAME} was killed"
        startserver $1 $2 $3
    fi
done

exit 0
