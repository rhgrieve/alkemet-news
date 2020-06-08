import Head from 'next/head';
import Link from 'next/link';

import { getItemById } from '../../utils/hn';

import CommentsView from '../../components/CommentsView';
import Layout from '../../components/Layout';
import ItemInfo from '../../components/ItemInfo';

export default function Item({ item }) {
  return (
    <Layout>
      <Head>
        <title>{item.title ? item.title : 'Alkemet News'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <Link href="/">
          <a className="text-2xl">Alkemet News</a>
        </Link>
        <ItemInfo item={item} />
        <CommentsView item={item} />
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const post = await getItemById(context.params.id);

  return {
    props: {
      item: post.data,
    },
  };
}
