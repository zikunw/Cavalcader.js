// TODO: ARROWS IMPLEMENTATION

import React from 'react';

type ArrowsProps = {
    FromX: number;
    FromY: number;
    ToX: number;
    ToY: number;
}

export default function Arrows(props: ArrowsProps): JSX.Element {
    const {FromX, FromY, ToX, ToY} = props;
    // return a line for now
    return <line x1={FromX} y1={FromY} x2={ToX} y2={ToY} stroke="black"/>
}