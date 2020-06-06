import Head from 'next/head';

import { getItemById } from '../../lib/hn';

export default function Item({ item }) {
  return (
    <div className="container">
      <Head>
        <title>{item.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{item.title}</h1>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await getItemById(context.params.id);
  console.log(res.data);

  return {
    props: {
      item: res.data,
    },
  };
}
