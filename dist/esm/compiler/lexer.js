import { EdgeType, GraphType, NodeShape } from "../graph/graph-types";
export function lexer(tokens) {
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
export function lexerOperator(token) {
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
export function lexerBreakOperator(token) {
    if (token === ";") {
        return { type: "Break" };
    }
    return { message: "Invalid break operator" };
}
export function lexerHeaderOperator(t) {
    switch (t) {
        case "LR:": return { type: GraphType.LeftRight };
        case "RL:": return { type: GraphType.RightLeft };
        case "TD:": return { type: GraphType.TopDown };
        case "DT:": return { type: GraphType.DownTop };
        default: return { message: "Invalid header" };
    }
}
function lexerEdgeOperator(token) {
    // Directed
    if (["<=", "<==", "<===", "=>", "==>", "===>"].includes(token)) {
        const directionType = token[0] === "<" ? EdgeType.FromDirected : EdgeType.ToDirected;
        return { value: token, type: directionType, length: token.length - 1 };
    }
    // Undirected
    if (["=", "==", "==="].includes(token)) {
        return { value: token, type: EdgeType.Undirected, length: token.length };
    }
    // Bidirected
    if (["<=>", "<==>", "<===>"].includes(token)) {
        return { value: token, type: EdgeType.Bidirected, length: token.length - 2 };
    }
    return { message: "Invalid edge operator" };
}
function lexerNodeOPerator(token) {
    // circle
    if (token[0] === "(" && token[token.length - 1] === ")") {
        return { value: token, label: token.slice(1, token.length - 1), shape: NodeShape.Circle };
    }
    // square
    if (token[0] === "[" && token[token.length - 1] === "]") {
        return { value: token, label: token.slice(1, token.length - 1), shape: NodeShape.Square };
    }
    // diamond
    if (token[0] === "<" && token[token.length - 1] === ">") {
        return { value: token, label: token.slice(1, token.length - 1), shape: NodeShape.Diamond };
    }
    return { message: "Invalid node operator" };
}
