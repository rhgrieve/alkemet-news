import Head from 'next/head';
import Link from 'next/link';
import classNames from 'classnames';
import moment from 'moment';

import { getTopPostsByPage } from '../utils/hn';

import { parse } from 'url';

export default function Home({ posts }) {
  return (
    <div className="container mx-auto max-w-3xl">
      <Head>
        <title>Alkemet News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <h1 className="text-2xl">Alkemet News</h1>
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
                  <div className="flex flex-row">
                    {post.url ? (
                      <a href={post.url} target="_blank">
                        {post.title}{' '}
                        <span className="text-gray-700 text-sm">
                          ({parse(post.url).hostname.replace('www.', '')})
                        </span>
                      </a>
                    ) : (
                      <Link href={`/item/${post.id}`}>
                        <a>
                          {post.title}{' '}
                          <span className="text-gray-700 text-sm">(self)</span>
                        </a>
                      </Link>
                    )}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 mt-1 ml-2 hidden"
                    >
                      <path
                        className="heroicon-ui"
                        d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"
                      />
                    </svg>
                  </div>

                  <div className="flex flex-row text-xs">
                    <p className="mr-1">
                      <strong className={scoreStyles}>{post.score}</strong>{' '}
                      points
                    </p>
                    <p className="mr-1">by {post.by}</p>
                    <p className="mr-1">{moment.unix(post.time).fromNow()} |</p>
                    <Link href={`/item/${post.id}`}>
                      <a className="mr-1">
                        <span className={descendantStyles}>
                          {post.descendants || 0}
                        </span>
                        {` comment${post.descendants === 1 ? '' : 's'}`}
                      </a>
                    </Link>
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
