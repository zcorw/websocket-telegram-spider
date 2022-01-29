import { readFileList } from "@download/utils";
import torrentDownload from "@download/crontab/torrent";
import path from "path";

describe("工具测试", () => {
  test("获取文件夹下所有文件", () => {
    const dirPath = path.join(__dirname, "files");
    const files = readFileList(dirPath);
    const result = [
      path.join(dirPath, "test"),
      path.join(dirPath, "test1"),
      path.join(dirPath, "test2"),
    ];
    expect(files).toEqual(result);
  });
});
