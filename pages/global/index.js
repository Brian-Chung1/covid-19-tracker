import React from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Statistics, SkeletonStatistics } from '../../components/Statistics';
import Map, { SkeletonMap } from '../../components/Maps/Map';
import { getGlobalData } from '../../hooks/useGlobalData';
import { convertGlobalDataForGlobalMapChart } from '../../utils/mapUtils';
import { setGlobalStatCardData } from '../../utils/statCardFormat';
import { scaleQuantile } from 'd3-scale';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const useStyles = makeStyles((theme) => ({}));

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('Global', getGlobalData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Global = () => {
  const classes = useStyles();

  const { data, isLoading, isError, error } = useQuery('Global', getGlobalData);

  if (isLoading) {
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

  if (isError) {
    //Error Notification;
    console.log(error);
  }

  // console.log(data.Countries.map((d) => d.TotalConfirmed));

  const colorScale = scaleQuantile()
    .domain(data.Countries.map((d) => d.TotalConfirmed))
    .range([
      '#ffedea',
      '#ffcec5',
      '#ffad9f',
      '#ff8a75',
      '#ff5533',
      '#e2492d',
      '#be3d26',
      '#9a311f',
      '#782618',
    ]);

  return (
    <>
      <Head>
        <title>Global Coronavirus Dashboard</title>
        <meta
          name="description"
          content="Covid-19 Dashboard showing global coronavirus statistics with a Geographical map chart"
        />
      </Head>
      <Grid container spacing={3}>
        {/* Statistics */}
        <Grid item xs={12}>
          <Statistics data={setGlobalStatCardData(data.Global)} />
        </Grid>
        {/* US Map */}
        <Grid item xs={false} sm={12}>
          <Box border={2} borderColor="inherit">
            <Map
              data={convertGlobalDataForGlobalMapChart(data.Countries)}
              isGlobalMap={true}
              colorScale={colorScale}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Global;
