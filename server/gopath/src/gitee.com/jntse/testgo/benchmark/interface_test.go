package mytest
import "testing"
import "fmt"
var _ = fmt.Println

type IPeople interface {
	Name() string
	SetId(int64)
}

type Person struct {
	id	 int64
	age  int16
	name string
	addr string
}

func (p* Person) Name() string {
	return p.name
}

func (p *Person) SetId(i int64) {
	p.id = i
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func BenchmarkInterfaceArg(b *testing.B) {
	b.StopTimer()
	f := func (p IPeople) {
		p.Name()
		p.SetId(111)
	}

	p := &Person{ id:123, age:456, name:"goper", addr:"usa"}
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		f(p)
	}
}

func BenchmarkNonInterfaceArg(b *testing.B) {
	b.StopTimer()
	f := func (p *Person) {
		p.Name()
		p.SetId(111)
	}

	p := &Person{ id:123, age:456, name:"goper", addr:"usa"}
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		f(p)
	}
}

// --------------------------------------------------------------------------
/// @brief 接口调用函数比非接口调用慢2-3倍速度
// --------------------------------------------------------------------------
// 接口调用
func BenchmarkInterfaceFunCall(b *testing.B) {
	b.StopTimer()
	var conn ITcpConn = new(TcpConn)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		conn.Init()
	}
}

// 具体类型调用
func BenchmarkNonInterfaceFunCall(b *testing.B) {
	b.StopTimer()
	var conn *TcpConn = new(TcpConn)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		conn.Init()
	}
}

// 断言后调用效率和具体类型没有差别
func BenchmarkInterfaceTypeAssertions(b *testing.B) {
	b.StopTimer()
	var conn ITcpConn = new(TcpConn)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		ptr := conn.(*TcpConn)
		ptr.Init()
	}
}

// --------------------------------------------------------------------------
/// @brief 接口作为函数参数，和转换为具体类型再传递，效率差很多
// --------------------------------------------------------------------------

// 使用具体类型传递参数，效率极高
func SetConn(conptr *TcpConn) { conptr.Init() }
func BenchmarkPassInterfaceArg(b *testing.B) {
	b.StopTimer()
	var conn ITcpConn = new(TcpConn)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		SetConn(conn.(*TcpConn))
	}
}


// 使用接口指针没有比是用接口快20 - 30%?
func SetConn0(conptr *ITcpConn) { (*conptr).Init() }
func BenchmarkPassInterfaceArg0(b *testing.B) {
	b.StopTimer()
	var conn ITcpConn = new(TcpConn)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		SetConn0(&conn)
	}
}

// 传递接口参数
func SetConn1(conn ITcpConn) { conn.Init() }
func BenchmarkPassInterfaceArgLvl1(b *testing.B) {
	b.StopTimer()
	var conn ITcpConn = new(TcpConn)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		SetConn1(conn)
	}
}

// 传递2次接口参数和1次消耗没区别
func SetConn2(conn ITcpConn) { SetConn1(conn) }
func BenchmarkPassInterfaceArgLvl2(b *testing.B) {
	b.StopTimer()
	var conn ITcpConn = new(TcpConn)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		SetConn2(conn)
	}
}

