import path from "path";
import { Worker } from "worker_threads";
import processor from "@/workerProcessor/anime";
import event from "@/events/anime";

let anime;
export default function init() {
  anime = new Worker(path.join(__dirname, "../spider/worker/spider.js"));
  anime.on("message", (value: AnimeWorkerMessage) => {
    processor(value);
  });
}
