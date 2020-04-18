import React, { useState, useEffect } from 'react';
import Splash from './components/Splash'
import Table from './components/Table'
import './App.css';
import io from 'socket.io-client'
const socket = io.connect('localhost:3001')

function App() {

  let [joined, setJoined] = useState(false)
  let [started, setStarted] = useState(false)
  let [name, setName] = useState("")
  let [players, setPlayers] = useState([])
  let [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('join', { name: name })
    console.log('Joining game: ' + name)
    setJoined(true)
  }

  const handleStartGame = () => {
    if (players.length >= 2) {
      socket.emit('start', {})
      setStarted(true)
    } else {
      setMessage('Game cannot being without at least 2 players.')
    }
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
      {joined ? (<Table players={players} message={message} started={started} socket={socket} onStartGame={handleStartGame} />) : (<Splash onSubmit={handleSubmit} name={name} setName={setName} />)}
    </div>
  );
}

export default App;
