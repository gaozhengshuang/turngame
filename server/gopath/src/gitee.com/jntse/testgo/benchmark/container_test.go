package mytest
import "testing"
import "fmt"
var print = fmt.Println


// --------------------------------------------------------------------------
/// @brief  map查找测试, 查找普通数字和接口差距不大
/// @return 
// --------------------------------------------------------------------------
func BenchmarkMapFindInt(b *testing.B) {
	b.StopTimer()
	m1 := make(map[int]int)
	for i:=0; i < 10; i++ { m1[i] = i }
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		result , ok := m1[i % 10]
		if ok == true {
			result += result
		}
	}
}

type INetSession interface {
	SendMsg()
}
type TcpSession struct {}
type UdpSession struct {}
func (this TcpSession) SendMsg() {}
func (this UdpSession) SendMsg() {}

// 查找接口
func BenchmarkMapFindInterface(b *testing.B) {
	b.StopTimer()
	m1 := make(map[int]INetSession)
	for i:=0; i < 10; i++ { 
		m1[i] = new(TcpSession)
	}
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		session, ok := m1[i % 10]
		if ok == true {
			session.SendMsg()
		}
	}
}

