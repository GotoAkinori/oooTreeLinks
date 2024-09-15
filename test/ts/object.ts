namespace ooo.treelink.test {
    export function test_object() {
        executeTest([
            test_1
        ]);
    }

    function test_1(): boolean {
        let obj1 = {
            a: "1",
            b: 2,
            c: {
                d: "3",
                e: 4,
                f: [1, 2, 3, 4, 5]
            }
        };
        let obj2 = {
            a2: "1",
            c: {
                d: "4",
                d2: "5",
                f: [6, 7, 8, 9]
            },
            f: {
                g: "a"
            }
        };

        let obj3 = common.object.DeepClone(obj1);
        obj3.c.e = 5;
        common.object.DeepAssign(obj3, obj2);

        return (
            obj1.a == obj3.a &&
            obj1.c.e != obj3.c.e &&
            obj3.c.d == "4" &&
            obj3.c.f[1] == 7
        );
    }
}