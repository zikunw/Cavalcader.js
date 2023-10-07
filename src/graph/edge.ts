import { IEdge, EdgeType } from "./graph-types";

export class Edge implements IEdge {
    sourceId: string;
    targetId: string;
    type: EdgeType;
    length: number = 1;

    constructor(sourceId: string, targetId: string, type: EdgeType, length: number) {
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.type = type;
        this.length = length;
    }

    toString() {
        return `Edge {${this.sourceId}, ${this.targetId}, ${this.type}}`;
    }

    printEdge() {
        console.log(`Edge {${this.sourceId}, ${this.targetId}, ${this.type}}`);
    }
}