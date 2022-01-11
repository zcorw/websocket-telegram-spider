import YAML from "yaml";
import path from "path";
import fs from "fs";
const basePath = "@/../chatid.yml";
class ChatIdGroup {
  chatids: number[];
  constructor() {
    try {
      const targetYml = fs.readFileSync(basePath, "utf8");
      this.chatids = YAML.parse(targetYml);
    } catch (e) {
      this.chatids = [];
    }
  }
  push(id: number): boolean {
    if (!this.chatids.includes(id)) {
      this.chatids.push(id);
      const yamlStr = YAML.stringify(this.chatids);
      fs.writeFileSync(basePath, yamlStr);
      return true;
    }
    return false;
  }
  forEach(callback: (id: number, index: number) => void) {
    this.chatids.forEach(callback);
  }
}
const chatIds = new ChatIdGroup();
export default chatIds;
