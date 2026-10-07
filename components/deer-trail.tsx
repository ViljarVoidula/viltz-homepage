import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import DeerFigure, { type DeerPose } from './deer-figure';

// Which deer waits beside which section. Sides alternate, starting on the right under the hero deer.
const stations: { section: string; pose: DeerPose }[] = [
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

type Point = { x: number; y: number };
type Station = Point & { side: 'left' | 'right'; pose: DeerPose };
type Layout = { width: number; height: number; d: string; stations: Station[] };

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

const docRect = (el: Element) => {
  const r = el.getBoundingClientRect();
  return { left: r.left + scrollX, right: r.right + scrollX, top: r.top + scrollY, bottom: r.bottom + scrollY, height: r.height };
};

// Measures the page and plans the route: down from the hero deer's chin, across each section's top
// padding to the next gutter, under each waiting deer like a patch of ground, and into the footer deer.
// Both gutters must fit a deer plus the line on either side of it.
const measure = (): Layout | null => {
  const main = document.querySelector('main');
  // The wrapper, not the svg: the svg tilts towards the pointer, the wrapper stays put.
  const start = document.querySelector('[data-trail-start]');
  const end = document.querySelector('[data-trail-end]');
  if (!main || !start || !end) return null;

  const width = document.documentElement.clientWidth;
  const padding = parseFloat(getComputedStyle(main).paddingLeft);
  const content = { left: docRect(main).left + padding, right: docRect(main).right - padding };
  // Only draw when both gutters can hold a deer.
  if (content.left < FIG_W + 30) return null;

  const chin = docRect(start);
  const foot = docRect(end);
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
    placed.push({ x: centre, y: ground, side, pose });
    floor = ground + 60;
  });

  const endY = Math.max(foot.top + foot.height / 2, floor);
  points.push({ x: points[points.length - 1].x, y: endY }, { x: foot.left - 12, y: endY });

  return { width, height: endY + 40, d: roundedPath(points), stations: placed };
};

const DeerTrail = () => {
  const [layout, setLayout] = useState<Layout | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stationRefs = useRef<(HTMLDivElement | null)[]>([]);
  // How far the line is drawn, kept across re-plans so a reflow doesn't restart it.
  const drawnRef = useRef(0);

  // Re-plan whenever the page reflows (fonts, images, viewport changes).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const next = measure();
      setLayout(prev => (prev && next && prev.d === next.d && prev.width === next.width ? prev : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    document.fonts?.ready.then(schedule);
    // The hero slides into place on load; measure again once it has landed. Other animations
    // (the scroll reveals) end too, but don't move anything the route depends on.
    const onAnimationEnd = (event: AnimationEvent) => {
      const start = document.querySelector('[data-trail-start]');
      if (start && event.target instanceof Element && event.target.contains(start)) schedule();
    };
    document.addEventListener('animationend', onAnimationEnd);
    return () => {
      observer.disconnect();
      document.removeEventListener('animationend', onAnimationEnd);
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

    path.style.strokeDasharray = `${length}`;
    let drawn = reduced ? length : Math.min(drawnRef.current, length);
    let frame = 0;

    const targetFor = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (scrollY >= max - 2) return length;
      const tip = scrollY + innerHeight * TIP;
      let lo = 0;
      let hi = ys.length - 1;
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (ys[mid] <= tip) lo = mid;
        else hi = mid - 1;
      }
      return ys[lo] <= tip ? lo * step : 0;
    };

    const paint = () => {
      drawnRef.current = drawn;
      path.style.strokeDashoffset = `${length - drawn}`;
      arrivals.forEach((at, i) => stationRefs.current[i]?.classList.toggle('is-here', drawn >= at));
      end?.classList.toggle('is-here', drawn >= length - 1);
    };

    const tick = () => {
      const target = targetFor();
      drawn += (target - drawn) * 0.12;
      if (Math.abs(target - drawn) < 0.5) drawn = target;
      paint();
      frame = drawn === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    if (reduced) paint();
    else {
      drawn = Math.min(targetFor(), drawn);
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
        <path ref={pathRef} className="deer-trail__line" d={layout.d} />
      </svg>
      {layout.stations.map((st, i) => (
        <div
          key={st.pose}
          ref={el => {
            stationRefs.current[i] = el;
          }}
          className="deer-trail__station"
          style={{ left: st.x - FIG_W / 2, top: st.y - GROUND, width: FIG_W }}
        >
          <DeerFigure pose={st.pose} flip={st.side === 'right'} />
        </div>
      ))}
    </div>
  );
};

export default DeerTrail;
