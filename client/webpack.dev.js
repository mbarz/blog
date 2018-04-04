const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port: 9000,
    proxy: {
      "/api": "http://localhost:8080"
    },
    historyApiFallback: true
  },
  mode: "development"
});
