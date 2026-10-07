import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import { profile } from '../lib/cv';
import styles from '../styles/cv.module.css';
import Deer from './deer';
import ThemeToggle from './theme-toggle';

const nav = [
  { id: 'impact', label: 'Impact' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'personal', label: 'Personal' },
  { id: 'books', label: 'Books' }
];

// Sections without a nav entry count towards the link above them.
const navFor: Record<string, string> = { how: 'skills' };

// The section whose top has passed just under the sticky header.
const useActiveSection = () => {
  const [active, setActive] = useState('');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = '';
      document.querySelectorAll<HTMLElement>('main section[id]').forEach(section => {
        if (section.getBoundingClientRect().top < 120) current = navFor[section.id] ?? section.id;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return active;
};

const Layout = ({ children }: { children: ReactNode }) => {
  const active = useActiveSection();

  return (
    <>
      <div className={styles.progress} aria-hidden="true" />
      <header className={styles.headerBar}>
        <div className={`${styles.wrap} ${styles.header}`}>
          <Link href="/" className={styles.brand}>
            <Deer width={26} className={styles.mark} />
            {profile.name}
          </Link>
          <nav aria-label="Sections" className={styles.nav}>
            {nav.map(item => (
              <Link key={item.id} href={`/#${item.id}`} aria-current={active === item.id ? 'true' : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main id="top" className={styles.wrap}>
        {children}
      </main>
      <footer className={styles.wrap}>
        <div className={styles.footer}>
          <span className={styles.footerBrand}>
            <Deer width={26} className={styles.mark} />
            <span>
              {profile.name} · <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </span>
          </span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  );
};

export default Layout;
