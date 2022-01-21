declare module "aria2" {
  import { EventEmitter } from "events";
  import ws from "ws";
  import nodefetch from "node-fetch";
  class JSONRPCClient extends EventEmitter {
    constructor(options: JSONRPCClientOptions);
    id(): number;
    url(protocol: string): string;
    websocket(message: { [key: string]: any }): Promise<void>;
    http(message: { [key: string]: any }): Promise<void>;
    batch(calls: [Aria2Methods, any][]): Promise<any>[];
    call(method: Aria2Methods, params: any): Promise<any>;
    open(): Promise<any>;
    close(): Promise<any>;
  }
  class Aria2 extends JSONRPCClient {
    constructor(options: JSONRPCClientOptions);
    call(method: Aria2Methods, ...params: any[]): Promise<any>;
    multicall(calls: [Aria2Methods, ...any[]][]): any[];
    batch(calls: [Aria2Methods, ...any[]][]): Promise<any>[];
    listNotifications(): Promise<string[]>;
    listMethods(): Promise<string[]>;
  }

  interface JSONRPCClientOptions {
    secure: boolean;
    host: string;
    port: number;
    secret: string;
    path: string;
    fetch: typeof nodefetch;
    WebSocket: typeof ws;
  }

  type Aria2Methods =
    | "addUri"
    | "addTorrent"
    | "addMetalink"
    | "remove"
    | "forceRemove"
    | "pause"
    | "pauseAll"
    | "unpause"
    | "tellStatus";

  export = Aria2;
}
