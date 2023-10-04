import {describe, expect, test} from '@jest/globals';
import { parseOperator } from './lexer';

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
            expect(parseOperator(test.input)).toEqual(test.expected);
        });
    });
});