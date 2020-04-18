class Player {
    constructor({ name, socket, buyin }) {
        this.name = name
        this.chips = buyin
        this.socket = socket
        this.hand = []
        this.bet = 0
        this.lastAction = null
    }

    presentOptions(options) {
        console.log(this.name + ' would you like to ' + options.join(', ') + '?')
    }
}

module.exports = Player