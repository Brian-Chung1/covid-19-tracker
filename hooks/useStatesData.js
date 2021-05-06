import { useQuery } from 'react-query';
import axios from 'axios';

const API_URL = 'https://disease.sh/v3/covid-19/states';

//Development URL
// const API_URL = 'http://localhost:3001/States';

export default function useStatesData() {
  return useQuery('states', () => axios.get(API_URL).then((res) => res.data));
}

const getStatesData = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export { getStatesData };
