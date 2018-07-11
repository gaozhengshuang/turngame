import _ from 'lodash';
import Define from '../../Util/Define';
import Tools from '../../Util/Tools';

var GameComponent = require('../GameComponent');
cc.Class({
    extends: GameComponent,

    properties: {
        phoneEditBox: { default: null, type: cc.EditBox },
        phoneItemViewPrefab: { default: null, type: cc.Prefab },
        phoneItemParentNode: { default: null, type: cc.Node },
        phoneGroupView: { default: null, type: cc.Node },
        phoneInfos: { default: [], type: [String] },
        closeFunc: { default: null, type: Function },
    },

    onLoad() {
        this.phoneGroupView.active = false;
        let phones = cc.sys.localStorage.getItem(Define.DATA_KEY.HISTORY_PHONE);
        // console.log(phones);
        this.phoneInfos = JSON.parse(phones) || [];
        for (let i = 0; i < this.phoneInfos.length; i++) {
            let node = cc.instantiate(this.phoneItemViewPrefab);
            node.parent = this.phoneItemParentNode;
            let phoneItemView = node.getComponent('PhoneItemView');
            phoneItemView.init(this.phoneInfos[i], this.onPhoneItemClick.bind(this));
        }
    },

    start() {

    },

    update(dt) {

    },
    onPhoneItemClick(phone) {
        this.phoneEditBox.string = phone;
        this.phoneGroupView.active = false;
    },
    onDropDownBtnClick(event) {
        event.stopPropagationImmediate();
        this.phoneGroupView.active = !this.phoneGroupView.active;
    },
    onConfirmBtnClick(event) {
        event.stopPropagationImmediate();
        if (this.phoneEditBox.string == '') {
            this.showTips({ text: '请输入手机号码' });
            return;
        }
        //保存本地数据
        if (this.phoneEditBox.string != '') {
            if (_.indexOf(this.phoneInfos, this.phoneEditBox.string) == -1) {
                this.phoneInfos.push(this.phoneEditBox.string);
                cc.sys.localStorage.setItem(Define.DATA_KEY.HISTORY_PHONE, JSON.stringify(this.phoneInfos));
            }
        }
        Tools.invokeCallback(this.closeFunc, this.phoneEditBox.string);
        this.node.destroy();
    },
    onCancleBtnClick(event) {
        event.stopPropagationImmediate();
        this.node.destroy();
    },
    init(closeFunc) {
        this.closeFunc = closeFunc;
    }
});
