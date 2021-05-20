import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { Statistics, SkeletonStatistics } from '../../components/Statistics';
import Map, { SkeletonMap } from '../../components/Map';

import { getGlobalData } from '../../hooks/useGlobalData';

import {
  formatNumber,
  convertGlobalDataForGlobalMapChart,
  setGlobalStatCardData,
} from '../../utils/index';

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
          <Box border={4} borderColor="inherit">
            <Map
              data={convertGlobalDataForGlobalMapChart(data.Countries)}
              isGlobalMap={true}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Global;
