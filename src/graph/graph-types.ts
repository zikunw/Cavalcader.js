import { ErrorType } from "../utils";

export interface IGraph {
    edges: IEdge[];
    nodes: INode[];
    type: GraphType;

    addEdge: (edge: IEdge) => null | ErrorType;
    addNode:(node: INode) => null | ErrorType;
    removeEdge:(edge: IEdge) => null | ErrorType;
    removeNode:(node: INode) => null | ErrorType;

    printGraph: () => void; // for debugging purposes
    toString: () => string;
}

export enum GraphType {
    TopDown = "TopDown",
    LeftRight = "LeftRight",
    DownTop = "DownTop",
    RightLeft = "RightLeft"
}

export interface IEdge {
    sourceId: string;
    targetId: string;
    type: EdgeType;
    length: number;

    printEdge: () => void; // for debugging purposes
    toString: () => string;
}

export enum EdgeType {
    ToDirected = "ToDirected",
    FromDirected = "FromDirected",
    Bidirected = "Bidirected",
    Undirected = "Undirected"
}

export interface INode {
    id: string;
    label: string;
    shape: NodeShape;

    printNode: () => void; // for debugging purposes
    toString: () => string;
}

export enum NodeShape {
    Circle = "Circle",
    Square = "Square",
    Diamond = "Diamond"
}