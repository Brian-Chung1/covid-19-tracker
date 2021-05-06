import { useQuery } from 'react-query';
import axios from 'axios';

const API_URL = 'https://disease.sh/v3/covid-19/states';
const HISTORICAL_API_URL = 'https://disease.sh/v3/covid-19/nyt/states';
// const API_URL = 'http://localhost:3001';
// const HISTORICAL_API_URL = 'http://localhost:3001/historical';

const getStateData = async (state) => {
  const uri = `${API_URL}/${state}`;
  const { data } = await axios.get(uri);
  return data;
};

const getStateHistoricalData = async (state) => {
  const uri = `${HISTORICAL_API_URL}/${state}`;
  const { data } = await axios.get(uri);
  return data;
};

export default function useStateData(state) {
  return useQuery(['covidStateData', state], () => getStateData(state));
}

export { getStateData, getStateHistoricalData };
