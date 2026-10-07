import type { NextApiRequest, NextApiResponse } from 'next';
import { llmsFullTxt, llmsTxt } from '../../lib/cv-markdown';

// Served at /llms.txt and /llms-full.txt (see rewrites in next.config.ts).
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  res.setHeader('X-Robots-Tag', 'noindex');
  res.send(req.query.full ? llmsFullTxt() : llmsTxt());
}
