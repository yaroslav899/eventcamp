var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: [ './polyfill/index.js', './polyfill/fetch.js', './src/index.js'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    devServer: {
      historyApiFallback: true
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
              test: /\.css/,
              loaders: ['style-loader', 'css-loader'],
            }
        ]
    },
    node: {
      fs: "empty"
    }
}