namespace ooo.treelink.common.event {
    export abstract class EventArgs { }

    export class Event<K> {
        /**
         * List ot evnets
         */
        private events: { [name in keyof K]?: ((e: K[name]) => Promise<boolean | void>)[] } = {};

        /**
         * constructor
         */
        public constructor() { }

        /**
         * Fire event.
         * @param name Event name.
         * @param arg Event argument.
         */
        public async fireEvent<name extends keyof K>(name: name, arg: K[name]) {
            if (this.events[name]) {
                for (let func of this.events[name]!) {
                    let result = await func(arg);
                    if (result === false) {
                        return false;
                    }
                }
            }
            return true;
        }

        /**
         * Attach event.
         * @param name Event name.
         * @param callback Event callback.
         */
        public attachEvent<name extends keyof K>(name: name, callback: (e: K[name]) => Promise<void | boolean>) {
            if (!this.events[name]) {
                this.events[name] = [];
            }

            this.events[name]!.push(callback);
        }

        public interval() {
        }
    }

    export class IntervalExecuter<T> {
        private shouldRun: boolean = false;
        private arg?: T;
        public constructor(public interval: number, public executeProc: (arg: T) => void) { }
        public execute(arg: T) {
            this.arg = arg;
            if (!this.shouldRun) {
                setTimeout(this.executeInterval.bind(this), this.interval);
            }
            this.shouldRun = true;
        }
        private executeInterval() {
            if (this.shouldRun) {
                this.executeProc(this.arg!);
                setTimeout(this.executeInterval, this.interval);
                this.shouldRun = false;
            }
        }
    }
}