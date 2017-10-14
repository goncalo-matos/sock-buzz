const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        path.resolve(__dirname, './src/index.tsx')
    ],
    output: {
      filename: 'dist.js',
      path: path.resolve(__dirname, './dist')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [
                { loader: 'react-hot-loader/webpack' },
                { loader: 'ts-loader' }
            ]
        }, {
            test: /\.html?$/,
            use: [{ loader: 'html-loader' }]
        }, {
            test: /\.scss$/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader', options: { modules: true, namedExport: true } },
                { loader: 'sass-loader' }
            ]
        },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Sock-Buzz',
            template: path.resolve(__dirname, './src/index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 9192,
        compress: true,
        historyApiFallback: true,
        hot: true
    }
  }