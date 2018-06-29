module game {
    export function BINDING_EXEC(source: Notification, target: any, call_back_func: Function, notify_name: string) {
        if (target) {
            if (source.addObserver(target, call_back_func, notify_name)) {
                call_back_func.call(target);
            }
        }
        else call_back_func.call(target);
    }

    export function BINDING_ONLY(source: Notification, target: any, call_back_func: Function, notify_name: string) {
        if (target) {
            source.addObserver(target, call_back_func, notify_name);
        }
    }

    export function UNBINDING_ALL(source: Notification, target: any) {
        if (target) {
            source.removeAllObservers(target);
        }
    }

    export function UNBINDING(source: Notification, target: any, notify_name: string) {
        if (target) {
            source.removeObserver(target, notify_name);
        }
    }

    export class NotificationInfo {
        static create(name: string, fTime: number, target: any, selector: Function): NotificationInfo {
            let info = new NotificationInfo(name, target, selector);
            egret.setTimeout(info.scheduleUpdate, info, fTime);
            return info;
        }

        constructor(name: string, target: any, selector: Function) {
            this.m_name = name;
            this.m_target = target;
            this.m_selector = selector;
        }

        public scheduleUpdate(dt: number): void {
            let self = this;
            if (self.m_target) {
                self.m_selector.call(self.m_target, self.m_name);
                self.m_target = null;
                self.m_selector = null;
            }
        }

        private m_selector: Function;
        private m_target: any;
        private m_name: string;
    }

    export interface Observer {
        target: any;
        selector: Function;
        name: string;
        once: boolean;
    }

    export class Notification {
        private m_observers: Array<Observer>;

        public constructor() {
            this.m_observers = [];
        }

        public observerExisted(target: any, name: string): boolean {
            let array = this.m_observers;
            for (let i = 0, n = array.length; i < n; i++) {
                let observer: Observer = array[i];

                if (observer.target == target && observer.name == name) {
                    return true;
                }
            }
            return false;
        }

        public addObserver(target: any, selector: Function, name: string): boolean {
            if (this.observerExisted(target, name)) return false;

            let observer: Observer = {target: target, selector: selector, name: name, once: false};
            this.m_observers.push(observer);
            return true;
        }

        public once(target: any, selector: Function, name: string): boolean {
            if (this.observerExisted(target, name)) return false;

            let observer: Observer = {target: target, selector: selector, name: name, once: true};
            this.m_observers.push(observer);
            return true;
        }


        public removeObserver(target: any, name: string) {
            let array = this.m_observers;

            for (let i = 0, n = array.length; i < n; i++) {
                let observer: Observer = array[i];

                if (observer.name == name && observer.target == target) {
                    array.splice(i, 1);
                    return;
                }
            }
        }

        public removeAllObservers(target: any): number {
            let array = this.m_observers, count = 0;

            for (let i = array.length - 1; i >= 0; --i) {
                let observer: Observer = array[i];

                if (observer.target == target) {
                    array.splice(i, 1);
                    count++;
                }
            }

            return count;
        }

        public async postNotification(name: string, data: any = null) {
            // let self = this;
            // if (typeof dataOrTime === "number" && dataOrTime > 0) {
            //     NotificationInfo.create(name, dataOrTime, self, self.postNotification);
            //     return;
            // }

            let array = this.m_observers;
            let observer: Observer;
            for (let i = 0; i < array.length; i++) {
                observer = array[i];
                if (observer.name === name) {
                    await observer.selector.call(observer.target, data);
                    if (observer.once) {
                        this.removeObserver(observer.target, observer.name);
                        i--;
                    }
                }
            }
        }
    }

    export class NotificationCenter extends Notification {
        private static _instance: NotificationCenter;

        private static getInstance(): NotificationCenter {
            if (!NotificationCenter._instance) {
                NotificationCenter._instance = new NotificationCenter();
            }
            return NotificationCenter._instance;
        }

        public static once(target: any, selector: Function, name: string) {
            this.getInstance().once(target, selector, name);
        }

        public static addObserver(target: any, selector: Function, name: string) {
            this.getInstance().addObserver(target, selector, name)
        }

        public static removeObserver(target: any, name: string) {
            this.getInstance().removeObserver(target, name);
        }

        public static postNotification(name: string, data: any = null) {
            this.getInstance().postNotification(name, data);
        }
    }
}