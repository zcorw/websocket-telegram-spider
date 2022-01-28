import { WebSocketServer } from "ws";
import Client from "@/server/client";
import { Buffer } from "buffer";
import { parse } from "@/utils/buffer";
import dotenv from "dotenv";
import animeInit from "@/workers/anime";

dotenv.config();

const wss = new WebSocketServer({
  port: +process.env.SERVER_POST,
});

wss.on("connection", (ws) => {
  console.log("a client enter");
  ws.on("message", (data, isBinary) => {
    if (Buffer.isBuffer(data)) {
      const body = parse(data);
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
animeInit();
