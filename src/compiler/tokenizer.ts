export type token = string;
export type tokens = token[];

export function tokenizeInput(input: string): tokens {
    // remove whitespace
    input = input.trim();
    return input.split(" ");
}