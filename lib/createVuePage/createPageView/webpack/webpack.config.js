/**
 * webpack打包基础配置
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
// const CopyPlugin = require('copy-webpack-plugin');
console.log(path.resolve("./node_modules/vue/dist/vue.js"));
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    filename: 'js/[name].js',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        include: path.resolve('src'),
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              exclude: /node_modules/,
              // cacheDirectory: true // 开启缓存
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader'
          },
          'sass-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 10
          }
        }
        // use: [
        //   {
        //     loader: 'url-loader', // 压缩图片为base64格式
        //     options: {
        //       limit: 1024 * 100,
        //       fallback: {
        //         loader: 'file-loader',
        //         options: {
        //           name: 'image/[folder]/[name].[hash:8].[ext]'
        //         }
        //       }
        //     }
        //   }
        // ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|)$/i,
        type: 'asset'
      },
      {
        test: /\.vue$/i,
        use: {
          loader: 'vue-loader'
        }
      }
    ]
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 9999, // 端口号
    https: false, // https:{type:Boolean}
    proxy: {
      // '/expertfee': {
      //   changeOrigin: true,
      //   target: webpackConfig.VUE_APP_API_TARGET,
      //   pathRewrite: {
      //     '/expertfee': '/expertfee'
      //   }
      // }
    }
    // open: {
    //   target: 'http://localhost:8090/'
    // }  配置自动启动浏览器
  },
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENV_NODE': JSON.stringify(process.env.ENV_NODE)
    }),
    // dist文件目录清理
    new CleanWebpackPlugin(),
    // 优化命令行
    new FriendlyErrorsWebpackPlugin(),
    // html
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: '自动生成页面'
    }),
    // 公用资源
    // new CopyPlugin({
    //   patterns: [{ from: path.resolve(__dirname, '../static'), to: 'static' }]
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name][contenthash:8].css'
    }),
    new VueLoaderPlugin(),
    new webpack.ContextReplacementPlugin(/\/src/)
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [path.resolve('node_modules')],
    alias: {
      // '@vue': path.resolve('./node_modules/vue/dist/vue.esm.js'),
      // '@vue': path.resolve('./node_modules/vue/dist/vue.js'),
      '@': path.resolve('src'),
      '@api': path.resolve('src/http/api/index.js'),
      '@utils': path.resolve('src/utils')
    },

    exportsFields: [],
    mainFields: ['main']
  },
  // performance: {
    // hints: false
    // maxAssetSize: 512000
  // },
  // stats: 'errors-only'
};
