import { IGraph, GraphType } from "./graph-types";
import { Edge } from "./edge";
import { Node } from "./node";

export class Graph implements IGraph {
    edges: Edge[];
    nodes: Node[];
    type: GraphType;

    constructor(type: GraphType) {
        this.edges = [];
        this.nodes = [];
        this.type = type;
    }

    addEdge(edge: Edge) {
        if (this.edges.some(e => e.sourceId === edge.sourceId && e.targetId === edge.targetId)) {
            return new Error("Edge already exists");
        }

        this.edges.push(edge);
        return null;
    }

    addNode(node: Node) {
        if (this.nodes.some(n => n.id === node.id)) {
            return new Error("Node already exists");
        }

        this.nodes.push(node);
        return null;
    }

    removeEdge(edge: Edge) {
        if (!this.edges.some(e => e.sourceId === edge.sourceId && e.targetId === edge.targetId)) {
            return new Error("Edge does not exist");
        }

        this.edges = this.edges.filter(e => e.sourceId !== edge.sourceId && e.targetId !== edge.targetId);
        return null;
    }

    removeNode(node: Node) {
        if (!this.nodes.some(n => n.id === node.id)) {
            return new Error("Node does not exist");
        }

        this.nodes = this.nodes.filter(n => n.id !== node.id);
        return null;
    }

    printGraph() {
        console.log(`Graph {${this.type}}`);
        this.nodes.forEach(n => n.printNode());
        this.edges.forEach(e => e.printEdge());
    }
}