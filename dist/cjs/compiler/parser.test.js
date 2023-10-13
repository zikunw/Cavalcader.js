"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const parser_1 = require("./parser");
const graph_types_1 = require("../graph/graph-types");
const node_1 = require("../graph/node");
const graph_1 = require("../graph/graph");
// TODO: Need more tests for better coverage
(0, globals_1.describe)('parseNode', () => {
    (0, globals_1.test)('parseNode1', () => {
        const lexed = [{ value: "[source]", label: "source", shape: graph_types_1.NodeShape.Square }];
        const result = (0, parser_1.parseNode)(lexed);
        (0, globals_1.expect)(result).toEqual({
            node: { id: "source", label: "source", shape: graph_types_1.NodeShape.Square },
            rest: []
        });
    });
    (0, globals_1.test)('parseNode2', () => {
        const lexed = [{ value: "(sink)", label: "sink", shape: graph_types_1.NodeShape.Circle }, { value: "(sink)", label: "sink", shape: graph_types_1.NodeShape.Circle }, { value: "(sink)", label: "sink", shape: graph_types_1.NodeShape.Circle }];
        const result = (0, parser_1.parseNode)(lexed);
        (0, globals_1.expect)(result).toEqual({
            node: { id: "sink", label: "sink", shape: graph_types_1.NodeShape.Circle },
            rest: [{ value: "(sink)", label: "sink", shape: graph_types_1.NodeShape.Circle }, { value: "(sink)", label: "sink", shape: graph_types_1.NodeShape.Circle }]
        });
    });
});
(0, globals_1.describe)('parseEdge', () => {
    (0, globals_1.test)('parseEdge1', () => {
        const lexed = [
            { value: "=>", type: graph_types_1.EdgeType.ToDirected, length: 1 },
            { value: "[sink]", label: "sink", shape: graph_types_1.NodeShape.Square }
        ];
        const source = new node_1.Node("source", "source", graph_types_1.NodeShape.Square);
        const result = (0, parser_1.parseEdge)(lexed, source);
        (0, globals_1.expect)(result).toEqual({
            edge: { sourceId: "source", targetId: "sink", type: graph_types_1.EdgeType.ToDirected, length: 1 },
            nextNode: { id: "sink", label: "sink", shape: graph_types_1.NodeShape.Square },
            rest: []
        });
    });
});
(0, globals_1.describe)('parseExpression', () => {
    (0, globals_1.test)('parseExpression1', () => {
        const g = new graph_1.Graph(graph_types_1.GraphType.LeftRight);
        const lexed = [
            { value: "[source]", label: "source", shape: graph_types_1.NodeShape.Square },
            { value: "=>", type: graph_types_1.EdgeType.ToDirected, length: 1 },
            { value: "[sink]", label: "sink", shape: graph_types_1.NodeShape.Square }
        ];
        const result = (0, parser_1.parseExpression)(lexed, g);
        (0, globals_1.expect)(result).toEqual([]);
        (0, globals_1.expect)(g.nodes).toEqual([
            { id: "source", label: "source", shape: graph_types_1.NodeShape.Square },
            { id: "sink", label: "sink", shape: graph_types_1.NodeShape.Square }
        ]);
        (0, globals_1.expect)(g.edges).toEqual([
            { sourceId: "source", targetId: "sink", type: graph_types_1.EdgeType.ToDirected, length: 1 }
        ]);
    });
    (0, globals_1.test)('parseExpression2', () => {
        const g = new graph_1.Graph(graph_types_1.GraphType.LeftRight);
        const lexed = [
            { value: "[source]", label: "source", shape: graph_types_1.NodeShape.Square },
            { value: "=>", type: graph_types_1.EdgeType.ToDirected, length: 1 },
            { value: "(process)", label: "process", shape: graph_types_1.NodeShape.Circle },
            { value: "==>", type: graph_types_1.EdgeType.ToDirected, length: 2 },
            { value: "[sink]", label: "sink", shape: graph_types_1.NodeShape.Square }
        ];
        const result = (0, parser_1.parseExpression)(lexed, g);
        (0, globals_1.expect)(result).toEqual([]);
        (0, globals_1.expect)(g.nodes).toEqual([
            { id: "source", label: "source", shape: graph_types_1.NodeShape.Square },
            { id: "process", label: "process", shape: graph_types_1.NodeShape.Circle },
            { id: "sink", label: "sink", shape: graph_types_1.NodeShape.Square }
        ]);
        (0, globals_1.expect)(g.edges).toEqual([
            { sourceId: "source", targetId: "process", type: graph_types_1.EdgeType.ToDirected, length: 1 },
            { sourceId: "process", targetId: "sink", type: graph_types_1.EdgeType.ToDirected, length: 2 }
        ]);
    });
});
(0, globals_1.describe)('parseGraph', () => {
    (0, globals_1.test)('parseGraph1', () => {
        const lexed = [
            { type: graph_types_1.GraphType.LeftRight },
            { value: "[source]", label: "source", shape: graph_types_1.NodeShape.Square },
            { value: "=>", type: graph_types_1.EdgeType.ToDirected, length: 1 },
            { value: "(process)", label: "process", shape: graph_types_1.NodeShape.Circle },
            { value: "==>", type: graph_types_1.EdgeType.ToDirected, length: 2 },
            { value: "[sink]", label: "sink", shape: graph_types_1.NodeShape.Square }
        ];
        const g = (0, parser_1.parseGraph)(lexed);
        if ("message" in g) {
            throw new Error(g.message);
        }
        (0, globals_1.expect)(g.type).toEqual(graph_types_1.GraphType.LeftRight);
        (0, globals_1.expect)(g.nodes).toEqual([
            { id: "source", label: "source", shape: graph_types_1.NodeShape.Square },
            { id: "process", label: "process", shape: graph_types_1.NodeShape.Circle },
            { id: "sink", label: "sink", shape: graph_types_1.NodeShape.Square }
        ]);
        (0, globals_1.expect)(g.edges).toEqual([
            { sourceId: "source", targetId: "process", type: graph_types_1.EdgeType.ToDirected, length: 1 },
            { sourceId: "process", targetId: "sink", type: graph_types_1.EdgeType.ToDirected, length: 2 }
        ]);
    });
});
