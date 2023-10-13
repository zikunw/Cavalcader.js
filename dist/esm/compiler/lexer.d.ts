import { token, tokens } from "./tokenizer";
import { EdgeType, GraphType, NodeShape } from "../graph/graph-types";
interface LexerError {
    message: string;
}
export declare function lexer(tokens: tokens): Operator[] | LexerError;
export type Operator = EdgeOperator | NodeOperator | HeaderOperator | BreakOperator;
export declare function lexerOperator(token: token): Operator | LexerError;
export type BreakOperator = {
    type: "Break";
};
export declare function lexerBreakOperator(token: token): BreakOperator | LexerError;
export type HeaderOperator = {
    type: GraphType;
};
export declare function lexerHeaderOperator(t: token): HeaderOperator | LexerError;
export type EdgeOperatorVal = "=" | "==" | "===" | "=>" | "==>" | "===>" | "<=" | "<==" | "<===" | "<=>" | "<==>" | "<===>";
export type EdgeOperator = {
    value: EdgeOperatorVal;
    type: EdgeType;
    length: number;
};
export type NodeOperator = {
    value: string;
    label: string;
    shape: NodeShape;
};
export {};
