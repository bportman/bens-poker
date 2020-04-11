const Table = require('./table')
const Player = require('./player')

const players = [
    'Ben',
    'Matt',
    'Becca',
    'Teal'
]
const seats = 6
const buyin = 1500

const startingLittleBlind = 10
const startingBigBlind = 20


let table = new Table({
    seats: seats,
    littleBlind: startingBigBlind,
    bigBlind: startingBigBlind
})

for (let x = 0; x < players.length; x++) {
    let player = new Player({ name: players[x], buyin: buyin })
    table.join(player)
}

table.logPlayers()

// for (let x = 0; x < 10; x++) {
table.hand()
table.logPlayers()
// }