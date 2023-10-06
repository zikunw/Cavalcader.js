import { describe, expect, test } from '@jest/globals';
import { compiler } from './compiler';
import { GraphType, EdgeType, NodeShape } from '../graph/graph-types';

describe('compiler', () => {
    test('compiler1', () => {
        const input = 'LR: (source) => [sink]';
        const result = compiler(input);
        if ("message" in result) {
            // error
            throw new Error(result.message);
        }

        expect(result.type).toEqual(GraphType.LeftRight);
        expect(result.nodes).toEqual([
            {id: "source", label: "source", shape: NodeShape.Circle},
            {id: "sink", label: "sink", shape: NodeShape.Square}
        ]);
        expect(result.edges).toEqual([
            {sourceId: "source", targetId: "sink", type: EdgeType.ToDirected}
        ]);
    })
})