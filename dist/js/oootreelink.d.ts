declare namespace ooo.treelink.common.dom {
    /**
     * Add a new dom element as a last child of 'parent';
     * @param parent New element is added in 'parent' as a last child.
     * @param tagName Tag name of the new element.
     * @returns
     */
    function addChild<K extends keyof HTMLElementTagNameMap>(parent: HTMLElement | SVGElement, tagName: K): HTMLElementTagNameMap[K];
    /**
     * Insert a new dom element as a last child of 'parent';
     * @param parent New element is added in 'parent' as a last child.
     * @param tagName Tag name of the new element.
     * @returns
     */
    function insertChild<K extends keyof HTMLElementTagNameMap>(parent: HTMLElement | SVGElement, before: Element, tagName: K): HTMLElementTagNameMap[K];
    /**
     * Add a new svg element as a last child of 'parent';
     * @param parent New element is added in 'parent' as a last child.
     * @param tagName Tag name of the new element.
     * @returns
     */
    function addSVGChild<K extends keyof SVGElementTagNameMap>(parent: HTMLElement | SVGElement, tagName: K): SVGElementTagNameMap[K];
    /**
     * Add a new row.
     * @param parent Table or table section.
     * @param columns Number of columns to add.
     * @param thCount Number of 'TH' columns. Default is 0.
     * @returns
     */
    function addTableRow(parent: HTMLTableElement | HTMLTableSectionElement, columns: number, thCount?: number): [
        HTMLTableRowElement,
        HTMLTableCellElement[]
    ];
    /**
     * Add a new row.
     * @param parent Table or table section.
     * @param columns Number of columns to add.
     * @param thCount Number of 'TH' columns. Default is 0.
     * @returns
     */
    function insertTableRow(parent: HTMLTableElement | HTMLTableSectionElement, index: number, columns: number, thCount?: number): [
        HTMLTableRowElement,
        HTMLTableCellElement[]
    ];
}
declare namespace ooo.treelink.common.event {
    abstract class EventArgs {
    }
    class Event<K> {
        /**
         * List ot evnets
         */
        private events;
        /**
         * constructor
         */
        constructor();
        /**
         * Fire event.
         * @param name Event name.
         * @param arg Event argument.
         */
        fireEvent<name extends keyof K>(name: name, arg: K[name]): Promise<boolean>;
        /**
         * Attach event.
         * @param name Event name.
         * @param callback Event callback.
         */
        attachEvent<name extends keyof K>(name: name, callback: (e: K[name]) => Promise<void | boolean>): void;
        interval(): void;
    }
    class IntervalExecuter<T> {
        interval: number;
        executeProc: (arg: T) => void;
        private shouldRun;
        private arg?;
        constructor(interval: number, executeProc: (arg: T) => void);
        execute(arg: T): void;
        private executeInterval;
    }
}
declare namespace ooo.treelink.common.object {
    /**
     * Copy values of obj2 to obj1.
     * @param obj1
     * @param obj2
     */
    function DeepAssign(obj1: any, obj2: any): any;
    /**
     * Copy values of obj2 to obj1.
     * @param obj
     * @param obj2
     */
    function DeepClone<T>(obj: T): T;
}
declare namespace ooo.treelink.treelink {
    class OooLink {
        svg: SVGElement | SVGGElement;
        fromId: string;
        from: OooTree;
        toId: string;
        to: OooTree;
        links: types.LinkDataUI[];
        constructor(svg: SVGElement | SVGGElement, fromId: string, from: OooTree, toId: string, to: OooTree);
        update(): void;
        setLink(links: types.LinkData[]): void;
    }
}
declare namespace ooo.treelink.treelink {
    interface TreeEvent {
        clickright: {
            me: MouseEvent;
            tr: HTMLTableRowElement;
            data: types.TreeDataUI;
        };
        clickleft: {
            me: MouseEvent;
            tr: HTMLTableRowElement;
            data: types.TreeDataUI;
        };
        clickmain: {
            me: MouseEvent;
            tr: HTMLTableRowElement;
            data: types.TreeDataUI;
        };
        opentree: {
            me: MouseEvent;
            tr: HTMLTableRowElement;
            data: types.TreeDataUI;
        };
        closetree: {
            me: MouseEvent;
            tr: HTMLTableRowElement;
            data: types.TreeDataUI;
        };
        clickleaf: {
            me: MouseEvent;
            tr: HTMLTableRowElement;
            data: types.TreeDataUI;
        };
        scroll: {
            ev: Event;
            scroll: {
                x: number;
                y: number;
            };
        };
    }
    /**
     * Tree table
     */
    export class OooTree {
        name: string;
        svg: SVGElement | SVGGElement;
        imagePath: string;
        rect: {
            left: number;
            top: number;
            width: number;
            height: number;
        };
        data: types.TreeDataUI[];
        uiData: {
            [id: string]: types.TreeDataUI;
        };
        element_forignElement: SVGForeignObjectElement;
        element_div: HTMLDivElement;
        element_table: HTMLTableElement;
        event: common.event.Event<TreeEvent>;
        /**
         * Constructor with svg.
         * @param svg SVG element on which the view place.
         */
        constructor(name: string, svg: SVGElement | SVGGElement, imagePath: string, rect: {
            left: number;
            top: number;
            width: number;
            height: number;
        });
        /**
         * Set the data of table.
         * @param data Data of table
         */
        setData(data: types.TreeData[]): void;
        /**
         * Insert the data into data list.
         * @param item Item to insert.
         * @returns true: Index of the item is inserted in. -1 if failed.
         */
        insertData(item: types.TreeData): number;
        /**
         * Get the index of item with 'id';
         * @param id Id of item to find.
         * @returns Index of the item.
         */
        getDataIndex(id: string): number;
        /**
         * Get table row element of the index;
         * @param index Index of item.
         * @returns Table row element of the item.
         */
        getRowElement(index: number): HTMLTableRowElement;
        /**
         * Get the index of item with 'id';
         * @param row Table row element to  find.
         */
        getRowIndex(row: HTMLTableRowElement): number;
        /**
         * Get left cell.
         * @param tr table row.
         * @returns
         */
        getLeftImageTD(tr: HTMLTableRowElement): HTMLDivElement;
        /**
         * Get left icon.
         * @param tr table row.
         * @returns
         */
        getLeftImage(tr: HTMLTableRowElement): HTMLImageElement;
        /**
         * Get right cell.
         * @param tr table row.
         * @returns
         */
        getRightImageTD(tr: HTMLTableRowElement): HTMLDivElement;
        /**
         * Get right icon.
         * @param tr table row.
         * @returns
         */
        getRightImage(tr: HTMLTableRowElement): HTMLImageElement;
        /**
         * Get tree td.
         * @param tr table row.
         * @returns
         */
        getTreeTD(tr: HTMLTableRowElement): HTMLDivElement;
        /**
         * Get tree icon.
         * @param tr table row.
         * @returns
         */
        getTreeImage(tr: HTMLTableRowElement): HTMLImageElement;
        /**
         * Event click tree icon.
         * @param tr Clicked table row elment.
         * @param data Clicked data.
         */
        onClickTreeIcon(tr: HTMLTableRowElement, data: types.TreeDataUI): void;
        /**
         * Get last item of the child.
         * @param index Index of parent item.
         */
        getChildRange(index: number): number;
        /**
         * Close tree item.
         * @param index Index to close.
         */
        closeTree(index: number): void;
        /**
         * Open tree item.
         * @param index Index to open.
         */
        openTree(index: number): void;
        getY(index: number): number;
        private setIcon;
        private setHidden;
    }
    export {};
}
declare namespace ooo.treelink.treelink {
    let default_option: {
        ui: {
            table_width: number;
            table_height: number;
            table_margin: number;
        };
        interval: number;
    };
    type OooTreeLinkOption = {
        [k in keyof TreeLinkOption]?: TreeLinkOption[k] | {
            [l in keyof TreeLinkOption[k]]?: TreeLinkOption[k][l] | {
                [m in keyof TreeLinkOption[k][l]]?: TreeLinkOption[k][l][m] | {
                    [n in keyof TreeLinkOption[k][l][m]]?: TreeLinkOption[k][l][m][n];
                };
            };
        };
    };
    type TreeLinkOption = typeof default_option;
    class OooTreeLink {
        svg: SVGElement | SVGGElement;
        imagePath: string;
        trees: OooTree[];
        links: OooLink[];
        dataSvgG: SVGGElement;
        linkSvgG: SVGGElement;
        option: TreeLinkOption;
        constructor(svg: SVGElement | SVGGElement, imagePath: string, option?: OooTreeLinkOption);
        getTree(name: string): OooTree | undefined;
        getLink(from: string, to: string): OooLink | undefined;
        setData(data: types.TreeLinkData): void;
        private updateLink;
    }
}
declare namespace ooo.treelink.treelink.types {
    type TreeData = {
        id: string;
        parent: string;
        info: string;
    };
    type TreeDataUI = {
        data: types.TreeData;
        ui?: HTMLTableRowElement;
        level: number;
        type: "open" | "closed" | "none";
    };
    type LinkData = {
        from: string;
        to: string;
    };
    type LinkDataUI = {
        ui?: SVGPathElement;
        link: LinkData;
    };
    type TreeLinkData = {
        datalist: {
            name: string;
            items: TreeData[];
        }[];
        linklist: {
            from: string;
            to: string;
            links: LinkData[];
        }[];
    };
}
//# sourceMappingURL=oootreelink.d.ts.map