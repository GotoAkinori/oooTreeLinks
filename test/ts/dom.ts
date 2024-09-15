namespace ooo.treelink.test {
    export function test_dom() {
        executeTest([
            test_1
        ]);
    }

    function test_1(): boolean {
        let div = ooo.treelink.common.dom.addChild(document.body, "div");
        let table = ooo.treelink.common.dom.addChild(div, "table");

        let [tr1, [cell1_1, cell1_2, cell1_3]] = common.dom.addTableRow(table, 3, 3);
        tr1.style.backgroundColor = "#336";
        cell1_1.innerText = cell1_1.tagName;
        cell1_2.innerText = cell1_1.tagName;
        cell1_3.innerText = cell1_1.tagName;

        let [tr2, [cell2_1, cell2_2, cell2_3]] = common.dom.addTableRow(table, 3, 1);
        tr2.style.backgroundColor = "#363";
        cell2_1.innerText = cell1_1.tagName;
        cell2_2.innerText = cell1_1.tagName;
        cell2_3.innerText = cell1_1.tagName;

        let [tr3, [cell3_1, cell3_2, cell3_3]] = common.dom.addTableRow(table, 3);
        tr3.style.backgroundColor = "#633";
        cell3_1.innerText = cell1_1.tagName;
        cell3_2.innerText = cell1_1.tagName;
        cell3_3.innerText = cell1_1.tagName;

        return (
            cell1_1.tagName.toLowerCase() == "th" &&
            cell1_2.tagName.toLowerCase() == "th" &&
            cell1_3.tagName.toLowerCase() == "th" &&
            cell2_1.tagName.toLowerCase() == "th" &&
            cell2_2.tagName.toLowerCase() == "td" &&
            cell2_3.tagName.toLowerCase() == "td" &&
            cell3_1.tagName.toLowerCase() == "td" &&
            cell3_2.tagName.toLowerCase() == "td" &&
            cell3_3.tagName.toLowerCase() == "td"
        );
    }
}