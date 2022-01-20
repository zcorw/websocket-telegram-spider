import { init } from "@yaml/anime";
import path from "path";
import fs from "fs";
import yaml from "@yaml/index";

const originalList: AnimeItem[] = [
  { name: "Title1", group: "Group1", id: "5454315" },
  { name: "Title2", group: "Group2", id: null },
];

describe("测试爬虫配置", () => {
  const config = init(path.join(__dirname, "./config/target.yml"));
  test("爬虫入口", () => {
    expect(config.url).toBe("https://www.xxx.com/index.htm");
  });
  test("待爬对象", () => {
    config.forEach((item, index) => {
      expect(item).toEqual(originalList[index]);
    });
  });
  test("修改id", () => {
    const contrast = yaml.parse(
      path.join(__dirname, "./config/target-test.yml"),
    );
    config.updateId("1235648", 0);
    const target = yaml.parse(path.join(__dirname, "./config/target.yml"));
    expect(contrast).toEqual(target);
    config.updateId(originalList[0].id, 0);
  });
});
