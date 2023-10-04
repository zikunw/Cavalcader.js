import { IEdge, EdgeType } from "./graph-types";

export class Edge implements IEdge {
    sourceId: string;
    targetId: string;
    type: EdgeType;

    constructor(sourceId: string, targetId: string, type: EdgeType) {
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.type = type;
    }

    printEdge() {
        console.log(`Edge {${this.sourceId}, ${this.targetId}, ${this.type}}`);
    }
}