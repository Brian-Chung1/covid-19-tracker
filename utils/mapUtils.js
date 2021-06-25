//data formatting util functions for the maps
export const convertGlobalDataForGlobalMapChart = (covidData) => {
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

export const convertStateDataForMapChart = (covidData, vaccineData) => {
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
