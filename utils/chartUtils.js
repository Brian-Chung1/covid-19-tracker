//data formatting util functions for the charts
export const formatCumulativeCasesData = (data) => {
  const res = data.map((d) => {
    return {
      date: d.date,
      data: d.cases,
    };
  });
  return res;
};

export const formatCumulativeDeathsData = (data) => {
  const res = data.map((d) => {
    return {
      date: d.date,
      data: d.deaths,
    };
  });
  return res;
};

export const formatNewCasesData = (data) => {
  const res = [];
  for (let i = 0; i < data.length - 1; i++) {
    const currDay = data[i + 1];
    const prevDay = data[i];
    const compare = currDay.cases - prevDay.cases;
    res.push({ date: currDay.date, data: compare });
  }

  return res;
};

export const formatNewDeathsData = (data) => {
  const res = [];
  for (let i = 0; i < data.length - 1; i++) {
    const currDay = data[i + 1];
    const prevDay = data[i];
    const compare = currDay.deaths - prevDay.deaths;
    res.push({ date: currDay.date, data: compare });
  }

  return res;
};

export const formatStateHistoricalVaccineData = (vaccineData) => {
  let newData = [];
  for (const [key, value] of Object.entries(vaccineData.timeline)) {
    newData.push({ date: key, data: value });
  }
  return newData;
};

export const formatCumulativeVaccineData = (vaccineData) => {
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
