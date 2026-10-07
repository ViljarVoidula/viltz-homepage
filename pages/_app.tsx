import type { AppProps } from 'next/app';
import Head from 'next/head';
import { M_PLUS_Rounded_1c, Source_Sans_3 } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Layout from '../components/layout';
import '../styles/globals.css';

const rounded = M_PLUS_Rounded_1c({ weight: ['500', '700', '800'], subsets: ['latin'], display: 'swap', variable: '--font-rounded' });
const sans = Source_Sans_3({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });

const Website = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    {/* next/font variables are scoped to this element, so expose them on :root for body styles too. */}
    <style jsx global>{`
      :root {
        --font-rounded: ${rounded.style.fontFamily};
        --font-sans: ${sans.style.fontFamily};
      }
    `}</style>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
);

export default Website;
