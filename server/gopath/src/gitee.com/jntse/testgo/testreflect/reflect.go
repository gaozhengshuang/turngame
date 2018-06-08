package main
import "fmt"
import "log"
import "reflect"
import "flag"
import _"os"
import "strings"
import "gitee.com/jntse/testgo/helloworld/common"

// --------------------------------------------------------------------------
/// @brief 	1.反射可以获取任意变量的类型和值
// 			2.修改反射对象 -- 必须具有可设置性
// 			3.设置性是反射值的一个属性，并不是所有的反射值有它.
// 			4.对不可设置值调用 Set 方法会有错误 panic 'unaddressable value'.
// --------------------------------------------------------------------------

func TestReflect()	{

	common.PrintSeparateLine("TestReflect")
	defer common.PrintSeparateLine("TestReflect")

	//if len(os.Args) > 1 {
	//	for i, k := range os.Args {
	//		fmt.Printf("命令行参数argu[%d]=%s\n", i, k) // 依次打印每个参数
	//	}
	//}

	argcmd := CmdlineFlag{"reflect.cnf", 100, 0.5}
	RegistCmdLineflag(&argcmd)
	fmt.Println(argcmd)
	return

	// 获取反射对象
	TestReflectGet()

	// 修改反射对象(必须具有可设置性)
	TestReflectSet()

	// 反射结构体
	TestReflectStruct()

	// 构造结构体实例
	TestStructNewInstance()

}


func TestReflectGet()	{
	common.PrintSeparateLine("TestReflectGet")
	defer common.PrintSeparateLine("TestReflectGet")

	{
		var f64 float64 = 3.4
		v := reflect.ValueOf(f64)
		fmt.Printf("v=%#v", v)
		fmt.Println("type:", v.Type())
		fmt.Println("kind is float64:", v.Kind() == reflect.Float64)	// Kind 方法返回一个常量来表示类型
		fmt.Println("value:", v.Float())

		v2 := reflect.TypeOf(f64)			// type Type interface {}
		fmt.Printf("type:%v\n",  v2)
		fmt.Printf("type:%#v\n", v2)
		fmt.Printf("type:%#v\n", v.Type())	// type Type interface {}
		fmt.Println("")
	}


	{
		var i64 int64 = 1122334455
		v := reflect.ValueOf(i64)
		fmt.Println("type:", v.Type())
		fmt.Println("kind is int64:", v.Kind() == reflect.Int64)	// Kind 方法返回一个常量来表示类型
		fmt.Println("value:", v.Int())
		fmt.Println("")
	}
}


func TestReflectSet()	{
	common.PrintSeparateLine("TestReflectSet")
	defer common.PrintSeparateLine("TestReflectSet")

	var str string = "hello reflect"
	v := reflect.ValueOf(str)
	fmt.Println("type:", v.Type())
	fmt.Println("value:", v.String())
	//v.SetString("reflect is good"); 	// panic: reflect.Value.SetString using unaddressable value
	fmt.Println("settability of v:" , v.CanSet())
	fmt.Println("")

	// 让反射具有可设置性
	v2 := reflect.ValueOf(&str).Elem()
	fmt.Println("type:", v2.Type())
	fmt.Println("value:", v2.String())
	fmt.Println("settability of v:" , v2.CanSet())
	v2.SetString("hi reflect")
	fmt.Println("now str is:", str)
	fmt.Println("")
}


func TestReflectStruct()	{
	common.PrintSeparateLine("TestReflectStruct")
	defer common.PrintSeparateLine("TestReflectStruct")

	type Student struct {
		Old int
		Name string
	}

	t := Student{23, "skidoo"}
	s := reflect.ValueOf(&t).Elem()
	fmt.Printf("s = %#v\n", s)
	typeOfT := s.Type()
	fmt.Printf("typeOfT = %#v\n", typeOfT)
	for i := 0; i < s.NumField(); i++ {
		f := s.Field(i)
		fmt.Printf("[%d]: %s %s = %v\n", i, typeOfT.Field(i).Name, f.Type(), f.Interface())
	}

	s.Field(0).SetInt(77)
	s.Field(1).SetString("Sunset Strip")
	fmt.Println("t now is", t)
}

type CmdlineFlag struct {
	Conf		string
	Robotnum 	int
	Percent		float64
}

func RegistCmdLineflag(arglist interface{})  {
	vf := reflect.ValueOf(arglist)
	if vf.Kind() != reflect.Ptr { panic("'arglist' must be a pointer of struct") }
	s  := vf.Elem()
	fmt.Printf("s = %#v\n", s)

	typeOfT := s.Type()
	fmt.Printf("typeOfT = %#v\n", typeOfT)
	values := make([]interface{},0)

	for i := 0; i < s.NumField(); i++ {
		f := s.Field(i)
		fname := typeOfT.Field(i).Name
		fname = strings.ToLower(fname)	// 使用小写注册参数
		//fmt.Printf("[%d]: %s %s = %v\n", i, fname, f.Type(), f.Interface())
		switch f.Kind() {
		case reflect.String:
			str := flag.String(fname, "", "input -" + fname)
			values = append(values, str)
		case reflect.Float64:
			fval := flag.Float64(fname, 0, "input -" + fname)
			values = append(values, fval)
		case reflect.Int:
			ival := flag.Int(fname, 0, "input -" + fname)
			values = append(values, ival)
		case reflect.Int64:
			ival := flag.Int64(fname, 0, "input -" + fname)
			values = append(values, ival)
		default:
			panic(fmt.Sprintf("cmdline not support kind=%s", f.Type()))
		}
	}

	flag.Parse()

	for i := 0; i < s.NumField(); i++ {
		f := s.Field(i)
		fname := typeOfT.Field(i).Name
		fname = strings.ToLower(fname)
		ptr := values[i]
		//err := "-----input '-" + fname + "' cmdline argu-----"
		switch f.Kind() {
		case reflect.String:
			val := *ptr.(*string)
			f.SetString(val)
		case reflect.Float64:
			val := *ptr.(*float64)
			f.SetFloat(float64(val))
		case reflect.Int:
			val := *ptr.(*int)
			f.SetInt(int64(val))
		case reflect.Int64:
			val := *ptr.(*int64)
			f.SetInt(val)
		default:
			panic(fmt.Sprintf("not support kind=%s", f.Type()))
		}
	}
}

// --------------------------------------------------------------------------
/// @brief 构造结构体实例
// --------------------------------------------------------------------------
type Foo struct {
	id   int
	name string
}
func (t* Foo) getname() string {
	return t.name
}

type Bar struct {
	id int
	name string
}
func (t* Bar) getname() string {
	return t.name
}

func TestStructNewInstance() {
	common.PrintSeparateLine("TestStructNewInstance")
	defer common.PrintSeparateLine("TestStructNewInstance")


	regStruct := make(map[string]interface{})
	regStruct["Foo"] = Foo{}
	regStruct["Bar"] = Bar{}

	newInstance1 := func(name string) {
		itype, ok := regStruct[name]
		if ok == false { return }
		ty := reflect.ValueOf(itype).Type()
		obj := reflect.New(ty).Elem()
		log.Printf("struct name=%s.%s", ty.PkgPath(), ty.Name())
		log.Printf("t=%#v", ty)
		log.Printf("v=%#v", obj)
	}
	newInstance1("Bar")

	newInstance2 := func(name string) {
		itype, ok := regStruct[name]
		if ok == false { return }
		ty := reflect.TypeOf(itype)
		obj := reflect.New(ty).Elem().Interface()
		log.Printf("struct name=%s.%s", ty.PkgPath(), ty.Name())
		log.Printf("t=%#v", ty)
		log.Printf("v=%#v", obj)
	}
	newInstance2("Foo")

}


