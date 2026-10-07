import Head from 'next/head';
import Image from 'next/image';
import Deer from '../components/deer';
import Experience from '../components/experience';
import ImpactList from '../components/impact-list';
import Projects from '../components/projects';
import Section from '../components/section';
import { books, education, metrics, otherImpact, photos, principles, profile, skills } from '../lib/cv';
import styles from '../styles/cv.module.css';

const description = `${profile.name} — ${profile.title}. ${profile.summary}`;

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: 'Senior Technical Product Manager',
  url: profile.url,
  email: `mailto:${profile.email}`,
  image: `${profile.url}images/viljar.jpg`,
  address: { '@type': 'PostalAddress', addressCountry: 'EE' },
  sameAs: [profile.linkedin, profile.github]
};

const Home = () => (
  <>
    <Head>
      <title>{`${profile.name} — ${profile.title}`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={profile.url} />
      <meta property="og:type" content="profile" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={profile.url} />
      <meta property="og:site_name" content={`${profile.name} — CV`} />
      <meta property="og:title" content={`${profile.name} — ${profile.title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${profile.url}images/viljar.jpg`} />
      <meta name="twitter:card" content="summary" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
    </Head>

    <section className={styles.hero}>
      <div className={styles.heroText}>
        <p className={`${styles.greeting} ${styles.load}`}>{profile.greeting}</p>
        <h1 className={`${styles.name} ${styles.load} ${styles.d1}`}>{profile.name}</h1>
        <p className={`${styles.role} ${styles.load} ${styles.d2}`}>{profile.title}</p>
        <p className={`${styles.summary} ${styles.load} ${styles.d3}`}>{profile.summary}</p>
        <p className={`${styles.contacts} ${styles.load} ${styles.d4}`}>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin}>LinkedIn</a>
          <a href={profile.github}>GitHub</a>
          <span>{profile.location}</span>
        </p>
      </div>
      <div className={styles.deerCol}>
        <div className={styles.deer}>
          <Deer width={260} alt="Geometric deer head — Viljar’s emblem" sizes="260px" eager />
        </div>
      </div>
    </section>

    <div className={`reveal ${styles.current}`}>
      <Image src="/images/viljar.jpg" alt={`Portrait of ${profile.name}`} width={64} height={64} className={styles.portrait} />
      <div className={styles.prose}>
        <p>
          <strong>Now:</strong> founder &amp; product owner of <a href="https://5xer.com">Fivexer</a>, and product &amp; platform contractor at{' '}
          <a href="https://www.veriff.com/">Veriff</a>.
        </p>
        <p>
          <strong>Next:</strong> anti-financial-crime product — AML screening, sanctions and PEP matching, transaction monitoring and risk scoring.
        </p>
      </div>
    </div>

    <Section id="impact" title="Selected impact">
      <ImpactList items={metrics} />
      <ul className={`${styles.bullets} ${styles.prose} ${styles.otherImpact}`}>
        {otherImpact.map(item => (
          <li key={item.title}>
            <strong>{item.title}</strong> <span>{item.body}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section id="experience" title="Experience">
      <Experience />
    </Section>

    <Section id="skills" title="Skills">
      <dl className={styles.rows}>
        {skills.map(group => (
          <div key={group.name} className={styles.row}>
            <dt>{group.name}</dt>
            <dd>{group.list}</dd>
          </div>
        ))}
      </dl>
    </Section>

    <Section id="how" title="How I work">
      <div className={styles.principles}>
        {principles.map(item => (
          <div key={item.title} className={styles.principle}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section id="projects" title="Earlier projects">
      <Projects />
    </Section>

    <Section id="personal" title="Personal">
      <dl className={styles.rows}>
        <div className={styles.row}>
          <dt>Education</dt>
          <dd className={styles.stack}>
            {education.map(item => (
              <span key={item.name}>
                {item.name}
                <span className={styles.subtle}>{item.where}</span>
              </span>
            ))}
          </dd>
        </div>
        <div className={styles.row}>
          <dt>Languages</dt>
          <dd>Estonian (native) · English (fluent) · German (basic)</dd>
        </div>
        <div className={styles.row}>
          <dt>Interests</dt>
          <dd>Licensed private pilot, PPL(A) — checklists and decisions under pressure. Snowboarding for 18 years. Helped build the handmade log house that is home.</dd>
        </div>
        <div className={styles.row}>
          <dt>References</dt>
          <dd>
            See <a href={profile.linkedin}>LinkedIn recommendations</a>; direct references from managers, founders, partners and engineers on request.
          </dd>
        </div>
      </dl>
      <div className={styles.photoGrid}>
        {photos.map(photo => (
          <figure key={photo.src} className={`reveal-item ${styles.photo}`}>
            <div className={styles.frame}>
              <Image src={photo.src} alt={photo.alt} width={480} height={320} sizes="(max-width: 700px) 100vw, 320px" className={styles.photoImage} />
            </div>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Section>

    <Section id="books" title="Books I love" last>
      <div className={styles.shelf}>
        {books.map(book => (
          <a key={book.title} href={book.url} className={styles.book}>
            <Image src={book.cover} alt={`Cover of ${book.title}`} width={200} height={300} sizes="(max-width: 700px) 40vw, 160px" />
            <span>
              <span className={styles.bookTitle}>{book.title}</span>
              <span className={styles.bookAuthor}>{book.author}</span>
            </span>
          </a>
        ))}
      </div>
    </Section>
  </>
);

export default Home;
