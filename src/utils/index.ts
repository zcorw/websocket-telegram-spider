import { Buffer } from "buffer";

type BufferBody =
  | { type: "buffer"; data: Buffer }
  | { type: "string"; data: string }
  | { type: "json"; data: any };

function bufferParse(type: number, buf: Buffer): BufferBody {
  switch (type) {
    case 1:
      return { type: "buffer", data: buf };
    case 2:
      return { type: "string", data: buf.toString() };
    case 3:
      try {
        return { type: "json", data: JSON.parse(buf.toString()) };
      } catch (e) {
        return { type: "json", data: {} };
      }
    default:
      return { type: "buffer", data: buf };
  }
}

export default {
  sum(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0);
  },
  bufferParse,
};
