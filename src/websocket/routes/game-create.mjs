export const type = 'route';
export const name = 'join';

let nextRoomID = 0;

/** Creates a new game for the client */
export const execute = function ({clientID, server, ws, reply}) {
    reply();
}
