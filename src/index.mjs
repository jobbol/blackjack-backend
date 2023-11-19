import websocket from './websocket/websocket.mjs';
import rest from './rest/rest.mjs';

const global = {
    games: [],
    users: []
  };


websocket({global});
rest({global});