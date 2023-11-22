import { Server } from 'socket.io';
import { createServer } from 'node:http';

import blackjackWebSocket from './blackjack-websocket.mjs';
import configGet from '../utils/config-get.mjs';
const { socketPort } = configGet("./config/server.json", {socketPort: 8102});

export default function (params) {
  const {global, expressApp} = params;

  const server = createServer(expressApp);
  const io = new Server(server);


  io.on('connection', (socket) => {
    console.log('a user connected');
  });
  
  server.listen(socketPort, () => {
    console.log(`server running at http://localhost:${socketPort}`);
  });

  params.socketApp = io;
}