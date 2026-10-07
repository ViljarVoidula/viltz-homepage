import Image from 'next/image';
import { projects } from '../lib/cv';
import styles from '../styles/cv.module.css';

const Projects = () => (
  <div className={styles.projectGrid}>
    {projects.map(project => (
      <article key={project.title} className={`reveal-item ${styles.project}`}>
        <div className={styles.frame}>
          <Image src={project.image} alt={`${project.title} screenshot`} width={360} height={270} sizes="(max-width: 700px) 100vw, 320px" />
        </div>
        <h3>{project.title}</h3>
        <div className={styles.meta}>
          {project.years} · {project.stack}
        </div>
        <p>{project.text}</p>
        {project.link && (
          <a className={styles.projectLink} href={project.link.url}>
            {project.link.text}
          </a>
        )}
      </article>
    ))}
  </div>
);

export default Projects;
