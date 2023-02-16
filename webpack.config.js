const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/tree.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};