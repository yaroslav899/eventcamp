const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',

      options: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }, {
      test: /\.css$/,

      use: [ {
        loader: 'css-loader',

        options: {
          sourceMap: true
        }
      }]
    }]
  },

  plugins: [new UglifyJSPlugin()],
  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'bin')
  }
}
