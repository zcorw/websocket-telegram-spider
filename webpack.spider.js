const baseConf = require("./webpack.base");
module.exports = {
  mode: "development",
  entry: {
    crontab: "./spider/crontab.ts",
  },
  output: {
    path: require("path").join(__dirname, "dist/spider"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    clean: true,
  },
  ...baseConf,
};
