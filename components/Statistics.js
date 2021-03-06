import React from 'react';
import { StatCard, SkeletonStatCard } from './StatCard';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 182,
  },
}));

const SkeletonStatistics = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <SkeletonStatCard />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SkeletonStatCard />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SkeletonStatCard />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SkeletonStatCard />
      </Grid>
    </Grid>
  );
};

const Statistics = ({ data }) => {
  const classes = useStyles();

  if (!data) {
    return <SkeletonStatistics />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <StatCard
          label={data[0].label}
          content={data[0].content}
          subcontent={data[0].subcontent}
          color={data[0].color ? data[0].color : null}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatCard
          label={data[1].label}
          content={data[1].content}
          subcontent={data[1].subcontent}
          color={data[1].color ? data[1].color : null}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatCard
          label={data[2].label}
          content={data[2].content}
          subcontent={data[2].subcontent}
          color={data[2].color ? data[2].color : null}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatCard
          label={data[3].label}
          content={data[3].content}
          subcontent={data[3].subcontent}
          color={data[3].color ? data[3].color : null}
        />
      </Grid>
    </Grid>
  );
};

export { Statistics, SkeletonStatistics };
