namespace ooo.treelink.test {
    export async function executeTest(funcs: (() => (boolean | Promise<boolean>))[]) {
        let result = true;
        for (let func of funcs) {
            try {
                let unit_result = await func();
                if (unit_result == false) {
                    console.error("Test Failed.")
                    console.error(func.name);
                    result = false;
                }
            } catch (ex) {
                console.error("Test Failed(Exception)");
                console.error(func.name);
                console.trace(ex);
                result = false;
            }
        }

        if (result) {
            console.log("Test completed. Result = True.");
        } else {
            alert("There was on or more NG cases. See console log.");
        }
    }

    export function compArray<T>(
        arr1: T[],
        arr2: T[],
        compElement: (e1: T, e2: T) => boolean = (e1, e2) => e1 == e2
    ) {
        if (arr1.length != arr2.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            if (!compElement(arr1[i], arr2[i])) {
                return false;
            }
        }
        return true;
    }
}