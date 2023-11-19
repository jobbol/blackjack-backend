import { WebSocketServer } from 'ws';
import router from '../router.mjs';

const wss = new WebSocketServer({ port: 8080 });

let nextUserID = 0;

export default function ({server}) {
  wss.on('connection', function connection(ws) {
    const clientID = nextUserID++;
    ws.on('error', console.error);
  
    
    ws.on('message', function message(data) {
      router({server, wss, ws, data, clientID});
    });
  });
};