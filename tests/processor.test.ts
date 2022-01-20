import telegramEvent from "@/events/telegram";
import downloadEvent from "@/events/download";
import animeProcessor from "@/workerProcessor/anime";
import path from "path";

describe("主线程监听anime线程测试", () => {
  test("更新消息推送", (done) => {
    const message = "更新啦";
    telegramEvent.on("updated", (value) => {
      try {
        expect(value).toBe(message);
        done();
      } catch (e) {
        done(e);
      }
    });
    animeProcessor({
      type: "updated",
      value: message,
    });
  });
  test("torrent下载", (done) => {
    const filePath = path.join(__dirname, "./files/test");
    downloadEvent.on("torrent", (value) => {
      try {
        expect(value).toBe(filePath);
        done();
      } catch (e) {
        done(e);
      }
    });
    animeProcessor({
      type: "torrent",
      value: filePath,
    });
  });
});
