import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import DeerFigure, { type DeerPose } from './deer-figure';

// Which deer waits beside which section. Sides alternate, starting on the right under the hero deer.
// The phone track (components/deer-track.tsx) visits the same sections.
export const stations: { section: string; pose: DeerPose }[] = [
  { section: 'impact', pose: 'stand' },
  { section: 'work', pose: 'walk' },
  { section: 'experience', pose: 'leap' },
  { section: 'skills', pose: 'graze' },
  { section: 'projects', pose: 'look' },
  { section: 'personal', pose: 'rest' }
];

const FIG_W = 110;
const FIG_H = (FIG_W * 230) / 200;
// The figure's hooves stand at y=150 in its -70…160 viewBox.
const GROUND = (220 / 230) * FIG_H;
const RADIUS = 28;
// Where the line's tip sits in the viewport while scrolling.
const TIP = 0.72;
// How quickly the line catches up with the scroll (time constant of its easing).
const EASE_MS = 240;
// The hero deer's entrance runs about this long; the line grows out of its chin once it has landed.
const HERO_SETTLE = 1100;

type Point = { x: number; y: number };
type Station = Point & { side: 'left' | 'right'; pose: DeerPose; inverse: boolean };
// Vertical extent of an inverse band; bands run the full width of the page.
type Band = { top: number; bottom: number };
type Layout = { width: number; height: number; d: string; stations: Station[]; bands: Band[] };

// An orthogonal polyline with rounded corners.
const roundedPath = (points: Point[]) => {
  const pts = points.filter((p, i) => i === 0 || p.x !== points[i - 1].x || p.y !== points[i - 1].y);
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [a, b, c] = [pts[i - 1], pts[i], pts[i + 1]];
    const lenIn = Math.hypot(b.x - a.x, b.y - a.y);
    const lenOut = Math.hypot(c.x - b.x, c.y - b.y);
    const r = Math.min(RADIUS, lenIn / 2, lenOut / 2);
    const p1 = { x: b.x - ((b.x - a.x) / lenIn) * r, y: b.y - ((b.y - a.y) / lenIn) * r };
    const p2 = { x: b.x + ((c.x - b.x) / lenOut) * r, y: b.y + ((c.y - b.y) / lenOut) * r };
    d += `L${p1.x} ${p1.y}Q${b.x} ${b.y} ${p2.x} ${p2.y}`;
  }
  const last = pts[pts.length - 1];
  return `${d}L${last.x} ${last.y}`;
};

// Page position from layout alone. Unlike getBoundingClientRect this ignores transforms, so the hero's
// slide-in and the sections' scroll reveals can't shift the route while they play.
const docRect = (el: HTMLElement) => {
  let left = 0;
  let top = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    left += node.offsetLeft;
    top += node.offsetTop;
  }
  return { left, right: left + el.offsetWidth, top, bottom: top + el.offsetHeight, height: el.offsetHeight };
};

// The content column's edges on the page.
const contentEdges = (main: HTMLElement) => {
  const padding = parseFloat(getComputedStyle(main).paddingLeft);
  return { left: docRect(main).left + padding, right: docRect(main).right - padding };
};

// Whether both gutters can hold a deer; when they can't, the phone track takes over.
export const trailFits = () => {
  const main = document.querySelector('main');
  return !!main && contentEdges(main).left >= FIG_W + 30;
};

// Measures the page and plans the route: down from the hero deer's chin, across each section's top
// padding to the next gutter, under each waiting deer like a patch of ground, and into the footer deer.
// Both gutters must fit a deer plus the line on either side of it.
const measure = (): Layout | null => {
  const main = document.querySelector('main');
  const start = document.querySelector<HTMLElement>('[data-trail-start]');
  const end = document.querySelector<HTMLElement>('[data-trail-end]');
  if (!main || !start || !end) return null;

  const width = document.documentElement.clientWidth;
  if (!trailFits()) return null;
  const content = contentEdges(main);

  // Banded sections never transform themselves (components/section.tsx), so these edges are final.
  const bands = Array.from(document.querySelectorAll<HTMLElement>('[data-band="inverse"]'), el => {
    const r = docRect(el);
    return { top: r.top, bottom: r.bottom };
  });
  const onBand = (y: number) => bands.some(band => y >= band.top && y <= band.bottom);

  const chin = docRect(start);
  // The footer deer's own box, found from its brand row (layout only, then the svg's offset in it).
  const brand = docRect(end);
  const svg = end.querySelector('svg');
  if (!svg) return null;
  const offset = { x: svg.getBoundingClientRect().left - end.getBoundingClientRect().left, y: svg.getBoundingClientRect().top - end.getBoundingClientRect().top };
  const foot = { left: brand.left + offset.x, top: brand.top + offset.y, width: svg.getBoundingClientRect().width, height: svg.getBoundingClientRect().height };
  // Start inside the chin's bottom edge on the emblem's centre line (x 287.5, y 770 of its 640×778
  // viewBox), so the trail reads as the drawing's own line running on.
  const points: Point[] = [{ x: chin.left + ((chin.right - chin.left) * 287.5) / 640, y: chin.top + (chin.height * 769) / 778 }];
  const placed: Station[] = [];
  let floor = chin.bottom + 40;

  stations.forEach(({ section, pose }, i) => {
    const el = document.getElementById(section);
    if (!el) return;
    const top = docRect(el).top;
    const side = i % 2 === 0 ? 'right' : 'left';
    const centre = side === 'right' ? (content.right + width) / 2 : content.left / 2;
    // Each deer faces the content, so the line comes down behind it (outer edge), runs under its
    // hooves, and drops away in front (inner edge) below the hooves: it never crosses the deer.
    const inner = side === 'right' ? centre - FIG_W / 2 - 6 : centre + FIG_W / 2 + 6;
    const outer = side === 'right' ? centre + FIG_W / 2 + 6 : centre - FIG_W / 2 - 6;
    const cross = Math.max(top + 26, floor);
    const ground = cross + 40 + GROUND;

    points.push({ x: points[points.length - 1].x, y: cross }, { x: outer, y: cross }, { x: outer, y: ground }, { x: inner, y: ground });
    placed.push({ x: centre, y: ground, side, pose, inverse: onBand(ground - GROUND) || onBand(ground) });
    floor = ground + 60;
  });

  // Mirror the start: curve in under the footer deer and run up into its chin, so the trail reads as
  // one line from deer to deer.
  const footChin = { x: foot.left + (foot.width * 287.5) / 640, y: foot.top + (foot.height * 769) / 778 };
  const endY = Math.max(footChin.y + 18, floor);
  points.push({ x: points[points.length - 1].x, y: endY }, { x: footChin.x, y: endY }, footChin);

  return { width, height: endY + 40, d: roundedPath(points), stations: placed, bands };
};

const sameBands = (a: Band[], b: Band[]) => a.length === b.length && a.every((band, i) => band.top === b[i].top && band.bottom === b[i].bottom);

const DeerTrail = () => {
  const [layout, setLayout] = useState<Layout | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  // The same line in the inverse ink, clipped to the inverse bands so it stays visible on them.
  const inversePathRef = useRef<SVGPathElement>(null);
  const stationRefs = useRef<(HTMLDivElement | null)[]>([]);
  // How far the line is drawn, kept across re-plans so a reflow doesn't restart it.
  const drawnRef = useRef(0);

  // Plan once the page has settled (web fonts in, hero landed), then re-plan only on real reflows
  // such as a viewport resize. Planning earlier would move the route under the reader.
  useEffect(() => {
    let frame = 0;
    let ready = false;
    let timer = 0;
    const update = () => {
      frame = 0;
      const next = measure();
      setLayout(prev => (prev && next && prev.d === next.d && prev.width === next.width && sameBands(prev.bands, next.bands) ? prev : next));
    };
    const schedule = () => {
      if (ready && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      timer = window.setTimeout(() => {
        ready = true;
        schedule();
      }, HERO_SETTLE);
    });
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Draw the line up to just below the middle of the viewport, easing towards it so long horizontal
  // runs sweep across rather than pop in; deer wake up as the line reaches them.
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!layout || !path) return;

    const length = path.getTotalLength();
    const step = 6;
    const ys: number[] = [];
    for (let s = 0; s <= length; s += step) ys.push(path.getPointAtLength(s).y);
    const arrivals = layout.stations.map(st => ys.findIndex(y => y >= st.y - RADIUS) * step);
    const end = document.querySelector('[data-trail-end]');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const paths = [path, inversePathRef.current].filter(p => p !== null);
    paths.forEach(p => (p.style.strokeDasharray = `${length}`));
    let drawn = reduced ? length : Math.min(drawnRef.current, length);
    let frame = 0;

    // Length of line drawn down to page height y.
    const lengthAt = (y: number) => {
      let lo = 0;
      let hi = ys.length - 1;
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (ys[mid] <= y) lo = mid;
        else hi = mid - 1;
      }
      return ys[lo] <= y ? lo * step : 0;
    };
    const targetFor = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      return scrollY >= max - 2 ? length : lengthAt(scrollY + innerHeight * TIP);
    };

    const paint = () => {
      drawnRef.current = drawn;
      paths.forEach(p => (p.style.strokeDashoffset = `${length - drawn}`));
      arrivals.forEach((at, i) => stationRefs.current[i]?.classList.toggle('is-here', drawn >= at));
      end?.classList.toggle('is-here', drawn >= length - 1);
    };

    // Exponential ease by elapsed time, so it glides the same at any frame rate.
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16;
      last = now;
      const target = targetFor();
      drawn += (target - drawn) * (1 - Math.exp(-dt / EASE_MS));
      if (Math.abs(target - drawn) < 0.5) drawn = target;
      paint();
      if (drawn === target) {
        frame = 0;
        last = 0;
      } else frame = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    if (reduced) paint();
    else {
      // Opened partway down the page: start from the top of the screen, so only what's visible draws in.
      if (drawnRef.current === 0) drawn = lengthAt(scrollY);
      paint();
      onScroll();
      addEventListener('scroll', onScroll, { passive: true });
    }
    return () => {
      removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [layout]);

  if (!layout) return null;

  return (
    <div className="deer-trail" style={{ width: layout.width, height: layout.height }} aria-hidden="true">
      <svg width={layout.width} height={layout.height}>
        <defs>
          <clipPath id="deer-trail-inverse">
            {layout.bands.map(band => (
              <rect key={band.top} x={0} y={band.top} width={layout.width} height={band.bottom - band.top} />
            ))}
          </clipPath>
        </defs>
        <path ref={pathRef} className="deer-trail__line" d={layout.d} />
        <path ref={inversePathRef} className="deer-trail__line deer-trail__line--inverse" d={layout.d} clipPath="url(#deer-trail-inverse)" />
      </svg>
      {layout.stations.map((st, i) => (
        <div
          key={st.pose}
          ref={el => {
            stationRefs.current[i] = el;
          }}
          className={st.inverse ? 'deer-trail__station inverse' : 'deer-trail__station'}
          style={{ left: st.x - FIG_W / 2, top: st.y - GROUND, width: FIG_W }}
        >
          <DeerFigure pose={st.pose} flip={st.side === 'right'} />
        </div>
      ))}
    </div>
  );
};

export default DeerTrail;
