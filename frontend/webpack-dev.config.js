const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
  // Webpack configuration goes here
  mode: 'development',
  target: 'web',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'public/dist/'),
    filename: 'bundle.[fullhash].js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
         test: /\.(js|jsx)$/,
         exclude: /node_modules/,
         use: ['babel-loader']
      },
      {
         test: /\.(s(a|c)ss)$/,
         use: ['style-loader','css-loader', 'sass-loader']
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
              limit: 10000
            }
          }
        ]
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
      "react-dom": "@hot-loader/react-dom",
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
      manifest: "./public/manifest.json"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    })   
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true,
    hot: true,
  }
}; 
