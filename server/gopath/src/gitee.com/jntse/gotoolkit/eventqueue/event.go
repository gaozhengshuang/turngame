package eventque

type IEvent interface {
	Process(ch_fback chan IEvent)
	Feedback()
}

// --------------------------------------------------------------------------
/// @brief 特定事件处理
// --------------------------------------------------------------------------
type HttpPostEventHandle func(url string, body string) (string, error)
type HttpPostEventFeedback func(resp string, err error)
type HttpPostEvent struct {
	url string 
	body string
	handler HttpPostEventHandle

	resp string
	resp_err error
	feedback HttpPostEventFeedback
}

func NewHttpPostEvent(url, body string, handler HttpPostEventHandle, feed HttpPostEventFeedback) *HttpPostEvent {
	return &HttpPostEvent{url:url, body:body, handler:handler, feedback:feed}
}       

func (this *HttpPostEvent) Process(ch_fback chan IEvent) {
	this.resp, this.resp_err = this.handler(this.url, this.body)
	ch_fback <- this
}   

func (this *HttpPostEvent) Feedback() {
	this.feedback(this.resp, this.resp_err)
}

// --------------------------------------------------------------------------
/// @brief 通用事件处理(大量使用了接口，效率这一块需要测试)
// --------------------------------------------------------------------------
type CommonEventHandle func([]interface{}) []interface{}
type CommonEventFeedback func([]interface{})
type CommonEvent struct {
	iparams []interface{}			// 事件参数
	fparams []interface{}			// 事件反馈参数
	handler CommonEventHandle		// 事件处理回调
	feedback CommonEventFeedback	// 事件反馈回调
}

func NewCommonEvent(iparams []interface{}, handler CommonEventHandle, feedback CommonEventFeedback) *CommonEvent {
	return &CommonEvent{iparams:iparams, handler:handler, feedback:feedback}
}

func (this *CommonEvent) Process(ch_fback chan IEvent) {
	this.fparams = this.handler(this.iparams)
	if this.feedback != nil {
		ch_fback <- this
	}
}

func (this *CommonEvent) Feedback() {
	if this.feedback != nil { this.feedback(this.fparams) }
}


