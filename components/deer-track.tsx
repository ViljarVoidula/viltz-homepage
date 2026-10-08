import { useEffect, useRef, useState } from 'react';
import DeerFigure, { type DeerPose } from './deer-figure';
import { stations, trailFits } from './deer-trail';

// The phone (and narrow window) take on the trail: a line along the foot of the screen, drawn as far
// as the reader has got, with a small deer walking at its tip. Ticks mark the trail's sections; when
// the reader stops, the deer takes up the pose its section's deer holds on the wide layout.

const FIG_W = 40;
// How quickly the deer catches up with the scroll (time constant of its easing).
const EASE_MS = 200;
// Scroll quiet for this long counts as the reader stopping.
const IDLE_MS = 260;
// A section is the current one once its top passes this far down the viewport.
const READ_LINE = 0.5;

type Tick = { at: number; pose: DeerPose };

const DeerTrack = () => {
  const [ticks, setTicks] = useState<Tick[] | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const deerRef = useRef<HTMLDivElement>(null);
  const tickRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [pose, setPose] = useState<DeerPose>('stand');
  const [walking, setWalking] = useState(false);
  const [back, setBack] = useState(false);

  // Shown only while the wide trail can't fit; ticks are re-measured on reflow.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (trailFits()) return setTicks(null);
      const max = document.documentElement.scrollHeight - innerHeight;
      if (max <= 0) return setTicks(null);
      const next = stations.flatMap(({ section, pose }) => {
        const el = document.getElementById(section);
        if (!el) return [];
        const top = el.getBoundingClientRect().top + scrollY;
        return [{ at: Math.min(1, Math.max(0, (top - innerHeight * READ_LINE) / max)), pose }];
      });
      setTicks(prev => (prev && prev.length === next.length && prev.every((t, i) => Math.abs(t.at - next[i].at) < 0.001) ? prev : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    (document.fonts?.ready ?? Promise.resolve()).then(schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    const deer = deerRef.current;
    if (!ticks || !root || !line || !deer) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bands = Array.from(document.querySelectorAll<HTMLElement>('[data-band="inverse"]'));
    const progressNow = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    };

    let shown = progressNow();
    let lastScroll = scrollY;
    let frame = 0;
    let idle = 0;
    let last = 0;

    const paint = () => {
      const travel = root.clientWidth - FIG_W;
      // Up to under the deer, reaching the rail's end as the deer reaches the page's.
      line.style.transform = `scaleX(${(shown * travel + (FIG_W * (1 + shown)) / 2) / root.clientWidth})`;
      deer.style.transform = `translateX(${shown * travel}px)`;
      ticks.forEach((t, i) => tickRefs.current[i]?.classList.toggle('is-passed', shown >= t.at - 0.002));
      // Flip to the inverse ink while the track sits over an inverse band.
      const y = root.getBoundingClientRect().top + root.offsetHeight / 2;
      root.classList.toggle(
        'inverse',
        bands.some(band => {
          const r = band.getBoundingClientRect();
          return y >= r.top && y <= r.bottom;
        })
      );
    };

    // The pose of the last section the reader has reached, or resting once at the very end.
    const settle = () => {
      const p = progressNow();
      const reached = ticks.filter(t => p >= t.at - 0.002);
      setPose(p >= 0.999 ? 'rest' : (reached[reached.length - 1]?.pose ?? 'stand'));
      setWalking(false);
    };

    // Exponential ease by elapsed time, so it glides the same at any frame rate.
    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16;
      last = now;
      const target = progressNow();
      shown += (target - shown) * (1 - Math.exp(-dt / EASE_MS));
      if (Math.abs(target - shown) < 0.0005) shown = target;
      paint();
      if (shown === target) {
        frame = 0;
        last = 0;
      } else frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (reduced) {
        shown = progressNow();
        paint();
      } else {
        if (scrollY !== lastScroll) setBack(scrollY < lastScroll);
        setWalking(true);
        if (!frame) frame = requestAnimationFrame(tick);
      }
      lastScroll = scrollY;
      clearTimeout(idle);
      idle = window.setTimeout(settle, IDLE_MS);
    };

    paint();
    settle();
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(idle);
    };
  }, [ticks]);

  if (!ticks) return null;

  return (
    <div ref={rootRef} className="deer-track" aria-hidden="true">
      <div className="deer-track__rail" />
      <div ref={lineRef} className="deer-track__line" />
      {ticks.map((t, i) => (
        <span
          key={t.pose}
          ref={el => {
            tickRefs.current[i] = el;
          }}
          className="deer-track__tick"
          style={{ left: `calc(${t.at} * (100% - ${FIG_W}px) + ${FIG_W / 2}px)` }}
        />
      ))}
      <div ref={deerRef} className="deer-track__deer is-here" style={{ width: FIG_W }}>
        <DeerFigure pose={walking ? 'walk' : pose} flip={back} />
      </div>
    </div>
  );
};

export default DeerTrack;
