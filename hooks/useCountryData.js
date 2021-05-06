import { useQuery } from 'react-query';
import axios from 'axios';

const API_URL = 'https://disease.sh/v3/covid-19/countries';

//Development URL
// const API_URL = 'http://localhost:3001';

const getCountryData = async (country) => {
  const { data } = await axios.get(`${API_URL}/${country}`);
  return data;
};

export default function useCountryData() {
  return useQuery('country', getCountryData);
}

export { getCountryData };
