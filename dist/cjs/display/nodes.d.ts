import { JSX } from "react";
export declare const NODE_MARGIN_X = 10;
export declare const NODE_MARGIN_Y = 10;
export declare const TEXT_HEIGHT = 20;
export declare const CHAR_WIDTH = 12;
export declare const STROKE_WIDTH = 2;
type NodeProps = {
    name: string;
    offsetX: number;
    offsetY: number;
    borderColor?: string;
    fillColor?: string;
    textColor?: string;
};
export declare const CircleNode: (props: NodeProps) => JSX.Element;
export declare const SquareNode: (props: NodeProps) => JSX.Element;
export declare const DiamondNode: (props: NodeProps) => JSX.Element;
export {};
