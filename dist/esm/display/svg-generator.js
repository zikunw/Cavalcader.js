import React from "react";
export const SvgGenerator = () => {
    // Define SVG properties
    const svgWidth = 200;
    const svgHeight = 100;
    const circleRadius = 30;
    // Create an SVG element
    const svg = (React.createElement("svg", { width: svgWidth, height: svgHeight },
        React.createElement("circle", { cx: svgWidth / 2, cy: svgHeight / 2, r: circleRadius, fill: "blue" })));
    return React.createElement("div", null, svg);
};
