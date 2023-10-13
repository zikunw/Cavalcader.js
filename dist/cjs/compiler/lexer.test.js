"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const lexer_1 = require("./lexer");
const graph_types_1 = require("../graph/graph-types");
(0, globals_1.describe)('parseOperator()', () => {
    const tests = [
        { input: "=", expected: { value: "=", type: "Undirected", length: 1 } },
        { input: "==", expected: { value: "==", type: "Undirected", length: 2 } },
        { input: "===", expected: { value: "===", type: "Undirected", length: 3 } },
        { input: "<=", expected: { value: "<=", type: "FromDirected", length: 1 } },
        { input: "<==", expected: { value: "<==", type: "FromDirected", length: 2 } },
        { input: "<===", expected: { value: "<===", type: "FromDirected", length: 3 } },
        { input: "=>", expected: { value: "=>", type: "ToDirected", length: 1 } },
        { input: "==>", expected: { value: "==>", type: "ToDirected", length: 2 } },
        { input: "===>", expected: { value: "===>", type: "ToDirected", length: 3 } },
        { input: "<=>", expected: { value: "<=>", type: "Bidirected", length: 1 } },
        { input: "<==>", expected: { value: "<==>", type: "Bidirected", length: 2 } },
        { input: "<===>", expected: { value: "<===>", type: "Bidirected", length: 3 } },
        { input: "(test)", expected: { value: "(test)", label: "test", shape: graph_types_1.NodeShape.Circle } },
        { input: "[test]", expected: { value: "[test]", label: "test", shape: graph_types_1.NodeShape.Square } },
        { input: "<test>", expected: { value: "<test>", label: "test", shape: graph_types_1.NodeShape.Diamond } },
        { input: "LR:", expected: { type: "LeftRight" } },
        { input: "RL:", expected: { type: "RightLeft" } },
        { input: "TD:", expected: { type: "TopDown" } },
        { input: "DT:", expected: { type: "DownTop" } },
    ];
    // run test
    (0, globals_1.test)('parseOperator()', () => {
        tests.forEach(test => {
            (0, globals_1.expect)((0, lexer_1.lexerOperator)(test.input)).toEqual(test.expected);
        });
    });
});
(0, globals_1.describe)('parseOperator() error handling', () => {
    const tests = [
        { input: "=>>", expected: { message: "Invalid edge operator" } },
        { input: "test", expected: { message: "Invalid node operator" } },
        { input: "AA:", expected: { message: "Invalid header" } },
    ];
    // run test
    (0, globals_1.test)('parseOperator()', () => {
        tests.forEach(test => {
            (0, globals_1.expect)((0, lexer_1.lexerOperator)(test.input)).toEqual(test.expected);
        });
    });
});
(0, globals_1.describe)('parse()', () => {
    const tests = [
        {
            input: ["LR:", "(test)", "==>", "[test]"],
            expected: [
                { type: "LeftRight" },
                { value: "(test)", label: "test", shape: graph_types_1.NodeShape.Circle },
                { value: "==>", type: "ToDirected", length: 2 },
                { value: "[test]", label: "test", shape: graph_types_1.NodeShape.Square }
            ]
        },
    ];
    // run test
    (0, globals_1.test)('parse()', () => {
        tests.forEach(test => {
            (0, globals_1.expect)((0, lexer_1.lexer)(test.input)).toEqual(test.expected);
        });
    });
});
(0, globals_1.describe)('parse() error handling', () => {
    const tests = [
        { input: ["(test)", "=====>", "[test]"], expected: { message: "Invalid edge operator" } },
        { input: ["(test)", "==>", "[test]", "test"], expected: { message: "Invalid node operator" } },
    ];
    // run test
    (0, globals_1.test)('parse()', () => {
        tests.forEach(test => {
            (0, globals_1.expect)((0, lexer_1.lexer)(test.input)).toEqual(test.expected);
        });
    });
});
