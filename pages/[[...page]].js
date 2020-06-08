import { getTopPostsByPage } from '../utils/hn';

import ItemListing from '../components/ItemListing';
import PageNavigation from '../components/PageNavigation';
import Layout from '../components/Layout';

export default function Home({ posts }) {
  return (
    <Layout>
      <main className="p-4">
        <h1 className="text-2xl">Alkemet News</h1>
        <ItemListing items={posts} />
        <PageNavigation />
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const page = context.params.page || 1;

  const res = await getTopPostsByPage(page);

  return {
    props: {
      posts: res,
    },
  };
}
