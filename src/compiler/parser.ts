import { Graph } from "../graph/graph";
import { GraphType } from "../graph/graph-types";
import { tokenizer, tokens } from "./tokenizer";
import { lexer, Operator, NodeOperator, EdgeOperator } from "./lexer";
import { Node } from "../graph/node";
import { Edge } from "../graph/edge";

type ParseError = {
    message: string;
};

export function parseGraph(lexed: Operator[]): Graph | ParseError {

    // Check if first operator is a header
    if (!("type" in lexed[0] && lexed[0].type in GraphType)) {
        throw new Error("Graph must start with a header");
    }
    const g = new Graph(lexed[0].type as GraphType);

    // repeatedly parse expression
    let rest = lexed.slice(1);
    while (rest.length > 0) {
        let retVal = parseExpression(rest, g);
        if ("message" in retVal) {
            return retVal;
        }
        rest = retVal;
    }

    return g;
}

// parse until a break operator or end of input
export function parseExpression(lexed: Operator[], g: Graph): Operator[] | ParseError {
    let rest = lexed;

    // If this expression is just a break
    // remove the break and return
    if (isBreak(rest[0])) return rest.slice(1);

    // Get the first node
    let retVal = parseNode(rest);
    // check if error
    if ("message" in retVal) {
        return retVal;
    }
    let prevNode = retVal.node;
    rest = retVal.rest;
    let edge: Edge;

    g.addNode(prevNode);

    // parse edge until break
    while (rest.length > 0 && !isBreak(rest[0])) {
        if (rest.length < 2) {
            return {message: "Edge must have a target node (1)"};
        }

        if (!isEdge(rest[0])) {
            return {message: "Edge must start with an edge operator (1)"};
        }

        const retVal = parseEdge(rest, prevNode);
        if ("message" in retVal) { // check if error
            return retVal;
        }
        edge = retVal.edge;
        prevNode = retVal.nextNode;
        rest = retVal.rest;

        g.addNode(prevNode);
        g.addEdge(edge);

        if (rest.length === 0 || isBreak(rest[0])) {
            // remove break and return
            return rest.slice(1);
        }
    }

    return rest;
}

// check if the operator is a node
function isNode(op: Operator): boolean {
    return "value" in op && "label" in op && "shape" in op;
}

// check if the operator is an edge
function isEdge(op: Operator): boolean {
    //console.log(op);
    return "value" in op && op.value.includes("=");
}

// check if the operator is a break
function isBreak(op: Operator): boolean {
    return "type" in op && op.type === "Break";
}

// parse a node
export function parseNode(lexed: Operator[]): {node: Node, rest: Operator[]} | ParseError {
    // Check if first operator is a node
    if (!("value" in lexed[0] && "label" in lexed[0] && "shape" in lexed[0])) {
        return {message: "Node must start with an id"};
    }
    const nInfo = lexed[0] as NodeOperator;
    const n = new Node(nInfo.label, nInfo.label, nInfo.shape); // HACK: id and label are the same for now

    return {node:n, rest:lexed.slice(1)};
}

// parse an edge
export function parseEdge(lexed: Operator[], prevNode: Node): {edge: Edge, nextNode: Node, rest: Operator[]} | ParseError {
    // Check if first operator is an edge
    if (!isEdge(lexed[0])) {
        return {message: "Edge must start with an edge operator (2)"};
    }
    
    // Check if second operator is a node
    if (!isNode(lexed[1])) {
        return {message: "Edge must have a target node (2)"};
    }
    const retVal = parseNode(lexed.slice(1));
    // check if error
    if ("message" in retVal) {
        return retVal;
    }
    const nextNode = retVal.node;

    const e = new Edge(prevNode.id, nextNode.id, (lexed[0] as EdgeOperator).type);

    return {edge:e, nextNode: nextNode, rest:lexed.slice(2)};
}
