const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, '../static'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
    }
  },
  plugins: [
  ],
};
