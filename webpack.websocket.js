const baseConf = require("./webpack.base");
module.exports = {
  mode: "development",
  entry: {
    client: "./src/client.ts",
    server: "./src/server.ts",
  },
  output: {
    path: require("path").join(__dirname, "dist"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    clean: true,
  },
  ...baseConf,
};
