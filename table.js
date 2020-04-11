const Deck = require('./deck')

class Table {
    constructor({ seats, littleBlind, bigBlind }) {
        this.seats = seats
        this.players = Array(seats).fill(null)
        this.community = []
        this.littleBlind = littleBlind
        this.bigBlind = bigBlind
        this.deck = new Deck
        this.deck.shuffle()
        this.dealerSeatIndex = Math.floor(Math.random() * this.seats)
    }

    join(player) {
        if (this.players.indexOf(null) != -1) {
            let randomEmptySeatIndex = this.getRandomEmptySeatIndex()
            this.players[randomEmptySeatIndex] = player
        } else {
            console.log('The table is full!  The player cannot join!')
        }
    }

    getRandomEmptySeatIndex() {
        let emptySeatIndexes = []
        for (let x = 0; x < this.seats; x++) {
            if (this.players[x] == null) {
                emptySeatIndexes.push(x)
            }
        }
        return emptySeatIndexes[Math.floor(Math.random() * emptySeatIndexes.length)]
    }

    logPlayers() {
        console.table(this.players)
        this.players.map(player => player && console.log(player.name, player.hand))
    }

    getNextFilledSeatIndex(startingSeatIndex) {
        let nextFilledSeatIndex = startingSeatIndex
        do {
            if (nextFilledSeatIndex == this.seats - 1) {
                nextFilledSeatIndex = 0
            } else {
                nextFilledSeatIndex++
            }
        } while (this.players[nextFilledSeatIndex] == null)
        return nextFilledSeatIndex
    }

    advanceDealer() {
        this.dealerSeatIndex = this.getNextFilledSeatIndex(this.dealerSeatIndex)
        console.log('New dealer is ' + this.players[this.dealerSeatIndex].name + ' in seat index: ' + this.dealerSeatIndex)
    }

    collectBlinds() {
        this.littleBlindSeatIndex = this.getNextFilledSeatIndex(this.dealerSeatIndex)
        console.log('New little blind is ' + this.players[this.littleBlindSeatIndex].name + ' in seat index: ' + this.littleBlindSeatIndex)
        this.bigBlindSeatIndex = this.getNextFilledSeatIndex(this.littleBlindSeatIndex)
        console.log('New big blind is ' + this.players[this.bigBlindSeatIndex].name + ' in seat index: ' + this.bigBlindSeatIndex)
    }

    deal() {
        let numPlayers = this.players.filter(player => player !== null).length
        let indexToDealCardTo = this.dealerSeatIndex
        for (let x = 0; x < numPlayers * 2; x++) {
            indexToDealCardTo = this.getNextFilledSeatIndex(indexToDealCardTo)
            this.players[indexToDealCardTo].hand.push(this.deck.cards.pop())
        }
    }

    checkRoundOver() {

    }

    checkHandOver() {

    }

    hand() {
        this.deck.shuffle()
        this.advanceDealer()
        this.collectBlinds()
        this.deal()
        this.actionIndex = this.getNextFilledSeatIndex(this.bigBlindSeatIndex)
        this.minRaise = this.bigBlind
        this.maxBet = this.bigBlind

        console.log('The action is on ' + this.players[this.actionIndex].name + ' in seat index: ' + this.actionIndex)

        /**
         * Loop through players until:
         * -All but one player has folded or gone all in (hand is over)
         * -All players have called or checked (round is over)
         */
        while (!this.checkRoundOver() && !this.checkHandOver()) {
            let options = ['Fold', 'Raise']

            // if max bid is greater than the bid of the player who the action is on then they can Call 
            if (this.maxBet > this.players[this.actionIndex].bet) {
                options.push('Call')
            }

            // if the max bid is the same as that of the player who the action is on then they can Check
            if (this.maxBet == this.players[this.actionIndex].bet) {
                options.push('Check')
            }

            // if the player has enough to raise (i.e. more than the amount to call/check) then they can raise

            let action = this.players[this.actionIndex].presentOptions(options)
            console.log(action)
        }


    }
}

module.exports = Table