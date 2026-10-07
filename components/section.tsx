import type { ReactNode } from 'react';
import styles from '../styles/cv.module.css';

type SectionProps = {
  id?: string;
  title: string;
  last?: boolean;
  children: ReactNode;
};

const Section = ({ id, title, last, children }: SectionProps) => (
  <section id={id} className={['reveal', styles.section, last && styles.sectionLast].filter(Boolean).join(' ')}>
    <h2 className={styles.heading}>{title}</h2>
    {children}
  </section>
);

export default Section;
