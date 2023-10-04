import { describe, expect, test } from '@jest/globals';
import { tokenizer } from './tokenizer';

describe('tokenizer()', () => {
    const tests = [
        {input: "test", expected: ["test"]},
        {input: "    test test", expected: ["test", "test"]},
        {input: "test test    test", expected: ["test", "test", "test"]},
        {input: "test test test test    ", expected: ["test", "test", "test", "test"]},
        {input: "test test test test test", expected: ["test", "test", "test", "test", "test"]},
    ];

    // run test
    test ('tokenizer()', () => {
        tests.forEach(test => {
            expect(tokenizer(test.input)).toEqual(test.expected);
        });
    });
});