export const type = 'route';
export const name = 'join';


/** Adds a client to a game */
export const execute = function ({gameID, server}) {
    const match = server.games.find(gameID);
    if (!match) {
        
    }

}
