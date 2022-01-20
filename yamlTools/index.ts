import YAML from "yaml";
import fs from "fs";

export default {
  parse(filePath: string): any {
    const targetYml = fs.readFileSync(filePath, "utf8");
    const targetConf = YAML.parse(targetYml);
    return targetConf;
  },
  write(value: any, filePath: string) {
    const yamlStr = YAML.stringify(value);
    fs.writeFileSync(filePath, yamlStr);
  },
};
