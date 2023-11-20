import Card from './card.mjs';

/**
 * A deck of 52 cards for use with card games.
 * Deck can be shuffled, cards removed, and cards added. 
 */
export default class Deck {
    constructor () {
        this.deck = [];
        for (const suit of [...'HDSC']) {
            for (const rank of [...'23456789','10',...'JQKA']) {
                this.deck.push(new Card({suit, rank}));
            }
        }
    }

    /**
     * Shuffles deck in place using Fisher-Yates algo.
     */
    shuffle () {
        let m = this.deck.length;
        let i;

        //As long as there are elements to shuffle.
        while (m) {
            //Pick a random element.
            i = Math.floor(Math.random() * m--);

            //And swap it with the current element.
            [this.deck[m], this.deck[i]] = [this.deck[i], this.deck[m]];
        }
    }

    /**
     * Removes n-amount of cards from the top of the deck. and returns them.  Default 1 card.
     * @param {number} amount
     * @returns {cards[]}
     */
    remove (amount = 1) {
        return this.deck.splice(0, amount);
    }

    /**
     * Adds cards to the bottom of the deck.
     * @param {Card} cards - A card or array of cards to add.
     */
    add (cards) {
        if (cards instanceof Card) {
            cards = [cards];
        }
        if (!Array.isArray(cards)) {
            throw new Error('deck.add() must be passed a card or array of cards.');
        }
        this.deck = [...this.deck, ...cards];
    }
}

