const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
/**
 * entry : build file을 명시한다. ./src/index.js를 기준으로 import되어있는 모든 파일을 찾아 하나의 파일로 합치게 된다.
 * output : 웹팩에서 빌드를 완료하면 output에 명시되어 있는 정보를 통해 빌드 파일을 생성한다.
 * mode : 웹팩 빌드 옵션.
 * 1. production 최적화되어 빌드되어지는 특징을 가짐
 * 2. development는 빠르게 빌드하는 특징
 * 3. none  아무 기능 없이 웹팩으로 빌드한다.
 */
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname + "/dist"),
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve("./dist"),
    index: "index.html",
    port: 9000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style-test.css",
    }),
    new CleanWebpackPlugin(),
  ],
};
