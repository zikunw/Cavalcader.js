import { Graph } from "../graph/graph";
import { tokens, tokenizer } from "./tokenizer";
import { lexer } from "./lexer";
import { parseGraph } from "./parser";

export type CompilerError = {
    message: string;
};

export function compiler(input: string): Graph | CompilerError{
    const ts: tokens = tokenizer(input);
    const lexed = lexer(ts);
    if ("message" in lexed) {
        return lexed;
    }

    const g = parseGraph(lexed);
    if ("message" in g) {
        return g;
    }

    return g;
}