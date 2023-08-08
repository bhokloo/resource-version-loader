const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './index.ts', // Update the entry file to index.ts
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'resource-version-loader.min.js',
    library: 'ResourceVersionLoader',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Match TypeScript files
        exclude: /node_modules/,
        use: 'ts-loader', // Use ts-loader to handle TypeScript files
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // Add '.ts' to the list of file extensions
  },
};
