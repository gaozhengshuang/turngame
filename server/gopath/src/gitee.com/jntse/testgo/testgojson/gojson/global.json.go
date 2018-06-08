package tbl

type Global struct {
	Bool     bool          `json:"bool"`
	Float    float64       `json:"float"`
	Int      int64         `json:"int"`
	IntArray []int64       `json:"intArray"`
	ObjArray []Global_sub1 `json:"objArray"`
	StrArray []string      `json:"strArray"`
	String   string        `json:"string"`
}

type Global_sub1 struct {
	Item int64  `json:"item"`
	Name string `json:"name"`
}
