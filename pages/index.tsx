import Head from 'next/head';
import Image from 'next/image';
import Deer from '../components/deer';
import DeerTrack from '../components/deer-track';
import DeerTrail from '../components/deer-trail';
import Experience from '../components/experience';
import ImpactList from '../components/impact-list';
import Projects from '../components/projects';
import Section from '../components/section';
import WorkWithMe from '../components/work-with-me';
import { books, contract, education, metrics, otherImpact, photos, principles, profile, skills, talks } from '../lib/cv';
import { structuredData } from '../lib/structured-data';
import styles from '../styles/cv.module.css';

const title = `${profile.name} — ${profile.title}`;
// Kept under ~160 characters so search results show it whole.
const description =
  'Engineering leader in Estonia: team lead, staff engineer, interim CTO, founder. Platforms, product delivery and AI. Open to contract and fractional work.';
const ogImage = `${profile.url}og.png?v=${process.env.OG_VERSION}`;
const ogImageAlt = `${profile.name} — ${profile.title}. Available for contract work.`;

const Home = () => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={profile.name} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={profile.url} />
      <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="CV in Markdown" />

      <meta property="og:type" content="profile" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={profile.url} />
      <meta property="og:site_name" content={profile.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="profile:first_name" content="Viljar" />
      <meta property="profile:last_name" content="Võidula" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </Head>

    <section className={styles.hero}>
      <div className={styles.heroText}>
        <a href="#work" className={`${styles.badge} ${styles.load}`}>
          <span className={styles.badgeDot} aria-hidden="true" />
          Available for contract work
        </a>
        <p className={`${styles.greeting} ${styles.load}`}>{profile.greeting}</p>
        <h1 className={`${styles.name} ${styles.load} ${styles.d1}`}>{profile.name}</h1>
        <p className={`${styles.role} ${styles.load} ${styles.d2}`}>{profile.title}</p>
        <p className={`${styles.summary} ${styles.load} ${styles.d3}`}>{profile.summary}</p>
        <div className={`${styles.actions} ${styles.heroActions} ${styles.load} ${styles.d4}`}>
          <a className={styles.button} href={contract.enquiryUrl}>
            Enquire about a contract
          </a>
          <a className={`${styles.button} ${styles.buttonGhost}`} href="#work">
            What I take on
          </a>
        </div>
        <p className={`${styles.contacts} ${styles.load} ${styles.d4}`}>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin}>LinkedIn</a>
          <a href={profile.github}>GitHub</a>
          <span>{profile.location}</span>
        </p>
      </div>
      <div className={styles.deerCol}>
        <div className={styles.deer} data-trail-start>
          <Deer width={260} alt="Geometric deer head — Viljar’s emblem" />
        </div>
      </div>
    </section>

    <DeerTrail />
    <DeerTrack />

    <div className={`reveal ${styles.current}`}>
      <Image src="/images/viljar.jpg" alt={`Portrait of ${profile.name}`} width={64} height={64} className={styles.portrait} />
      <div className={styles.prose}>
        <p>
          <strong>Now:</strong> founder &amp; technical co-founder of <a href="https://5xer.com">Fivexer</a> — and open to contract work alongside it.
        </p>
        <p>
          <strong>Next:</strong> an engineering leadership role in a product company with an interesting problem to solve.
        </p>
      </div>
    </div>

    <Section id="impact" title="Selected impact" band="paper">
      <ImpactList items={metrics} />
      <ul className={`${styles.bullets} ${styles.prose} ${styles.otherImpact}`}>
        {otherImpact.map(item => (
          <li key={item.title}>
            <strong>{item.title}</strong> <span>{item.body}</span>
          </li>
        ))}
      </ul>
    </Section>

    <WorkWithMe />

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

    <Section id="how" title="How I work" band="clay">
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

    <Section id="speaking" title="Speaking">
      {talks.map(talk => (
        <a key={talk.url} href={talk.url} className={`reveal-item ${styles.talk}`} target="_blank" rel="noopener noreferrer">
          <div className={`${styles.frame} ${styles.talkThumb}`}>
            <Image src={talk.thumbnail} alt={`Video: ${talk.title}, ${talk.event}`} width={640} height={360} sizes="(max-width: 700px) 100vw, 360px" />
            <span className={styles.play} aria-hidden="true" />
          </div>
          <span>
            <span className={styles.talkTitle}>{talk.title}</span>
            <span className={styles.meta}>
              {talk.event} · {talk.date}
            </span>
            <span className={styles.talkSummary}>{talk.summary}</span>
            <span className={styles.projectLink}>Watch on YouTube</span>
          </span>
        </a>
      ))}
    </Section>

    <Section id="personal" title="Personal" band="paper">
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
          <dd>Estonian (native) · English (proficient) · German (low proficiency)</dd>
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

    <Section id="books" title="Books I love" band="paper" last>
      <div className={styles.shelf}>
        {books.map(book => (
          <a key={book.title} href={book.url} className={styles.book} target="_blank" rel="noopener noreferrer">
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
