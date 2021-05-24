import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import {
  getDetailedAllStatesVaccineData,
  getStateVaccineData,
} from '../../hooks/useVaccineData';
import {
  upperCaseFirstLetter,
  setStateVaccineStatCardData,
  formatNumber,
  formatStateHistoricalVaccineData,
  formatCumulativeVaccineData,
  calcPercentage,
} from '../../utils/index';
import { Statistics, SkeletonStatistics } from '../../components/Statistics';
import { StatCard } from '../../components/StatCard';
import {
  HistoricalChart,
  SkeletonChart,
} from '../../components/visx/HistoricalChart';
import Head from 'next/head';

import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Grid from '@material-ui/core/Grid';

import { ParentSize } from '@visx/responsive';

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    'Detailed-US-States-Vaccine',
    getDetailedAllStatesVaccineData
  );

  await queryClient.prefetchQuery(`${context.params.id}HistoricalVaccine`, () =>
    getStateVaccineData(context.params.id, false, 'all')
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const VaccineState = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [cumulativeVax, setCumulativeVax] = useState([]);
  const [newVax, setNewVax] = useState([]);

  const {
    data: detailedData,
    isLoading: isDetailedLoading,
    isError: isDetailedError,
    error: detailedError,
  } = useQuery('Detailed-US-States-Vaccine', getDetailedAllStatesVaccineData);

  const {
    data: historicalData,
    isLoading: isHistoricalLoading,
    isError: isHistoricalError,
    error: historicalError,
  } = useQuery(`${router.query.id}HistoricalVaccine`, () =>
    getStateVaccineData(router.query.id, false, 'all')
  );

  useEffect(() => {
    if (!detailedData || !historicalData) return;
    const state = upperCaseFirstLetter(router.query.id.toLowerCase());
    const pfizerData = detailedData[0][state];
    const modernaData = detailedData[1][state];
    const allData = detailedData[2][state];
    setData(setStateVaccineStatCardData([pfizerData, modernaData, allData]));
    setCumulativeVax(formatStateHistoricalVaccineData(historicalData));
    setNewVax(formatCumulativeVaccineData(historicalData));
  }, []);

  if (isDetailedLoading || isHistoricalLoading || !data) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SkeletonStatistics />
        </Grid>
        <Grid item xs={false} sm={12}>
          <SkeletonChart />
        </Grid>
      </Grid>
    );
  }

  if (isDetailedError || isHistoricalError) {
    console.log(detailedError);
    console.log(historicalError);
  }

  const historical = formatStateHistoricalVaccineData(historicalData);
  const currentState = upperCaseFirstLetter(router.query.id);
  const firstPoint = historical[historical.length - 2];
  const currentPoint = historical[historical.length - 1];

  const currentVax = currentPoint.data;
  const firstVax = firstPoint.data;
  const vaxPercentage = calcPercentage(currentVax, firstVax);
  const isVaxIncrease = vaxPercentage.charAt(0) === '-' ? false : true;
  const newVaxStat = currentVax - firstVax;

  return (
    <main>
      <Head>
        <title>{`${router.query.id} Vaccine Statistics`}</title>
        <meta
          name="description"
          content={`Covid-19 Vaccine statistics for ${router.query.id} including Moderna and Pfizer`}
        />
      </Head>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={4}>
              <StatCard
                label={data[0].label}
                content={data[0].content}
                subcontent={data[0].subcontent}
                color={data[0].color}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StatCard
                label={data[1].label}
                content={data[1].content}
                subcontent={data[1].subcontent}
                color={data[1].color}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StatCard
                label={data[2].label}
                content={data[2].content}
                subcontent={data[2].subcontent}
                color={data[2].color}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ height: '400px', marginBottom: '100px' }}>
          <ParentSize>
            {({ width, height }) => {
              return (
                <HistoricalChart
                  cumulativeData={cumulativeVax}
                  newData={newVax}
                  width={width}
                  height={height}
                  titleLabel={`${currentState} Vaccinations`}
                  subTitleLabel={'Last 365 Days'}
                  cumulativeHeaderStat={formatNumber(currentVax)}
                  newHeaderStat={formatNumber(newVaxStat)}
                  subHeaderStat={vaxPercentage}
                  isIncrease={isVaxIncrease}
                />
              );
            }}
          </ParentSize>
        </Grid>
      </Grid>
    </main>
  );
};

export default VaccineState;
