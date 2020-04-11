const Game = require('./game/game')
let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(80);

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

    socket.on('join', function (name) {
        console.log('Player joined: ' + name);
        socket.emit('news', { message: 'Player joined: ' + name });
    });
});

