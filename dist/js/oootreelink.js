"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ooo;
(function (ooo) {
    var treelink;
    (function (treelink) {
        var common;
        (function (common) {
            var dom;
            (function (dom) {
                /**
                 * Add a new dom element as a last child of 'parent';
                 * @param parent New element is added in 'parent' as a last child.
                 * @param tagName Tag name of the new element.
                 * @returns
                 */
                function addChild(parent, tagName) {
                    let element = parent.ownerDocument.createElement(tagName);
                    parent.appendChild(element);
                    return element;
                }
                dom.addChild = addChild;
                /**
                 * Insert a new dom element as a last child of 'parent';
                 * @param parent New element is added in 'parent' as a last child.
                 * @param tagName Tag name of the new element.
                 * @returns
                 */
                function insertChild(parent, before, tagName) {
                    let element = parent.ownerDocument.createElement(tagName);
                    parent.insertBefore(element, before);
                    return element;
                }
                dom.insertChild = insertChild;
                /**
                 * Add a new svg element as a last child of 'parent';
                 * @param parent New element is added in 'parent' as a last child.
                 * @param tagName Tag name of the new element.
                 * @returns
                 */
                function addSVGChild(parent, tagName) {
                    let element = parent.ownerDocument.createElementNS("http://www.w3.org/2000/svg", tagName);
                    parent.appendChild(element);
                    return element;
                }
                dom.addSVGChild = addSVGChild;
                /**
                 * Add a new row.
                 * @param parent Table or table section.
                 * @param columns Number of columns to add.
                 * @param thCount Number of 'TH' columns. Default is 0.
                 * @returns
                 */
                function addTableRow(parent, columns, thCount = 0) {
                    let tr = addChild(parent, "tr");
                    let cells = [];
                    for (let col = 0; col < columns; col++) {
                        cells.push(addChild(tr, col < thCount ? "th" : "td"));
                    }
                    return [tr, cells];
                }
                dom.addTableRow = addTableRow;
                /**
                 * Add a new row.
                 * @param parent Table or table section.
                 * @param columns Number of columns to add.
                 * @param thCount Number of 'TH' columns. Default is 0.
                 * @returns
                 */
                function insertTableRow(parent, index, columns, thCount = 0) {
                    let tr = insertChild(parent, parent.rows[index], "tr");
                    let cells = [];
                    for (let col = 0; col < columns; col++) {
                        cells.push(addChild(tr, col < thCount ? "th" : "td"));
                    }
                    return [tr, cells];
                }
                dom.insertTableRow = insertTableRow;
            })(dom = common.dom || (common.dom = {}));
        })(common = treelink.common || (treelink.common = {}));
    })(treelink = ooo.treelink || (ooo.treelink = {}));
})(ooo || (ooo = {}));
var ooo;
(function (ooo) {
    var treelink;
    (function (treelink) {
        var common;
        (function (common) {
            var event;
            (function (event) {
                class EventArgs {
                }
                event.EventArgs = EventArgs;
                class Event {
                    /**
                     * constructor
                     */
                    constructor() {
                        /**
                         * List ot evnets
                         */
                        this.events = {};
                    }
                    /**
                     * Fire event.
                     * @param name Event name.
                     * @param arg Event argument.
                     */
                    fireEvent(name, arg) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.events[name]) {
                                for (let func of this.events[name]) {
                                    let result = yield func(arg);
                                    if (result === false) {
                                        return false;
                                    }
                                }
                            }
                            return true;
                        });
                    }
                    /**
                     * Attach event.
                     * @param name Event name.
                     * @param callback Event callback.
                     */
                    attachEvent(name, callback) {
                        if (!this.events[name]) {
                            this.events[name] = [];
                        }
                        this.events[name].push(callback);
                    }
                    interval() {
                    }
                }
                event.Event = Event;
                class IntervalExecuter {
                    constructor(interval, executeProc) {
                        this.interval = interval;
                        this.executeProc = executeProc;
                        this.shouldRun = false;
                    }
                    execute(arg) {
                        this.arg = arg;
                        if (!this.shouldRun) {
                            setTimeout(this.executeInterval.bind(this), this.interval);
                        }
                        this.shouldRun = true;
                    }
                    executeInterval() {
                        if (this.shouldRun) {
                            this.executeProc(this.arg);
                            setTimeout(this.executeInterval, this.interval);
                            this.shouldRun = false;
                        }
                    }
                }
                event.IntervalExecuter = IntervalExecuter;
            })(event = common.event || (common.event = {}));
        })(common = treelink.common || (treelink.common = {}));
    })(treelink = ooo.treelink || (ooo.treelink = {}));
})(ooo || (ooo = {}));
var ooo;
(function (ooo) {
    var treelink;
    (function (treelink) {
        var common;
        (function (common) {
            var object;
            (function (object) {
                /**
                 * Copy values of obj2 to obj1.
                 * @param obj1
                 * @param obj2
                 */
                function DeepAssign(obj1, obj2) {
                    for (let k in obj2) {
                        if (obj1[k] && typeof obj1[k] == "object" && typeof obj2[k] == "object") {
                            DeepAssign(obj1[k], obj2[k]);
                        }
                        else {
                            obj1[k] = obj2[k];
                        }
                    }
                }
                object.DeepAssign = DeepAssign;
                /**
                 * Copy values of obj2 to obj1.
                 * @param obj
                 * @param obj2
                 */
                function DeepClone(obj) {
                    let retObject = {};
                    for (let k in obj) {
                        if (typeof obj[k] == "object") {
                            retObject[k] = DeepClone(obj[k]);
                        }
                        else {
                            retObject[k] = obj[k];
                        }
                    }
                    return retObject;
                }
                object.DeepClone = DeepClone;
            })(object = common.object || (common.object = {}));
        })(common = treelink.common || (treelink.common = {}));
    })(treelink = ooo.treelink || (ooo.treelink = {}));
})(ooo || (ooo = {}));
var ooo;
(function (ooo) {
    var treelink;
    (function (treelink_1) {
        var treelink;
        (function (treelink) {
            class OooLink {
                constructor(svg, fromId, from, toId, to) {
                    this.svg = svg;
                    this.fromId = fromId;
                    this.from = from;
                    this.toId = toId;
                    this.to = to;
                    this.links = [];
                }
                update() {
                    let fromX = this.from.rect.left + this.from.rect.width;
                    let toX = this.to.rect.left;
                    for (let link of this.links) {
                        let fromIndex = this.from.getDataIndex(link.link.from);
                        let toIndex = this.to.getDataIndex(link.link.to);
                        if (fromIndex < 0 || toIndex < 0) {
                            continue;
                        }
                        let fromY = this.from.getY(fromIndex);
                        let toY = this.to.getY(toIndex);
                        let hidden = this.from.element_table.rows[fromIndex].hidden ||
                            this.to.element_table.rows[toIndex].hidden;
                        link.ui.setAttribute("d", `M ${fromX} ${fromY} L ${toX} ${toY}`);
                        if (hidden) {
                            link.ui.classList.add("hidden");
                        }
                        else {
                            link.ui.classList.remove("hidden");
                        }
                    }
                }
                setLink(links) {
                    this.links.length = 0;
                    for (let link of links) {
                        let ui = treelink_1.common.dom.addSVGChild(this.svg, "path");
                        this.links.push({
                            link: link,
                            ui: ui
                        });
                    }
                    this.update();
                }
            }
            treelink.OooLink = OooLink;
        })(treelink = treelink_1.treelink || (treelink_1.treelink = {}));
    })(treelink = ooo.treelink || (ooo.treelink = {}));
})(ooo || (ooo = {}));
var ooo;
(function (ooo) {
    var treelink;
    (function (treelink_2) {
        var treelink;
        (function (treelink) {
            /**
             * Tree table
             */
            class OooTree {
                /**
                 * Constructor with svg.
                 * @param svg SVG element on which the view place.
                 */
                constructor(name, svg, imagePath, rect) {
                    this.name = name;
                    this.svg = svg;
                    this.imagePath = imagePath;
                    this.rect = rect;
                    this.data = [];
                    this.uiData = {};
                    this.event = new treelink_2.common.event.Event();
                    this.element_forignElement = treelink_2.common.dom.addSVGChild(svg, "foreignObject");
                    this.element_div = treelink_2.common.dom.addChild(this.element_forignElement, "div");
                    this.element_table = treelink_2.common.dom.addChild(this.element_div, "table");
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
                setData(data) {
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
                        let image = this.getTreeImage(this.data[i].ui);
                        if (i < this.data.length - 1 && this.data[i].level < this.data[i + 1].level) {
                            image.src = this.imagePath + "tree-open.svg";
                            this.data[i].type = "open";
                        }
                        else {
                            image.src = this.imagePath + "tree-none.svg";
                            this.data[i].type = "none";
                        }
                        image.addEventListener("click", (ev) => {
                            switch (this.data[i].type) {
                                case "open":
                                    {
                                        this.closeTree(i);
                                        this.event.fireEvent("opentree", { me: ev, tr: this.data[i].ui, data: this.data[i] });
                                    }
                                    break;
                                case "closed":
                                    {
                                        this.openTree(i);
                                        this.event.fireEvent("closetree", { me: ev, tr: this.data[i].ui, data: this.data[i] });
                                    }
                                    break;
                                case "none":
                                    {
                                        this.event.fireEvent("clickleaf", { me: ev, tr: this.data[i].ui, data: this.data[i] });
                                    }
                                    break;
                            }
                        });
                    }
                }
                /**
                 * Insert the data into data list.
                 * @param item Item to insert.
                 * @returns true: Index of the item is inserted in. -1 if failed.
                 */
                insertData(item) {
                    let uiData;
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
                        }
                        else {
                            return -1;
                        }
                    }
                    else {
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
                    let [tr, [cell_left, cell_main, cell_right]] = treelink_2.common.dom.insertTableRow(this.element_table, index, 3);
                    cell_left.classList.add("closed");
                    cell_main.classList.add("tree-col");
                    cell_right.classList.add("closed");
                    let image_left = treelink_2.common.dom.addChild(cell_left, "img");
                    image_left.src = this.imagePath + "left.svg";
                    cell_left.classList.add("left");
                    cell_left.addEventListener("click", (me) => {
                        this.event.fireEvent("clickleft", {
                            data: uiData,
                            me: me,
                            tr: tr
                        });
                    });
                    let image_main = treelink_2.common.dom.addChild(cell_main, "img");
                    image_main.src = this.imagePath + "tree-none.svg";
                    cell_main.append(item.info);
                    cell_main.classList.add("tree");
                    cell_main.style.setProperty("--indent", this.uiData[item.id].level.toString());
                    cell_left.addEventListener("click", (me) => {
                        this.event.fireEvent("clickmain", {
                            data: uiData,
                            me: me,
                            tr: tr
                        });
                    });
                    let image_right = treelink_2.common.dom.addChild(cell_right, "img");
                    image_right.src = this.imagePath + "right.svg";
                    cell_right.classList.add("right");
                    cell_left.addEventListener("click", (me) => {
                        this.event.fireEvent("clickright", {
                            data: uiData,
                            me: me,
                            tr: tr
                        });
                    });
                    uiData.ui = tr;
                    return index;
                }
                /**
                 * Get the index of item with 'id';
                 * @param id Id of item to find.
                 * @returns Index of the item.
                 */
                getDataIndex(id) {
                    return this.data.findIndex((v) => v.data.id == id);
                }
                /**
                 * Get table row element of the index;
                 * @param index Index of item.
                 * @returns Table row element of the item.
                 */
                getRowElement(index) {
                    return this.element_table.rows[index];
                }
                /**
                 * Get the index of item with 'id';
                 * @param row Table row element to  find.
                 */
                getRowIndex(row) {
                    return row.rowIndex;
                }
                /**
                 * Get left cell.
                 * @param tr table row.
                 * @returns
                 */
                getLeftImageTD(tr) {
                    let image = tr.querySelector("td.left");
                    return image;
                }
                /**
                 * Get left icon.
                 * @param tr table row.
                 * @returns
                 */
                getLeftImage(tr) {
                    let image = tr.querySelector("td.left>img");
                    return image;
                }
                /**
                 * Get right cell.
                 * @param tr table row.
                 * @returns
                 */
                getRightImageTD(tr) {
                    let image = tr.querySelector("td.right");
                    return image;
                }
                /**
                 * Get right icon.
                 * @param tr table row.
                 * @returns
                 */
                getRightImage(tr) {
                    let image = tr.querySelector("td.right>img");
                    return image;
                }
                /**
                 * Get tree td.
                 * @param tr table row.
                 * @returns
                 */
                getTreeTD(tr) {
                    let image = tr.querySelector("td.tree");
                    return image;
                }
                /**
                 * Get tree icon.
                 * @param tr table row.
                 * @returns
                 */
                getTreeImage(tr) {
                    let image = tr.querySelector("td.tree>img");
                    return image;
                }
                /**
                 * Event click tree icon.
                 * @param tr Clicked table row elment.
                 * @param data Clicked data.
                 */
                onClickTreeIcon(tr, data) {
                    if (data.type == "open") {
                        this.closeTree(this.getDataIndex(data.data.id));
                    }
                }
                /**
                 * Get last item of the child.
                 * @param index Index of parent item.
                 */
                getChildRange(index) {
                    if (this.data.length <= index) {
                        return -1;
                    }
                    let level = this.data[index].level;
                    let i = index + 1;
                    while (i < this.data.length && this.data[i].level > level) {
                        i++;
                    }
                    return i;
                }
                /**
                 * Close tree item.
                 * @param index Index to close.
                 */
                closeTree(index) {
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
                openTree(index) {
                    // change row style
                    this.setIcon(index, "open");
                    let level = this.data[index].level;
                    for (let i = index + 1; i < this.data.length && this.data[i].level > level;) {
                        this.setHidden(i, false);
                        if (this.data[i].type == "closed") {
                            i = this.getChildRange(i);
                        }
                        else {
                            i++;
                        }
                    }
                }
                getY(index) {
                    let divTop = this.element_forignElement.getBoundingClientRect().top;
                    if (this.element_table.rows[index] == undefined) {
                        return -1;
                    }
                    let hidden = this.element_table.rows[index].hidden;
                    if (hidden) {
                        for (let visibleParent = index - 1; visibleParent >= 0; visibleParent--) {
                            if (!this.element_table.rows[visibleParent].hidden) {
                                let rowRect = this.element_table.rows[visibleParent].getBoundingClientRect();
                                return rowRect.bottom - divTop;
                            }
                        }
                        return 0;
                    }
                    else {
                        let rowRect = this.element_table.rows[index].getBoundingClientRect();
                        return rowRect.top + rowRect.height / 2 - divTop;
                    }
                }
                setIcon(index, type) {
                    this.data[index].type = type;
                    let image = this.element_table.rows[index].querySelector(".tree-col>img");
                    image.src = this.imagePath + `tree-${type}.svg`;
                }
                setHidden(index, hidden) {
                    this.element_table.rows[index].hidden = hidden;
                }
            }
            treelink.OooTree = OooTree;
        })(treelink = treelink_2.treelink || (treelink_2.treelink = {}));
    })(treelink = ooo.treelink || (ooo.treelink = {}));
})(ooo || (ooo = {}));
var ooo;
(function (ooo) {
    var treelink;
    (function (treelink_3) {
        var treelink;
        (function (treelink) {
            treelink.default_option = {
                ui: {
                    table_width: 250,
                    table_height: 250,
                    table_margin: 150
                },
                interval: 50
            };
            class OooTreeLink {
                constructor(svg, imagePath, option) {
                    this.svg = svg;
                    this.imagePath = imagePath;
                    this.trees = [];
                    this.links = [];
                    this.linkSvgG = treelink_3.common.dom.addSVGChild(svg, "g");
                    this.dataSvgG = treelink_3.common.dom.addSVGChild(svg, "g");
                    this.option = treelink_3.common.object.DeepClone(treelink.default_option);
                    if (option) {
                        treelink_3.common.object.DeepAssign(this.option, option);
                    }
                }
                getTree(name) {
                    return this.trees.find(v => v.name == name);
                }
                getLink(from, to) {
                    return this.links.find(v => (v.fromId == from && v.toId == to));
                }
                setData(data) {
                    this.trees.length = 0;
                    this.links.length = 0;
                    // create trees
                    let left = 0;
                    for (let treedata of data.datalist) {
                        let svgG = treelink_3.common.dom.addSVGChild(this.dataSvgG, "g");
                        let newTree = new treelink.OooTree(treedata.name, svgG, this.imagePath, {
                            height: this.option.ui.table_height,
                            left: left,
                            top: 0,
                            width: this.option.ui.table_width
                        });
                        this.trees.push(newTree);
                        newTree.setData(treedata.items);
                        left += this.option.ui.table_width + this.option.ui.table_margin;
                        newTree.event.attachEvent("opentree", () => __awaiter(this, void 0, void 0, function* () { this.updateLink(treedata.name); }));
                        newTree.event.attachEvent("closetree", () => __awaiter(this, void 0, void 0, function* () { this.updateLink(treedata.name); }));
                        let scrollEventInterval = new treelink_3.common.event.IntervalExecuter(this.option.interval, () => { this.updateLink(treedata.name); });
                        newTree.event.attachEvent("scroll", () => __awaiter(this, void 0, void 0, function* () { scrollEventInterval.execute(); }));
                    }
                    // create links
                    for (let link of data.linklist) {
                        let svgG = treelink_3.common.dom.addSVGChild(this.linkSvgG, "g");
                        let fromTree = this.getTree(link.from);
                        let toTree = this.getTree(link.to);
                        if (fromTree == undefined || toTree == undefined) {
                            continue;
                        }
                        let newLink = new treelink.OooLink(svgG, link.from, fromTree, link.to, toTree);
                        this.links.push(newLink);
                        newLink.setLink(link.links);
                        left += this.option.ui.table_width + this.option.ui.table_margin;
                    }
                }
                updateLink(name) {
                    let linksToUpdate = this.links.filter(v => v.fromId == name || v.toId == name);
                    for (let link of linksToUpdate) {
                        link.update();
                    }
                }
            }
            treelink.OooTreeLink = OooTreeLink;
        })(treelink = treelink_3.treelink || (treelink_3.treelink = {}));
    })(treelink = ooo.treelink || (ooo.treelink = {}));
})(ooo || (ooo = {}));
//# sourceMappingURL=oootreelink.js.map