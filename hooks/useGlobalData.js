import { useQuery } from 'react-query';
import axios from 'axios';

const API_URL = 'https://api.covid19api.com/summary';

const getGlobalData = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export { getGlobalData };
