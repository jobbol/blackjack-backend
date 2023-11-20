import Game from '../../game/blackjack.mjs';

const usersPerRoom = 2;

export default function ({app, global}) {
    app.patch('/room/join/:join', (req, res) => {

        if (!req.body?.userID) {
            res.status(400).json({error: 'Missing userID from body. Obtain userID from /login'});
            return;
        }

        if (!room.users.some(user => user === req.body.userID)) {
            res.status(400).json({
                error: 'Couldn\'t find that userID logged in anymore or login was incorrect.'
                + '  Relogin with /login'
            });
            return;
        }

        const room = global.rooms.find(room => room.id === req.roomID);

        if (!room) {
            const error = errorPublic = `Couldn\'t find room with ID of ${roomID}`;
            res.status(400).json({error, errorPublic});
            return;
        }

        if (room.users.length >= usersPerRoom) {
            const error = errorPublic = 'That room is full.';
            res.status(400).json({error, errorPublic});
            return;
        }

        room.users.push(res.userID);

        if (room.users.length === usersPerRoom) {
            global.events.emit('start-room', room.id);
        }

        res.json({roomID: room.id});
    });

}