import { Graph } from "../graph/graph";
import React from "react";
import { Node } from "../graph/node";
import { CircleNode, SquareNode, DiamondNode, NODE_MARGIN_X, NODE_MARGIN_Y, TEXT_HEIGHT, CHAR_WIDTH, STROKE_WIDTH } from "./nodes";
import { NodeShape } from "../graph/graph-types";
// CONSTANT
const LEVEL_GAP = 50;
const RANK_GAP = 10;

export function renderGraph(g: Graph): JSX.Element {
    const levels = new Map<Number, Node[]>;
    const nodes = g.getNodes();
    const traversed = new Set<Node>();

    // Get all the nodes without parents
    // these are the nodes at the level 0
    const rootNodes = nodes.filter(node => node.getParents().length === 0);
    levels.set(0, rootNodes.map(node => node));
    rootNodes.forEach(node => traversed.add(node));

    // starting from the root nodes, get all the children
    // and add them to the next level
    let level = 1;
    let childrenIDs = rootNodes.flatMap(node => node.getChildren());
    let children = nodes.filter(node => childrenIDs.includes(node.id));
    while (children.length > 0) {
        levels.set(level, children);
        children.forEach(node => traversed.add(node));
        childrenIDs = children.flatMap(node => node.getChildren());
        children = nodes.filter(node => childrenIDs.includes(node.id) && !traversed.has(node));
        level++;
    }

    // TODO: for now, assume all graph are from left to right
    //       in the future, we need to generate graph based on the direction
    const levelWidths = new Map<Number, Number>();
    for (let i = 0; i < levels.size; i++) {
        const nodes = levels.get(i);
        if (!nodes) {
            continue;
        }
        const width = nodes.reduce((acc, node) => getSizeOfNode(node.id).width < acc ? acc : getSizeOfNode(node.id).width, 0);
        levelWidths.set(i, width);
    }

    // Generate the svg canvas
    // TODO: hardcode for now
    const canvasWidth = 700;
    const canvasHeight = 300;
    const canvasPadding = 20;
    const numLevels = levels.size;

    // maintain the generated coordinates of the nodes
    const nodeCoordinates = new Map<string, {x: number, y: number, width: number, height: number}>();

    // Generate the svg elements
    const svgElements: JSX.Element[] = [];

    let accWidth = 0;
    levels.forEach((nodes, level) => {
        // calculate the offset of the node
        const levelWidth = levelWidths.get(level);
        if (!levelWidth) {
            return;
        }
    
        const offsetX = accWidth;
        const offsetY = 0;
        const levelHeight = nodes.length * (TEXT_HEIGHT + NODE_MARGIN_Y * 2 + RANK_GAP);
        const levelHeightOffset = (canvasHeight - levelHeight)/2;
        // generate the svg node elements
        let nodeCounter = -1;
        nodes.forEach((node, rank) => {
            nodeCounter += 1;
            const nodeWidth = getSizeOfNode(node.id).width;
            const nodeHeight = getSizeOfNode(node.id).height;
            const nodeOffsetX = offsetX + canvasPadding + (Number(levelWidth) - nodeWidth)/2;
            //const nodeOffsetY = offsetY + nodeCounter * (TEXT_HEIGHT + NODE_MARGIN_Y * 2 + RANK_GAP) + canvasPadding;
            const nodeOffsetY = levelHeightOffset + RANK_GAP + rank * (TEXT_HEIGHT + NODE_MARGIN_Y * 2 + RANK_GAP * 2) - nodeHeight/2;

            // save the coordinates of the node
            nodeCoordinates.set(node.id, {x: nodeOffsetX, y: nodeOffsetY, width: nodeWidth, height: nodeHeight});
            
            let nodeElement: JSX.Element;
            switch (node.shape) {
                case NodeShape.Circle:
                    nodeElement = <CircleNode name={node.id} offsetX={nodeOffsetX} offsetY={nodeOffsetY} />;
                    break;
                case NodeShape.Square:
                    nodeElement = <SquareNode name={node.id} offsetX={nodeOffsetX} offsetY={nodeOffsetY} />;
                    break;
                case NodeShape.Diamond:
                    nodeElement = <DiamondNode name={node.id} offsetX={nodeOffsetX} offsetY={nodeOffsetY} />;
                    break;
                default:
                    nodeElement = <CircleNode name={node.id} offsetX={nodeOffsetX} offsetY={nodeOffsetY} />;
                    break;
            }
            svgElements.push(nodeElement);
        });
        accWidth = accWidth + Number(levelWidth) + LEVEL_GAP;
    });

    // Generate the svg arrow elements
    const edges = g.getEdges();
    edges.forEach(edge => {
        const fromNode = nodeCoordinates.get(edge.sourceId);
        const toNode = nodeCoordinates.get(edge.targetId);
        if (!fromNode || !toNode) {
            return;
        }
        const fromX = fromNode.x + fromNode.width;
        const fromY = fromNode.y + fromNode.height/2;
        const toX = toNode.x;
        const toY = toNode.y + toNode.height/2;
        const arrowElement = <line x1={fromX} y1={fromY} x2={toX} y2={toY} stroke="black" strokeWidth={2}/>;
        svgElements.push(arrowElement);
    });

    return (
    <>
        <svg width={canvasWidth} height={canvasHeight}>
            <rect fill='#ffaa00' width={canvasWidth} height={canvasHeight}/>
            {svgElements}
        </svg>
        <pre> #levels: {JSON.stringify(levels.size)}</pre>
        <pre> #widths: {JSON.stringify(levelWidths.get(0))}, {JSON.stringify(levelWidths.get(1))}, {JSON.stringify(levelWidths.get(2))}</pre>
    </>
    );
}

// helper function to get the size of the node with text
function getSizeOfNode(name: string): {width: number, height: number} {
    const textSize = name.length * CHAR_WIDTH;
    const nodeWidth = textSize + NODE_MARGIN_X * 2;
    const nodeHeight = TEXT_HEIGHT + NODE_MARGIN_Y * 2;
    return {width: nodeWidth, height: nodeHeight};
}