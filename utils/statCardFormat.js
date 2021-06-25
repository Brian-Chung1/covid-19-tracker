import { invalidDataCheck, formatNumber } from './index';

const extractAndFormatData = (data, attributeNames, invalidIdentifier) => {
  const newData = {};
  for (const [key, value] of Object.entries(data)) {
    if (attributeNames.includes(key)) {
      newData[key] = invalidDataCheck(value)
        ? invalidIdentifier
        : formatNumber(value);
    }
  }
  return newData;
};

//Setting the labels for Stat Cards on Global
export const setGlobalStatCardData = (data) => {
  const formattedData = extractAndFormatData(
    data,
    [
      'TotalConfirmed',
      'NewConfirmed',
      'TotalRecovered',
      'NewRecovered',
      'TotalDeaths',
      'NewDeaths',
    ],
    'N/A'
  );

  const res = [
    {
      label: 'Total Cases',
      content: formattedData.TotalConfirmed,
      subcontent: `${formattedData.NewConfirmed} New Cases`,
      color: '#de3700',
    },
    {
      label: 'Total Recovered',
      content: formattedData.TotalRecovered,
      subcontent: `${formattedData.NewRecovered} New Recovered`,
      color: '#3a9a50',
    },
    {
      label: 'Total Deaths',
      content: formattedData.TotalDeaths,
      subcontent: `${formattedData.NewDeaths} Deaths Today`,
      color: '#767676',
    },
    {
      label: 'Total Population',
      content: '7.6 billion',
      subcontent: `Data as of ${data.Date.slice(0, 10)}`,
      color: '#306cb2',
    },
  ];
  return res;
};

//Setting the labels for Stat Cards on Countries
export const setCountryStatCardData = (data, vaccineData) => {
  const formattedData = extractAndFormatData(
    data,
    ['cases', 'todayCases', 'recovered', 'tests', 'deaths', 'todayDeaths'],
    'N/A'
  );

  const res = [
    {
      label: 'Total Cases',
      content: formattedData.cases,
      subcontent: `Cases Today: ${formattedData.todayCases}`,
      color: '#de3700',
    },
    {
      label: 'Total Recovered',
      content: formattedData.recovered,
      subcontent: `Tests: ${formattedData.tests}`,
      color: '#3a9a50',
    },
    {
      label: 'Total Deaths',
      content: formattedData.deaths,
      subcontent: `Deaths Today: ${formattedData.todayDeaths}`,
      color: '#767676',
    },
    {
      label: 'Total Vaccinated',
      content: invalidDataCheck(Object.values(vaccineData.timeline)[0])
        ? 'N/A'
        : formatNumber(Object.values(vaccineData.timeline)[0]),
      subcontent: `Population: ${formatNumber(data.population)}`,
      color: '#306cb2',
    },
  ];
  return res;
};

//Setting the labels for Stat Cards on States
export const setStateStatCardData = (data, vaccineData) => {
  const formattedData = extractAndFormatData(
    data,
    ['cases', 'todayCases', 'recovered', 'tests', 'deaths', 'todayDeaths'],
    'N/A'
  );

  const res = [
    {
      label: 'Total Cases',
      content: formattedData.cases,
      subcontent: `Cases Today: ${formattedData.todayCases}`,
      color: '#de3700',
    },
    {
      label: 'Total Recovered',
      content: formattedData.recovered,
      subcontent: `Total Tests: ${formattedData.tests}`,
      color: '#3a9a50',
    },
    {
      label: 'Total Deaths',
      content: formattedData.deaths,
      subcontent: `Deaths Today: ${formattedData.todayDeaths}`,
      color: '#767676',
    },
    {
      label: 'Total Vaccinated',
      content: invalidDataCheck(Object.values(vaccineData.timeline)[0])
        ? 'N/A'
        : formatNumber(Object.values(vaccineData.timeline)[0]),
      subcontent: `${formatNumber(data.population)} Total Population`,
      color: '#306cb2',
    },
  ];
  return res;
};

//Setting the labels for Stat Cards on State Vaccines
export const setStateVaccineStatCardData = (vaccineData) => {
  const attributes = ['Doses_admin', 'Doses_shipped'];
  const pfizer = extractAndFormatData(vaccineData[0], attributes, 'N/A');
  const moderna = extractAndFormatData(vaccineData[1], attributes, 'N/A');
  const all = extractAndFormatData(vaccineData[2], attributes, 'N/A');

  const res = [
    {
      label: `All - Doses Given`,
      content: all.Doses_admin,
      subcontent: `Doses Shipped: ${all.Doses_shipped}`,
      color: '#306cb2',
    },
    {
      label: `Moderna - Doses Given`,
      content: moderna.Doses_admin,
      subcontent: `Doses Shipped: ${moderna.Doses_shipped}`,
      color: '#e31936',
    },
    {
      label: `Pfizer - Doses Given`,
      content: pfizer.Doses_admin,
      subcontent: `Doses Shipped: ${pfizer.Doses_shipped}`,
      color: '#7dba00',
    },
  ];
  return res;
};
