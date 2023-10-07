import { compiler } from 'cavalcader'
import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const output = compiler(input);
  return (
    <>
      <div className="w-full h-full p-10">
        <input value={input} onChange={e => setInput(e.target.value)} className='border-2 w-full my-4'/>
        <pre className="text-xs">{JSON.stringify(output, null, 2)}</pre>
      </div>
    </>
  )
}

export default App
