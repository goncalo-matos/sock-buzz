const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      filename: 'dist.js',
      path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.html?$/,
                use: [
                    { loader: 'file-loader' },
                    { loader: 'extract-loader' },
                    { loader: 'html-loader' }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Sock-Buzz'
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 9192,
        compress: true
    }
  }