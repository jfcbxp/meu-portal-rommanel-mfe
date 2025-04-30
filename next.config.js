const { DefinePlugin } = require('webpack');

module.exports = {
  output: 'export',

  distDir: 'dist',
  reactStrictMode: true,

  cacheMaxMemorySize: 0,

  webpack(config, options) {
    config.plugins.push(new DefinePlugin({ __IS_SERVER__: options.isServer }));
    return config;
  },
};
