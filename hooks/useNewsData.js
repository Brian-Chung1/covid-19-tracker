import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://covid-19-tracker-one-lyart.vercel.app'
    : 'http://localhost:3000';

const getAllNewsArticles = async () => {
  const uri = `${API_URL}/api/news/all`;
  const { data } = await axios.get(uri);
  return data;
};

const getNewsArticles = async (type) => {
  const uri = `${API_URL}/api/news/${type}`;
  const { data } = await axios.get(uri);
  return data;
};

export { getAllNewsArticles, getNewsArticles };
