const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public", "js"),
    filename: "index.js",
  },
  devtool: "eval-cheap-source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              {
                plugins: [
                  "@babel/plugin-transform-runtime",
                  "@babel/plugin-proposal-class-properties",
                ],
              },
            ],
          },
        },
      },
    ],
  },
};
