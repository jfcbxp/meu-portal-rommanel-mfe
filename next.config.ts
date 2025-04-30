import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  output: 'standalone',

  distDir: 'dist',

  cacheMaxMemorySize: 0,
};

export default nextConfig;
