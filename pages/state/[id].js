import { useState, useEffect } from 'react';
import { getStateData, getStateHistoricalData } from '../../hooks/useStateData';
import { useQuery, QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { dehydrate } from 'react-query/hydration';

import { Statistics, SkeletonStatistics } from '../../components/Statistics';
import {
  HistoricalChart,
  SkeletonChart,
} from '../../components/visx/HistoricalChart';
import {
  upperCaseFirstLetter,
  setStateStatCardData,
  calcPercentage,
  formatNumber,
  formatCumulativeCasesData,
  formatCumulativeDeathsData,
  formatNewCasesData,
  formatNewDeathsData,
} from '../../utils/index';
import { getStateVaccineData } from '../../hooks/useVaccineData';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { ParentSize } from '@visx/responsive';

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(`${context.params.id}`, () =>
    getStateData(context.params.id)
  );
  //testing
  // await queryClient.prefetchQuery('stateHistorical', () =>
  //   getStateHistoricalData('')
  // );
  await queryClient.prefetchQuery(`${context.params.id}Historical`, () =>
    getStateHistoricalData(context.params.id)
  );
  await queryClient.prefetchQuery(`${context.params.id}Vaccine`, () =>
    getStateVaccineData(context.params.id, false, 1)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const useStyles = makeStyles((theme) => ({
  chart: {
    minHeight: '400px',
  },
}));

const State = () => {
  const classes = useStyles();
  const router = useRouter();

  const [cumulativeCases, setCumulativeCases] = useState([]);
  const [cumulativeDeaths, setCumulativeDeaths] = useState([]);
  const [newCases, setNewCases] = useState([]);
  const [newDeaths, setNewDeaths] = useState([]);

  useEffect(() => {
    if (historicalData && isHistoricalSuccess) {
      const getCumulativeCases = formatCumulativeCasesData(historicalData);
      const getCumulativeDeaths = formatCumulativeDeathsData(historicalData);
      const getNewCases = formatNewCasesData(historicalData);
      const getNewDeaths = formatNewDeathsData(historicalData);

      setNewCases(getNewCases);
      setNewDeaths(getNewDeaths);
      setCumulativeCases(getCumulativeCases);
      setCumulativeDeaths(getCumulativeDeaths);
    }
  }, []);

  const {
    data: stateData,
    error: stateError,
    isFetching: isStateFetching,
    isLoading: isStateLoading,
    isError: isStateError,
  } = useQuery(router.query.id, () => getStateData(router.query.id));

  const {
    data: historicalData,
    error: historicalError,
    isFetching: isHistoricalFetching,
    isLoading: isHistoricalLoading,
    isError: isHistoricalError,
    isSuccess: isHistoricalSuccess,
  } = useQuery(`${router.query.id}Historical`, () =>
    getStateHistoricalData(router.query.id)
  );

  const {
    data: vaccineData,
    error: vaccineError,
    isFetching: isVaccineFetching,
    isLoading: isVaccineLoading,
    isError: isVaccineError,
    isSuccess: isVaccineSuccess,
  } = useQuery(`${router.query.id}Vaccine`, () =>
    getStateVaccineData(router.query.id, false, 1)
  );

  console.log(router.query.id);

  if (
    isStateLoading ||
    isStateFetching ||
    isHistoricalLoading ||
    isHistoricalFetching ||
    isVaccineLoading ||
    isVaccineFetching
  ) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SkeletonStatistics />
        </Grid>
        <Grid item xs={false} sm={12} md={12} lg={12}>
          <SkeletonChart />
        </Grid>
      </Grid>
    );
  }

  if (isStateError || isHistoricalError || isVaccineError) {
    console.log(stateError);
    console.log(historicalError);
    console.log(vaccineError);
    //Error Notification
  }

  const currentState = upperCaseFirstLetter(router.query.id);

  const firstPoint = historicalData[historicalData.length - 2];
  const currentPoint = historicalData[historicalData.length - 1];

  const currentCase = currentPoint.cases;
  const firstCase = firstPoint.cases;
  const casePercentage = calcPercentage(currentCase, firstCase);
  const isCaseIncrease = casePercentage.charAt(0) === '-' ? false : true;
  const newCaseStat = currentCase - firstCase;

  const currentDeath = currentPoint.deaths;
  const firstDeath = firstPoint.deaths;
  const deathPercentage = calcPercentage(currentDeath, firstDeath);
  const isDeathIncrease = deathPercentage.charAt(0) === '-' ? false : true;
  const newDeathStat = currentDeath - firstDeath;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Statistics data={setStateStatCardData(stateData, vaccineData)} />
        </Grid>
        <Grid item xs={12} style={{ height: '400px', marginBottom: '100px' }}>
          <ParentSize>
            {({ width, height }) => {
              return (
                <HistoricalChart
                  cumulativeData={cumulativeCases}
                  newData={newCases}
                  width={width}
                  height={height}
                  titleLabel={`${currentState} Cases`}
                  subTitleLabel={'Last 30 Days'}
                  cumulativeHeaderStat={formatNumber(currentCase)}
                  newHeaderStat={formatNumber(newCaseStat)}
                  subHeaderStat={casePercentage}
                  isIncrease={isCaseIncrease}
                />
              );
            }}
          </ParentSize>
        </Grid>
        <Grid item xs={12} style={{ height: '400px', marginBottom: '100px' }}>
          <ParentSize>
            {({ width, height }) => {
              return (
                <HistoricalChart
                  cumulativeData={cumulativeDeaths}
                  newData={newDeaths}
                  width={width}
                  height={height}
                  titleLabel={`${currentState} Deaths`}
                  subTitleLabel={'Last 30 Days'}
                  cumulativeHeaderStat={formatNumber(currentDeath)}
                  newHeaderStat={formatNumber(newDeathStat)}
                  subHeaderStat={deathPercentage}
                  isIncrease={isDeathIncrease}
                />
              );
            }}
          </ParentSize>
        </Grid>
      </Grid>
    </>
  );
};

export default State;
