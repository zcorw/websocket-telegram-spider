module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": require("path").join(__dirname, "src"),
      "@yaml": require("path").join(__dirname, "yamlTools"),
      "@download": require("path").join(__dirname, "download"),
      "@file": require("path").join(__dirname, "files"),
      "@config": require("path").join(__dirname, "config"),
    },
  },
  node: {
    global: true,
  },
  target: "node",
};
