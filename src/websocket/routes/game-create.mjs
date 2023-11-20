export const type = 'route';
export const name = 'create';

let nextRoomID = 0;

/** Creates a new game for the client */
export const execute = function ({clientID, server, ws, reply}) {
    reply();
}
