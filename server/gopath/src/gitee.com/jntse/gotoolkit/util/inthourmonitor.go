package util
import (
	"time"
	"gitee.com/jntse/gotoolkit/log"
)

// --------------------------------------------------------------------------
/// @brief 整点回调管理池，非线程安全
// --------------------------------------------------------------------------
type IntHourCallBack func(now int64)		// 整点回调函数
type IntHourMonitorPool struct {
	pool map[int64]*IntHourMonitor
}

func NewIntHourMonitorPool() *IntHourMonitorPool {
	return &IntHourMonitorPool{}
}

func (this *IntHourMonitorPool) Init() {
	this.pool = make(map[int64]*IntHourMonitor)
}

func (this *IntHourMonitorPool) Regist(clock int64, handler IntHourCallBack) bool {
	if clock < 0 || clock >= 24 {
		log.Error("Regist IntHourMonitor clock[%d] Must be 'clock < 0 || clock >= 24' ", clock)
		return false
	}
	_, ok := this.pool[clock]
	if ok == true {
		log.Error("Regist IntHourMonitor clock[%d] is repeated", clock)
		return false 
	}

	monitor := NewIntHourMonitor()
	monitor.Init(handler, clock)
	this.pool[clock] = monitor
	log.Info("Regist IntHourMonitor[%d] Sucess", clock)
	return true
}

func (this *IntHourMonitorPool) Run(now int64) {
	for _, v := range this.pool {
		v.Tick(now)
	}
}


// --------------------------------------------------------------------------
/// @brief 整点回调监听，非导出
// --------------------------------------------------------------------------
type IntHourMonitor struct {
	clock		int64
	tm_zero  	int64      	// 今日零点
	tm_fix   	int64       // 修正时间
	tm_delay 	int64       // 延迟时间
	processed 	bool        // 是否已经处理
	reached 	bool    	// 到达处理时间
	handler		IntHourCallBack
}

func NewIntHourMonitor() *IntHourMonitor {
	return &IntHourMonitor{}
}

func (this *IntHourMonitor) Init(handler IntHourCallBack, clock int64)	{
	// 检查注册时间是否已经过了
	if clock < int64(time.Now().Hour()) {
		this.tm_zero = GetDayStart() + DaySec  	// 明日零点
	}else {
		this.tm_zero = GetDayStart()     		// 今日零点
	}
	this.tm_delay = 20		// 给20秒冗余区间
	this.processed = false
	this.reached = false
	this.handler = handler
	this.clock = clock
	this.tm_fix = HourSec * clock
}

func (this *IntHourMonitor) Tick(now int64)	{
	if ( now >= (this.tm_zero + this.tm_fix) && now <= (this.tm_zero + this.tm_fix + this.tm_delay) )	{
		this.reached = true;
	} else {
		this.reached , this.processed = false, false
		if ( this.tm_zero + this.tm_fix < now )	{
			this.tm_zero  = GetDayStart() + DaySec; // 明日0点
		}
	}
	this.process(now);
}

func (this *IntHourMonitor) process(now int64)	{
	if ( !this.reached  || this.processed )	{ return }
	this.processed = true;
	this.handler(now);
}


