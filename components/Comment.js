import { useEffect, useState } from 'react';
import { getItemById } from '../lib/hn';
import moment from 'moment';

export default function Comment({ cId }) {
  var [comment, setComment] = useState({});

  useEffect(() => {
    async function fetchComment() {
      await getItemById(cId).then((res) => {
        setComment(res.data);
      });
    }
    fetchComment();
  }, []);

  return (
    <div className="text-sm">
      <div>
        <p className="text-xs text-gray-600 mb-1">
          {comment.by} {moment.unix(comment.time).fromNow()}
        </p>
      </div>
      <div
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: comment && comment.text }}
      ></div>
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
