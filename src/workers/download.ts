import { Worker } from "worker_threads";
import path from "path";

export default function init() {
  new Worker(path.join(__dirname, "../download/crontab.js"));
}
