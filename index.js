const Game = require('./game/game')
let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(3001);

let connections = []
const players = []
const seats = 6
const buyin = 1500

const startingLittleBlind = 10
const startingBigBlind = 20

// let game = new Game({
//     players: players,
//     seats: seats,
//     buyin: buyin,
//     startingLittleBlind: startingLittleBlind,
//     startingBigBlind: startingBigBlind
// })

io.on('connection', function (socket) {
    connections.push(socket)
    console.log('Connected: %s sockets connected', connections.length)
    console.log('New connection id: %s', socket.id)

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1)
        console.log('Disconnected: %s sockets connected', connections.length)
    })

    socket.on('join', function (data) {
        console.log('Player joined: ' + data.name);
        players.push(data.name)
        io.emit('news', { message: 'Player joined: ' + data.name, players: players });
        console.log(players)
    });
});

