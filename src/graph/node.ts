import { INode, NodeShape } from "./graph-types";

export class Node implements INode {
    id: string;
    label: string;
    shape: NodeShape;

    parents: String[]; // IDs of parent nodes 
    children: String[]; // IDs of child nodes

    constructor(id: string, label: string, shape: NodeShape) {
        this.id = id;
        this.label = label;
        this.shape = shape;
        this.parents = [];
        this.children = [];
    }

    addParent(parent: Node | string) {
        if (typeof parent === "string") {
            this.parents.push(parent);
        } else {
            this.parents.push(parent.id);
        }
    }

    getParents() {
        return this.parents.slice();
    }

    addChild(child: Node | string) {
        if (typeof child === "string") {
            this.children.push(child);
        } else {
            this.children.push(child.id);
        }
    }

    getChildren() {
        return this.children.slice();
    }
    
    toString() {
        return `Node {${this.id}, ${this.label}, ${this.shape}}`;
    }

    printNode() {
        console.log(`Node {${this.id}, ${this.label}, ${this.shape}}`);
    }
}