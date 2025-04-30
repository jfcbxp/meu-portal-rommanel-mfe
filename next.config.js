const { DefinePlugin } = require('webpack');

module.exports = {
  output: 'standalone',

  distDir: 'dist',

  cacheMaxMemorySize: 0,

  webpack(config, options) {
    config.plugins.push(new DefinePlugin({ __IS_SERVER__: options.isServer }));
    return config;
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};
