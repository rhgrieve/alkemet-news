import { useEffect, useState } from 'react';
import { getItemById } from '../utils/hn';
import moment from 'moment';

export default function Comment({ cId, className }) {
  var [comment, setComment] = useState({});
  var [children, setChildren] = useState();

  async function fetchComment(cId) {
    await getItemById(cId).then((res) => {
      setComment(res.data);
    });
  }

  useEffect(() => {
    fetchComment(cId);
  }, []);

  const nestedComments = ((comment && comment.kids) || []).map(
    (comment, index) => {
      return (
        <Comment
          className={`ml-${(index + 1) * 6}`}
          key={comment}
          cId={comment}
        />
      );
    }
  );

  return (
    <div className={`text-sm ${className}`}>
      <div>
        <p className="text-xs text-gray-600 mb-1">
          {comment && comment.by}{' '}
          {moment.unix(comment && comment.time).fromNow()}
        </p>
      </div>
      <div
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: comment && comment.text }}
      ></div>
      {nestedComments}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const comment = await getItemById(context.params.id);

//   return {
//     props: {
//       comment: comment.data,
//     },
//   };
// }
