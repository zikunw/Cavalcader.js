export var GraphType;
(function (GraphType) {
    GraphType["TopDown"] = "TopDown";
    GraphType["LeftRight"] = "LeftRight";
    GraphType["DownTop"] = "DownTop";
    GraphType["RightLeft"] = "RightLeft";
})(GraphType || (GraphType = {}));
export var EdgeType;
(function (EdgeType) {
    EdgeType["ToDirected"] = "ToDirected";
    EdgeType["FromDirected"] = "FromDirected";
    EdgeType["Bidirected"] = "Bidirected";
    EdgeType["Undirected"] = "Undirected";
})(EdgeType || (EdgeType = {}));
export var NodeShape;
(function (NodeShape) {
    NodeShape["Circle"] = "Circle";
    NodeShape["Square"] = "Square";
    NodeShape["Diamond"] = "Diamond";
})(NodeShape || (NodeShape = {}));
