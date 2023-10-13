import { describe, expect, test } from '@jest/globals';
import { parseEdge, parseNode, parseExpression, parseGraph } from './parser';
import { EdgeType, GraphType, NodeShape } from '../graph/graph-types';
import { Node } from '../graph/node';
import { Graph } from '../graph/graph';
// TODO: Need more tests for better coverage
describe('parseNode', () => {
    test('parseNode1', () => {
        const lexed = [{ value: "[source]", label: "source", shape: NodeShape.Square }];
        const result = parseNode(lexed);
        expect(result).toEqual({
            node: { id: "source", label: "source", shape: NodeShape.Square },
            rest: []
        });
    });
    test('parseNode2', () => {
        const lexed = [{ value: "(sink)", label: "sink", shape: NodeShape.Circle }, { value: "(sink)", label: "sink", shape: NodeShape.Circle }, { value: "(sink)", label: "sink", shape: NodeShape.Circle }];
        const result = parseNode(lexed);
        expect(result).toEqual({
            node: { id: "sink", label: "sink", shape: NodeShape.Circle },
            rest: [{ value: "(sink)", label: "sink", shape: NodeShape.Circle }, { value: "(sink)", label: "sink", shape: NodeShape.Circle }]
        });
    });
});
describe('parseEdge', () => {
    test('parseEdge1', () => {
        const lexed = [
            { value: "=>", type: EdgeType.ToDirected, length: 1 },
            { value: "[sink]", label: "sink", shape: NodeShape.Square }
        ];
        const source = new Node("source", "source", NodeShape.Square);
        const result = parseEdge(lexed, source);
        expect(result).toEqual({
            edge: { sourceId: "source", targetId: "sink", type: EdgeType.ToDirected, length: 1 },
            nextNode: { id: "sink", label: "sink", shape: NodeShape.Square },
            rest: []
        });
    });
});
describe('parseExpression', () => {
    test('parseExpression1', () => {
        const g = new Graph(GraphType.LeftRight);
        const lexed = [
            { value: "[source]", label: "source", shape: NodeShape.Square },
            { value: "=>", type: EdgeType.ToDirected, length: 1 },
            { value: "[sink]", label: "sink", shape: NodeShape.Square }
        ];
        const result = parseExpression(lexed, g);
        expect(result).toEqual([]);
        expect(g.nodes).toEqual([
            { id: "source", label: "source", shape: NodeShape.Square },
            { id: "sink", label: "sink", shape: NodeShape.Square }
        ]);
        expect(g.edges).toEqual([
            { sourceId: "source", targetId: "sink", type: EdgeType.ToDirected, length: 1 }
        ]);
    });
    test('parseExpression2', () => {
        const g = new Graph(GraphType.LeftRight);
        const lexed = [
            { value: "[source]", label: "source", shape: NodeShape.Square },
            { value: "=>", type: EdgeType.ToDirected, length: 1 },
            { value: "(process)", label: "process", shape: NodeShape.Circle },
            { value: "==>", type: EdgeType.ToDirected, length: 2 },
            { value: "[sink]", label: "sink", shape: NodeShape.Square }
        ];
        const result = parseExpression(lexed, g);
        expect(result).toEqual([]);
        expect(g.nodes).toEqual([
            { id: "source", label: "source", shape: NodeShape.Square },
            { id: "process", label: "process", shape: NodeShape.Circle },
            { id: "sink", label: "sink", shape: NodeShape.Square }
        ]);
        expect(g.edges).toEqual([
            { sourceId: "source", targetId: "process", type: EdgeType.ToDirected, length: 1 },
            { sourceId: "process", targetId: "sink", type: EdgeType.ToDirected, length: 2 }
        ]);
    });
});
describe('parseGraph', () => {
    test('parseGraph1', () => {
        const lexed = [
            { type: GraphType.LeftRight },
            { value: "[source]", label: "source", shape: NodeShape.Square },
            { value: "=>", type: EdgeType.ToDirected, length: 1 },
            { value: "(process)", label: "process", shape: NodeShape.Circle },
            { value: "==>", type: EdgeType.ToDirected, length: 2 },
            { value: "[sink]", label: "sink", shape: NodeShape.Square }
        ];
        const g = parseGraph(lexed);
        if ("message" in g) {
            throw new Error(g.message);
        }
        expect(g.type).toEqual(GraphType.LeftRight);
        expect(g.nodes).toEqual([
            { id: "source", label: "source", shape: NodeShape.Square },
            { id: "process", label: "process", shape: NodeShape.Circle },
            { id: "sink", label: "sink", shape: NodeShape.Square }
        ]);
        expect(g.edges).toEqual([
            { sourceId: "source", targetId: "process", type: EdgeType.ToDirected, length: 1 },
            { sourceId: "process", targetId: "sink", type: EdgeType.ToDirected, length: 2 }
        ]);
    });
});
