import moment from 'moment';
import classNames from 'classnames';
import Link from 'next/link';

import Comment from './Comment';

export default function CommentsView({ item }) {
  const scoreStyles = classNames({
    'text-orange-500': item.score > 300 ? true : false,
  });

  const descendantStyles = classNames({
    'text-orange-500 font-bold': item.descendants > 100 ? true : false,
  });
  return (
    <div>
      <div>
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
    </div>
  );
}
