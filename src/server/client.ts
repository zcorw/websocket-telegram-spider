import short from 'short-uuid';
import WebSocket from 'ws';
const translator = short();

let clients: { [key: string]: Client } = {};

export default class Client {
  times: number;
  pid: string;
  clientId: string;
  client: WebSocket;
  tid: NodeJS.Timeout;
  constructor(ws: WebSocket) {
    this.times = 0;
    this.pid = null;
    this.clientId = translator.new();
    this.client = ws;
    this.tid = null;
    clients[this.clientId] = this;
  }
  start() {
    this.ping();
  }
  ping() {
    if (this.pid) {
      if (this.times > 9) {
        throw new Error('ping超时');
      } else {
        this.times++;
      }
    } else {
      this.pid = translator.new();
      this.times = 1;
    }
    this.client.ping(this.pid);
    this.tid = setTimeout(() => this.ping(), 10000);
  }
  clear() {
    this.pid = null;
    this.times = 0;
  }
}
module.exports = Client;