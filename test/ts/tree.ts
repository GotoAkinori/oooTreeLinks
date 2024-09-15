namespace ooo.treelink.test {
    let tree1: treelink.OooTree;
    let tree2: treelink.OooTree;

    export function test_tree() {
        executeTest([
            getChildRange_test,
            unsortedData_test,
            event_test
        ]);
    }

    function getChildRange_test(): boolean {
        let svg = common.dom.addSVGChild(document.body, "svg");
        svg.style.height = "400px";
        tree1 = new treelink.OooTree("tree1", svg, "../../icon/", { left: 10, top: 10, width: 250, height: 400 });

        tree1.setData([
            { id: "1", parent: "", info: "data-1" },
            { id: "2", parent: "", info: "data-2" },
            { id: "2-1", parent: "2", info: "data-2-1" },
            { id: "2-2", parent: "2", info: "data-2-2" },
            { id: "2-3", parent: "2", info: "data-2-3" },
            { id: "2-2-1", parent: "2-2", info: "data-2-2-1" },
            { id: "2-2-2", parent: "2-2", info: "data-2-2-2" },
            { id: "3", parent: "", info: "data-3" },
            { id: "3-1", parent: "3", info: "data-3-1" }
        ]);

        let childRanges: number[] = [];
        for (let i = 0; i < 15; i++) {
            childRanges.push(tree1.getChildRange(i));
        }

        return compArray(
            childRanges,
            [1, 7, 3, 6, 5, 6, 7, 9, 9, -1, -1, -1, -1, -1, -1]
        );
    }

    function unsortedData_test(): boolean {
        let svg = common.dom.addSVGChild(document.body, "svg");
        svg.style.height = "400px";
        tree2 = new treelink.OooTree("tree2", svg, "../../icon/", { left: 10, top: 10, width: 250, height: 500 });

        tree2.setData([
            { id: "2-2-1", parent: "2-2", info: "data-2-2-1" },
            { id: "2-2-2", parent: "2-2", info: "data-2-2-2" },
            { id: "1", parent: "", info: "data-1" },
            { id: "2", parent: "", info: "data-2" },
            { id: "3", parent: "", info: "data-3" },
            { id: "4-1", parent: "4", info: "data-4-1" },
            { id: "3-1", parent: "3", info: "data-3-1" },
            { id: "2-1", parent: "2", info: "data-2-1" },
            { id: "2-2", parent: "2", info: "data-2-2" },
            { id: "2-3", parent: "2", info: "data-2-3" }
        ]);

        let idList = tree2.data.map(v => v.data.id);
        let correctList = ['1', '2', '2-1', '2-2', '2-2-1', '2-2-2', '2-3', '3', '3-1'];

        return compArray(idList, correctList);
    }

    function event_test(): boolean {
        let r1 = false;
        let r2 = false;
        let r3 = false;
        let r4 = false;
        let r5 = false;

        tree1.event.attachEvent("opentree", async e => {
            r1 = e.data.data.id == "2";
            return true;
        });

        let img2 = tree1.element_table.rows[1].querySelector("td:nth-child(2)>img") as HTMLImageElement;
        let img2_3 = tree1.element_table.rows[3].querySelector("td:nth-child(2)>img") as HTMLImageElement;

        img2.click();
        if (tree1.element_table.rows[4].hidden == true) {
            r2 = true;
        }
        img2.click();
        if (tree1.element_table.rows[4].hidden == false) {
            r3 = true;
        }

        img2_3.click();
        img2.click();
        if (tree1.element_table.rows[4].hidden == true) {
            r4 = true;
        }
        img2.click();
        if (tree1.element_table.rows[4].hidden == true) {
            r5 = true;
        }
        img2_3.click();

        {
            r5 = true;
            for (let row = 0; row < tree1.element_table.rows.length; row++) {
                if (tree1.element_table.rows[row].hidden == true) {
                    r5 = false;
                }
            }
        }

        return (
            r1 &&
            r2 &&
            r3 &&
            r4 &&
            r5
        );
    }
}