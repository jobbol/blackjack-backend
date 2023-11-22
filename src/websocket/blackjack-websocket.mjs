import Blackjack from '../game/blackjack.mjs';


export default function gameStartListener ({global, ws}) {
    global.events.on('game-start', (roomID) => {
        const room = global.rooms.find(room => room.id === roomID);

        if (!room) {
            throw new Error('Could not find room with that ID.');
        }

        wss.emit();
    });
}

class BlackjackWebSocket extends Blackjack {
    constructor ({get} = {}) {
        super({get});
    }
}