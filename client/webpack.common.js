const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/index.js']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      title: 'muxes dev blog',
      favicon: 'favicon.ico',
      template: 'src/index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // name: '[path][name].[ext]'
            }
          }
        ]
      }

      // {
      //   test: /\.(png|jpg)$/,
      //   loader: 'url-loader'
      // }
    ]
  }
};
