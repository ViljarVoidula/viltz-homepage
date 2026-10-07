import type { ReactNode } from 'react';
import styles from '../styles/cv.module.css';

export type Band = 'paper' | 'clay' | 'inverse';

const bandClass: Record<Band, string> = {
  paper: `${styles.band} ${styles.bandPaper}`,
  clay: `${styles.band} ${styles.bandClay}`,
  inverse: `inverse ${styles.band}`
};

type SectionProps = {
  id?: string;
  title: string;
  band?: Band;
  last?: boolean;
  children: ReactNode;
};

// A banded section keeps its background still and reveals only its content, so the band edges stay
// where the deer trail measured them (its line switches colour on inverse bands).
const Section = ({ id, title, band, last, children }: SectionProps) => {
  const content = (
    <>
      <h2 className={styles.heading}>{title}</h2>
      {children}
    </>
  );

  return (
    <section id={id} data-band={band} className={[!band && 'reveal', styles.section, band && bandClass[band], last && styles.sectionLast].filter(Boolean).join(' ')}>
      {band ? <div className="reveal">{content}</div> : content}
    </section>
  );
};

export default Section;
