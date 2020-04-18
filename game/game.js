const Table = require('./table')
const Player = require('./player')

class Game {
    constructor({ players, io, seats, buyin, startingLittleBlind, startingBigBlind }) {
        this.players = players
        this.seats = seats
        this.buyin = buyin
        this.startingLittleBlind = startingLittleBlind
        this.startingBigBlind = startingBigBlind
        this.io = io
    }

    init() {
        this.table = new Table({
            seats: this.seats,
            io: this.io,
            littleBlind: this.startingLittleBlind,
            bigBlind: this.startingBigBlind
        })

        for (let x = 0; x < this.players.length; x++) {
            let player = new Player({
                name: this.players[x].name,
                socket: this.players[x].socket,
                buyin: this.buyin
            })
            this.table.join(player)
        }
        this.table.emitSeating()

        this.table.hand()
    }

    playerJoin(name) {
        let player = new Player({ name: name, buyin: this.buyin })
        this.table.join(player)
    }
}

module.exports = Game