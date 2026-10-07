import { useEffect, useRef } from 'react';
import { deerPath } from './deer-path';

type DeerProps = {
  className?: string;
  width: number;
  alt?: string;
  // Turn the head slightly towards the pointer.
  gaze?: boolean;
};

// The traced outline is one path; these clips cut it into parts that can move on their own.
// Neighbouring clips overlap so no seam shows where parts meet; the head keeps a wider band
// under each ear so a flicking ear never opens a gap.
const parts = [
  { id: 'head', clip: 'M0 468H640V778H0Z M40 478H173L173 498.8L127 586.8L40 590Z M404 478H600V600H457L454.1 580.8L404.1 500.8Z' },
  { id: 'antler-l', clip: 'M0 0H321V472H0Z' },
  { id: 'antler-r', clip: 'M319 0H640V472H319Z' },
  { id: 'ear-l', clip: 'M40 478H176L178 502L132 590H40Z' },
  { id: 'ear-r', clip: 'M399 478H600V600H452L449 584L399 504Z' }
];

// Rendered once by the layout; every <Deer> references it, so the path ships a single time per page.
export const DeerSymbol = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
    <defs>
      <path id="deer-shape" fillRule="evenodd" d={deerPath} />
      {parts.map(part => (
        <clipPath key={part.id} id={`deer-clip-${part.id}`}>
          <path clipRule="evenodd" d={part.clip} />
        </clipPath>
      ))}
    </defs>
  </svg>
);

const useGaze = (ref: React.RefObject<SVGSVGElement | null>, enabled: boolean) => {
  useEffect(() => {
    const svg = ref.current;
    if (!enabled || !svg) return;
    if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const update = () => {
      frame = 0;
      const box = svg.getBoundingClientRect();
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      const dx = clamp((x - (box.left + box.width / 2)) / (innerWidth / 2));
      const dy = clamp((y - (box.top + box.height / 2)) / (innerHeight / 2));
      svg.style.setProperty('--gaze-y', `${(dx * 14).toFixed(2)}deg`);
      svg.style.setProperty('--gaze-x', `${(-dy * 8).toFixed(2)}deg`);
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLeave = () => {
      svg.style.removeProperty('--gaze-x');
      svg.style.removeProperty('--gaze-y');
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [ref, enabled]);
};

// Filled with the theme's ink colour (see .deer-mark in globals.css), so one shape serves both themes.
const Deer = ({ className, width, alt = '', gaze = false }: DeerProps) => {
  const ref = useRef<SVGSVGElement>(null);
  useGaze(ref, gaze);

  return (
    <svg
      ref={ref}
      width={width}
      height={Math.round((width * 778) / 640)}
      viewBox="0 0 640 778"
      className={['deer-mark', className].filter(Boolean).join(' ')}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      focusable="false"
    >
      {parts.map(part => (
        <g key={part.id} className={`deer-${part.id}`}>
          <use href="#deer-shape" clipPath={`url(#deer-clip-${part.id})`} />
        </g>
      ))}
    </svg>
  );
};

export default Deer;
