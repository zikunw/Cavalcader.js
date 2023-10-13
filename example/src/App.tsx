import { useState } from 'react'
import './App.css'

import { CircleNode, SquareNode, DiamondNode, compiler, renderGraph, Graph, GraphType } from 'cavalcader';

function App() {
  const [input, setInput] = useState('');
  const output = compiler(input);
  const renderResult = "message" in output ?  renderGraph(new Graph(GraphType.LeftRight)) : renderGraph(output);
  return (
    <>
      <div className="w-full h-full p-10">
        <svg width={700} height={300} className='bg-stone-300'>
          <CircleNode name="test" offsetX={50} offsetY={50} />
          <SquareNode name="This is longer text" offsetX={50} offsetY={100} />
          <DiamondNode name="This is longer text" offsetX={50} offsetY={150} />
        </svg>
        <textarea value={input} onChange={e => setInput(e.target.value)} className='border-2 w-full my-4 p-2'/>
        {renderResult}
        <pre className="text-xs">{JSON.stringify(output, null, 2)}</pre>
      </div>
    </>
  )
}

export default App
