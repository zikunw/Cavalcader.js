import { IEdge, EdgeType } from "./graph-types";
export declare class Edge implements IEdge {
    sourceId: string;
    targetId: string;
    type: EdgeType;
    length: number;
    constructor(sourceId: string, targetId: string, type: EdgeType, length: number);
    toString(): string;
    printEdge(): void;
}
