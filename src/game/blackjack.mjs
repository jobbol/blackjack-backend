import Card from './card.mjs';
import Deck from './deck.mjs';

const bustAmount = 22;

/**
 * Represents a game of Blackjack.
 * Deals out cards to players, allows players to hit, and returns winner / end game stats.
 */
export default class Blackjack {
    /**
     * Starts the game with a given amount of players and adds two cards into each user's deck.
     * @param {object} params
     * @param {number} params.userCount 
     */
    constructor ({userCount = 2}) {
        this.deck = new Deck();
        this.deck.shuffle();
        setUsers([...Array(userCount)].map(() => deck.remove(2)));
    }

    /**
     * Gives a specified user a card.  Returns user's new hand.
     * @param {number} userIndex
     * @returns {Card[]}
     */
    hit ({userIndex, setUsers}) {
        setUsers((users) => {
            return users.map((user,i) => {
                if (i !== userIndex) {
                    return user;
                }
                return [...user, ...deck.remove()];
            });
        });
    }

    /**
     * Gets the total score of a specified user.
     * @param {number} userIndex
     * @returns {number}
     */
    getUserScore ({users, userIndex, hasDealer}) {
        let score = users[userIndex].reduce((total, card) => total += card.toValue(), 0);
    
        //Scores that aren't busted don't need to be checked.
        if (score < bustAmount) {
            return score;
        }
    
        //If the dealer has busted, return their score.
        if (hasDealer && userIndex === 0) {
            return score;
        }
    
        //If a player has busted, attempt to reduce score if they have aces.
        let aceCount = users[userIndex].filter((card) => card.rank === 'A').length;
        while (score >= bustAmount && aceCount > 0) {
            aceCount--;
            score-=10;
        }
        return score;
    }

/**
 * Gets end stats for current game.  Returns the winner and scores.
 * For a new game, create a new Blackjack object.
 * @typedef {object} endStats
 * @property {number[]} scores - array of user scores.
 * @property {number} winnerIndex - index of the winning user.
 * @property {boolean} isTied - true if there's a tie.
 * @property {number[]} tiedUsers - array of user indexes who have tied.
 * @property {boolean} isDealerDefaultWin - If the dealer won by default for all players busting.
 * 
 * @returns {endStats}
 */
endStats (params) {
    let {users, hasDealer} = params;
    let scores = users.map((_undefined, i) => getUserScore({...params, userIndex: i}));

    let isTied = false;
    let isDealerDefaultWin = false;
    let tiedUsers = [];
    let winnerIndex = -1;
    let winnerScore = 0;

    scores.forEach((score, index) => {
        //If this score isn't a bust and is the highest, then make this the winner and reset possible ties.
        if (score < bustAmount && score > winnerScore) {
            winnerIndex = index;
            isTied = false;
            tiedUsers = [];
        }

        //If this score is the equal to the winning score, then this is a tie.  Reset winner.
        if (score < bustAmount && score === winnerScore) {
            winnerIndex = -1;
            if (tiedUsers.length === 0) {
                tiedUsers.push(winnerIndex);
            }
            tiedUsers.push(index);
        }
    });

    //Dealer wins by default if dealer and all players bust.
    if (scores.every((score) => score >= bustAmount) && hasDealer) {
        winnerIndex = 0;
        winnerScore = scores[0];
        isDealerDefaultWin = true;
    }

    return {scores, winnerIndex, isTied, tiedUsers, isDealerDefaultWin};
    }
} 

