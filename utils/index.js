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
  return data < 0 || data == null;
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

export {
  invalidDataCheck,
  formatNumber,
  formatDecimal,
  allStates,
  upperCaseFirstLetter,
  casesPercentage,
  calcPercentage,
  formatDate,
  convertParsedVaccineData,
};
