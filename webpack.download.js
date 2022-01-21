const baseConf = require("./webpack.base");
module.exports = {
  mode: "development",
  entry: {
    downloader: "./download/downloader.ts",
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
