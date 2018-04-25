const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './examples/src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'examples/src/dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
      alias: {
        'Components': path.join(__dirname, 'examples/src/components'),
      },
      extensions: ['.js', '.json'],
      modules: [path.join(__dirname, 'examples/src/'), 'node_modules']
    },
    module: {
        rules: [
            { test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /node_modules/ },
            { test: /\.css$/, loaders: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }] },
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
          template: 'examples/src/index.template.ejs',
          filename: '../index.html'
      }),
    ],
    mode: 'development'
};
