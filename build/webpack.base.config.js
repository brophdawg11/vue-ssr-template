const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProd ? false : '#inline-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].js',
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, '../src'),
            '@dist': path.resolve(__dirname, '../dist'),
        },
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: '[name].[ext]?[hash]',
            },
        }],
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false,
    },
    plugins: [
        new FriendlyErrorsPlugin(),
    ],
};
