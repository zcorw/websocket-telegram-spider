import schedule from "node-schedule";
import dotenv from "dotenv";
import torrentDownload from "./crontab/torrent";

dotenv.config();

schedule.scheduleJob("0 15 * * * *", function () {
  torrentDownload();
});
