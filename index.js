const players = 4
const seats = 6
const buyin = 1500

const startingLittleBlind = 10
const startingBigBlind = 20

const suits = {
    HEARTS: 'hearts',
    CLUBS: 'clubs',
    SPADES: 'spades',
    DIAMONDS: 'diamonds'
}

const ranks = {
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14
}

class Card {
    constructor({ suit, rank }) {
        this.suit = suit
        this.rank = rank
    }
}

class Deck {
    constructor() {
        this.cards = []
        Object.keys(suits).map(suit => {
            Object.keys(ranks).map(rank => {
                this.cards.push(new Card({ suit, rank }))
            })
        })
    }

    logDeck() {
        console.log(this.cards)
    }

    /**
     * Randomly shuffle an array
     * https://stackoverflow.com/a/2450976/1293256
     * @param  {Array} array The array to shuffle
     * @return {String}      The first item in the shuffled array
     */
    shuffle() {
        let shuffledCards = this.cards
        let currentIndex = shuffledCards.length
        let temporaryValue, randomIndex

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            // And swap it with the current element.
            temporaryValue = shuffledCards[currentIndex]
            shuffledCards[currentIndex] = shuffledCards[randomIndex]
            shuffledCards[randomIndex] = temporaryValue
        }

        this.cards = shuffledCards
    }
}

class Player {
    constructor({ buyin }) {
        this.chips = buyin
        this.hand = []
    }
}

class Table {
    constructor(seats) {
        this.seats = seats
        this.players = Array(seats).fill(null)
        this.community = []
        this.littleBlind = startingLittleBlind
        this.bigBlind = startingBigBlind
        this.deck = new Deck
        deck.shuffle()
    }

    join(player) {
        this.players.push(player)
    }
}

let table = new Table(seats) // create a table with 6 seats

for (let x = 0; x < players; x++) {
    let player = new Player(buyin)
}