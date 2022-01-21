import { WebSocketServer } from "ws";
import Client from "@/server/client";
import { Buffer } from "buffer";
import { parse } from "@/utils/buffer";
import dotenv from "dotenv";
import { Worker } from "worker_threads";
import path from "path";

dotenv.config();

const wss = new WebSocketServer({
  port: 3000,
});

wss.on("connection", (ws) => {
  ws.on("message", (data, isBinary) => {
    if (Buffer.isBuffer(data)) {
      const body = parse(data);
      console.log("🚀 ~ file: server.ts ~ line 15 ~ ws.on ~ body", body);
    }
  });
  const client = new Client(ws);
  client.start();
  ws.on("pong", (data) => {
    client.clear();
  });
  ws.on("close", () => {
    console.log("close");
    client.close();
  });
  ws.on("error", () => {
    console.log("error");
  });
});

const anime = new Worker(path.join(__dirname, "../spider/worker/spider.js"));
