// TODO: ARROWS IMPLEMENTATION
import React from 'react';
export default function Arrows(props) {
    const { FromX, FromY, ToX, ToY } = props;
    // return a line for now
    return React.createElement("line", { x1: FromX, y1: FromY, x2: ToX, y2: ToY, stroke: "black" });
}
