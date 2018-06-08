package util
import (
	"time"
)

const (
	MinuteSec = 60
	HourSec = 3600
	DaySec = 86400
)

// 秒
func CURTIME() int64 {
	return time.Now().Unix()
}

// 纳秒
func CURTIMENS() int64 {
	return time.Now().UnixNano()
}

// 微秒
func CURTIMEUS() int64 {
	return time.Now().UnixNano() / 1000
}

// 毫秒
func CURTIMEMS() int64 {
	return time.Now().UnixNano() / 1000000
}

// 获得当前时间上一个整点或者当前整点，秒
func FloorIntClock(t int64) int64 {
	ft := int64(t / 3600) * 3600
    return ft
}

// 获得当前时间下一个整点，秒
func CeilIntClock(t int64) int64 {
	ct := int64(t / 3600) * 3600 + 3600
    return ct
}


// 是否同一天
func IsSameDay(tm1 int64, tm2 int64) bool{
    gotime1 := time.Unix(tm1, 0)
    gotime2 := time.Unix(tm2, 0)
    if gotime1.Year() == gotime2.Year() && gotime1.YearDay() == gotime2.YearDay(){
        return true
    }
    return false         
}

// 是否相邻天
func IsNextDay(tm1 int64, tm2 int64) bool{
    if tm1 > tm2{
        tmptime := tm1                 
        tm1 = tm2
        tm2 = tmptime
    }
    if !IsSameDay(tm1, tm2) && tm2 -tm1 < DaySec * 2 {
        return true
    }
    return false
}

// 今日零点
func GetDayStart() int64 {
	return GetTimeDayStart(time.Now().Unix())
}

// 指定时间(ms)零点
func GetTimeDayStart(t int64) int64 {
	tm := time.Unix(t, 0)
	y, m, d, lo := tm.Year(), tm.Month(), tm.Day(), tm.Location()
	return time.Date(y, m, d, 0, 0, 0, 0, lo).Unix()
}


