import Blackjack from '../game/blackjack.mjs';


export default function gameStartListener ({global, ws}) {
    global.events.on('game-start', (gameID) => {
        const game = global.games.find(game => game.id === gameID);

        if (!game) {
            throw new Error('Could not find game with that ID.');
        }

        wss.emit();
    });
}

class BlackjackWebSocket extends Blackjack {
    constructor ({get} = {}) {
        super({get});
    }
}