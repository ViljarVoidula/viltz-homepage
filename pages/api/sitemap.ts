import type { NextApiRequest, NextApiResponse } from 'next';
import { profile } from '../../lib/cv';

// Served at /sitemap.xml (see rewrites in next.config.ts). The CV is a single page, rebuilt on every content change.
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${profile.url}</loc>
    <lastmod>${process.env.BUILD_DATE}</lastmod>
    <image:image><image:loc>${profile.url}images/viljar.jpg</image:loc></image:image>
  </url>
</urlset>
`);
}
