import React from 'react';
import './App.css';

function App() {

  let [name, setName] = React.useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Joining game: ' + name)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>Hello, welcome to Ben's Poker</p>
        <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default App;
