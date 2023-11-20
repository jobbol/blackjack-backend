import generateID from '../../utils/generate-id.mjs';

/**
 * Create a new user and return the ID back to the client.
 * If ID is provided, will create the user with that ID. (Recommended.)
 * If no ID is provided, will generate an ID to return to the user. (Fallback.)
 * 
 */
export default function ({app, global}) {
    app.post('/login', (req, res) => {

        let userID = req.body?.userID;
        let isGenerated = false;

        if (!userID) {
            userID = generateID(global);
            isGenerated = true;
        }

        global.users.push({id: userID});
        res.json({userID, isGenerated});
    });
}