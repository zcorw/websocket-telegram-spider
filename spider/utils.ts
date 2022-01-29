import { CrawlerRequestResponse, Headers } from "crawler";
import { Url } from "url";

export default {
  getFilename(headers: Headers, url: Url) {
    const _filename = url.pathname.match(/[^\/]+$/)[0];
    let filename: string;
    try {
      let match = headers["content-disposition"].match(/filename="([^"]+)"/);
      if (match && match[1]) {
        filename = decodeURIComponent(match[1]);
      } else {
        filename = _filename;
      }
    } catch (e) {
      console.error(
        `content-disposition is ${headers["content-disposition"]}, url is ${url.href}`,
      );
      filename = _filename;
    }
    return filename;
  },
  toEqual(reponse: CrawlerRequestResponse) {
    return reponse.body.length === +reponse.headers["content-length"];
  },
};
