/**
 * Card represents an individual playing card with a suit and rank.
 * These must be supplied to the constructor upon creation.
 */
export default class Card {
  
    constructor (get) {
        if (!get) {
            throw new Error('Card constructor must be called as new Card({suit, rank})');
        }
        this.rank = get.rank;
        this.suit = get.suit;
        this.validate();
    }

    /**
     * Checks if a card has a valid rank and suit.
     */
    validate () {
        if (![...'HDSC'].includes(this.suit)) {
            throw new Error(`Card contains invalid suit of ${this.suit}.`);
        }
        if (![...'23456789','10',...'JQKA'].includes(this.rank)) {
            throw new Error(`Card contains invalid rank of ${this.rank}.`);
        }
    }

    /**
     * Get the value of a card.  Aces are always returned as 11 and not 1.
     * @returns {number}
     */
    toValue () {
        let faces = ['J', 'Q', 'K', 'A'].some(r => r === this.rank);

        if (faces) {
            return 10;
        }

        let value = parseInt(this.rank);

        if (value) {
            return value;
        }
        
        throw new Error(`Could not get value from card rank of ${this.rank}.`);
    }

    /**
     * Convert this card object into a string.
     * @param {boolean} [long=false] - If true, the string returned is long format
     * @returns {string}
     * @example
     * card.toString();
     * // => A♦
     * @example
     * card.toString(true);
     * // => Ace of Diamonds
     */
    toString (long) {
        const suitsShort = {
            'D': '♦',
            'H': '♥',
            'S': '♠',
            'C': '♣'
        }
        const suitsLong = {
            'D': 'Diamonds',
            'H': 'Hearts',
            'S': 'Spades',
            'C': 'Clubs'
        }
        const faces = {
            'A': 'Ace',
            'K': 'King',
            'Q': 'Queen',
            'J': 'Jack'
        }

        if (!long) {
            return suitsShort[this.suit] + this.rank;
        }

        const rank = faces[this.rank] ?? this.rank;
        const suit = suitsLong[this.suit];
        return `${rank} of ${suit}`;
    }

    /**
     * Gets the color of the suit, either black or red.
     * @returns {string}
     */
    color () {
        if(['D', 'H'].includes(this.rank)) {
            return 'red';
        }
        return 'black';
    }
}

