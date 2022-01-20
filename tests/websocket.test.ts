import "module-alias/register";
import fs from "fs";
import path from "path";
import { create, parse } from "@/utils/buffer";

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
});
