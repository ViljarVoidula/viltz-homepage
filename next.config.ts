import type { NextConfig } from 'next';
import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Serwist only hooks into webpack (used for production builds); dev runs on Turbopack with the SW disabled.
  turbopack: {},
  // The old portfolio pages now live as a section on the CV page.
  redirects: async () => [
    { source: '/work', destination: '/#projects', permanent: true },
    { source: '/work/:slug', destination: '/#projects', permanent: true }
  ],
  env: {
    HOSTNAME: process.env.HOSTNAME,
    OCULAR_URL: process.env.OCULAR_URL
  }
};

export default withSerwist(nextConfig);
