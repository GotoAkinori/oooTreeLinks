namespace ooo.treelink.common.dom {
    /**
     * Add a new dom element as a last child of 'parent';
     * @param parent New element is added in 'parent' as a last child.
     * @param tagName Tag name of the new element.
     * @returns 
     */
    export function addChild<K extends keyof HTMLElementTagNameMap>(parent: HTMLElement | SVGElement, tagName: K): HTMLElementTagNameMap[K] {
        let element = parent.ownerDocument.createElement(tagName);
        parent.appendChild(element);
        return element;
    }

    /**
     * Insert a new dom element as a last child of 'parent';
     * @param parent New element is added in 'parent' as a last child.
     * @param tagName Tag name of the new element.
     * @returns 
     */
    export function insertChild<K extends keyof HTMLElementTagNameMap>(parent: HTMLElement | SVGElement, before: Element, tagName: K): HTMLElementTagNameMap[K] {
        let element = parent.ownerDocument.createElement(tagName);
        parent.insertBefore(element, before);
        return element;
    }

    /**
     * Add a new svg element as a last child of 'parent';
     * @param parent New element is added in 'parent' as a last child.
     * @param tagName Tag name of the new element.
     * @returns 
     */
    export function addSVGChild<K extends keyof SVGElementTagNameMap>(parent: HTMLElement | SVGElement, tagName: K): SVGElementTagNameMap[K] {
        let element = parent.ownerDocument.createElementNS("http://www.w3.org/2000/svg", tagName);
        parent.appendChild(element);
        return element;
    }

    /**
     * Add a new row.
     * @param parent Table or table section.
     * @param columns Number of columns to add.
     * @param thCount Number of 'TH' columns. Default is 0.
     * @returns 
     */
    export function addTableRow(parent: HTMLTableElement | HTMLTableSectionElement, columns: number, thCount: number = 0):
        [HTMLTableRowElement, HTMLTableCellElement[]] {
        let tr = addChild(parent, "tr");
        let cells: HTMLTableCellElement[] = [];
        for (let col = 0; col < columns; col++) {
            cells.push(addChild(tr, col < thCount ? "th" : "td"));
        }

        return [tr, cells];
    }

    /**
     * Add a new row.
     * @param parent Table or table section.
     * @param columns Number of columns to add.
     * @param thCount Number of 'TH' columns. Default is 0.
     * @returns 
     */
    export function insertTableRow(parent: HTMLTableElement | HTMLTableSectionElement, index: number, columns: number, thCount: number = 0):
        [HTMLTableRowElement, HTMLTableCellElement[]] {
        let tr = insertChild(parent, parent.rows[index], "tr");
        let cells: HTMLTableCellElement[] = [];
        for (let col = 0; col < columns; col++) {
            cells.push(addChild(tr, col < thCount ? "th" : "td"));
        }

        return [tr, cells];
    }
}
