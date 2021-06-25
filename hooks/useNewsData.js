import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://covid-19-tracker-one-lyart.vercel.app'
    : 'http://localhost:3000';

const getNewsArticles = async (type, page = 0) => {
  const uri = `${API_URL}/api/news/${type}/${page}`;
  const { data } = await axios.get(uri);
  return data;
};

export { getNewsArticles };
