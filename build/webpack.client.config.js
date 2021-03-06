const webpack = require('webpack');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const base = require('./webpack.base.config');

const config = merge(base, {
    entry: {
        app: './src/entry-client.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"',
        }),
        new VueSSRClientPlugin(),
    ],
});

module.exports = config;
