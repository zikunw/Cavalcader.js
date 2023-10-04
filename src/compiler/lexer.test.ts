import { describe, expect, test } from '@jest/globals';
import { lexerOperator, lexer } from './lexer';

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
        {input: "(test)", expected: {value: "(test)", label: "test", shape: "circle"}},
        {input: "[test]", expected: {value: "[test]", label: "test", shape: "square"}},
        {input: "<test>", expected: {value: "<test>", label: "test", shape: "diamond"}},
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
            input: ["(test)", "==>", "[test]"], 
            expected: [
                {value: "(test)", label: "test", shape: "circle"},
                {value: "==>", type: "ToDirected", length: 2},
                {value: "[test]", label: "test", shape: "square"}
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