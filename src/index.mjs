import { WebSocketServer } from 'ws';
import router from './router.mjs';

const wss = new WebSocketServer({ port: 8080 });
const server = {
  games: [],
  clients: []
};

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    router({server, wss, ws, data});
  });
});