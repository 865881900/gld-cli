const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: {
    index: './dist/bin/index.js',
    'index.min': './dist/bin/index.js',
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    function () {

    },
    // 优化命令行
    new FriendlyErrorsWebpackPlugin(),
  ],
  resolve: {
    // changed from extensions: [".js", ".jsx"]
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  // 4: umd
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
    library: 'apiCache',

  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /min\.js$/,
        extractComments: false // 不将注释提取到单独的文件中
      }),
    ],
  },

  stats: 'errors-only',
};

