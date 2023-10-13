"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lexerHeaderOperator = exports.lexerBreakOperator = exports.lexerOperator = exports.lexer = void 0;
const graph_types_1 = require("../graph/graph-types");
function lexer(tokens) {
    const operators = [];
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const operator = lexerOperator(token);
        // Check lexer error
        if ("message" in operator) {
            return operator;
        }
        operators.push(operator);
    }
    return operators;
}
exports.lexer = lexer;
function lexerOperator(token) {
    if (token.includes(":")) {
        return lexerHeaderOperator(token);
    }
    if (token.includes("=")) {
        return lexerEdgeOperator(token);
    }
    if (token === ";") {
        return lexerBreakOperator(token);
    }
    return lexerNodeOPerator(token);
}
exports.lexerOperator = lexerOperator;
function lexerBreakOperator(token) {
    if (token === ";") {
        return { type: "Break" };
    }
    return { message: "Invalid break operator" };
}
exports.lexerBreakOperator = lexerBreakOperator;
function lexerHeaderOperator(t) {
    switch (t) {
        case "LR:": return { type: graph_types_1.GraphType.LeftRight };
        case "RL:": return { type: graph_types_1.GraphType.RightLeft };
        case "TD:": return { type: graph_types_1.GraphType.TopDown };
        case "DT:": return { type: graph_types_1.GraphType.DownTop };
        default: return { message: "Invalid header" };
    }
}
exports.lexerHeaderOperator = lexerHeaderOperator;
function lexerEdgeOperator(token) {
    // Directed
    if (["<=", "<==", "<===", "=>", "==>", "===>"].includes(token)) {
        const directionType = token[0] === "<" ? graph_types_1.EdgeType.FromDirected : graph_types_1.EdgeType.ToDirected;
        return { value: token, type: directionType, length: token.length - 1 };
    }
    // Undirected
    if (["=", "==", "==="].includes(token)) {
        return { value: token, type: graph_types_1.EdgeType.Undirected, length: token.length };
    }
    // Bidirected
    if (["<=>", "<==>", "<===>"].includes(token)) {
        return { value: token, type: graph_types_1.EdgeType.Bidirected, length: token.length - 2 };
    }
    return { message: "Invalid edge operator" };
}
function lexerNodeOPerator(token) {
    // circle
    if (token[0] === "(" && token[token.length - 1] === ")") {
        return { value: token, label: token.slice(1, token.length - 1), shape: graph_types_1.NodeShape.Circle };
    }
    // square
    if (token[0] === "[" && token[token.length - 1] === "]") {
        return { value: token, label: token.slice(1, token.length - 1), shape: graph_types_1.NodeShape.Square };
    }
    // diamond
    if (token[0] === "<" && token[token.length - 1] === ">") {
        return { value: token, label: token.slice(1, token.length - 1), shape: graph_types_1.NodeShape.Diamond };
    }
    return { message: "Invalid node operator" };
}
