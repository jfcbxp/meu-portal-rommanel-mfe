const { DefinePlugin } = require('webpack');

module.exports = {
  output: 'export',

  distDir: 'dist',
  reactStrictMode: true,

  cacheMaxMemorySize: 0,

  basePath: '/meu-portal-rommanel-mfe',

  images: {
    unoptimized: true,
  },

  generateBuildId: async () => {
    return new Date().getTime().toString();
  },

  webpack(config, options) {
    config.plugins.push(new DefinePlugin({ __IS_SERVER__: options.isServer }));
    return config;
  },
};
