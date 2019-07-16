const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const mockerApi = require("mocker-api");
module.exports = env => {
  const mock = env && env.mock;

  return {
    entry: "./index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    devServer: {
      open: true,
      port: 9000,
      before: app => {
        mock
          ? mockerApi(app, path.resolve("./mocker/index.js"), {
              proxy: {
                "/api": "localhost:9000"
              }
            })
          : "";
      }
      // proxy: {
      //     "/api": {
      //         target: "http://localhost:3009",
      //         pathRewrite: {
      //             "^/api": ''
      //         }
      //     }
      // }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader"
        },
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader", {loader: "less-loader", options: {javascriptEnabled: true}}]
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html"
      })
    ]
  };
};
