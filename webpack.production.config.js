process.env.NODE_ENV = 'production';
var path = require('path');

module.exports = {
    entry: [
        './src/index.js'
    ],
    context: __dirname + path.sep + 'src',
    output: {
        path: path.resolve(__dirname, './bin'),
        filename: 'index.js'
    },
    devServer: {
        port: 3333
    },
    module: {
        loaders: [
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loader: "style!css"
            }
        ]
    }
};