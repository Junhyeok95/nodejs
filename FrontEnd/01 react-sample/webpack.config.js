const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: "development", // 웹팩4 에서 추가
  entry: "./src/js/app.js",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js",
    // publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env", "react"],
          },
        },
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
    ],
  },
  plugins: [new ExtractTextPlugin("../css/style.css")],
  // optimization: {},
  resolve: {
    extensions: [".js", ".jsx", ".css", ".json"],
  },
};
