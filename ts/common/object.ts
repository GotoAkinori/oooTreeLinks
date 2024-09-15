namespace ooo.treelink.common.object {

    /**
     * Copy values of obj2 to obj1.
     * @param obj1 
     * @param obj2 
     */
    export function DeepAssign(obj1: any, obj2: any): any {
        for (let k in obj2) {
            if (obj1[k] && typeof obj1[k] == "object" && typeof obj2[k] == "object") {
                DeepAssign(obj1[k], obj2[k]);
            } else {
                obj1[k] = obj2[k];
            }
        }
    }

    /**
     * Copy values of obj2 to obj1.
     * @param obj 
     * @param obj2 
     */
    export function DeepClone<T>(obj: T): T {
        let retObject: any = {};
        for (let k in obj) {
            if (typeof obj[k] == "object") {
                retObject[k] = DeepClone(obj[k]);
            } else {
                retObject[k] = obj[k];
            }
        }

        return retObject;
    }
}