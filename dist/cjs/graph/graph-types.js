"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeShape = exports.EdgeType = exports.GraphType = void 0;
var GraphType;
(function (GraphType) {
    GraphType["TopDown"] = "TopDown";
    GraphType["LeftRight"] = "LeftRight";
    GraphType["DownTop"] = "DownTop";
    GraphType["RightLeft"] = "RightLeft";
})(GraphType || (exports.GraphType = GraphType = {}));
var EdgeType;
(function (EdgeType) {
    EdgeType["ToDirected"] = "ToDirected";
    EdgeType["FromDirected"] = "FromDirected";
    EdgeType["Bidirected"] = "Bidirected";
    EdgeType["Undirected"] = "Undirected";
})(EdgeType || (exports.EdgeType = EdgeType = {}));
var NodeShape;
(function (NodeShape) {
    NodeShape["Circle"] = "Circle";
    NodeShape["Square"] = "Square";
    NodeShape["Diamond"] = "Diamond";
})(NodeShape || (exports.NodeShape = NodeShape = {}));
