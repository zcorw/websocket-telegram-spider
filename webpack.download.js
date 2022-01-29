const baseConf = require("./webpack.base");
module.exports = {
  mode: "development",
  entry: {
    crontab: "./download/crontab.ts",
  },
  output: {
    path: require("path").join(__dirname, "dist/download"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    clean: true,
  },
  ...baseConf,
};
