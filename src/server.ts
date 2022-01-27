import { WebSocketServer } from "ws";
import Client, { clients } from "@/server/client";
import { Buffer } from "buffer";
import { parse } from "@/utils/buffer";
import dotenv from "dotenv";
import { Worker } from "worker_threads";
import path from "path";
import downloadEvent from "@/events/download";
import processor from "@/workerProcessor/anime";
import fs from "fs";

dotenv.config();

const wss = new WebSocketServer({
  port: 3000,
});

wss.on("connection", (ws) => {
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

const anime = new Worker(path.join(__dirname, "../spider/crontab.js"));
anime.on("message", (data: AnimeWorkerMessage) => {
  processor(data);
});
downloadEvent.on("torrent", (value) => {
  const search = path
    .normalize(value)
    .replace(path.join(process.env.ROOT_PATH, "files"), "");
  const [_searchm, pathname, filename] = search.match(/(.+)[\/\\](.+)$/);
  clients.send("torrent", fs.readFileSync(value), {
    path: pathname,
    file: filename,
  });
});
