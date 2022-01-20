import yaml from "@yaml/index";

class YamlConf {
  config: AnimeConfig;
  path: string;
  constructor(filePath: string) {
    this.config = yaml.parse(filePath);
    this.path = filePath;
  }
  get host(): string {
    return this.config.host;
  }
  get url(): string {
    return this.config.host + this.config.url;
  }
  forEach(callback: (item: AnimeItem, i: number) => void) {
    this.config.list.forEach(callback);
  }
  push(item: AnimeItem) {
    this.config.list.push(item);
    this.save();
  }
  updateId(id: string, index: number) {
    if (this.config.list[index]) {
      this.config.list[index].id = id;
      this.save();
    } else {
      throw new Error("指定错误的序号" + index);
    }
  }
  save() {
    yaml.write(this.config, this.path);
  }
}

export function init(filePath: string) {
  return new YamlConf(filePath);
}
