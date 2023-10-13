import { INode, NodeShape } from "./graph-types";
export declare class Node implements INode {
    id: string;
    label: string;
    shape: NodeShape;
    parents: String[];
    children: String[];
    constructor(id: string, label: string, shape: NodeShape);
    addParent(parent: Node | string): void;
    getParents(): String[];
    addChild(child: Node | string): void;
    getChildren(): String[];
    toString(): string;
    printNode(): void;
}
