export type token = string;
export type tokens = token[];

export function tokenizer(input: string): tokens {
    // remove whitespace
    input = input.replace(/\s+/g, ' ');
    input = input.trim();
    return input.split(" ");
}