package main
import "fmt"
import "gitee.com/jntse/testgo/helloworld/common"

// 汽车接口
type ICar interface {
	name() string
	price()	int
	power() (string, error)
	color()	string
}

// 简单车类，实现接口ICar
type SimpleCar struct {
}

func (this *SimpleCar) name() string {
	return "SimpleCar"
}
func (this* SimpleCar) price() int {
	return 1
}
func (this* SimpleCar) power() (string, error) {
	return "100kw", nil
}
func (this* SimpleCar) color() string {
	return "white"
}

// 桑塔纳 继承SimpleCar所有方法
type Santana struct {
	SimpleCar
}

// 重写name方法
func (this *Santana) name() string {
	return "Volkswagen Santana"
}


// 宝马3
type BMW_3_Series struct {
	name_ string
	price_ int
	power_ string
	color_ string
}
func (car* BMW_3_Series) name()	string {
	return car.name_;
}
func (car* BMW_3_Series) price() int {
	return car.price_;
}
func (car* BMW_3_Series) power() (string , error) {
	return car.power_, nil;
}
func (car* BMW_3_Series) color() string {
	return car.color_;
}

// 奔驰c
type Benz_C_Class struct {
	name_ string
	price_ int
	power_ string
	color_ string
}
func (car* Benz_C_Class) name()	string {
	return car.name_;
}
func (car* Benz_C_Class) price() int {
	return car.price_;
}
func (car* Benz_C_Class) power() (string ,error) {
	return car.power_ , nil;
}
func (car* Benz_C_Class) color() string {
	return car.color_;
}


// 永久牌自行车
type Forever_Bicycle struct	{
	name_ string
	price_ int
	color_ string
}

func (car* Forever_Bicycle) name() string {
	return car.name_;
}
func (car* Forever_Bicycle) price() int {
	return car.price_;
}
func (car* Forever_Bicycle) power() (string, error) {
	return "0", &Forever_Bicycle{}
}
func (car* Forever_Bicycle) color() string {
	return car.color_;
}
func (err* Forever_Bicycle) Error() string {
	return "自行车没有功率参数"
}


// 任何类型都可以去实现ICar接口
type SliceStr []string
func (car* SliceStr) name() string {
	return "法拉厉"
}
func (car* SliceStr) price() int {
	return 10
}
func (car* SliceStr) power() (string ,error) {
	return "0", &SliceStr{}
}
func (car* SliceStr) color() string {
	return "red"
}
func (car* SliceStr) Error() string {
	return "冒牌车连功率都没有"
}



// 通用接口，方法都是绑定的指针,使用的时候要传入地址
func ShowCarInfo(car ICar )	{
	pow , err := car.power()
	if err != nil { pow = err.Error() }
	fmt.Printf("name='%s' price='%dw' color='%s' power='%s'\n",
			car.name(),
			car.price(),
			car.color(),
			pow)
}


func TestInterfaceCar()	{

	common.PrintSeparateLine("TestInterfaceCar");
	defer common.PrintSeparateLine("TestInterfaceCar");

	// 桑塔纳
	var san Santana
	ShowCarInfo(&san)

	// 实现一个汽车通用接口
	bmw := &BMW_3_Series{"BMW", 27, "150kw", "blue"}
	ShowCarInfo(bmw)

	// 使用new分配内存，返回指针
	benz := new(Benz_C_Class)
	benz.name_ = "Benz"
	benz.price_ = 30
	benz.power_= "160kw"
	benz.color_ = "silvery"
	ShowCarInfo(benz)

	// 自行车
	bike := &Forever_Bicycle{ "Forever", 1, "black"}
	ShowCarInfo(bike)

	// 任意类型都可以实现接口
	fakecar := make(SliceStr, 1, 2)
	ShowCarInfo(&fakecar)


}
