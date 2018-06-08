package main
//import "fmt"

func main() {
	//fmt.Println("vim-go")
}

type CyclicBuffer struct {
	capacit int32
	buf     []byte
	wpos    int32
	rpos    int32
	len     int32
}

func NewCyclicBuffer(capacity int32) *CyclicBuffer {
	buffer := &CyclicBuffer {
		capacit : capacity,
		buf  : make([]byte, 0, capacity),
		wpos : 0,
		rpos : 0,
		len  : 0,
	}
	return buffer
}

func (this *CyclicBuffer) capacity() int32 {
	return this.capacit 
}

func (this *CyclicBuffer) size() int32 { 
	return this.len 
}

func (this *CyclicBuffer) remain() int32 { 
	return this.capacit - this.size() 
}

// nlen is -1 means pop all data
func (this *CyclicBuffer) pop(out_buf []byte, buf_len int32, nlen int32) int32 {
	return 0
}

//func (this *CyclicBuffer) push(data []byte) int32 {
//	nlen := len(data)
//	if ( data == nil || nlen == 0)
//		return 0
//
//	if nlen > this.remain() {
//		this.increase(nlen)
//	}
//
//	nRealPush = nlen;
//	if wpos >= rpos {
//		nRSpace := this.capacity() - wpos
//		nDataRemain := nlen - nRSpace
//		if nDataRemain <= 0 {
//			//memcpy(buf + wpos, data, nlen);
//			buf = append(buf[wpos:], data)
//			wpos  += nlen;
//			if wpos == capacity() {
//				wpos = 0;
//			}
//		}
//		else                    {
//			memcpy(buf + wpos, data, nRSpace );
//			memcpy(buf, data+nRSpace, nDataRemain );
//			wpos  = nDataRemain;
//		}
//	}
//	else if ( wpos < rpos)
//	{
//		memcpy(buf + wpos, data, nlen);
//		wpos += nlen;
//	}
//
//	using std::min;
//	len = min(nRealPush+size(), capacity());
//	return nRealPush;
//}

// unchange "rpos" and "len" ,just copy data!
func (this *CyclicBuffer) copy(out_buf []byte, nlen int32) {
}

// buff will read this "data" first! when buffer size() is too large not recommend!
func (this *CyclicBuffer) push_front(data []byte, nlen int32) int32 {
	return 0
}

//func (this *CyclicBuffer) reset() {
//	wpos = 0
//	rpos = 0
//	this.len  = 0
//}

func (this *CyclicBuffer) increase(nlen int32) bool {
	return false
}


