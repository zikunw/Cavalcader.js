import { tokenizer } from "./tokenizer";
import { lexer } from "./lexer";
import { parseGraph } from "./parser";
export function compiler(input) {
    const ts = tokenizer(input);
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
