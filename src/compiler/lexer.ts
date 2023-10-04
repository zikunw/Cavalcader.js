import { token, tokens } from "./tokenizer";
import { EdgeType } from "../graph/graph-types";

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

export type Operator = EdgeOperator | NodeOperator;

export function lexerOperator(token: token): Operator | LexerError {
    if (token.includes("=")) {
        return lexerEdgeOperator(token);
    }
    return lexerNodeOPerator(token);
}

type EdgeOperatorVal = "=" | "==" | "===" | "=>" | "==>" | "===>" | "<=" | "<==" | "<===" | "<=>" | "<==>" | "<===>";
type EdgeOperator = {
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

type NodeOperator = {
    value: string;
    label: string;
    shape: string;
};

function lexerNodeOPerator(token: token): NodeOperator | LexerError {
    // circle
    if (token[0] === "(" && token[token.length-1] === ")") {
        return {value: token, label: token.slice(1, token.length-1), shape: "circle"} as NodeOperator;
    }
    // square
    if (token[0] === "[" && token[token.length-1] === "]") {
        return {value: token, label: token.slice(1, token.length-1), shape: "square"} as NodeOperator;
    }
    // diamond
    if (token[0] === "<" && token[token.length-1] === ">") {
        return {value: token, label: token.slice(1, token.length-1), shape: "diamond"} as NodeOperator;
    }

    return {message: "Invalid node operator"} as LexerError;
}