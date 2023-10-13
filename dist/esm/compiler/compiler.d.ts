import { Graph } from "../graph/graph";
export type CompilerError = {
    message: string;
};
export declare function compiler(input: string): Graph | CompilerError;
