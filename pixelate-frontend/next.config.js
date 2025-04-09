/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['babylonjs', 'babylonjs-loaders'],
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig;