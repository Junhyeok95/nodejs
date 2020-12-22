const path = require("path");

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
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // plugins: [],
  // optimization: {},
  resolve: {
    extensions: ["js", "json", "jsx", "css"],
  },
};
