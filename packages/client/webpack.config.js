const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      filename: 'dist.js',
      path: path.resolve(__dirname, './dist')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.html?$/,
                use: [{ loader: 'html-loader' }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Sock-Buzz',
            template: path.resolve(__dirname, './src/index.html')
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 9192,
        compress: true,
        historyApiFallback: true
    }
  }