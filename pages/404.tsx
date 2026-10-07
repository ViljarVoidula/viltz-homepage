import Head from 'next/head';
import Link from 'next/link';
import Deer from '../components/deer';
import styles from '../styles/cv.module.css';

const NotFound = () => (
  <>
    <Head>
      <title>Not found — Viljar Võidula</title>
    </Head>
    <div className={styles.notFound}>
      <Deer width={96} />
      <h1>Not found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">Back to the CV</Link>
    </div>
  </>
);

export default NotFound;
