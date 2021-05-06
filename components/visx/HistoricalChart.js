import React, { useState, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';

import Chart from './Chart';

const SkeletonChart = () => {
  return (
    <>
      <Skeleton variant="rect" height={400} style={{ marginBottom: '24px' }} />
      <Skeleton variant="rect" height={400} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    color: 'white',
    backgroundColor: '#27273f',
    borderRadius: '6px',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '12px',
    paddingBottom: '10px',
  },
  subTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    display: 'flex',
    flex: 1,
  },
  stats: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  chart: {
    display: 'flex',
    flex: 1,
  },
  increase: {
    color: '#00f1a1',
  },
  decrease: {
    color: '#d02823',
  },
  chartTypeTooltip: {
    fontSize: theme.typography.pxToRem(14),
  },
}));

const HistoricalChart = ({
  width,
  height,
  titleLabel,
  subTitleLabel,
  cumulativeHeaderStat,
  newHeaderStat,
  subHeaderStat,
  isIncrease,
  cumulativeData,
  newData,
}) => {
  const classes = useStyles();
  // console.log(checkbox ? `${titleLabel} Cumulative` : `${titleLabel} New`);

  const [checkbox, setCheckbox] = useState(false);

  const handleCheckBox = () => {
    setCheckbox(!checkbox);
  };

  return (
    <Card>
      <Grid
        container
        direction="column"
        spacing={0}
        className={classes.container}
      >
        <Grid item className={classes.title}>
          <div>
            <div className={classes.subTitle}>
              <Typography variant="h5">{titleLabel}</Typography>
              <Tooltip
                title={
                  <Typography className={classes.chartTypeTooltip}>
                    Change Chart Type
                  </Typography>
                }
                placement="bottom"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FiberNewIcon color="secondary" />}
                      checkedIcon={<ShowChartIcon color="secondary" />}
                      name="chartTypeCheckbox"
                      checked={checkbox}
                      onChange={handleCheckBox}
                      style={{ marginLeft: '10px' }}
                      color="default"
                    />
                  }
                  label={checkbox ? 'Cumulative' : 'New'}
                />
              </Tooltip>
            </div>

            <Typography variant="h5">{subTitleLabel}</Typography>
          </div>
          <div className={classes.spacer} />
          <div className={classes.stats}>
            <Typography variant="h5">
              {checkbox ? cumulativeHeaderStat : newHeaderStat}
            </Typography>
            <Typography
              variant="h5"
              className={isIncrease ? classes.decrease : classes.increase}
            >
              {subHeaderStat}
            </Typography>
          </div>
        </Grid>
        <Grid item className={classes.chart}>
          <Chart
            hide={checkbox ? true : false}
            data={newData}
            parentWidth={width}
            parentHeight={height}
            margin={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 45,
            }}
          />
        </Grid>
        <Grid item className={classes.chart}>
          <Chart
            hide={checkbox ? false : true}
            data={cumulativeData}
            parentWidth={width}
            parentHeight={height}
            margin={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 45,
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export { HistoricalChart, SkeletonChart };
