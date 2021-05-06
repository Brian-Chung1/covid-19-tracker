import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { Statistics, SkeletonStatistics } from '../components/Statistics';
import Map, { SkeletonMap } from '../components/Map';

import { getStatesData } from '../hooks/useStatesData';
import { getCountryData } from '../hooks/useCountryData';
import {
  getCountryVaccineData,
  getAllStatesVaccineData,
} from '../hooks/useVaccineData';

import {
  formatNumber,
  convertStateDataForMapChart,
  setCountryStatCardData,
} from '../utils/index';

import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const useStyles = makeStyles((theme) => ({}));

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('USA', () => getCountryData('USA'));
  await queryClient.prefetchQuery('US-States', getStatesData);
  await queryClient.prefetchQuery('USAVaccine', () =>
    getCountryVaccineData('usa', false, 1)
  );
  await queryClient.prefetchQuery('US-States-Vaccine', () =>
    getAllStatesVaccineData(false, 1)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const classes = useStyles();

  const {
    data: countryData,
    isLoading: isCountryLoading,
    isError: isCountryError,
    error: countryError,
  } = useQuery('USA', () => getCountryData('USA'));

  const {
    data: statesData,
    isLoading: isStatesLoading,
    isError: isStatesError,
    error: statesError,
  } = useQuery('US-States', getStatesData);

  const {
    data: countryVaccineData,
    isLoading: isCountryVaccineLoading,
    isError: isCountryVaccineError,
    error: countryVaccineError,
  } = useQuery('USAVaccine', () => getCountryVaccineData('usa', false, 1));

  const {
    data: stateVaccineData,
    isLoading: isStateVaccineLoading,
    isError: isStateVaccineError,
    error: stateVaccineError,
  } = useQuery('US-States-Vaccine', () => getAllStatesVaccineData(false, 1));

  if (
    isCountryLoading ||
    isStatesLoading ||
    isCountryVaccineLoading ||
    isStateVaccineLoading
  ) {
    return (
      <Grid container spacing={3}>
        {/* Statistics */}
        <Grid item xs={12}>
          <SkeletonStatistics />
        </Grid>
        {/* US Map */}
        <Grid item xs={false} sm={12} md={12} lg={12}>
          <SkeletonMap />
        </Grid>
      </Grid>
    );
  }

  if (
    isCountryError ||
    isStatesError ||
    isCountryVaccineError ||
    isStateVaccineError
  ) {
    //Error Notification;
    console.log(countryError);
    console.log(statesError);
    console.log(countryVaccineError);
    console.log(stateVaccineError);
  }

  return (
    <Grid container spacing={3}>
      {/* Statistics */}
      <Grid item xs={12}>
        <Statistics
          data={setCountryStatCardData(countryData, countryVaccineData)}
        />
      </Grid>
      {/* US Map */}
      <Grid item xs={false} sm={12}>
        <Map data={convertStateDataForMapChart(statesData, stateVaccineData)} />
      </Grid>
    </Grid>
  );
}
