import websocket from './websocket/websocket.mjs';
import rest from './rest/rest.mjs';
import EventEmitter from 'node:events';

const global = {
    rooms: [],
    users: [],
    events: new EventEmitter()
  };



rest({global});
websocket({global});