namespace ooo.treelink.test {
    export function test_event() {
        executeTest([
            test_1,
            test_2
        ]);
    }

    interface TestEvent {
        key1: void;
        key2: string;
        key3: { test: string, test2: boolean };
        key4: void;
    }

    async function test_1() {
        let event = new common.event.Event<TestEvent>();
        let result1_1: any;
        let result1_2: any;
        let result2: any[] = [];
        let result3: any[] = [];

        event.attachEvent("key1", async () => { result1_1 = "test1_1"; });
        event.attachEvent("key1", async () => { result1_2 = "test1_2"; });
        event.attachEvent("key2", async (a: string) => { result2.push(a); });
        event.attachEvent("key3", async (a: { test: string, test2: boolean }) => {
            result3.push(a.test + "_1");
        });
        event.attachEvent("key3", async (a: { test: string, test2: boolean }) => {
            result3.push(a.test + "_2");
            return a.test2;
        });
        event.attachEvent("key3", async (a: { test: string, test2: boolean }) => {
            result3.push(a.test + "_3");
        });

        await event.fireEvent("key1", undefined);
        await event.fireEvent("key2", "result2_1");
        await event.fireEvent("key2", "result2_2");
        await event.fireEvent("key3", { test: "result3_1", test2: true });
        await event.fireEvent("key3", { test: "result3_2", test2: false });

        return (
            result1_1 == "test1_1" &&
            result1_2 == "test1_2" &&
            result2[0] == "result2_1" &&
            result2[1] == "result2_2" &&
            result3[0] == "result3_1_1" &&
            result3[1] == "result3_1_2" &&
            result3[2] == "result3_1_3" &&
            result3[3] == "result3_2_1" &&
            result3[4] == "result3_2_2" &&
            result3[5] == undefined
        );
    }

    async function test_2() {
        let counter = 0;
        let event = new common.event.Event<TestEvent>();
        let eventInterval = new common.event.IntervalExecuter<number>(100, () => {
            counter++;
            console.log("key1/" + counter);
        });

        event.attachEvent("key1", async (e) => {
            eventInterval.execute(counter);
        });

        await Promise.all([
            wait(() => { console.log("log"); event.fireEvent("key1", undefined); }, 10),
            wait(() => { console.log("log"); event.fireEvent("key1", undefined); }, 20),
            wait(() => { console.log("log"); event.fireEvent("key1", undefined); }, 30),
            wait(() => { console.log("log"); event.fireEvent("key1", undefined); }, 40),
            wait(() => { console.log("log"); event.fireEvent("key1", undefined); }, 50),
            wait(() => { console.log("log"); event.fireEvent("key1", undefined); }, 150),
            wait(() => { console.log("log"); event.fireEvent("key1", undefined); }, 160),
            wait(() => { console.log("log"); event.fireEvent("key1", undefined); }, 170)
        ]);

        await wait(() => { }, 500);
        console.log(counter);

        return counter == 2;
    }

    function wait(func: () => void, interval: number): Promise<void> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                func();
                res();
            }, interval);
        });
    }
}