import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getTopPostsByPage } from '../utils/hn';

import ItemListing from '../components/ItemListing';

export default function Home({ posts }) {
  const router = useRouter();
  return (
    <div className="container mx-auto max-w-3xl">
      <Head>
        <title>Alkemet News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <h1 className="text-2xl">Alkemet News</h1>
        <ItemListing items={posts} />
        {router.asPath != '/' && (
          <Link
            href={`/${
              router.asPath === ('/2' || '/1')
                ? ''
                : parseInt(router.asPath.replace('/', '')) - 1
            }`}
          >
            <a className="mr-6">&lt; Back</a>
          </Link>
        )}

        <Link
          href={`/${
            router.asPath === '/'
              ? '2'
              : parseInt(router.asPath.replace('/', '')) + 1
          }`}
        >
          <a>Next &gt;</a>
        </Link>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const page = context.params.page || 1;

  const res = await getTopPostsByPage(page);

  console.log(res);

  return {
    props: {
      posts: res,
    },
  };
}
