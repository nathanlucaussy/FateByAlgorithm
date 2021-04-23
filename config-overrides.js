const {
  override,
  addDecoratorsLegacy,
  useBabelRc,
  addWebpackModuleRule,
} = require('customize-cra');

// Adds legacy decorator support to the Webpack configuration.
module.exports = override(
  addDecoratorsLegacy(),
  useBabelRc(),
  addWebpackModuleRule({
    test: /\.(js|tsx)$/,
    use: [
      { loader: 'babel-loader' },
      {
        loader: '@linaria/webpack-loader',
        options: {
          cacheDirectory: 'src/.linaria_cache',
          sourceMap: process.env.NODE_ENV !== 'production',
        },
      },
    ],
  }),
);
