import Head from 'next/head';
import Link from 'next/link';
import classNames from 'classnames';

import { getTopPostsByPage } from '../lib/hn';

import { parse } from 'url';

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>HackerNews</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <h1 className="text-2xl">HackerNews</h1>
        <div>
          {posts &&
            posts.map((post) => {
              const scoreStyles = classNames({
                'text-orange-500': post.score > 300 ? true : false,
              });

              const descendantStyles = classNames({
                'text-orange-500 font-bold':
                  post.descendants > 100 ? true : false,
              });
              return (
                <div key={post.id} className="my-2">
                  <a href={post.url} target="_blank">
                    {post.title}{' '}
                    <span className="text-gray-700 text-sm">
                      ({post.url && parse(post.url).hostname})
                    </span>
                  </a>

                  <div className="flex flex-row text-xs">
                    <p className="mr-1">
                      <strong className={scoreStyles}>{post.score}</strong>{' '}
                      points
                    </p>
                    <p className="mr-1">by {post.by}</p>
                    <p className="mr-1">
                      |{' '}
                      <span className={descendantStyles}>
                        {post.descendants || 0}
                      </span>
                      {` comment${post.descendants === 1 ? '' : 's'}`}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
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
