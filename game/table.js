const Deck = require('./deck')

const rounds = {
    preflop: {
        community: 0,
        firstAction: 'leftOfBigBlind'
    },
    flop: {
        community: 3,
        firstAction: 'leftOfDealer'
    },
    turn: {
        community: 1,
        firstAction: 'leftOfDealer'
    },
    river: {
        community: 1,
        firstAction: 'leftOfDealer'
    },
}

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
        console.log(this.community)
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
        this.players[this.littleBlindSeatIndex].bet = this.littleBlind
        this.players[this.littleBlindSeatIndex].chips -= this.littleBlind

        this.bigBlindSeatIndex = this.getNextFilledSeatIndex(this.littleBlindSeatIndex)
        console.log('New big blind is ' + this.players[this.bigBlindSeatIndex].name + ' in seat index: ' + this.bigBlindSeatIndex)
        this.players[this.bigBlindSeatIndex].bet = this.bigBlind
        this.players[this.bigBlindSeatIndex].chips -= this.bigBlind

        this.maxBetThisRound = this.bigBlind
    }

    deal() {
        let numPlayers = this.players.filter(player => player !== null).length
        let indexToDealCardTo = this.dealerSeatIndex
        for (let x = 0; x < numPlayers * 2; x++) {
            indexToDealCardTo = this.getNextFilledSeatIndex(indexToDealCardTo)
            this.players[indexToDealCardTo].hand.push(this.deck.cards.pop())
        }
    }

    getPlayerOptions() {
        // can always fold no matter what
        let options = ['Fold']
        let amountToCall = this.maxBetThisRound - this.players[this.actionIndex].bet

        // if max bid is greater than the bid of the player who the action is on then they can Call, regardless of how many chips they have
        if (amountToCall > 0) {
            if (amountToCall > this.players[this.actionIndex].chips) {
                options.push('Call - All-in (+$' + this.players[this.actionIndex].chips)
            } else {
                options.push('Call')
            }
        }

        // if the max bid is the same as that of the player who the action is on then they can Check, regardless of how many chips they have
        if (this.maxBetThisRound == this.players[this.actionIndex].bet) {
            options.push('Check')
        }

        // if the player has enough to raise (i.e. at least 1 more chip than the amount to call/check) then they can raise
        if (this.players[this.actionIndex].chips > amountToCall) {
            if (this.minRaise > this.players[this.actionIndex].chips) {
                options.push('Raise - All-in (+$' + this.players[this.actionIndex].chips)
            } else {
                options.push('Raise')
            }
        }

        return options
    }

    // A round of betting continues until every player has folded (hand over -> remaining player wins)
    // put in all of their chips (hand over -> showdown), or 
    // matched the amount put in by all other active players (round over -> next round)
    checkRoundOver() {

    }

    checkHandOver() {

    }

    round(roundRef) {
        this.logPlayers()
        let round = rounds[roundRef]

        // deal community cards if any
        for (let x = 0; x < round.community; x++) {
            this.community.push(this.deck.cards.pop())
        }

        if (round.firstAction == 'leftOfBigBlind') {
            this.actionIndex = this.getNextFilledSeatIndex(this.bigBlindSeatIndex)
        } else if (round.firstAction == 'leftOfDealer') {
            this.actionIndex = this.getNextFilledSeatIndex(this.dealerSeatIndex)
        }

        this.minRaise = this.bigBlind


        console.log('The action is on ' + this.players[this.actionIndex].name + ' in seat index: ' + this.actionIndex)




        /**
         * Loop through players until:
         * -All but one player has folded or gone all in (hand is over)
         * -All players have called or checked (round is over)
         */
        // while (!this.checkRoundOver() && !this.checkHandOver()) {


        let options = this.getPlayerOptions()
        console.log('Options on the ' + roundRef)
        let action = this.players[this.actionIndex].presentOptions(options)
        // }
    }

    hand() {
        this.deck.shuffle()
        this.advanceDealer()
        this.collectBlinds()
        this.deal()

        this.round('preflop')
        this.round('flop')
        this.round('turn')
        this.round('river')

    }
}

module.exports = Table