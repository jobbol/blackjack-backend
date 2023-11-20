import { WebSocketServer } from 'ws';
import router from './ws-router.mjs';
import blackjackWebSocket from './blackjack-websocket.mjs';

const wss = new WebSocketServer({ port: 8080 });

export default function ({global}) {
  wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
  
    
    ws.on('message', function message(data) {
      router({global, wss, ws, data, clientID});
    });
  });

  blackjackWebSocket({global, wss});
};