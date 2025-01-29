import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
      webpackConfig: {
        mode: 'development',
        devtool: 'eval-source-map',
        module: {
          rules: [
            {
              test: /\.mjs$/,
              include: /node_modules/,
              type: 'javascript/auto', 
            },
            {
              test: /\.(js|jsx|mjs|ts|tsx)$/,
              exclude: /node_modules\/(?!react-icons|@babel\/runtime)/, 
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-env', 
                    '@babel/preset-react', 
                    '@babel/preset-typescript', 
                  ],
                  plugins: [
                    '@babel/plugin-transform-runtime', 
                    '@babel/plugin-transform-modules-commonjs', 
                  ],
                },
              },
            },
          ],
        },
        resolve: {
          extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'], 
          mainFields: ['browser', 'main', 'module'], 
        },
        stats: {
          errorDetails: true, 
        },
      },
    },
    specPattern: '**/*.cy.{js,jsx,ts,tsx}', 
  },
  defaultCommandTimeout: 10000, 
  requestTimeout: 10000, 
  video: false, 
  screenshotOnRunFailure: false, 
});
