import { useQuery } from 'react-query';
import axios from 'axios';
import Papa from 'papaparse';
import { convertParsedVaccineData } from '../utils/index';

const GLOBAL_API_URL = 'https://disease.sh/v3/covid-19/vaccine/coverage';

const COUNTRY_API_URL =
  'https://disease.sh/v3/covid-19/vaccine/coverage/countries';

const STATE_API_URL = 'https://disease.sh/v3/covid-19/vaccine/coverage/states';

const JHU_STATE_API_URL =
  'https://raw.githubusercontent.com/govex/COVID-19/master/data_tables/vaccine_data/us_data/hourly/vaccine_data_us.csv';

const getGlobalVaccineData = async (fullData, lastdays) => {
  const uri = `${GLOBAL_API_URL}?lastdays=${lastdays}&fullData=${fullData}`;
  const { data } = await axios.get(uri);
  return data;
};

const getAllCountriesVaccineData = async (fullData, lastdays) => {
  const uri = `${COUNTRY_API_URL}?lastdays=${lastdays}&fullData=${fullData}`;
  const { data } = await axios.get(uri);
  return data;
};

const getCountryVaccineData = async (country, fullData, lastdays) => {
  const uri = `${COUNTRY_API_URL}/${country}?lastdays=${lastdays}&fullData=${fullData}`;
  const { data } = await axios.get(uri);
  return data;
};

const getAllStatesVaccineData = async (fullData, lastdays) => {
  const uri = `${STATE_API_URL}?lastdays=${lastdays}&fullData=${fullData}`;
  const { data } = await axios.get(uri);
  return data;
};

const getStateVaccineData = async (state, fullData, lastdays) => {
  const uri = `${STATE_API_URL}/${state}?lastdays=${lastdays}&fullData=${fullData}`;
  const { data } = await axios.get(uri);
  return data;
};

const getAllStatesVaccineDataDev = async () => {
  const { data } = await axios.get('http://localhost:3001/StatesVaccines');
  return data;
};

const getDetailedAllStatesVaccineData = async () => {
  try {
    const { data } = await axios.get(JHU_STATE_API_URL);
    const parsed = await Papa.parse(data, { header: true });
    return convertParsedVaccineData(parsed.data);
  } catch (err) {
    console.log(err);
  }
};

export {
  getGlobalVaccineData,
  getAllCountriesVaccineData,
  getCountryVaccineData,
  getAllStatesVaccineData,
  getStateVaccineData,
  getAllStatesVaccineDataDev,
  getDetailedAllStatesVaccineData,
};
