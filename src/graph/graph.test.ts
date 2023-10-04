import {describe, expect, test} from '@jest/globals';
import { Graph } from './graph';
import { GraphType } from './graph-types';

describe('Create Empty Graph', () => {

    const g: Graph = new Graph(GraphType.LeftRight);
    g.printGraph();
    
    test ('Graph has no nodes', () => {
        expect(g.nodes.length).toBe(0);
    });

    test ('Graph has no edges', () => {
        expect(g.edges.length).toBe(0);
    });

    test ('Graph has correct type', () => {
        expect(g.type).toBe(GraphType.LeftRight);
    });

    // Print Graph
    test ('Graph string', () => {
        expect(g.toString()).toBe('Graph {LeftRight, node size: 0, edge size: 0}');
    });
    
});