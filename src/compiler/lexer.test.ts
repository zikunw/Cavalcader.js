import { describe, expect, test } from '@jest/globals';
import { lexerOperator, lexer } from './lexer';
import { NodeShape } from '../graph/graph-types';

describe('parseOperator()', () => {
    const tests = [
        {input: "=", expected: {value: "=", type: "Undirected", length: 1}},
        {input: "==", expected: {value: "==", type: "Undirected", length: 2}},
        {input: "===", expected: {value: "===", type: "Undirected", length: 3}},
        {input: "<=", expected: {value: "<=", type: "FromDirected", length: 1}},
        {input: "<==", expected: {value: "<==", type: "FromDirected", length: 2}},
        {input: "<===", expected: {value: "<===", type: "FromDirected", length: 3}},
        {input: "=>", expected: {value: "=>", type: "ToDirected", length: 1}},
        {input: "==>", expected: {value: "==>", type: "ToDirected", length: 2}},
        {input: "===>", expected: {value: "===>", type: "ToDirected", length: 3}},
        {input: "<=>", expected: {value: "<=>", type: "Bidirected", length: 1}},
        {input: "<==>", expected: {value: "<==>", type: "Bidirected", length: 2}},
        {input: "<===>", expected: {value: "<===>", type: "Bidirected", length: 3}},
        {input: "(test)", expected: {value: "(test)", label: "test", shape: NodeShape.Circle}},
        {input: "[test]", expected: {value: "[test]", label: "test", shape: NodeShape.Square}},
        {input: "<test>", expected: {value: "<test>", label: "test", shape: NodeShape.Diamond}},
        {input: "LR:", expected: {type: "LeftRight"}},
        {input: "RL:", expected: {type: "RightLeft"}},
        {input: "TD:", expected: {type: "TopDown"}},
        {input: "DT:", expected: {type: "DownTop"}},
    ];

    // run test
    test ('parseOperator()', () => {
        tests.forEach(test => {
            expect(lexerOperator(test.input)).toEqual(test.expected);
        });
    });
});

describe ('parseOperator() error handling', () => {
    const tests = [
        {input: "=>>", expected: {message: "Invalid edge operator"}},
        {input: "test", expected: {message: "Invalid node operator"}},
        {input: "AA:", expected: {message: "Invalid header"}},
    ];

    // run test
    test ('parseOperator()', () => {
        tests.forEach(test => {
            expect(lexerOperator(test.input)).toEqual(test.expected);
        });
    });
});

describe ('parse()', () => {
    const tests = [
        {
            input: ["LR:", "(test)", "==>", "[test]"], 
            expected: [
                {type: "LeftRight"},
                {value: "(test)", label: "test", shape: NodeShape.Circle},
                {value: "==>", type: "ToDirected", length: 2},
                {value: "[test]", label: "test", shape: NodeShape.Square}
            ]
        },
    ]

    // run test
    test ('parse()', () => {
        tests.forEach(test => {
            expect(lexer(test.input)).toEqual(test.expected);
        });
    });
});

describe ('parse() error handling', () => {
    const tests = [
        {input: ["(test)", "=====>", "[test]"], expected: {message: "Invalid edge operator"}},
        {input: ["(test)", "==>", "[test]", "test"], expected: {message: "Invalid node operator"}},
    ];

    // run test
    test ('parse()', () => {
        tests.forEach(test => {
            expect(lexer(test.input)).toEqual(test.expected);
        });
    });
});