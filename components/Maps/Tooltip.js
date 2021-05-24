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

const Tooltip = ({ data }) => {
  const classes = useStyles();

  const { state, cases, vaccinated, recovered, deaths, tests } = data;

  return (
    <ReactTooltip>
      <Typography>{state}</Typography>
      <Divider className={classes.divider} />
      <Typography>Cases: {formatNumber(cases)}</Typography>
      <Typography>Deaths: {formatNumber(deaths)}</Typography>
      <Typography>Vaccinated: {formatNumber(vaccinated)}</Typography>
      <Typography>Recovered: {formatNumber(recovered)}</Typography>
      <Typography>Tests: {formatNumber(tests)}</Typography>
    </ReactTooltip>
  );
};

export default Tooltip;
