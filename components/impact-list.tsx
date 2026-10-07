import { useEffect, useRef, useState } from 'react';
import type { Metric } from '../lib/cv';
import styles from '../styles/cv.module.css';

const format = ({ count }: Metric, progress: number) => `${count.prefix ?? ''}${(count.to * progress).toFixed(count.decimals ?? 0)}${count.suffix ?? ''}`;

// Final values render on the server; on the client the numbers count up
// the first time the grid scrolls into view (unless motion is reduced).
const ImpactList = ({ items }: { items: Metric[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    let frame = 0;
    setProgress(0);
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          setProgress(1 - Math.pow(1 - t, 3));
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={styles.metricGrid}>
      {items.map(item => (
        <div key={item.title} className={`reveal-item ${styles.metricItem}`}>
          <div className={styles.metric} aria-label={item.metric}>
            {format(item, progress)}
          </div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ImpactList;
