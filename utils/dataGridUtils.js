//data formatting util functions for the data grid
export const convertStateDataForDataGrid = (covidData, vaccineData) => {
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
