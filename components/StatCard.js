import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import theme from '../src/lightTheme';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 172,
  },
  title: {
    fontSize: 14,
  },
  cardContent: {
    paddingTop: 20,
    paddingRight: 24,
    paddingBottom: 8,
    paddingLeft: 24,
  },
  divider: {
    marginTop: 50,
  },
  subcontent: {
    paddingTop: theme.spacing(1),
  },
}));

const StatCard = ({ label, content, subcontent, preLabel }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {label}
        </Typography>
        <Typography className={classes.content} variant="h5" component="h2">
          {content}
        </Typography>
        <Divider className={classes.divider} />
        <Typography
          className={classes.subcontent}
          variant="body1"
          component="p"
        >
          {subcontent}
        </Typography>
      </CardContent>
    </Card>
  );
};

const StyledSkeleton = withStyles({
  root: {
    height: theme.spacing(3.7),
  },
})(Skeleton);

const SkeletonStatCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <StyledSkeleton className={classes.title} />
        <StyledSkeleton className={classes.content} />
        <Divider className={classes.divider} />
        <StyledSkeleton className={classes.subcontent} />
      </CardContent>
    </Card>
  );
};

export { StatCard, SkeletonStatCard };
