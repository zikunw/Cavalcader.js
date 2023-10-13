"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const tokenizer_1 = require("./tokenizer");
(0, globals_1.describe)('tokenizer()', () => {
    const tests = [
        { input: "test", expected: ["test"] },
        { input: "    test test", expected: ["test", "test"] },
        { input: "test test    test", expected: ["test", "test", "test"] },
        { input: "test test test test    ", expected: ["test", "test", "test", "test"] },
        { input: "test test test test test", expected: ["test", "test", "test", "test", "test"] },
    ];
    // run test
    (0, globals_1.test)('tokenizer()', () => {
        tests.forEach(test => {
            (0, globals_1.expect)((0, tokenizer_1.tokenizer)(test.input)).toEqual(test.expected);
        });
    });
});
