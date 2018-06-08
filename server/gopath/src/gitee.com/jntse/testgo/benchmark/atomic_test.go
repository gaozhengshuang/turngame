package mytest
import (
	"testing"
	_"fmt"
	"sync/atomic"
)


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func BenchmarkAtomicLoad(b *testing.B) {
	var d1 int32 = 100
	for i := 0; i < b.N; i++ {
		d1 = atomic.LoadInt32(&d1)
	}
}

func BenchmarkNoAtomicLoad(b *testing.B) {
	var d1 int32 = 100
	for i := 0; i < b.N; i++ {
		d1 = d1
	}
	d1 = d1 + 0
}


func BenchmarkAtomicStore(b *testing.B) {
	var d1 int32 = 100
	for i := 0; i < b.N; i++ {
		atomic.StoreInt32(&d1, int32(i))
	}
}


func BenchmarkNoAtomicStore(b *testing.B) {
	var d1 int32 = 100
	for i := 0; i < b.N; i++ {
		d1 = int32(i)
	}

	d1 = d1 + 0
}

