package mytest
import "testing"
import "fmt"
var _ = fmt.Println

type IAnimal interface {
	Name() string
	SetId(int64)
	Init()
}

type Dog struct {
	id	 int64
	age  int16
	name string
	addr string
}

func (p* Dog) Name() string {
	return p.name
}

func (p *Dog) SetId(i int64) {
	p.id = i
}

func (p *Dog) Init() {
}


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func BenchmarkInterfaceArg(b *testing.B) {
	b.StopTimer()
	f := func (p IAnimal) {
		p.Name()
		p.SetId(111)
	}

	p := &Dog{ id:123, age:456, name:"goper", addr:"usa"}
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		f(p)
	}
}

func BenchmarkNonInterfaceArg(b *testing.B) {
	b.StopTimer()
	f := func (p *Dog) {
		p.Name()
		p.SetId(111)
	}

	p := &Dog{ id:123, age:456, name:"goper", addr:"usa"}
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
	var obj IAnimal = new(Dog)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		obj.Init()
	}
}

// 具体类型调用
func BenchmarkNonInterfaceFunCall(b *testing.B) {
	b.StopTimer()
	var obj *Dog = new(Dog)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		obj.Init()
	}
}

// 断言后调用效率和具体类型没有差别
func BenchmarkInterfaceTypeAssertions(b *testing.B) {
	b.StopTimer()
	var obj IAnimal = new(Dog)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		ptr := obj.(*Dog)
		ptr.Init()
	}
}

// --------------------------------------------------------------------------
/// @brief 接口作为函数参数，和转换为具体类型再传递，效率差很多
// --------------------------------------------------------------------------

// 使用具体类型传递参数，效率极高
func InitObj(conptr *Dog) { conptr.Init() }
func BenchmarkPassInterfaceArg(b *testing.B) {
	b.StopTimer()
	var obj IAnimal = new(Dog)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		InitObj(obj.(*Dog))
	}
}


// 使用接口指针没有比是用接口快20 - 30%?
func InitObj0(conptr *IAnimal) { (*conptr).Init() }
func BenchmarkPassInterfaceArg0(b *testing.B) {
	b.StopTimer()
	var obj IAnimal = new(Dog)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		InitObj0(&obj)
	}
}

// 传递接口参数
func InitObj1(obj IAnimal) { obj.Init() }
func BenchmarkPassInterfaceArgLvl1(b *testing.B) {
	b.StopTimer()
	var obj IAnimal = new(Dog)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		InitObj1(obj)
	}
}

// 传递2次接口参数和1次消耗是有区别的
func InitObj2(obj IAnimal) { InitObj1(obj) }
func BenchmarkPassInterfaceArgLvl2(b *testing.B) {
	b.StopTimer()
	var obj IAnimal = new(Dog)
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		InitObj2(obj)
	}
}

