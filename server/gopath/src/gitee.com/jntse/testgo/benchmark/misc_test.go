package mytest
import (
	"testing"
	"fmt"
	"time"
	"strings"
	"strconv"
	"gitee.com/jntse/gotoolkit/util"
	"sync"
)

// --------------------------------------------------------------------------
/// @brief go test -v -bench=. -benchmem
/// @brief -v "Verbose output"
/// @brief -bench=regp "Run (sub)benchmarks matching a regular expression"
/// @brief -benchmem "Print memory allocation statistics for benchmarks"
// --------------------------------------------------------------------------
func TestHello(b *testing.T)	{
	fmt.Printf("enter TestHello\n")
}

func TestMakeSlice(b *testing.T)	{
	fmt.Printf("enter TestMakeSlice\n")
}

func TestMakeMap(b *testing.T)	{
	fmt.Printf("enter TestMakeMap\n")
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func BenchmarkHello(b *testing.B) {
	for i := 0; i < b.N; i++ {
		fmt.Sprintf("hello")
	}
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func BenchmarkSliceInt(b *testing.B) {
	for i := 0; i < b.N; i++ {
		slice := make([]int,1)
		slice = append(slice, 1)
	}
}

func BenchmarkSliceString(b *testing.B) {
	for i := 0; i < b.N; i++ {
		slice := make([]string,1)
		slice = append(slice, "1")
	}
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type ITcpConn interface {
	Init()
}

type TcpConn struct{
	id int
	name string
	ch1 chan int
	ch2 chan string
	rbuf []byte
}

func (t *TcpConn) Init() {
	t.id = 100
	t.name = "server"
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
var gConn1 []*TcpConn = make([]*TcpConn, 1)
var gConn2 []*TcpConn = make([]*TcpConn, 1)
// new效率高于&{}
func BenchmarkNewStruct(b *testing.B) {
	for i := 0; i < b.N; i++ {
		gConn1[0] = new(TcpConn)
	}
}

func BenchmarkReStruct(b *testing.B) {
	for i := 0; i < b.N; i++ {
		gConn1[0] = &TcpConn{}
	}
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func BenchmarkByteToString(b *testing.B) {
	str := "hello golang string to bytes"
	for i := 0; i < b.N; i++ {
		sli := []byte(str)
		sli[0] = 'H'
	}
}

// --------------------------------------------------------------------------
/// @brief 闭包调用
// --------------------------------------------------------------------------
func BenchmarkClosure(b *testing.B) {
	for i := 0; i < b.N; i++ {
		func() int {
			return i * 2
		}()
	}
}

func BenchmarkNonClosure(b *testing.B) {
	for i := 0; i < b.N; i++ {
		func(a int) int {
			return a * 2
		}(i)
	}
}


// --------------------------------------------------------------------------
/// @brief 字符串拼接
// --------------------------------------------------------------------------
func BenchmarkStringFmt(b *testing.B) {
	for i := 0; i < b.N; i++ {
		fmt.Sprintf("%s%d%d","BenchmarkString", i, time.Now().Unix())
	}
}

func BenchmarkStringJoin(b *testing.B) {
	for i := 0; i < b.N; i++ {
		strs := []string{"BenchmarkString", strconv.FormatInt(int64(i),10), strconv.FormatInt(time.Now().Unix(),10)}
		strings.Join(strs, "")
	}
}


// --------------------------------------------------------------------------
/// @brief 时间函数
// --------------------------------------------------------------------------
func BenchmarkGetTimeS(b *testing.B) {
	for i := 0; i < b.N; i++ {
		util.CURTIME()
	}
}

func BenchmarkGetTimeMS(b *testing.B) {
	for i := 0; i < b.N; i++ {
		util.CURTIMEMS()
	}
}

// --------------------------------------------------------------------------
/// @brief uuid生成器
// --------------------------------------------------------------------------
func BenchmarkUUID_Closure(b *testing.B) {
	for i := 0; i < b.N; i++ {
		util.UUID()
	}
}

func BenchmarkUUID_GlobalVar(b *testing.B) {
	for i := 0; i < b.N; i++ {
		util.UUID2()
	}
}

// --------------------------------------------------------------------------
/// @brief defer效率测试
// --------------------------------------------------------------------------
func MutexLockDefer(mtx* sync.Mutex) {
	mtx.Lock()
	defer mtx.Unlock()
}

func MutexLock(mtx* sync.Mutex) {
	mtx.Lock()
	mtx.Unlock()
}

func BenchmarkMutexLockDefer(b *testing.B) {
	var mtx sync.Mutex
	for i := 0; i < b.N; i++ {
		MutexLockDefer(&mtx)
	}
}

func BenchmarkMutexLock(b *testing.B) {
	var mtx sync.Mutex
	for i := 0; i < b.N; i++ {
		MutexLock(&mtx)
	}
}


