import { useQuery, QueryClient } from 'react-query';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { getStatesData } from '../../hooks/useStatesData';
import {
  getAllStatesVaccineData,
  getAllStatesVaccineDataDev,
} from '../../hooks/useVaccineData';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import StateSearch from '../../components/StateSearch';
import { dehydrate } from 'react-query/hydration';
import { convertStateDataForDataGrid } from '../../utils/index';

const useStyles = makeStyles((theme) => ({}));

const SkeletonPage = () => {
  return (
    <div>
      {/* State Search Bar */}
      <Skeleton variant="text" height={60} style={{ marginBottom: '10px' }} />
      {/* State Table */}
      <Skeleton variant="rect" height={650} />
    </div>
  );
};

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'state', headerName: 'State', width: 160 },
  { field: 'cases', headerName: 'Total Cases', type: 'number', width: 160 },
  {
    field: 'todayCases',
    headerName: 'Cases Today',
    type: 'number',
    width: 160,
  },
  { field: 'deaths', headerName: 'Total Deaths', type: 'number', width: 160 },
  {
    field: 'todayDeaths',
    headerName: 'Deaths Today',
    type: 'number',
    width: 160,
  },
  {
    field: 'vaccinated',
    headerName: 'Total Vaccinated',
    type: 'number',
    width: 160,
  },
  {
    field: 'recovered',
    headerName: 'Total Recovered',
    type: 'number',
    width: 160,
  },
  { field: 'tests', headerName: 'Total Tests', type: 'number', width: 160 },
  { field: 'population', headerName: 'Population', type: 'number', width: 160 },
];

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('US-States', getStatesData);
  await queryClient.prefetchQuery('US-States-Vaccine', () =>
    getAllStatesVaccineData(false, 1)
  );
  // await queryClient.prefetchQuery(
  //   'US-States-Vaccine',
  //   getAllStatesVaccineDataDev
  // );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const StateTable = () => {
  const classes = useStyles();

  const { data, error, isFetching, isLoading, isError } = useQuery(
    'US-States',
    getStatesData
  );

  const {
    data: vaccineData,
    error: vaccineError,
    isFetching: isVaccineFetching,
    isLoading: isVaccineLoading,
    isError: isVaccineError,
  } = useQuery('US-States-Vaccine', () => getAllStatesVaccineData(false, 1));
  //useQuery('US-States-Vaccine', () => getAllStatesVaccineData(false, 1));
  if (isLoading || isFetching || isVaccineLoading || isVaccineFetching) {
    return <SkeletonPage />;
  }

  if (isError || isVaccineError) {
    //Error Notification
    console.log(error);
    console.log(vaccineError);
  }

  console.log(convertStateDataForDataGrid(data, vaccineData));

  return (
    <Grid container spacing={3}>
      {/* State Search Bar */}
      <Grid item xs={12}>
        <StateSearch endpoint={'state'} />
      </Grid>
      {/* State Data Table */}
      <Grid item xs={12}>
        <div style={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={convertStateDataForDataGrid(data, vaccineData)}
            columns={columns}
            pageSize={10}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default StateTable;
