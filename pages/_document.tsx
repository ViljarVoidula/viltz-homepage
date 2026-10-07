import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#202023" />
        <meta name="msapplication-TileColor" content="#202023" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f0e7db" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#202023" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
