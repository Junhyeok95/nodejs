const path = require("path");

const webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: {
    app: "./",
  },
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js",
    publicPath: "",
  },
  module: {},
  plugins: [],
  optimization: {},
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json", ".jsx", ".css"],
  },
};
