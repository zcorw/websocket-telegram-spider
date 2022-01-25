const baseConf = require("./webpack.base");
module.exports = {
  mode: "development",
  entry: {
    anime: "./spider/anime.ts",
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
