"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderGraph = void 0;
const react_1 = __importDefault(require("react"));
const nodes_1 = require("./nodes");
const graph_types_1 = require("../graph/graph-types");
// CONSTANT
const LEVEL_GAP = 50;
const RANK_GAP = 10;
function renderGraph(g, canvasWidth = 500, canvasHeight = 300) {
    const levels = new Map;
    const nodes = g.getNodes();
    const traversed = new Set();
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
    const levelWidths = new Map();
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
    const canvasPadding = 20;
    const numLevels = levels.size;
    // maintain the generated coordinates of the nodes
    const nodeCoordinates = new Map();
    // Generate the svg elements
    const svgElements = [];
    let accWidth = 0;
    levels.forEach((nodes, level) => {
        // calculate the offset of the node
        const levelWidth = levelWidths.get(level);
        if (!levelWidth) {
            return;
        }
        const offsetX = accWidth;
        const offsetY = 0;
        const levelHeight = nodes.length * (nodes_1.TEXT_HEIGHT + nodes_1.NODE_MARGIN_Y * 2 + RANK_GAP);
        const levelHeightOffset = (canvasHeight - levelHeight) / 2;
        // generate the svg node elements
        let nodeCounter = -1;
        nodes.forEach((node, rank) => {
            nodeCounter += 1;
            const nodeWidth = getSizeOfNode(node.id).width;
            const nodeHeight = getSizeOfNode(node.id).height;
            const nodeOffsetX = offsetX + canvasPadding + (Number(levelWidth) - nodeWidth) / 2;
            //const nodeOffsetY = offsetY + nodeCounter * (TEXT_HEIGHT + NODE_MARGIN_Y * 2 + RANK_GAP) + canvasPadding;
            const nodeOffsetY = levelHeightOffset + RANK_GAP + rank * (nodes_1.TEXT_HEIGHT + nodes_1.NODE_MARGIN_Y * 2 + RANK_GAP * 2) - nodeHeight / 2;
            // save the coordinates of the node
            nodeCoordinates.set(node.id, { x: nodeOffsetX, y: nodeOffsetY, width: nodeWidth, height: nodeHeight });
            let nodeElement;
            switch (node.shape) {
                case graph_types_1.NodeShape.Circle:
                    nodeElement = react_1.default.createElement(nodes_1.CircleNode, { name: node.id, offsetX: nodeOffsetX, offsetY: nodeOffsetY });
                    break;
                case graph_types_1.NodeShape.Square:
                    nodeElement = react_1.default.createElement(nodes_1.SquareNode, { name: node.id, offsetX: nodeOffsetX, offsetY: nodeOffsetY });
                    break;
                case graph_types_1.NodeShape.Diamond:
                    nodeElement = react_1.default.createElement(nodes_1.DiamondNode, { name: node.id, offsetX: nodeOffsetX, offsetY: nodeOffsetY });
                    break;
                default:
                    nodeElement = react_1.default.createElement(nodes_1.CircleNode, { name: node.id, offsetX: nodeOffsetX, offsetY: nodeOffsetY });
                    break;
            }
            svgElements.push(nodeElement);
        });
        accWidth = accWidth + Number(levelWidth) + LEVEL_GAP;
    });
    // Generate the svg arrow elements
    const edges = g.getEdges();
    const edgeTargetOffset = 5;
    edges.forEach(edge => {
        const fromNode = nodeCoordinates.get(edge.sourceId);
        const toNode = nodeCoordinates.get(edge.targetId);
        if (!fromNode || !toNode) {
            return;
        }
        const fromX = fromNode.x + fromNode.width;
        const fromY = fromNode.y + fromNode.height / 2;
        let toX = toNode.x - edgeTargetOffset;
        let toY = toNode.y + toNode.height / 2;
        // move toX and toY back a little bit
        toX = toX - (toX - fromX) / 10;
        toY = toY - (toY - fromY) / 10;
        const arrowElement = react_1.default.createElement("line", { x1: fromX, y1: fromY, x2: toX, y2: toY, stroke: "black", strokeWidth: 2, markerEnd: "url(#arrowhead)" });
        svgElements.push(arrowElement);
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("svg", { width: canvasWidth, height: canvasHeight },
            react_1.default.createElement("rect", { width: canvasWidth, height: canvasHeight, fill: "#ffffff" }),
            react_1.default.createElement("marker", { id: "arrowhead", markerWidth: "5", markerHeight: "5", refX: "2.5", refY: "2.5", orient: "auto" },
                react_1.default.createElement("path", { d: "M0,0 L5,2.5 L0,5 Z", fill: "black" })),
            svgElements,
            react_1.default.createElement("rect", { width: canvasWidth, height: canvasHeight, fill: "none", stroke: '#000000', strokeWidth: 4 }))));
}
exports.renderGraph = renderGraph;
// helper function to get the size of the node with text
function getSizeOfNode(name) {
    const textSize = name.length * nodes_1.CHAR_WIDTH;
    const nodeWidth = textSize + nodes_1.NODE_MARGIN_X * 2;
    const nodeHeight = nodes_1.TEXT_HEIGHT + nodes_1.NODE_MARGIN_Y * 2;
    return { width: nodeWidth, height: nodeHeight };
}
