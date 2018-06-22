package util
import "fmt"
import "strings"
import "strconv"
import "runtime"
import "time"
import "math/rand"
//import "os"

var Pf = fmt.Printf
var Pln = fmt.Println

type DWORD uint32
type QWORD uint64
type SDWORD int32
type SQWORD int64

func init() {
	rand.Seed(time.Now().Unix())
}

// 获取goroutine id，效率较低只在debug使用
func GetRoutineID() int {
	var buf [128]byte
	n := runtime.Stack(buf[:], false)
	idField := strings.Fields(strings.TrimPrefix(string(buf[:n]), "goroutine "))[0]
	id, err := strconv.Atoi(idField)
	if err != nil {
		panic(fmt.Sprintf("cannot get goroutine id: %v", err))
	}
	return id
}

// uuid生成器，使用闭包
var UUID func() uint64 = UUIDGenerator()
func UUIDGenerator() func() uint64 {
	var counter uint16 = 0
	return func() uint64{
		tm := uint64(CURTIME())
		counter++
		uuid := tm << 32 | uint64(counter)
		return uuid
	}
}

// uuid生成器，使用全局变量
var _uuid_counter_ uint16 = 0
func UUID2() uint64 {
	tm := uint64(CURTIME())
	_uuid_counter_++
	uuid := tm << 32 | uint64(_uuid_counter_)
	return uuid
}

// uuid生成器，使用纳秒做uuid(连续两次调用间隔在10微秒左右,不会出现相同)
func UUID3() uint64 {
	uuid := uint64(CURTIMENS())
	return uuid
}


// 百分比概率
func SelectPercent(per int32) bool {
	return SelectByOdds(per, 100)
}

// 千分比概率
func SelectPermillage(per int32) bool {
	return SelectByOdds(per, 1000)
}

// 万分比概率
func SelectTenThousand(per int32) bool {
	return SelectByOdds(per, 10000)
}

// 几分之几的概率
func SelectByOdds(per int32, max int32) bool {
	if per <= 0  { return false  }
	rd := rand.Int31n(max)	// a non-negative pseudo-random number in [0,max)
	if rd < per { return true   }
	return false
}

// 权重概率
func SelectByWeightSlice(vec []int32) int32 {
	totalweight := int32(0)
	for _, v := range vec { totalweight += v }

	count, weight := int32(0), RandBetween(1,totalweight);
	for k ,v := range vec {
		count += v
		if weight <= count { return int32(k) }
	}
	return -1
}

// 产生[min - max]内随机数，闭区间，例如 [-10 -- 20]
func RandBetween(min , max int32) int32 {
	if min == max { return min }
	if min > max  { panic("RandBetween min > max") }
	if min > max { max, min = min, max}
	diff := max - min + 1
	return rand.Int31n(diff) + min
}

func RandBetweenInt64(min , max int64) int64 {
	if min == max { return min }
	if min > max  { panic("RandBetween min > max") }
	diff := max - min + 1
	return rand.Int63n(diff) + min
}


