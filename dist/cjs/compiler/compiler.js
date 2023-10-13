"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compiler = void 0;
const tokenizer_1 = require("./tokenizer");
const lexer_1 = require("./lexer");
const parser_1 = require("./parser");
function compiler(input) {
    const ts = (0, tokenizer_1.tokenizer)(input);
    const lexed = (0, lexer_1.lexer)(ts);
    if ("message" in lexed) {
        return lexed;
    }
    const g = (0, parser_1.parseGraph)(lexed);
    if ("message" in g) {
        return g;
    }
    return g;
}
exports.compiler = compiler;
