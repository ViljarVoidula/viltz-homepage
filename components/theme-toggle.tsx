import { useTheme } from 'next-themes';
import styles from '../styles/cv.module.css';

// Both icons are always rendered and CSS picks one from the root theme class,
// so server and client markup match before the theme is known.
const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button type="button" className={styles.toggle} aria-label="Toggle light and dark theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      <svg
        className={styles.moon}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg
        className={styles.sun}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
};

export default ThemeToggle;
