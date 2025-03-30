import React from 'react'
import Button from './components/Button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button autoFocus>Hello World</Button>
        <Button disabled>Hello World</Button>
        <Button btnType="primary" size="lg">
          Hello World
        </Button>
        <Button btnType="link" href="https://www.baidu.com">
          Baidu
        </Button>

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
