import { useState } from 'react'
import './App.css'

import { compiler, renderGraph, Graph, GraphType } from 'cavalcader';
import useWindowDimensions from './hook/useWindowDimension';
import { FaGithubSquare } from 'react-icons/fa';

const exampleInput = `LR:
(source) => <operator1> => [sink1];
(source) => <operator2> => [sink2];
(source) => <operator3> => [sink2];
[sink1] => (database);
[sink2] => (database);
`

function App() {
  const [input, setInput] = useState(exampleInput);
  const output = compiler(input);
  const { width } = useWindowDimensions();
  const renderResult = "message" in output ?  renderGraph(new Graph(GraphType.LeftRight), width-80) : renderGraph(output, width-80);
  return (
    <>
      <div className="w-full h-full p-10">
        <h1 className="text-2xl font-bold flex flex-row">Demo  <a href="https://github.com/zikunw/Cavalcader.js"><FaGithubSquare /></a></h1>
        <textarea value={input} onChange={e => setInput(e.target.value)} spellCheck="false" className='border-2 w-full my-4 p-2 h-60 font-mono' placeholder='LR: (source) => [sink]'/>
        {renderResult}
        <p className="text-sm text-gray-400 mt-5">Made by Zikun Wang.</p>
      </div>
    </>
  )
}

export default App
