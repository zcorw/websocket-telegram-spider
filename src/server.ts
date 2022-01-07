import { WebSocketServer } from "ws";
import Client from '@/server/client';
import {Buffer} from 'buffer';
import {parse} from '@/utils/buffer';

const wss = new WebSocketServer({
  port: 3000,
});

wss.on('connection', (ws) => {
  ws.on('message', (data, isBinary) => {
    if (Buffer.isBuffer(data)) {
      const body = parse(data);
      
    }
  })
  const client = new Client(ws);
  client.start();
  ws.on('pong', (data) => {
    client.clear();
  });
  ws.on('close', () => {
    console.log('close');
  });
  ws.on('error', () => {
    console.log('error')
  })
})