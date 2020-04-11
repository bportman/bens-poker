const Table = require('./table')
const Player = require('./player')

class Game {
    constructor({ players, seats, buyin, startingLittleBlind, startingBigBlind }) {
        this.players = players
        this.seats = seats
        this.buyin = buyin
        this.startingLittleBlind = startingLittleBlind
        this.startingBigBlind = startingBigBlind
    }

    init() {
        this.table = new Table({
            seats: this.seats,
            littleBlind: this.startingLittleBlind,
            bigBlind: this.startingBigBlind
        })

        for (let x = 0; x < this.players.length; x++) {
            let player = new Player({
                name: this.players[x],
                buyin: this.buyin
            })
            this.table.join(player)
        }
    }

    playerJoin(name) {
        let player = new Player({ name: name, buyin: this.buyin })
        this.table.join(player)
    }
}

module.exports = Game