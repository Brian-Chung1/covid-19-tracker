import React from 'react';
import ReactTooltip from 'react-tooltip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { formatNumber } from '../utils/index';

const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: 'white',
    marginBottom: 4,
  },
}));

const VaccineTooltip = ({ data }) => {
  const classes = useStyles();

  const { state, type, date, admin, alloc, shipped, stageOne, stageTwo } = data;
  // console.log(data);

  return (
    <ReactTooltip>
      <Typography>{state}</Typography>
      <Divider className={classes.divider} />
      <Typography>Vaccine Type: {type}</Typography>
      <Typography>Total Administered: {formatNumber(admin)}</Typography>
      <Typography>Total Allocated: {formatNumber(alloc)}</Typography>
      <Typography>Total Shipped: {formatNumber(shipped)}</Typography>
      <Typography>Total Stage One: {formatNumber(stageOne)}</Typography>
      <Typography>Total Stage Two: {formatNumber(stageTwo)}</Typography>
      <Typography>As of: {date}</Typography>
    </ReactTooltip>
  );
};

export default VaccineTooltip;
