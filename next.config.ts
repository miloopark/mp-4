/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nrs.harvard.edu',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
