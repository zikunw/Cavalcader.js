"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondNode = exports.SquareNode = exports.CircleNode = exports.STROKE_WIDTH = exports.CHAR_WIDTH = exports.TEXT_HEIGHT = exports.NODE_MARGIN_Y = exports.NODE_MARGIN_X = void 0;
const react_1 = __importDefault(require("react"));
// Constant for the size of the node
// TODO: make this a prop
exports.NODE_MARGIN_X = 10;
exports.NODE_MARGIN_Y = 10;
exports.TEXT_HEIGHT = 20;
exports.CHAR_WIDTH = 12;
exports.STROKE_WIDTH = 2;
const BORDER_COLOR = '#000000';
const FILL_COLOR = '#ffffff';
const TEXT_COLOR = '#ffffff';
const CircleNode = (props) => {
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
    const textSize = name.length * exports.CHAR_WIDTH;
    const nodeWidth = textSize + exports.NODE_MARGIN_X * 2;
    const nodeHeight = exports.TEXT_HEIGHT + exports.NODE_MARGIN_Y * 2;
    // create an svg box with rounded corners
    const nodeElement = (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("rect", { x: offsetX, y: offsetY, width: nodeWidth, height: nodeHeight, rx: 10, ry: 10, fill: FILL_COLOR, stroke: BORDER_COLOR, strokeWidth: exports.STROKE_WIDTH }),
        react_1.default.createElement("text", { x: offsetX + nodeWidth / 2, y: offsetY + nodeHeight / 2, textAnchor: "middle", dominantBaseline: "middle", fontSize: 20, fill: textColor, fontFamily: "monospace" }, name)));
    return nodeElement;
};
exports.CircleNode = CircleNode;
const SquareNode = (props) => {
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
    const textSize = name.length * exports.CHAR_WIDTH;
    const nodeWidth = textSize + exports.NODE_MARGIN_X * 2;
    const nodeHeight = exports.TEXT_HEIGHT + exports.NODE_MARGIN_Y * 2;
    // create an svg box with squared corners
    const nodeElement = (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("rect", { x: offsetX, y: offsetY, width: nodeWidth, height: nodeHeight, fill: FILL_COLOR, stroke: BORDER_COLOR, strokeWidth: exports.STROKE_WIDTH }),
        react_1.default.createElement("text", { x: offsetX + nodeWidth / 2, y: offsetY + nodeHeight / 2, textAnchor: "middle", dominantBaseline: "middle", fontSize: 20, fill: textColor, fontFamily: "monospace" }, name)));
    return nodeElement;
};
exports.SquareNode = SquareNode;
const DiamondNode = (props) => {
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
    const textSize = name.length * exports.CHAR_WIDTH;
    const nodeWidth = textSize + exports.NODE_MARGIN_X * 2;
    const nodeHeight = exports.TEXT_HEIGHT + exports.NODE_MARGIN_Y * 2;
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
    const nodeElement = (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("polygon", { fill: FILL_COLOR, stroke: BORDER_COLOR, strokeWidth: exports.STROKE_WIDTH, strokeMiterlimit: "10", points: pointsString }),
        react_1.default.createElement("text", { x: offsetX + nodeWidth / 2, y: offsetY + nodeHeight / 2, textAnchor: "middle", dominantBaseline: "middle", fontSize: 20, fill: textColor, fontFamily: "monospace" }, name)));
    return nodeElement;
};
exports.DiamondNode = DiamondNode;
