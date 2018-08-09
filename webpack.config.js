const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack'); 

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.tsx',
  },

  output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      pathinfo: false,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    symlinks: false,
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'awesome-typescript-loader' },
        ],
        include: path.resolve(__dirname, 'src'),
      },

      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      
      {
        test: /\.css$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
        ],
      },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    hot: true,
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};