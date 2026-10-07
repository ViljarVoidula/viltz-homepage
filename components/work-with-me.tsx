import { contract } from '../lib/cv';
import styles from '../styles/cv.module.css';

// The page's one inverse band: the strongest pause lands on the offer.

const WorkWithMe = () => (
  <section id="work" data-band="inverse" className={`inverse ${styles.section} ${styles.band}`}>
    <div className={`reveal ${styles.workCard}`}>
      <div className={styles.prose}>
        <h2 className={styles.heading}>Work with me</h2>
        <p className={styles.workPitch}>{contract.pitch}</p>
      </div>
      <div className={styles.offers}>
        {contract.offers.map(offer => (
          <div key={offer.title} className={styles.offer}>
            <h3>{offer.title}</h3>
            <p>{offer.body}</p>
          </div>
        ))}
      </div>
      <dl className={styles.terms}>
        {contract.terms.map(term => (
          <div key={term.label}>
            <dt>{term.label}</dt>
            <dd>
              {term.value}
              {term.note && <span className={styles.subtle}>{term.note}</span>}
            </dd>
          </div>
        ))}
      </dl>
      <div className={styles.actions}>
        <a className={styles.button} href={contract.enquiryUrl}>
          Enquire about a contract
        </a>
        <a className={`${styles.button} ${styles.buttonGhost}`} href={contract.bookingUrl} target="_blank" rel="noopener noreferrer">
          Book a call
        </a>
        <span className={styles.actionsNote}>Email opens a short template — project, timeline, budget. Or pick a time in my calendar.</span>
      </div>
    </div>
  </section>
);

export default WorkWithMe;
