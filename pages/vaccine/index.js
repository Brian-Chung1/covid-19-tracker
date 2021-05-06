import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Statistics, SkeletonStatistics } from '../../components/Statistics';
import Map, { SkeletonMap } from '../../components/Map';

import { getDetailedAllStatesVaccineData } from '../../hooks/useVaccineData';
import { formatNumber } from '../../utils/index';

import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import StateSearch from '../../components/StateSearch';

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

  return (
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
        <Map data={data[value]} isVaccineMap={true} />
      </Grid>
    </Grid>
  );
}
