import React, { useState, useEffect } from 'react';
import Splash from './components/Splash'
import Table from './components/Table'
import './App.css';
import io from 'socket.io-client'
const socket = io.connect('localhost:3001')

function App() {

  let [joined, setJoined] = useState(false)
  let [name, setName] = useState("")
  let [players, setPlayers] = useState([])
  let [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('join', { name: name })
    console.log('Joining game: ' + name)
    setJoined(true)
  }

  useEffect(() => {
    socket.on('news', (data) => {
      console.log(data)
      setPlayers(data.players)
      setMessage(data.message)
    })
  })


  return (
    <div className="App">
      {!joined && (<Splash onSubmit={handleSubmit} name={name} setName={setName} />)}
      {joined && (<div><p>Players:</p><ul>
        {players && players.map(player => (<li>{player}</li>))}
      </ul></div>)}
      {joined && message && (<p>{message}</p>)}
    </div>
  );
}

export default App;
