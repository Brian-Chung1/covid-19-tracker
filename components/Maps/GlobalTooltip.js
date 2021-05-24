import React from 'react';
import ReactTooltip from 'react-tooltip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { formatNumber } from '../../utils/index';

const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: 'white',
    marginBottom: 4,
  },
}));

const GlobalTooltip = ({ data }) => {
  const classes = useStyles();

  const { country, population, cases, deaths, recovered, date } = data;

  return (
    <ReactTooltip>
      <Typography>{country}</Typography>
      <Divider className={classes.divider} />
      <Typography>Cases: {formatNumber(cases)}</Typography>
      <Typography>Deaths: {formatNumber(deaths)}</Typography>
      <Typography>Recovered: {formatNumber(recovered)}</Typography>
      <Typography>Population: {population}</Typography>
      <Typography>As of: {date}</Typography>
    </ReactTooltip>
  );
};

export default GlobalTooltip;
