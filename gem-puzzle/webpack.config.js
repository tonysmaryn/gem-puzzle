const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const jsLoader = () => {
  if (isDev) return 'eslint-loader';
  return false;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './js/index.js',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 5555,
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options:
              { publicPath: '/public/pass/to' },
          },
          'css-loader',
          'sass-loader'],
      },
      {
        test: /\.js$/,
        use: jsLoader(),
      },
    ],
  },
};
