namespace ooo.treelink.treelink {
    export class OooLink {
        public links: types.LinkDataUI[] = [];

        public constructor(
            public svg: SVGElement | SVGGElement,
            public fromId: string,
            public from: OooTree,
            public toId: string,
            public to: OooTree
        ) { }

        public update() {
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
                let hidden =
                    this.from.element_table.rows[fromIndex].hidden ||
                    this.to.element_table.rows[toIndex].hidden;
                link.ui!.setAttribute("d", `M ${fromX} ${fromY} L ${toX} ${toY}`);
                if (hidden) {
                    link.ui!.classList.add("hidden");
                } else {
                    link.ui!.classList.remove("hidden");
                }
            }
        }

        public setLink(links: types.LinkData[]) {
            this.links.length = 0;

            for (let link of links) {
                let ui = common.dom.addSVGChild(this.svg, "path");
                this.links.push({
                    link: link,
                    ui: ui
                });
            }

            this.update();
        }
    }
}