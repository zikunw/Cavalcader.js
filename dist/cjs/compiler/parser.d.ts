import { Graph } from "../graph/graph";
import { Operator } from "./lexer";
import { Node } from "../graph/node";
import { Edge } from "../graph/edge";
type ParseError = {
    message: string;
};
export declare function parseGraph(lexed: Operator[]): Graph | ParseError;
export declare function parseExpression(lexed: Operator[], g: Graph): Operator[] | ParseError;
export declare function parseNode(lexed: Operator[]): {
    node: Node;
    rest: Operator[];
} | ParseError;
export declare function parseEdge(lexed: Operator[], prevNode: Node): {
    edge: Edge;
    nextNode: Node;
    rest: Operator[];
} | ParseError;
export {};
