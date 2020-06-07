import Head from 'next/head';
import Link from 'next/link';
import { parse } from 'url';
import classNames from 'classnames';
import moment from 'moment';

import { getItemById } from '../../utils/hn';

import Comment from '../../components/Comment';

export default function Item({ item }) {
  const scoreStyles = classNames({
    'text-orange-500': item.score > 300 ? true : false,
  });

  const descendantStyles = classNames({
    'text-orange-500 font-bold': item.descendants > 100 ? true : false,
  });
  return (
    <div className="container mx-auto">
      <Head>
        <title>{item.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <h1 className="text-2xl">
          <Link href="/">
            <a>Alkemet News</a>
          </Link>
        </h1>
        <div key={item.id} className="my-2">
          <div className="flex flex-row">
            <a href={item.url} target="_blank">
              {item.title}{' '}
              <span className="text-gray-700 text-sm">
                (
                {item.url
                  ? parse(item.url).hostname.replace('www.', '')
                  : 'self'}
                )
              </span>
            </a>
          </div>

          <div className="flex flex-row text-xs">
            <p className="mr-1">
              <strong className={scoreStyles}>{item.score}</strong> points
            </p>
            <p className="mr-1">by {item.by}</p>
            <p className="mr-1">{moment.unix(item.time).fromNow()} |</p>
            <Link href={`/item/${item.id}`}>
              <a className="mr-1">
                <span className={descendantStyles}>
                  {item.descendants || 0}
                </span>
                {` comment${item.descendants === 1 ? '' : 's'}`}
              </a>
            </Link>
          </div>
        </div>
        {item.kids.map((comment) => {
          return <Comment key={comment} className="my-6" cId={comment} />;
        })}
      </main>
    </div>
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
