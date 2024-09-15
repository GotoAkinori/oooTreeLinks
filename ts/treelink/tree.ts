namespace ooo.treelink.treelink {

    interface TreeEvent {
        clickright: { me: MouseEvent, tr: HTMLTableRowElement, data: types.TreeDataUI };
        clickleft: { me: MouseEvent, tr: HTMLTableRowElement, data: types.TreeDataUI };
        clickmain: { me: MouseEvent, tr: HTMLTableRowElement, data: types.TreeDataUI };
        opentree: { me: MouseEvent, tr: HTMLTableRowElement, data: types.TreeDataUI };
        closetree: { me: MouseEvent, tr: HTMLTableRowElement, data: types.TreeDataUI };
        clickleaf: { me: MouseEvent, tr: HTMLTableRowElement, data: types.TreeDataUI };
        scroll: { ev: Event, scroll: { x: number, y: number } };
    }

    /**
     * Tree table
     */
    export class OooTree {
        public data: types.TreeDataUI[] = [];
        public uiData: { [id: string]: types.TreeDataUI } = {};

        public element_forignElement: SVGForeignObjectElement;
        public element_div: HTMLDivElement;
        public element_table: HTMLTableElement;

        public event: common.event.Event<TreeEvent> = new common.event.Event<TreeEvent>();

        /**
         * Constructor with svg.
         * @param svg SVG element on which the view place.
         */
        public constructor(
            public name: string,
            public svg: SVGElement | SVGGElement,
            public imagePath: string,
            public rect: { left: number, top: number, width: number, height: number }
        ) {
            this.element_forignElement = common.dom.addSVGChild(svg, "foreignObject");
            this.element_div = common.dom.addChild(this.element_forignElement, "div");
            this.element_table = common.dom.addChild(this.element_div, "table");

            this.element_forignElement.setAttribute("x", rect.left + "px");
            this.element_forignElement.setAttribute("y", rect.top + "px");
            this.element_forignElement.setAttribute("width", rect.width + "px");
            this.element_forignElement.setAttribute("height", rect.height + "px");

            this.element_div.style.height = rect.height + "px";
            this.element_div.addEventListener("scroll", (ev) => {
                this.event.fireEvent("scroll", {
                    ev: ev, scroll: {
                        x: this.element_div.scrollTop,
                        y: this.element_div.scrollLeft
                    }
                });
            });
        }

        /**
         * Set the data of table.
         * @param data Data of table
         */
        public setData(data: types.TreeData[]) {
            this.data = [];
            this.uiData = {};
            let failed = true;

            while (data.length > 0) {
                failed = true;
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];
                    let index = this.insertData(item);
                    if (index >= 0) {
                        data.splice(i, 1);
                        failed = false;
                        break;
                    }
                }

                if (failed) {
                    console.warn(`One or more items are remained.\n  ${data.map(v => "id=" + v.id + ", parent=" + v.parent).join("\n  ")}`);
                    break;
                }
            }

            for (let i = 0; i < this.data.length; i++) {
                let image = this.getTreeImage(this.data[i].ui!);
                if (i < this.data.length - 1 && this.data[i].level < this.data[i + 1].level) {
                    image.src = this.imagePath + "tree-open.svg";
                    this.data[i].type = "open";
                } else {
                    image.src = this.imagePath + "tree-none.svg";
                    this.data[i].type = "none";
                }
                image.addEventListener("click", (ev) => {
                    switch (this.data[i].type) {
                        case "open": {
                            this.closeTree(i);
                            this.event.fireEvent("opentree", { me: ev, tr: this.data[i].ui!, data: this.data[i] });
                        } break;
                        case "closed": {
                            this.openTree(i);
                            this.event.fireEvent("closetree", { me: ev, tr: this.data[i].ui!, data: this.data[i] });
                        } break;
                        case "none": {
                            this.event.fireEvent("clickleaf", { me: ev, tr: this.data[i].ui!, data: this.data[i] });
                        } break;
                    }
                });
            }
        }

        /**
         * Insert the data into data list.
         * @param item Item to insert.
         * @returns true: Index of the item is inserted in. -1 if failed.
         */
        public insertData(item: types.TreeData): number {
            let uiData: types.TreeDataUI;
            let index = -1;

            // insert into data list
            if (item.parent) {
                let parent = this.uiData[item.parent];
                if (parent) {
                    let parentIndex = this.getDataIndex(parent.data.id);
                    index = this.getChildRange(parentIndex);
                    uiData = {
                        data: item,
                        level: parent.level + 1,
                        ui: undefined,
                        type: "none"
                    };
                    this.data.splice(index, 0, uiData);
                    this.uiData[item.id] = uiData;
                } else {
                    return -1;
                }
            } else {
                index = this.data.length;
                uiData = {
                    data: item,
                    level: 0,
                    ui: undefined,
                    type: "none"
                };
                this.data.push(uiData);
                this.uiData[item.id] = uiData;
            }

            // insert into dom
            let [tr, [cell_left, cell_main, cell_right]] = common.dom.insertTableRow(this.element_table, index, 3);
            cell_left.classList.add("closed");
            cell_main.classList.add("tree-col");
            cell_right.classList.add("closed");

            let image_left = common.dom.addChild(cell_left, "img");
            image_left.src = this.imagePath + "left.svg";
            cell_left.classList.add("left");
            cell_left.addEventListener("click", (me: MouseEvent) => {
                this.event.fireEvent("clickleft", {
                    data: uiData,
                    me: me,
                    tr: tr
                })
            });

            let image_main = common.dom.addChild(cell_main, "img");
            image_main.src = this.imagePath + "tree-none.svg";
            cell_main.append(item.info);
            cell_main.classList.add("tree");
            cell_main.style.setProperty("--indent", this.uiData[item.id].level.toString());
            cell_left.addEventListener("click", (me: MouseEvent) => {
                this.event.fireEvent("clickmain", {
                    data: uiData,
                    me: me,
                    tr: tr
                })
            });

            let image_right = common.dom.addChild(cell_right, "img");
            image_right.src = this.imagePath + "right.svg";
            cell_right.classList.add("right");
            cell_left.addEventListener("click", (me: MouseEvent) => {
                this.event.fireEvent("clickright", {
                    data: uiData,
                    me: me,
                    tr: tr
                })
            });

            uiData.ui = tr;

            return index;
        }

        /**
         * Get the index of item with 'id';
         * @param id Id of item to find.
         * @returns Index of the item.
         */
        public getDataIndex(id: string): number {
            return this.data.findIndex((v) => v.data.id == id);
        }

        /**
         * Get table row element of the index;
         * @param index Index of item.
         * @returns Table row element of the item.
         */
        public getRowElement(index: number): HTMLTableRowElement {
            return this.element_table.rows[index];
        }

        /**
         * Get the index of item with 'id';
         * @param row Table row element to  find.
         */
        public getRowIndex(row: HTMLTableRowElement) {
            return row.rowIndex;
        }

        /**
         * Get left cell.
         * @param tr table row.
         * @returns 
         */
        public getLeftImageTD(tr: HTMLTableRowElement): HTMLDivElement {
            let image = tr.querySelector("td.left");
            return image as HTMLDivElement;
        }

        /**
         * Get left icon.
         * @param tr table row.
         * @returns 
         */
        public getLeftImage(tr: HTMLTableRowElement): HTMLImageElement {
            let image = tr.querySelector("td.left>img");
            return image as HTMLImageElement;
        }

        /**
         * Get right cell.
         * @param tr table row.
         * @returns 
         */
        public getRightImageTD(tr: HTMLTableRowElement): HTMLDivElement {
            let image = tr.querySelector("td.right");
            return image as HTMLDivElement;
        }

        /**
         * Get right icon.
         * @param tr table row.
         * @returns 
         */
        public getRightImage(tr: HTMLTableRowElement): HTMLImageElement {
            let image = tr.querySelector("td.right>img");
            return image as HTMLImageElement;
        }

        /**
         * Get tree td.
         * @param tr table row.
         * @returns 
         */
        public getTreeTD(tr: HTMLTableRowElement): HTMLDivElement {
            let image = tr.querySelector("td.tree");
            return image as HTMLDivElement;
        }

        /**
         * Get tree icon.
         * @param tr table row.
         * @returns 
         */
        public getTreeImage(tr: HTMLTableRowElement): HTMLImageElement {
            let image = tr.querySelector("td.tree>img");
            return image as HTMLImageElement;
        }

        /**
         * Event click tree icon.
         * @param tr Clicked table row elment.
         * @param data Clicked data.
         */
        public onClickTreeIcon(tr: HTMLTableRowElement, data: types.TreeDataUI) {
            if (data.type == "open") {
                this.closeTree(this.getDataIndex(data.data.id));
            }
        }

        /**
         * Get last item of the child.
         * @param index Index of parent item.
         */
        public getChildRange(index: number): number {
            if (this.data.length <= index) {
                return -1;
            }

            let level = this.data[index].level;
            let i = index + 1;
            while (i < this.data.length && this.data[i].level > level) { i++; }

            return i;
        }

        /**
         * Close tree item.
         * @param index Index to close.
         */
        public closeTree(index: number) {
            // change row style
            this.setIcon(index, "closed");
            let level = this.data[index].level;

            for (let i = index + 1; i < this.data.length && this.data[i].level > level; i++) {
                this.setHidden(i, true);
            }
        }

        /**
         * Open tree item.
         * @param index Index to open.
         */
        public openTree(index: number) {
            // change row style
            this.setIcon(index, "open");
            let level = this.data[index].level;

            for (let i = index + 1; i < this.data.length && this.data[i].level > level;) {
                this.setHidden(i, false);
                if (this.data[i].type == "closed") {
                    i = this.getChildRange(i);
                } else {
                    i++
                }
            }
        }

        public getY(index: number): number {
            let divTop = this.element_forignElement.getBoundingClientRect().top;

            if (this.element_table.rows[index] == undefined) {
                return -1;
            }
            let hidden = this.element_table.rows[index].hidden;
            if (hidden) {
                for (
                    let visibleParent = index - 1;
                    visibleParent >= 0;
                    visibleParent--
                ) {
                    if (!this.element_table.rows[visibleParent].hidden) {
                        let rowRect = this.element_table.rows[visibleParent].getBoundingClientRect();
                        return rowRect.bottom - divTop;
                    }
                }
                return 0;
            } else {
                let rowRect = this.element_table.rows[index].getBoundingClientRect();
                return rowRect.top + rowRect.height / 2 - divTop;
            }
        }

        private setIcon(index: number, type: "open" | "closed" | "none") {
            this.data[index].type = type;
            let image = this.element_table.rows[index].querySelector(".tree-col>img") as HTMLImageElement;
            image.src = this.imagePath + `tree-${type}.svg`;
        }

        private setHidden(index: number, hidden: boolean) {
            this.element_table.rows[index].hidden = hidden;
        }
    }
}
