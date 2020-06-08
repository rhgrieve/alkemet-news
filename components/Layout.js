import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div className="container mx-auto max-w-3xl">
      <Head>
        <title>Alkemet News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </div>
  );
}
