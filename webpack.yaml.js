const baseConf = require("./webpack.base");
module.exports = {
  mode: "development",
  entry: {
    anime: "./yamlTools/anime.ts",
  },
  output: {
    path: require("path").join(__dirname, "dist/yaml"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    clean: true,
  },
  ...baseConf,
};
