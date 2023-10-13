import { IGraph, GraphType } from "./graph-types";
import { Edge } from "./edge";
import { Node } from "./node";
export declare class Graph implements IGraph {
    edges: Edge[];
    nodes: Node[];
    type: GraphType;
    constructor(type: GraphType);
    getNodes(): Node[];
    getEdges(): Edge[];
    addEdge(edge: Edge): Error | null;
    addNode(node: Node): Error | null;
    removeEdge(edge: Edge): Error | null;
    removeNode(node: Node): Error | null;
    toString(): string;
    printGraph(): void;
}
