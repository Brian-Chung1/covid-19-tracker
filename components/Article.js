import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
}));

const SkeletonArticle = () => {
  return <Skeleton variant="rect" style={{ height: '150' }} />;
};

const Article = ({ data }) => {
  const classes = useStyles();

  const typeMapping = {
    cnn: 'CNN News',
    latimes: 'LA Times News',
    nytimes: 'NY Times News',
  };

  return (
    <Card className={classes.root}>
      {/* <CardMedia
        className={classes.cover}
        image={data.image ? data.image : ''}
        title={data.title}
      /> */}
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {data.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {data.author ? data.author : ''}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {data.description ? data.description : ''}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {typeMapping[data.type]}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export { Article, SkeletonArticle };
