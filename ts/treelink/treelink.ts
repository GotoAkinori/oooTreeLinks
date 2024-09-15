namespace ooo.treelink.treelink {
    export let default_option = {
        ui: {
            table_width: 250,
            table_height: 250,
            table_margin: 150
        },
        interval: 50
    }

    export type OooTreeLinkOption = {
        [k in keyof TreeLinkOption]?: TreeLinkOption[k] | {
            [l in keyof TreeLinkOption[k]]?: TreeLinkOption[k][l] | {
                [m in keyof TreeLinkOption[k][l]]?: TreeLinkOption[k][l][m] | {
                    [n in keyof TreeLinkOption[k][l][m]]?: TreeLinkOption[k][l][m][n]
                }
            }
        }
    };

    export type TreeLinkOption = typeof default_option;

    export class OooTreeLink {
        public trees: OooTree[] = [];
        public links: OooLink[] = [];

        public dataSvgG: SVGGElement;
        public linkSvgG: SVGGElement;

        public option: TreeLinkOption;

        public constructor(
            public svg: SVGElement | SVGGElement,
            public imagePath: string,
            option?: OooTreeLinkOption
        ) {
            this.linkSvgG = common.dom.addSVGChild(svg, "g");
            this.dataSvgG = common.dom.addSVGChild(svg, "g");

            this.option = common.object.DeepClone(default_option);
            if (option) {
                common.object.DeepAssign(this.option, option);
            }
        }

        public getTree(name: string) {
            return this.trees.find(v => v.name == name);
        }

        public getLink(from: string, to: string) {
            return this.links.find(v => (v.fromId == from && v.toId == to));
        }

        public setData(data: types.TreeLinkData) {
            this.trees.length = 0;
            this.links.length = 0;

            // create trees
            let left = 0;
            for (let treedata of data.datalist) {
                let svgG = common.dom.addSVGChild(this.dataSvgG, "g");
                let newTree = new OooTree(
                    treedata.name,
                    svgG,
                    this.imagePath,
                    {
                        height: this.option.ui.table_height,
                        left: left,
                        top: 0,
                        width: this.option.ui.table_width
                    });

                this.trees.push(newTree);
                newTree.setData(treedata.items);

                left += this.option.ui.table_width + this.option.ui.table_margin;

                newTree.event.attachEvent("opentree", async () => { this.updateLink(treedata.name) });
                newTree.event.attachEvent("closetree", async () => { this.updateLink(treedata.name) });

                let scrollEventInterval = new common.event.IntervalExecuter<void>(
                    this.option.interval,
                    () => { this.updateLink(treedata.name) });
                newTree.event.attachEvent("scroll", async () => { scrollEventInterval.execute() });
            }

            // create links
            for (let link of data.linklist) {
                let svgG = common.dom.addSVGChild(this.linkSvgG, "g");
                let fromTree = this.getTree(link.from);
                let toTree = this.getTree(link.to);

                if (fromTree == undefined || toTree == undefined) {
                    continue;
                }

                let newLink = new OooLink(
                    svgG,
                    link.from,
                    fromTree,
                    link.to,
                    toTree,
                );

                this.links.push(newLink);
                newLink.setLink(link.links);

                left += this.option.ui.table_width + this.option.ui.table_margin;
            }
        }

        private updateLink(name: string) {
            let linksToUpdate = this.links.filter(v => v.fromId == name || v.toId == name);
            for (let link of linksToUpdate) {
                link.update();
            }
        }
    }
}