import axios from 'axios';
import paginate from './paginate';

const URL = 'https://hacker-news.firebaseio.com/v0/';
const TOP_STORIES = 'topstories.json';
const PRETTY = '?print=pretty';

export const getTopPostsByPage = async (page, pagination = 30) => {
  const res = await axios.get(URL + TOP_STORIES + PRETTY).then((res) => {
    return Promise.all(
      paginate(res.data, pagination, page).map(async (pid) => {
        let res = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${pid}.json?print=pretty`
        );
        return res.data;
      })
    );
  });
  return res;
};

export const getItemById = async (id) => {
  const res = await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  );
  return res;
};

// const res = await axios.get(
//   `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
// );
// .then((res) => {
//   return Promise.all(
//     paginate(res.data, 30, 1).map(async (pid) => {
//       let res = await axios.get(
//         `https://hacker-news.firebaseio.com/v0/item/${pid}.json?print=pretty`
//       );
//       return res.data;
//     })
//   );
// });

// console.log(res);
