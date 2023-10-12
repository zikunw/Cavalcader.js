import React from "react";

export const SvgGenerator = () => {
   // Define SVG properties
  const svgWidth = 200;
  const svgHeight = 100;
  const circleRadius = 30;

  // Create an SVG element
  const svg = (
    <svg width={svgWidth} height={svgHeight}>
      {/* Create a circle element */}
      <circle
        cx={svgWidth / 2}
        cy={svgHeight / 2}
        r={circleRadius}
        fill="blue"
      />
    </svg>
  );

  return <div>{svg}</div>;
};