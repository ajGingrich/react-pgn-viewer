const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './examples/index.js'
    ],
    output: {
        path: path.join(__dirname, 'examples/dist'),
        filename: 'bundle.js'
    },
    resolve: {
      alias: {
        'Components': path.join(__dirname, 'examples/components'),
      },
      extensions: ['.js', '.json'],
      modules: [path.join(__dirname, 'examples/'), 'node_modules']
    },
    module: {
        rules: [
            { test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /node_modules/ },
            { test: /\.css$/, loaders: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }] },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: 'examples/index.template.ejs',
          filename: '../index.html'
      }),
    ],
    mode: 'development'
};
