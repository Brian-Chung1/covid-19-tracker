import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '2',
  },
  // cover: {
  //   width: 151,
  // },
}));

const SkeletonArticle = () => {
  return <Skeleton variant="rect" style={{ height: '150' }} />;
};

const Article = ({ data }) => {
  const matches = useMediaQuery('(max-width:1500px)');
  const classes = useStyles();

  const newsTypeMapping = {
    cnn: 'CNN News',
    latimes: 'LA Times News',
    nytimes: 'NY Times News',
  };

  const newsTypeImageMapping = {
    cnn: '/CNN-logo.png',
    latimes: '/LA-Times-logo.jpg',
    nytimes: '/NY-Times-logo.jpg',
  };

  // all attributes: type, title, description, category, author, link, date, image,
  //cnn attributes: title, link, type
  //latimes attributes: title, link, description, date, image, type
  //nytimes attributes: title, link, description, date, image, author, category, type, alt

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        style={matches ? { display: 'none' } : { display: 'flex' }}
      >
        <Image
          src={data.image ? data.image : newsTypeImageMapping[data.type]}
          alt={data.alt ? data.alt : `${data.type} logo`}
          width={300}
          height={200}
        />
      </CardMedia>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {data.title}
          </Typography>
          <Divider />
          <Typography variant="subtitle1" color="textSecondary">
            {`${data.date ? data.date : ''}${
              data.author ? ` ${data.author}` : ''
            }`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {data.description ? data.description : ''}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {`${data.category ? `${data.category} • ` : ''}${
              newsTypeMapping[data.type]
            }`}
          </Typography>
        </CardContent>
      </div>
      <CardActions className={classes.source}>
        <Button size="small">
          <a href={data.link} target="_blank" rel="noopener noreferrer">
            source
          </a>
        </Button>
      </CardActions>
    </Card>
  );
};

export { Article, SkeletonArticle };
