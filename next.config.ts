import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
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
  // Machine-readable views of the CV for crawlers and language models (pages/api).
  rewrites: async () => [
    { source: '/sitemap.xml', destination: '/api/sitemap' },
    { source: '/llms.txt', destination: '/api/llms' },
    { source: '/llms-full.txt', destination: '/api/llms?full=1' }
  ],
  env: {
    BUILD_DATE: new Date().toISOString().slice(0, 10),
    // Versions the og:image URL by content: link previews (LinkedIn, Slack, …) cache the card per URL,
    // so a regenerated card needs a new one to be fetched again.
    OG_VERSION: createHash('sha256').update(readFileSync('public/og.png')).digest('hex').slice(0, 10),
    HOSTNAME: process.env.HOSTNAME,
    OCULAR_URL: process.env.OCULAR_URL
  }
};

export default withSerwist(nextConfig);
