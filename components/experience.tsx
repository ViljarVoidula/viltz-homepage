import Image from 'next/image';
import { earlierRoles, roles } from '../lib/cv';
import styles from '../styles/cv.module.css';

// Recent roles show every bullet; roles before 2022 collapse to one line each.
const Experience = () => (
  <>
    <ol className={styles.roles}>
      {roles.map(role => (
        <li key={`${role.company}-${role.title}`} className={styles.roleItem}>
          <h3>{role.title}</h3>
          <div className={styles.roleMeta}>
            <Image src={role.logo} alt="" width={20} height={20} className={styles.logo} />
            <strong>{role.company}</strong>
            <span>{role.where}</span>
            <span aria-hidden="true">·</span>
            <span>{role.dates}</span>
          </div>
          <ul className={`${styles.bullets} ${styles.prose}`}>
            {role.bullets.map(bullet => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
    <h3 className={styles.subheading}>Earlier</h3>
    <dl className={styles.rows}>
      {earlierRoles.map(role => (
        <div key={role.title} className={`${styles.row} ${styles.rowWide}`}>
          <dt>
            {role.title} <span className={styles.meta}>· {role.meta}</span>
          </dt>
          <dd>{role.summary}</dd>
        </div>
      ))}
    </dl>
  </>
);

export default Experience;
