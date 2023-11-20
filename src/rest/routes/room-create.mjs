import generateID from '../../utils/generate-id.mjs';

export default function ({app, global}) {
    app.post('/room', (req, res) => {

        if (!req.body?.userID) {
            res.status(400).json({error: 'Missing userID from body. Obtain userID from /login'});
        }

        if (!room.users.some(user => user === req.body.userID)) {
            res.status(400).json({
                error: 'Couldn\'t find that userID logged in anymore or login was incorrect.'
                + '  Relogin with /login'
            });
        }

        let room = {
            id: generateID(global),
            users: [res.users]
        };
        global.room.push(room);

        res.json({roomID: room.id});
    });

}