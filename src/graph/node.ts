import { INode, NodeShape } from "./graph-types";

export class Node implements INode {
    id: string;
    label: string;
    shape: NodeShape;

    constructor(id: string, label: string, shape: NodeShape) {
        this.id = id;
        this.label = label;
        this.shape = shape;
    }

    printNode() {
        console.log(`Node {${this.id}, ${this.label}, ${this.shape}}`);
    }
}