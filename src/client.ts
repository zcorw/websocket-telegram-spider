import WebSocket from "ws";
import { parse } from "@/utils/buffer";
import dotenv from "dotenv";
import clientProcessor from "@/mainProcessor/client";

dotenv.config();

function start() {
  const ws = new WebSocket("ws://127.0.0.1:3000", { perMessageDeflate: false });
  ws.on("open", () => {
    console.log("open");
  });

  ws.on("message", function message(data) {
    if (Buffer.isBuffer(data)) {
      clientProcessor(parse(data));
    }
  });

  ws.on("close", () => {
    console.log("close");
    setTimeout(start, 6000);
  });
  ws.on("error", () => {
    console.log("error");
  });
}
start();
