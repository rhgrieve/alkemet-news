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
    <div className="container mx-auto max-w-3xl">
      <Head>
        <title>{item.title ? item.title : ''}</title>
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
              {item.type != 'comment' && (
                <span className="text-gray-700 text-sm">
                  (
                  {item.url
                    ? parse(item.url).hostname.replace('www.', '')
                    : 'self'}
                  )
                </span>
              )}
            </a>
          </div>

          <div
            className={`flex flex-row text-xs ${
              item.type === 'comment' && 'text-gray-700'
            }`}
          >
            {item.type !== 'comment' && (
              <p className="mr-1">
                <strong className={scoreStyles}>{item.score}</strong> points
              </p>
            )}
            <p className="mr-1">
              {item.type !== 'comment' ? 'by' : ''}
              {item.by}
            </p>
            <p className="mr-1">{moment.unix(item.time).fromNow()} |</p>
            {item.type !== 'comment' ? (
              <Link href={`/item/${item.id}`}>
                <a className="mr-1">
                  <span className={descendantStyles}>
                    {item.descendants || 0}
                  </span>
                  {` comment${item.descendants === 1 ? '' : 's'}`}
                </a>
              </Link>
            ) : (
              <Link href={`/item/${item.parent}`}>
                <a className="mr-1">parent</a>
              </Link>
            )}
          </div>
        </div>
        {item.text && (
          <div
            className="text-sm mb-4"
            dangerouslySetInnerHTML={{ __html: item.text }}
          ></div>
        )}

        <div className={`${item.text ? 'ml-6' : 'my-6'}`}>
          {item.kids &&
            item.kids.map((comment) => {
              return <Comment key={comment} cId={comment} />;
            })}
        </div>
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
