import { token, tokens } from "./tokenizer";
import { EdgeType, GraphType, NodeShape } from "../graph/graph-types";

interface LexerError {
    message: string;
}

export function lexer(tokens: tokens): Operator[] | LexerError {
    const operators: Operator[] = [];
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

export type Operator = EdgeOperator | NodeOperator | HeaderOperator | BreakOperator;

export function lexerOperator(token: token): Operator | LexerError {
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

export type BreakOperator = {
    type: "Break";
};

export function lexerBreakOperator(token: token): BreakOperator | LexerError {
    if (token === ";") {
        return {type: "Break"};
    }
    return {message: "Invalid break operator"};
}

export type HeaderOperator = {
    type: GraphType
};
export function lexerHeaderOperator(t: token): HeaderOperator | LexerError {
    switch (t) {
        case "LR:": return {type: GraphType.LeftRight};
        case "RL:": return {type: GraphType.RightLeft};
        case "TD:": return {type: GraphType.TopDown};
        case "DT:": return {type: GraphType.DownTop};
        default: return {message: "Invalid header"};
    }
}

export type EdgeOperatorVal = "=" | "==" | "===" | "=>" | "==>" | "===>" | "<=" | "<==" | "<===" | "<=>" | "<==>" | "<===>";
export type EdgeOperator = {
    value: EdgeOperatorVal;
    type: EdgeType;
    length: number;
};

function lexerEdgeOperator(token: token): EdgeOperator | LexerError {
    // Directed
    if (["<=", "<==", "<===", "=>", "==>", "===>"].includes(token)) {
        const directionType = token[0] === "<" ? EdgeType.FromDirected : EdgeType.ToDirected;
        return {value: token, type: directionType, length: token.length-1} as EdgeOperator;
    }
    // Undirected
    if (["=", "==", "==="].includes(token)) {
        return {value: token, type: EdgeType.Undirected, length: token.length} as EdgeOperator;
    }
    // Bidirected
    if (["<=>", "<==>", "<===>"].includes(token)) {
        return {value: token, type: EdgeType.Bidirected, length: token.length-2} as EdgeOperator;
    }
    return {message: "Invalid edge operator"} as LexerError;
}

export type NodeOperator = {
    value: string;
    label: string;
    shape: NodeShape;
};

function lexerNodeOPerator(token: token): NodeOperator | LexerError {
    // circle
    if (token[0] === "(" && token[token.length-1] === ")") {
        return {value: token, label: token.slice(1, token.length-1), shape: NodeShape.Circle} as NodeOperator;
    }
    // square
    if (token[0] === "[" && token[token.length-1] === "]") {
        return {value: token, label: token.slice(1, token.length-1), shape: NodeShape.Square} as NodeOperator;
    }
    // diamond
    if (token[0] === "<" && token[token.length-1] === ">") {
        return {value: token, label: token.slice(1, token.length-1), shape: NodeShape.Diamond} as NodeOperator;
    }

    return {message: "Invalid node operator"} as LexerError;
}