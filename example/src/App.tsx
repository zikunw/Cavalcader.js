import { sayGoodbye, sayHello } from 'cavalcader'
import './App.css'

function App() {
  return (
    <>
      <div className="App">
        {sayHello()}
        <br />
        {sayGoodbye()}
      </div>
    </>
  )
}

export default App
