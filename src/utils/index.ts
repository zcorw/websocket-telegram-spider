import { Buffer } from "buffer";

function bufferParse(type: number, buf: Buffer): MessageData {
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
  encodeParameter(data?: { [key: string]: any }): string {
    if (data === undefined) {
      return "";
    }
    const keys = Object.keys(data);
    const params = keys
      .reduce<string[]>((res, key) => {
        return res.concat([`${key}=${encodeURIComponent(data[key])}`]);
      }, [])
      .join("&");
    return `?${params}`;
  },
  decodeParameter(url: string): { [key: string]: string } {
    const reg = url.match(/\?.+$/g);
    if (reg === null) {
      return {};
    }
    const params = reg[0];
    return params
      .replace("?", "")
      .split("&")
      .reduce<{ [key: string]: string }>((res, data) => {
        const [key, value] = data.split("=");
        return {
          ...res,
          [key]: decodeURIComponent(value),
        };
      }, {});
  },
  debounce(fn: (...params: any[]) => void, delay: number) {
    let timer: NodeJS.Timeout; // 维护一个 timer
    return function (...params: any[]) {
      let _this = this; // 取debounce执行作用域的this
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        fn.apply(_this, params); // 用apply指向调用debounce的对象，相当于_this.fn(args);
      }, delay);
    };
  },
};
