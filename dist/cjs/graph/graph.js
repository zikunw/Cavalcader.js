"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
class Graph {
    constructor(type) {
        this.edges = [];
        this.nodes = [];
        this.type = type;
    }
    getNodes() {
        // return a copy of the nodes array
        return this.nodes.slice();
    }
    getEdges() {
        // return a copy of the edges array
        return this.edges.slice();
    }
    addEdge(edge) {
        if (this.edges.some(e => e.sourceId === edge.sourceId && e.targetId === edge.targetId)) {
            return new Error("Edge already exists");
        }
        this.edges.push(edge);
        // update the parents of the target node
        const targetNode = this.nodes.find(n => n.id === edge.targetId);
        if (targetNode) {
            targetNode.addParent(edge.sourceId);
        }
        // update the children of the source node
        const sourceNode = this.nodes.find(n => n.id === edge.sourceId);
        if (sourceNode) {
            sourceNode.addChild(edge.targetId);
        }
        return null;
    }
    addNode(node) {
        if (this.nodes.some(n => n.id === node.id)) {
            return new Error("Node already exists");
        }
        this.nodes.push(node);
        return null;
    }
    // TODO: remove the edge from the parents of the target node
    removeEdge(edge) {
        if (!this.edges.some(e => e.sourceId === edge.sourceId && e.targetId === edge.targetId)) {
            return new Error("Edge does not exist");
        }
        this.edges = this.edges.filter(e => e.sourceId !== edge.sourceId && e.targetId !== edge.targetId);
        return null;
    }
    // TODO: remove the node from the parents of its children
    // TODO: remove all edges that are connected to the node
    removeNode(node) {
        if (!this.nodes.some(n => n.id === node.id)) {
            return new Error("Node does not exist");
        }
        this.nodes = this.nodes.filter(n => n.id !== node.id);
        return null;
    }
    toString() {
        return `Graph {${this.type}, node size: ${this.nodes.length}, edge size: ${this.edges.length}}`;
    }
    printGraph() {
        console.log(`Graph {${this.type}}`);
        this.nodes.forEach(n => n.printNode());
        this.edges.forEach(e => e.printEdge());
    }
}
exports.Graph = Graph;
