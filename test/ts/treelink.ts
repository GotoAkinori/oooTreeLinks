namespace ooo.treelink.test {
    let tree1: treelink.OooTreeLink;

    export function test_treelink() {
        executeTest([
            view
        ]);
    }

    function view(): boolean {
        let svg = common.dom.addSVGChild(document.body, "svg");
        svg.style.height = "250px";
        svg.style.width = "100%";
        tree1 = new treelink.OooTreeLink(
            svg,
            "../../icon/"
        );

        tree1.setData({
            datalist: [
                {
                    name: "tree1",
                    items: [
                        { id: "1", parent: "", info: "item-1" },
                        { id: "1-1", parent: "1", info: "item-1-1" },
                        { id: "1-2", parent: "1", info: "item-1-2" },
                        { id: "1-2-1", parent: "1-2", info: "item-1-2-1" },
                        { id: "1-2-2", parent: "1-2", info: "item-1-2-2" },
                        { id: "1-3", parent: "1", info: "item-1-3" },
                        { id: "2", parent: "", info: "item-2" },
                        { id: "2-1", parent: "2", info: "item-2-1" },
                        { id: "3", parent: "", info: "item-3" },
                        { id: "3-1", parent: "3", info: "item-3-1" },
                        { id: "3-2", parent: "3", info: "item-3-2" },
                        { id: "3-3", parent: "3", info: "item-3-3" }
                    ]
                }, {
                    name: "tree2",
                    items: [
                        { id: "1", parent: "", info: "item-1" },
                        { id: "2", parent: "", info: "item-2" },
                        { id: "2-1", parent: "2", info: "item-2-1" },
                        { id: "2-2", parent: "2", info: "item-2-2" },
                        { id: "2-3", parent: "2", info: "item-2-3" },
                        { id: "2-3-1", parent: "2-3", info: "item-2-3-1" },
                        { id: "2-3-1-1", parent: "2-3-1", info: "item-2-3-1-1" },
                        { id: "2-3-1-2", parent: "2-3-1", info: "item-2-3-1-2" },
                        { id: "3", parent: "", info: "item-3" },
                        { id: "3-1", parent: "3", info: "item-3-1" },
                        { id: "3-2", parent: "3", info: "item-3-2" },
                        { id: "3-3", parent: "3", info: "item-3-3" },
                        { id: "3-4", parent: "3", info: "item-3-4" },
                        { id: "3-5", parent: "3", info: "item-3-5" }
                    ]
                }, {
                    name: "tree3",
                    items: [
                        { id: "1", parent: "", info: "item-1" },
                        { id: "2", parent: "", info: "item-2" },
                        { id: "3", parent: "", info: "item-3" },
                        { id: "4", parent: "", info: "item-4" },
                        { id: "5", parent: "", info: "item-5" },
                        { id: "6", parent: "", info: "item-6" },
                        { id: "7", parent: "", info: "item-7" },
                        { id: "8", parent: "", info: "item-8" },
                        { id: "9", parent: "", info: "item-9" },
                        { id: "10", parent: "", info: "item-10" },
                        { id: "11", parent: "", info: "item-11" },
                        { id: "12", parent: "", info: "item-12" },
                        { id: "13", parent: "", info: "item-13" },
                        { id: "14", parent: "", info: "item-14" },
                        { id: "15", parent: "", info: "item-15" },
                        { id: "16", parent: "", info: "item-16" },
                        { id: "17", parent: "", info: "item-17" }
                    ]
                }
            ],
            linklist: [{
                from: "tree1",
                to: "tree2",
                links: [
                    { from: "1", to: "2-1" },
                    { from: "1", to: "2-2" },
                    { from: "1-1", to: "1" },
                    { from: "1-2-2", to: "2-3-1-1" },
                    { from: "2-1", to: "3" },
                    { from: "3-1", to: "3-1" },
                    { from: "3-1", to: "3-5" },
                    { from: "3-3", to: "3-2" }
                ]
            }, {
                from: "tree2",
                to: "tree3",
                links: [
                    { from: "1", to: "5" },
                    { from: "1", to: "2" },
                    { from: "2-3-1-2", to: "7" },
                    { from: "2-3-1-1", to: "5" },
                    { from: "3-4", to: "13" },
                    { from: "3-4", to: "16" },
                    { from: "3", to: "17" },
                    { from: "2-1", to: "11" },
                    { from: "x", to: "1" },
                    { from: "1", to: "y" },
                    { from: "x", to: "y" }
                ]
            }]
        });

        return true;
    }
}