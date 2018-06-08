package util
import (
	"time"
	"math/rand"
)


// 打乱 slice list
func Shuffle(list []int32) {
	rand.Seed(time.Now().UnixNano())
	for i := range list {
		j := rand.Intn(i + 1)
		list[i], list[j] = list[j], list[i]
	}
}

// 移除切片元素
func IntSliceRemove(list []int32, val int32) []int32 {
	newlist, index, endindex := make([]int32, 0, len(list)), int32(0), len(list) - 1
	for k, v := range list {
		if v == val {
			newlist = append(newlist, list[index:k]...)
			index = int32(k) + 1
		} else if k == endindex {
			newlist = append(newlist, list[index:endindex+1]...)
		}
	}

	return newlist
}


