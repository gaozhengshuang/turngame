package main
import "fmt"
import "time"
import "gitee.com/jntse/gotoolkit/util"
import "gitee.com/jntse/gotoolkit/log"
import "github.com/cihub/seelog"
//import log "github.com/cihub/seelog"


func main()	{
	fmt.Println("start seelog testing...")

	// load config
	logger, err := seelog.LoggerFromConfigAsFile("seelog.cnf.xml")
	if err != nil {
		fmt.Println("load seelog config fail %v", err)
		return
	}

	// 用户logger替换默认logger
	seelog.ReplaceLogger(logger)

	//
	ch_exit := make(chan string)
	go util.KeyBoardControlerLoop(ch_exit)
	time.Sleep(time.Millisecond)

	// 自定义包
	logger.Debug("logger debug log 日志", time.Now());
	logger.Trace("logger trace log 日志", time.Now());
	logger.Info("logger info log 日志", time.Now());
	logger.Warn("logger warn log 日志", time.Now());
	logger.Error("logger error log 日志", time.Now());
	logger.Critical("logger critical log 日志", time.Now());

	// 默认包
	seelog.Debugf("seelog debug log 日志 %s", time.Now());
	seelog.Tracef("seelog trace log 日志 %s", time.Now());
	seelog.Infof("seelog info log 日志 %s", time.Now());
	seelog.Warnf("seelog warn log 日志 %s", time.Now());
	seelog.Errorf("seelog error log 日志 %s", time.Now());
	seelog.Criticalf("seelog critical log 日志 %s", time.Now());

	// 使用自己的logwarpper, 包名和官方log包一样
	log.Init("./mylog/game/", "gameserver.log")
	//log.Trace("seelog trace log 日志 %s", time.Now());
	//log.Debug("seelog debug log 日志 %s", time.Now());
	//log.Warn("seelog warn log 日志 %s", time.Now());
	//log.Info("seelog info log 日志 %s", time.Now());
	//log.Error("seelog error log 日志 %s", time.Now());
	//log.Fatal("seelog critical log 日志 %s", time.Now());

	// wait
	fmt.Println("put 'exit' to quit...")
	<-ch_exit
}

