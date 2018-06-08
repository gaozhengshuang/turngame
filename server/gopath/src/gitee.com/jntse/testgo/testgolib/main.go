package makegolib

/*
	1.	当标识符(包括常量、变量、类型、函数名、结构字段等等)
			以一个大写字母开头，才可以被外部包使用，这被称为导出(像面向对象语言中的 public).

	2. 	标识符如果以小写字母开头，则对包外是不可见的，但是他们在整个包的内部是可见并且可用的(像面向对象语言中的 protected).
*/

// Reverse 将字符串翻转
func Reverse(s string) string {
	r := []rune(s)
	for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}


func add(s1 string, s2 string)	string	{
	return s1+s2;
}


