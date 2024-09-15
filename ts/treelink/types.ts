namespace ooo.treelink.treelink.types {
    export type TreeData = {
        id: string,
        parent: string,
        info: string
    };

    export type TreeDataUI = {
        data: types.TreeData,
        ui?: HTMLTableRowElement,
        level: number,
        type: "open" | "closed" | "none"
    };

    export type LinkData = {
        from: string, to: string
    };

    export type LinkDataUI = {
        ui?: SVGPathElement,
        link: LinkData
    };

    export type TreeLinkData = {
        datalist: {
            name: string,
            items: TreeData[]
        }[],
        linklist: {
            from: string,
            to: string,
            links: LinkData[]
        }[]
    }
}
