"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgGenerator = void 0;
const react_1 = __importDefault(require("react"));
const SvgGenerator = () => {
    // Define SVG properties
    const svgWidth = 200;
    const svgHeight = 100;
    const circleRadius = 30;
    // Create an SVG element
    const svg = (react_1.default.createElement("svg", { width: svgWidth, height: svgHeight },
        react_1.default.createElement("circle", { cx: svgWidth / 2, cy: svgHeight / 2, r: circleRadius, fill: "blue" })));
    return react_1.default.createElement("div", null, svg);
};
exports.SvgGenerator = SvgGenerator;
