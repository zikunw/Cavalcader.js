"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const compiler_1 = require("./compiler");
const graph_types_1 = require("../graph/graph-types");
(0, globals_1.describe)('compiler', () => {
    (0, globals_1.test)('compiler1', () => {
        const input = 'LR: (source) => [sink]';
        const result = (0, compiler_1.compiler)(input);
        if ("message" in result) {
            throw new Error(result.message);
        }
        (0, globals_1.expect)(result.type).toEqual(graph_types_1.GraphType.LeftRight);
        (0, globals_1.expect)(result.nodes).toEqual([
            { id: "source", label: "source", shape: graph_types_1.NodeShape.Circle },
            { id: "sink", label: "sink", shape: graph_types_1.NodeShape.Square }
        ]);
        (0, globals_1.expect)(result.edges).toEqual([
            { sourceId: "source", targetId: "sink", type: graph_types_1.EdgeType.ToDirected, length: 1 }
        ]);
    });
});
