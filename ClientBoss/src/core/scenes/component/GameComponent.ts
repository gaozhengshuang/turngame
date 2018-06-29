module game {
    export class GameComponent extends eui.Component {
        constructor() {
            super();
            this.skinName = this.getSkinName();
            this.init();
        }

        protected init() {

        }

        protected getSkinName() {

        }

        protected _touchEvent: Array<ComponentTouchEvent>;
        protected _notify: Array<ComponentNotify>;

        protected addEventAndNotify() {
            if (this._touchEvent && this._touchEvent.length > 0) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callTouchEvent, this);
            }
            if (this._notify && this._notify.length > 0) {
                for (let i = 0; i < this._notify.length; i++) {
                    let notify = this._notify[i];
                    if (notify.execute) {
                        BINDING_EXEC(notify.source, notify.target, notify.callBackFunc, notify.notifyName);
                    } else {
                        BINDING_ONLY(notify.source, notify.target, notify.callBackFunc, notify.notifyName);
                    }
                }
            }
        }

        protected removeEventAndNotify() {
            if (this._touchEvent && this._touchEvent.length > 0) {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callTouchEvent, this);
            }
            if (this._notify && this._notify.length > 0) {
                for (let i = 0; i < this._notify.length; i++) {
                    let notify = this._notify[i];
                    UNBINDING(notify.source, notify.target, notify.notifyName);
                }
            }
        }

        protected callTouchEvent(event: egret.TouchEvent) {
            let target = event.target;
            for (let i = 0; i < this._touchEvent.length; i++) {
                if (target == this._touchEvent[i].target) {
                    this._touchEvent[i].callBackFunc.bind(this)(target, event);
                }
            }
        }

        public removeFromParent() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }

    export interface ComponentTouchEvent {
        target: egret.DisplayObject,
        callBackFunc: Function,
    }

    export interface ComponentNotify {
        source: Notification,
        target: any,
        callBackFunc: Function,
        notifyName: string,
        execute: boolean,
    }
}