export function tokenizer(input) {
    // separate semicolons
    input = input.replace(/;/g, " ; ");
    // remove whitespace
    input = input.replace(/\s+/g, ' ');
    input = input.trim();
    return input.split(" ");
}
