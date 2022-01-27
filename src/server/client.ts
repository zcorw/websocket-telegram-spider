import short from "short-uuid";
import WebSocket from "ws";
import { create } from "@/utils/buffer";
import utils from "@/utils";
const translator = short();

let _clients: { [key: string]: Client } = {};

export const clients = {
  async send(url: string, data: any, params?: { [key: string]: any }) {
    const success: Client[] = [];
    const fail: Client[] = [];
    await Promise.all(
      Object.values(_clients).map((client) => {
        return new Promise<void>((resolve) => {
          client
            .send(url + utils.encodeParameter(params), data)
            .then(() => success.push(client))
            .catch(() => fail.push(client))
            .finally(() => resolve());
        });
      }),
    );
    return {
      success,
      fail,
    };
  },
  clear() {
    Object.values(_clients).forEach((client) => {
      client.close();
    });
    _clients = {};
  },
  get length() {
    return _clients.length;
  },
};

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
    _clients[this.clientId] = this;
  }
  start() {
    this.ping();
  }
  ping() {
    if (this.pid) {
      if (this.times > 9) {
        throw new Error("ping超时");
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
  send(url: string, data: any) {
    const promise = new Promise<void>((resolve, reject) => {
      this.client.send(create(url, data), (e) => {
        if (e) {
          reject(e);
        } else {
          resolve();
        }
      });
    });
    return promise;
  }
  close() {
    _clients[this.clientId] = null;
    clearTimeout(this.tid);
  }
}
