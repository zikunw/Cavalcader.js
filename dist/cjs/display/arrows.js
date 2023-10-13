"use strict";
// TODO: ARROWS IMPLEMENTATION
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Arrows(props) {
    const { FromX, FromY, ToX, ToY } = props;
    // return a line for now
    return react_1.default.createElement("line", { x1: FromX, y1: FromY, x2: ToX, y2: ToY, stroke: "black" });
}
exports.default = Arrows;
