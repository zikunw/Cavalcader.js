"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const graph_1 = require("./graph");
const graph_types_1 = require("./graph-types");
(0, globals_1.describe)('Create Empty Graph', () => {
    const g = new graph_1.Graph(graph_types_1.GraphType.LeftRight);
    //g.printGraph();
    (0, globals_1.test)('Graph has no nodes', () => {
        (0, globals_1.expect)(g.nodes.length).toBe(0);
    });
    (0, globals_1.test)('Graph has no edges', () => {
        (0, globals_1.expect)(g.edges.length).toBe(0);
    });
    (0, globals_1.test)('Graph has correct type', () => {
        (0, globals_1.expect)(g.type).toBe(graph_types_1.GraphType.LeftRight);
    });
    // Print Graph
    (0, globals_1.test)('Graph string', () => {
        (0, globals_1.expect)(g.toString()).toBe('Graph {LeftRight, node size: 0, edge size: 0}');
    });
});
