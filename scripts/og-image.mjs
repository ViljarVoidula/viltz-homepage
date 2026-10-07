// Renders the social preview card (public/og.png, 1200×630) used for og:image and twitter:image.
// Run `yarn og` after changing the name, title or emblem, and commit the PNG.
import { readFile, writeFile } from 'node:fs/promises';
import { createElement as h } from 'react';
import { ImageResponse } from 'next/dist/compiled/@vercel/og/index.node.js';

const root = new URL('../', import.meta.url);
const deerPath = (await readFile(new URL('components/deer-path.ts', root), 'utf8')).match(/'(M[^']+)'/)[1];
const portrait = `data:image/jpeg;base64,${(await readFile(new URL('public/images/viljar.jpg', root))).toString('base64')}`;

// Google Fonts serves TTF (which satori needs) to user agents that don't support WOFF2.
const font = async (family, weight) => {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`, { headers: { 'User-Agent': 'Mozilla/4.0' } })).text();
  return (await fetch(css.match(/url\((https:[^)]+)\)/)[1])).arrayBuffer();
};

const c = { bg: '#f0e7db', paper: '#faf6f0', ink: '#22201c', ink2: '#3b3731', muted: '#5f584d', rule: '#d9cdbb', accent: '#234fa8', green: '#2f8f4e' };

const metric = (value, label) =>
  h('div', { style: { display: 'flex', flexDirection: 'column', paddingRight: 36, marginRight: 36, borderRight: `2px solid ${c.rule}` } }, [
    h('div', { style: { fontFamily: 'Rounded', fontSize: 40, color: c.ink } }, value),
    h('div', { style: { fontSize: 22, color: c.muted } }, label)
  ]);

const card = h('div', { style: { width: '100%', height: '100%', display: 'flex', background: c.bg, fontFamily: 'Sans', color: c.ink, position: 'relative' } }, [
  // Emblem, bleeding off the right edge.
  h(
    'svg',
    { width: 470, height: 571, viewBox: '0 0 640 778', style: { position: 'absolute', right: -40, top: 40, opacity: 0.95 } },
    h('path', { d: deerPath, fill: c.ink, fillRule: 'evenodd' })
  ),
  h('div', { style: { display: 'flex', flexDirection: 'column', padding: '64px 0 0 80px', width: 820 } }, [
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'flex-start',
          fontSize: 24,
          fontWeight: 600,
          color: c.ink2,
          background: c.paper,
          border: `2px solid ${c.rule}`,
          borderRadius: 999,
          padding: '8px 22px'
        }
      },
      [h('div', { style: { width: 14, height: 14, borderRadius: 7, background: c.green, marginRight: 12 } }), 'Available for contract work']
    ),
    h('div', { style: { fontFamily: 'Rounded', fontSize: 96, lineHeight: 1.05, marginTop: 34, letterSpacing: -1 } }, 'Viljar Võidula'),
    h('div', { style: { fontSize: 40, fontWeight: 600, color: c.ink2, marginTop: 14 } }, 'Senior Technical Product Manager'),
    h('div', { style: { fontSize: 40, fontWeight: 600, color: c.accent } }, 'Platforms, APIs & AI'),
    h('div', { style: { display: 'flex', marginTop: 44 } }, [
      metric('70×', 'decisioning scale'),
      metric('+8%', 'conversion vs Algolia'),
      h('div', { style: { display: 'flex', flexDirection: 'column' } }, [
        h('div', { style: { fontFamily: 'Rounded', fontSize: 40 } }, '€2.5M'),
        h('div', { style: { fontSize: 22, color: c.muted } }, 'funding round as CTO')
      ])
    ])
  ]),
  // Footer strip.
  h(
    'div',
    {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 84,
        display: 'flex',
        alignItems: 'center',
        padding: '0 80px',
        background: c.ink,
        color: c.bg,
        fontSize: 26
      }
    },
    [
      h('img', { src: portrait, width: 52, height: 52, style: { borderRadius: 26, marginRight: 18, border: `2px solid ${c.bg}` } }),
      h('div', { style: { fontWeight: 600 } }, 'viltz.ee'),
      h('div', { style: { marginLeft: 18, color: '#b5ada0' } }, 'Contract & fractional · Tallinn, Estonia')
    ]
  )
]);

const image = new ImageResponse(card, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Rounded', data: await font('M+PLUS+Rounded+1c', 800), weight: 800, style: 'normal' },
    { name: 'Sans', data: await font('Source+Sans+3', 400), weight: 400, style: 'normal' },
    { name: 'Sans', data: await font('Source+Sans+3', 600), weight: 600, style: 'normal' }
  ]
});

await writeFile(new URL('public/og.png', root), Buffer.from(await image.arrayBuffer()));
console.log('Wrote public/og.png');
