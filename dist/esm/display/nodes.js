import React from "react";
// Constant for the size of the node
// TODO: make this a prop
export const NODE_MARGIN_X = 10;
export const NODE_MARGIN_Y = 10;
export const TEXT_HEIGHT = 20;
export const CHAR_WIDTH = 12;
export const STROKE_WIDTH = 2;
const BORDER_COLOR = '#000000';
const FILL_COLOR = '#ffffff';
const TEXT_COLOR = '#ffffff';
export const CircleNode = (props) => {
    let { name, offsetX, offsetY, borderColor, fillColor, textColor } = props;
    if (borderColor === undefined) {
        borderColor = BORDER_COLOR;
    }
    if (fillColor === undefined) {
        fillColor = FILL_COLOR;
    }
    if (textColor === undefined) {
        textColor = TEXT_COLOR;
    }
    // get the size of the text
    // through bbox
    const textSize = name.length * CHAR_WIDTH;
    const nodeWidth = textSize + NODE_MARGIN_X * 2;
    const nodeHeight = TEXT_HEIGHT + NODE_MARGIN_Y * 2;
    // create an svg box with rounded corners
    const nodeElement = (React.createElement(React.Fragment, null,
        React.createElement("rect", { x: offsetX, y: offsetY, width: nodeWidth, height: nodeHeight, rx: 10, ry: 10, fill: FILL_COLOR, stroke: BORDER_COLOR, strokeWidth: STROKE_WIDTH }),
        React.createElement("text", { x: offsetX + nodeWidth / 2, y: offsetY + nodeHeight / 2, textAnchor: "middle", dominantBaseline: "middle", fontSize: 20, fill: textColor, fontFamily: "monospace" }, name)));
    return nodeElement;
};
export const SquareNode = (props) => {
    let { name, offsetX, offsetY, borderColor, fillColor, textColor } = props;
    if (borderColor === undefined) {
        borderColor = BORDER_COLOR;
    }
    if (fillColor === undefined) {
        fillColor = FILL_COLOR;
    }
    if (textColor === undefined) {
        textColor = TEXT_COLOR;
    }
    // get the size of the text
    const textSize = name.length * CHAR_WIDTH;
    const nodeWidth = textSize + NODE_MARGIN_X * 2;
    const nodeHeight = TEXT_HEIGHT + NODE_MARGIN_Y * 2;
    // create an svg box with squared corners
    const nodeElement = (React.createElement(React.Fragment, null,
        React.createElement("rect", { x: offsetX, y: offsetY, width: nodeWidth, height: nodeHeight, fill: FILL_COLOR, stroke: BORDER_COLOR, strokeWidth: STROKE_WIDTH }),
        React.createElement("text", { x: offsetX + nodeWidth / 2, y: offsetY + nodeHeight / 2, textAnchor: "middle", dominantBaseline: "middle", fontSize: 20, fill: textColor, fontFamily: "monospace" }, name)));
    return nodeElement;
};
export const DiamondNode = (props) => {
    let { name, offsetX, offsetY, borderColor, fillColor, textColor } = props;
    if (borderColor === undefined) {
        borderColor = BORDER_COLOR;
    }
    if (fillColor === undefined) {
        fillColor = FILL_COLOR;
    }
    if (textColor === undefined) {
        textColor = TEXT_COLOR;
    }
    // get the size of the text
    const textSize = name.length * CHAR_WIDTH;
    const nodeWidth = textSize + NODE_MARGIN_X * 2;
    const nodeHeight = TEXT_HEIGHT + NODE_MARGIN_Y * 2;
    const CORNER_SIZE = 12;
    // calculate the points of the diamond
    const points = [
        [offsetX + CORNER_SIZE, offsetY],
        [offsetX + nodeWidth - CORNER_SIZE, offsetY],
        [offsetX + nodeWidth, offsetY + CORNER_SIZE],
        [offsetX + nodeWidth, offsetY + nodeHeight - CORNER_SIZE],
        [offsetX + nodeWidth - CORNER_SIZE, offsetY + nodeHeight],
        [offsetX + CORNER_SIZE, offsetY + nodeHeight],
        [offsetX, offsetY + nodeHeight - CORNER_SIZE],
        [offsetX, offsetY + CORNER_SIZE],
    ];
    // to string
    const pointsString = points.map(point => point.join(',')).join(' ');
    // create an svg
    const nodeElement = (React.createElement(React.Fragment, null,
        React.createElement("polygon", { fill: FILL_COLOR, stroke: BORDER_COLOR, strokeWidth: STROKE_WIDTH, strokeMiterlimit: "10", points: pointsString }),
        React.createElement("text", { x: offsetX + nodeWidth / 2, y: offsetY + nodeHeight / 2, textAnchor: "middle", dominantBaseline: "middle", fontSize: 20, fill: textColor, fontFamily: "monospace" }, name)));
    return nodeElement;
};
