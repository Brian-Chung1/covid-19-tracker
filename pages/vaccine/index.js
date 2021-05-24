import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { scaleQuantile } from 'd3-scale';
import Map, { SkeletonMap } from '../../components/Maps/Map';
import { getDetailedAllStatesVaccineData } from '../../hooks/useVaccineData';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import StateSearch from '../../components/StateSearch';
import Head from 'next/head';

const useStyles = makeStyles((theme) => ({
  mapButtons: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    'Detailed-US-States-Vaccine',
    getDetailedAllStatesVaccineData
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Vaccine() {
  const classes = useStyles();
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, isLoading, isError, error } = useQuery(
    'Detailed-US-States-Vaccine',
    getDetailedAllStatesVaccineData
  );

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Skeleton
            variant="text"
            height={60}
            style={{ marginBottom: '10px' }}
          />
        </Grid>
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

  const getDomain = (data) => {
    let admin = [];
    for (const state in data) {
      admin.push(data[state].Doses_admin);
    }
    return admin;
  };

  const colorScale = scaleQuantile()
    .domain(getDomain(data[2]))
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
    <main>
      <Head>
        <title>US States Vaccine Statistics</title>
        <meta
          name="description"
          content="Covid-19 Vaccine statistics for all US States including Moderna and Pfizer"
        />
      </Head>
      <Grid container spacing={3}>
        <Grid item xs={false} sm={12}>
          <StateSearch endpoint={'vaccine'} />
        </Grid>
        <Grid item xs={false} sm={12}>
          <Paper className={classes.mapButtons}>
            <Tabs
              value={value}
              indicatorColor="secondary"
              textColor="inherit"
              onChange={handleChange}
            >
              <Tab value={2} label="All Data" />
              <Tab value={1} label="Moderna Data" />
              <Tab value={0} label="Pfizer Data" />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={false} sm={12}>
          <Map data={data[value]} isVaccineMap={true} colorScale={colorScale} />
        </Grid>
      </Grid>
    </main>
  );
}
