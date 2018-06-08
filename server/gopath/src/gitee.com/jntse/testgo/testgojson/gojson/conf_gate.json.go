package tbl

type ConfGate struct {
	Config   ConfGate_sub1   `json:"config"`
	Connects []ConfGate_sub3 `json:"connects"`
	Listens  []ConfGate_sub4 `json:"listens"`
	Name     string          `json:"name"`
	Redis    ConfGate_sub5   `json:"redis"`
}

type ConfGate_sub5 struct {
	DB     int64         `json:"db"`
	Host   ConfGate_sub2 `json:"host"`
	Passwd string        `json:"passwd"`
}

type ConfGate_sub3 struct {
	Disable  int64         `json:"disable"`
	Host     ConfGate_sub2 `json:"host"`
	Interval int64         `json:"interval"`
	Name     string        `json:"name"`
	Parser   string        `json:"parser"`
}

type ConfGate_sub1 struct {
	Excel string `json:"excel"`
	JSON  string `json:"json"`
	XML   string `json:"xml"`
}

type ConfGate_sub4 struct {
	Host   ConfGate_sub2 `json:"host"`
	Name   string        `json:"name"`
	Parser string        `json:"parser"`
}

type ConfGate_sub2 struct {
	IP   string `json:"ip"`
	Port int64  `json:"port"`
}
