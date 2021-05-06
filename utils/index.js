import { filter } from 'd3-array';
import { timeFormat } from 'd3-time-format';

const formatNumber = (number) => {
  if (typeof number === 'string') {
    number = parseInt(number, 10);
  }
  return !number ? 'N/A' : number.toLocaleString();
};

const formatDecimal = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const allStates = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const upperCaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const casesPercentage = (population, totalCases) => {
  const percentage = formatDecimal.format(totalCases / population) * 100;
  return percentage;
};

const invalidDataCheck = (data) => {
  return data <= 0 || data == null;
};

//Setting the labels for Stat Cards on Countries
const setCountryStatCardData = (data, vaccineData) => {
  const res = [
    {
      label: 'Total Cases',
      content: invalidDataCheck(data.cases) ? 'N/A' : formatNumber(data.cases),
      subcontent: invalidDataCheck(data.todayCases)
        ? 'N/A'
        : `${formatNumber(data.todayCases)} Cases Today`,
    },
    {
      label: 'Total Recovered',
      content: invalidDataCheck(data.recovered)
        ? 'N/A'
        : formatNumber(data.recovered),
      subcontent: invalidDataCheck(data.tests)
        ? 'N/A'
        : `${formatNumber(data.tests)} Tests`,
    },
    {
      label: 'Total Deaths',
      content: invalidDataCheck(data.deaths)
        ? 'N/A'
        : formatNumber(data.deaths),
      subcontent: invalidDataCheck(data.todayDeaths)
        ? 'N/A'
        : `${formatNumber(data.todayDeaths)} Deaths Today`,
    },
    {
      label: 'Total Vaccinated',
      content: invalidDataCheck(Object.values(vaccineData.timeline)[0])
        ? 'N/A'
        : formatNumber(Object.values(vaccineData.timeline)[0]),
      subcontent: `${formatNumber(data.population)} Total Population`,
    },
  ];
  return res;
};

//Setting the labels for Stat Cards on States
const setStateStatCardData = (data, vaccineData) => {
  const res = [
    {
      label: 'Total Cases',
      content: invalidDataCheck(data.cases) ? 'N/A' : formatNumber(data.cases),
      subcontent: invalidDataCheck(data.todayCases)
        ? ''
        : `${formatNumber(data.todayCases)} Cases Today`,
    },
    {
      label: 'Total Recovered',
      content: invalidDataCheck(data.recovered)
        ? 'N/A'
        : formatNumber(data.recovered),
      subcontent: invalidDataCheck(data.tests)
        ? ''
        : `${formatNumber(data.tests)} Total Tests`,
    },
    {
      label: 'Total Deaths',
      content: invalidDataCheck(data.deaths)
        ? 'N/A'
        : formatNumber(data.deaths),
      subcontent: invalidDataCheck(data.todayDeaths)
        ? ''
        : `${formatNumber(data.todayDeaths)} Deaths Today`,
    },
    {
      label: 'Total Vaccinated',
      content: invalidDataCheck(Object.values(vaccineData.timeline)[0])
        ? 'N/A'
        : formatNumber(Object.values(vaccineData.timeline)[0]),
      subcontent: `${formatNumber(data.population)} Total Population`,
    },
  ];
  return res;
};

//Setting the labels for Stat Cards on State Vaccines
const setStateVaccineStatCardData = (vaccineData) => {
  const pfizer = vaccineData[0];
  const moderna = vaccineData[1];
  const all = vaccineData[2];

  const res = [
    {
      label: `All Vaccines - ${all.Date}`,
      content: invalidDataCheck(all.Doses_admin)
        ? 'N/A'
        : `Doses Given: ${formatNumber(all.Doses_admin)}`,
      subcontent: invalidDataCheck(all.Doses_shipped)
        ? ''
        : `Doses Shipped: ${formatNumber(all.Doses_shipped)}`,
    },
    {
      label: `Moderna Vaccine - ${moderna.Date}`,
      content: invalidDataCheck(moderna.Doses_admin)
        ? 'N/A'
        : `Doses Given: ${formatNumber(moderna.Doses_admin)}`,
      subcontent: invalidDataCheck(moderna.Doses_shipped)
        ? ''
        : `Doses Shipped: ${formatNumber(moderna.Doses_shipped)}`,
    },
    {
      label: `Pfizer Vaccine - ${pfizer.Date}`,
      content: invalidDataCheck(pfizer.Doses_admin)
        ? 'N/A'
        : `Doses Given: ${formatNumber(pfizer.Doses_admin)}`,
      subcontent: invalidDataCheck(pfizer.Doses_shipped)
        ? ''
        : `Doses Shipped: ${formatNumber(pfizer.Doses_shipped)}`,
    },
  ];
  return res;
};

//Chart Percentage Increase / Decrease
const calcPercentage = (currDay, prevDay) => {
  const difference = currDay - prevDay;
  const percentage = (difference / prevDay) * 100;
  const result = `${percentage.toFixed(2)}%`;
  return result.charAt(0) === '-' ? result : `+ ${result}`;
};

//Formatting Time in Short Month and Day (ex. Mar 12 = March 12)
const formatDate = timeFormat('%b %d');

const formatCumulativeCasesData = (data) => {
  const res = data.map((d) => {
    return {
      date: d.date,
      data: d.cases,
    };
  });
  return res;
};

const formatCumulativeDeathsData = (data) => {
  const res = data.map((d) => {
    return {
      date: d.date,
      data: d.deaths,
    };
  });
  return res;
};

const formatNewCasesData = (data) => {
  const res = [];
  for (let i = 0; i < data.length - 1; i++) {
    const currDay = data[i + 1];
    const prevDay = data[i];
    const compare = currDay.cases - prevDay.cases;
    res.push({ date: currDay.date, data: compare });
  }

  return res;
};

const formatNewDeathsData = (data) => {
  const res = [];
  for (let i = 0; i < data.length - 1; i++) {
    const currDay = data[i + 1];
    const prevDay = data[i];
    const compare = currDay.deaths - prevDay.deaths;
    res.push({ date: currDay.date, data: compare });
  }

  return res;
};

const convertStateDataForMapChart = (covidData, vaccineData) => {
  const filter = [
    'American Samoa',
    'Diamond Princess Ship',
    'District Of Columbia',
    'Federal Prisons',
    'Grand Princess Ship',
    'Navajo Nation',
    'US Military',
    'Veteran Affairs',
    'Wuhan Repatriated',
    'United States Virgin Islands',
    'Northern Mariana Islands',
  ];
  let vaxObj = {};
  for (let i = 0; i < vaccineData.length; i++) {
    vaxObj[vaccineData[i].state] = Object.values(vaccineData[i].timeline)[0];
  }

  let newObj = {};
  for (let i = 0; i < covidData.length; i++) {
    if (filter.includes(covidData[i].state)) continue;
    newObj[covidData[i].state] = {
      ...covidData[i],
      vaccinated: vaxObj[covidData[i].state],
    };
  }
  return newObj;
};

const convertStateDataForDataGrid = (covidData, vaccineData) => {
  const filter = [
    'American Samoa',
    'Diamond Princess Ship',
    'District Of Columbia',
    'Federal Prisons',
    'Grand Princess Ship',
    'Navajo Nation',
    'US Military',
    'Veteran Affairs',
    'Wuhan Repatriated',
    'United States Virgin Islands',
    'Northern Mariana Islands',
  ];

  let vaxObj = {};

  for (let i = 0; i < vaccineData.length; i++) {
    vaxObj[vaccineData[i].state] = Object.values(vaccineData[i].timeline)[0];
  }

  let index = 1;
  const res = covidData.reduce(function (result, elt) {
    if (!filter.includes(elt.state)) {
      result.push({ id: index++, ...elt, vaccinated: vaxObj[elt.state] });
    }

    return result;
  }, []);

  return res;
};

const convertParsedVaccineData = (vaccineData) => {
  const filter = [
    'American Samoa',
    'Northern Mariana Islands',
    'Puerto Rico',
    'Virgin Islands',
    'Department of Defense',
    'Federal Bureau of Prisons',
    'Indian Health Services',
    'Long Term Care (LTC) Program',
    'Veterans Health Administration',
  ];

  let resData = [];
  let pfizer = {};
  let moderna = {};
  let all = {};

  for (let i = 0; i < vaccineData.length; i++) {
    const curr = vaccineData[i];
    const vaccineType = curr.Vaccine_Type;

    if (!filter.includes(curr.Province_State)) {
      if (vaccineType === 'Pfizer') {
        pfizer[curr.Province_State] = curr;
      } else if (vaccineType === 'Moderna') {
        moderna[curr.Province_State] = curr;
      } else if (vaccineType === 'All') {
        all[curr.Province_State] = curr;
      }
    }
  }

  resData = [pfizer, moderna, all];

  return resData;
};

const formatStateHistoricalVaccineData = (vaccineData) => {
  let newData = [];
  for (const [key, value] of Object.entries(vaccineData.timeline)) {
    newData.push({ date: key, data: value });
  }
  return newData;
};

const formatCumulativeVaccineData = (vaccineData) => {
  const data = formatStateHistoricalVaccineData(vaccineData);
  const res = [];
  for (let i = 0; i < data.length - 1; i++) {
    const currDay = data[i + 1];
    const prevDay = data[i];
    const compare = currDay.data - prevDay.data;
    res.push({ date: currDay.date, data: compare });
  }

  return res;
};

const convertGlobalDataForGlobalMapChart = (covidData) => {
  const invalidCountryDataFilter = [
    'W. Sahara',
    'Greenland',
    'North Korea',
    'Turkmenistan',
    'Antarctica',
    'Fr. S. Antarctic Lands',
    'New Caledonia',
  ];

  // prettier-ignore
  const countryRemapFilter = { 
    'Congo (Kinshasa)': 'Dem. Rep. Congo',
    'Congo (Brazzaville)': 'Congo',
    'Equatorial Guinea': 'Eq. Guinea',
    'Dominican Republic': 'Dominican Rep.',
    'Venezuela (Bolivarian Republic)': 'Venezuela',
    'Tanzania, United Republic of': 'Tanzania',
    'South Sudan': 'S. Sudan',
    'Central African Republic': 'Central African Rep.',
    'Solomon Islands': 'Solomon Is.',
    'Brunei Darussalam': 'Brunei',
    'Lao PDR': 'Laos',
    'Viet Nam': 'Vietnam',
    'Russian Federation': 'Russia',
    'Iran, Islamic Republic of': 'Iran',
    'Palestinian Territory': 'Palestine',
    'Czech Republic': 'Czechia',
    'Bosnia and Herzegovina': 'Bosnia and Herz.',
    'Macedonia, Republic of': 'Macedonia',
    'Republic of Kosovo': 'Kosovo',
    'Korea (South)': 'South Korea',
    'Taiwan, Republic of China': 'Taiwan',
  };

  let obj = {};
  for (let i = 0; i < covidData.length; i++) {
    let country = covidData[i].Country;
    if (!invalidCountryDataFilter[country]) {
      country = countryRemapFilter[country]
        ? countryRemapFilter[country]
        : country;

      obj[country] = {
        ...covidData[i],
      };
    }
  }
  return obj;
};

const setGlobalStatCardData = (data) => {
  const res = [
    {
      label: 'Total Cases',
      content: invalidDataCheck(data.TotalConfirmed)
        ? 'N/A'
        : formatNumber(data.TotalConfirmed),
      subcontent: invalidDataCheck(data.NewConfirmed)
        ? '0'
        : `${formatNumber(data.NewConfirmed)} New Cases`,
    },
    {
      label: 'Total Recovered',
      content: invalidDataCheck(data.TotalRecovered)
        ? 'N/A'
        : formatNumber(data.TotalRecovered),
      subcontent: invalidDataCheck(data.NewRecovered)
        ? '0'
        : `${formatNumber(data.NewRecovered)} New Recovered`,
    },
    {
      label: 'Total Deaths',
      content: invalidDataCheck(data.TotalDeaths)
        ? 'N/A'
        : formatNumber(data.TotalDeaths),
      subcontent: invalidDataCheck(data.NewDeaths)
        ? '0'
        : `${formatNumber(data.NewDeaths)} Deaths Today`,
    },
    {
      label: 'Total Population',
      content: '7.6 billion',
      subcontent: `Data as of ${data.Date.slice(0, 10)}`,
    },
  ];
  return res;
};

export {
  formatNumber,
  formatDecimal,
  allStates,
  upperCaseFirstLetter,
  casesPercentage,
  setCountryStatCardData,
  setStateStatCardData,
  calcPercentage,
  formatDate,
  formatCumulativeCasesData,
  formatCumulativeDeathsData,
  formatNewCasesData,
  formatNewDeathsData,
  convertStateDataForMapChart,
  convertStateDataForDataGrid,
  convertParsedVaccineData,
  setStateVaccineStatCardData,
  formatStateHistoricalVaccineData,
  formatCumulativeVaccineData,
  convertGlobalDataForGlobalMapChart,
  setGlobalStatCardData,
};
