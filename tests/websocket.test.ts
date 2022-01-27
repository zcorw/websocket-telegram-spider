import fs from "fs";
import path from "path";
import { create, parse } from "@/utils/buffer";
import utils from "@/utils";

describe("将数据组装为buffer", () => {
  test("组装文件流", () => {
    const fileBuf = fs.readFileSync(path.join(__dirname, "./files/test"));
    const url = "/test";
    const buffer = create(url, fileBuf);
    const { url: _url, type, data } = parse(buffer);
    expect(_url).toBe(url);
    expect(type).toBe("buffer");
    expect(fileBuf.equals(data)).toBeTruthy();
  });
  test("编码消息参数", () => {
    const params = {
      name: "哈哈哈",
      newwindow: 1,
    };
    expect(utils.encodeParameter(params)).toBe(
      "?name=%E5%93%88%E5%93%88%E5%93%88&newwindow=1",
    );
  });
  test("解码消息参数", () => {
    expect(
      utils.decodeParameter(
        "/search?name=%E5%93%88%E5%93%88%E5%93%88&newwindow=1",
      ),
    ).toEqual({
      name: "哈哈哈",
      newwindow: "1",
    });
  });
});
