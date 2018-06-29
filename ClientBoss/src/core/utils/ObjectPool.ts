module game {
    export interface PoolItem {
        onCreate(),

        onDestroy(),
    }

    export class ObjectPool<T> {
        private _classFactory;

        constructor(classFactory: any) {
            this._classFactory = classFactory;
        }

        private _pool = [];

        public list: Array<T> = [];

        public createObject(): T {
            let self = this;
            let result;
            let arr = self._pool;
            if (arr.length > 0) {
                result = arr.pop();
            }
            else {
                result = new self._classFactory();
            }
            if (result.onCreate) {
                result.onCreate();
            }
            this.list.push(result);
            return result;
        }

        public destroyObject(obj: T) {
            let index = this.list.indexOf(obj);
            if (index != -1) {
                this.list.splice(index, 1);
            }
            this._pool.push(obj);
            if ((<any>obj).onDestroy) {
                (<any>obj).onDestroy();
            }
        }

        public destroyAllObject() {
            let self = this;
            for (let i = self.list.length - 1; i >= 0; i--) {
                self.destroyObject(self.list[i]);
            }
        }

        public getListItemCount() {
            return this.list.length;
        }
    }
}