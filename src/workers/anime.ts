import { Worker } from "worker_threads";
import path from "path";
import downloadEvent from "@/events/download";
import processor from "@/workerProcessor/anime";
import { sendFile } from "@/sender";

let anime;
export default function init() {
  const anime = new Worker(path.join(__dirname, "../spider/crontab.js"));
  anime.on("message", (data: AnimeWorkerMessage) => {
    processor(data);
  });
  downloadEvent.on("torrent", (value) => {
    sendFile("torrent", value);
  });
}
