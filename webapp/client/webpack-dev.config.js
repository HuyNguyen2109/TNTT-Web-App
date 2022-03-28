const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const port = process.env.PORT || 3000;

module.exports = function(_env, argv) {
  // Webpack configuration goes here
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;
  
  return {
    mode: argv.mode,
    target: 'web',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'public/dist/'),
      filename: 'assets/js/[name].[fullhash].js',
      publicPath: '/'
    },
    devtool: isDevelopment && 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development",
            }
          }
        },
        {
          test: /\.(s(a|c)ss)$/,
          use: [
            {loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'},
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                modules: {
                  mode: isDevelopment ? 'local' : 'global',
                  auto: true,
                  exportGlobals: true,
                  localIdentName: isDevelopment ? "[local]":"[hash:base64:5]",
                },														
                sourceMap: isDevelopment
              } 
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        { 
          test: /\.txt$/, 
          use: ['raw-loader'] 
        },
        {
          test: /\.(jpe?g|gif|png|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: "static/media/[name].[hash:8].[ext]"
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"]
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          loader: require.resolve("file-loader"),
          options: {
            name: "static/media/[name].[hash:8].[ext]"
          }
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        "src": path.resolve(__dirname, "src"),
        "public": path.resolve(__dirname, "public"),
        "components": path.resolve(__dirname, "src/components"),
        "helpers": path.resolve(__dirname, "src/helpers"),
        "layout": path.resolve(__dirname, "src/layout"),
        "pages": path.resolve(__dirname, "src/pages"),
        "store": path.resolve(__dirname, "src/store"),
        "react-dom": "@hot-loader/react-dom",
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        favicon: path.resolve(__dirname, 'public/logo192.png'),
        manifest: "./public/manifest.json",
        inject: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(
            isProduction ? "production" : "development"
          )
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "assets/css/[name].[contenthash:8].css",
          chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
        })   
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false
            },
            mangle: {
              safari10: true
            },
            output: {
              comments: false,
              ascii_only: true,
            },
            warnings: false,
          }
        }),
        new OptimizeCssAssetsPlugin()
      ],
      splitChunks: {
        chunks: "all",
        minSize: 0,
        maxInitialRequests: 20,
        maxAsyncRequests: 20,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `${cacheGroupKey}.${packageName.replace("@", "")}`;
            }
          },
          common: {
            minChunks: 2,
            priority: -10
          }
        }
      },
      runtimeChunk: "single"
    },
    devServer: {
      host: 'localhost',
      port: port,
      historyApiFallback: true,
      compress: true,
      open: false,
    }
  }
}; 
