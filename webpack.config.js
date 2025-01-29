/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

module.exports = {
  mode: 'development', // Set mode to development for better debugging
  target: 'browserslist', // Ensure modern browser compatibility
  devtool: 'eval-source-map', // Good for debugging in development mode
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto', // Automatically handle .mjs files
      },
      {
        test: /\.(js|jsx|mjs|ts|tsx)$/,
        exclude: /node_modules\/(?!react-icons|@babel\/runtime)/, // Transpile react-icons and babel-runtime correctly
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', // For modern JavaScript
              '@babel/preset-react', // For React JSX
              '@babel/preset-typescript', // For TypeScript support
            ],
            plugins: [
              '@babel/plugin-transform-runtime', // To help with helper functions and polyfills
              '@babel/plugin-transform-modules-commonjs', // Ensures CommonJS compatibility for ES modules
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'], // Resolve these file extensions
    mainFields: ['browser', 'main', 'module'], // Ensure proper resolution of module files
  },
  stats: {
    errorDetails: true, // Show detailed error information in the console
  },
  output: {
    filename: '[name].bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Define output path
    clean: true, // Clean output directory before each build
  },
};
