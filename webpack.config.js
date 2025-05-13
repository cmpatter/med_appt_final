// Import necessary modules
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Export Webpack configuration
module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output filename
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Rule for JS files
        exclude: /node_modules/, // Exclude node_modules
        use: 'babel-loader', // Use Babel loader
      },
      {
        test: /\.css$/, // Rule for CSS files
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Use CSS loaders
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin(), // Minify JS
    new MiniCssExtractPlugin({ filename: 'styles.css' }), // Extract CSS
  ],
};
