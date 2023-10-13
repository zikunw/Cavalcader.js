"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizer = void 0;
function tokenizer(input) {
    // separate semicolons
    input = input.replace(/;/g, " ; ");
    // remove whitespace
    input = input.replace(/\s+/g, ' ');
    input = input.trim();
    return input.split(" ");
}
exports.tokenizer = tokenizer;
