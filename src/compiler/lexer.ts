import { token } from "./tokenizer";
import { EdgeType } from "../graph/graph-types";

interface ParseError {
    message: string;
}

type Operator = EdgeOperator | NodeOperator;

export function parseOperator(token: token): Operator | ParseError {
    if (token.includes("=")) {
        return parseEdgeOperator(token);
    }
    return parseNodeOPerator(token);
}

type EdgeOperatorVal = "=" | "==" | "===" | "=>" | "==>" | "===>" | "<=" | "<==" | "<===" | "<=>" | "<==>" | "<===>";
type EdgeOperator = {
    value: EdgeOperatorVal;
    type: EdgeType;
    direction?: string; // only for directed
    length: number;
};

function parseEdgeOperator(token: token): EdgeOperator | ParseError {
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
    return {message: "Invalid edge operator"} as ParseError;
}

type NodeOperator = {
    value: string;
    label: string;
    shape: string;
};

function parseNodeOPerator(token: token): NodeOperator | ParseError {
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

    return {message: "Invalid node operator"} as ParseError;
}