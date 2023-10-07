export type token = string;
export type tokens = token[];

export function tokenizer(input: string): tokens {
    // separate semicolons
    input = input.replace(/;/g, " ; ");
    // remove whitespace
    input = input.replace(/\s+/g, ' ');
    input = input.trim();
    return input.split(" ");
}