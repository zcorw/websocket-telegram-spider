import WebSocket from "ws";
import { create, parse } from "@/utils/buffer";
import { saveFile } from "@download/utils";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

function start() {
  const ws = new WebSocket("ws://127.0.0.1:3000", { perMessageDeflate: false });
  ws.on("open", () => {
    console.log("open");
  });

  ws.on("message", function message(data) {
    if (Buffer.isBuffer(data)) {
      const message = parse(data);
      saveFile(
        message.data,
        path.join(process.env.ROOT_PATH, "_files", message.params.path),
        message.params.file,
      );
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
