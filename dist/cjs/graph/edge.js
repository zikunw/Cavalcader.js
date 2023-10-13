"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edge = void 0;
class Edge {
    constructor(sourceId, targetId, type, length) {
        this.length = 1;
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
exports.Edge = Edge;
