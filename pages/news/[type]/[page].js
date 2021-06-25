import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import { useQuery, QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { dehydrate } from 'react-query/hydration';
import { getNewsArticles } from '../../../hooks/useNewsData';
import { Article, SkeletonArticle } from '../../../components/Article';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { validateNewsCursor } from '../../../utils/validateNewsCursor';

const useStyles = makeStyles((theme) => ({
  bottomNav: {
    display: 'flex',
    marginTop: theme.spacing(2),
    justifyContent: 'space-evenly',
  },
}));

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const { type, page } = context.params;
  let validPage = validateNewsCursor(page) ? page : 0;
  await queryClient.prefetchQuery(
    `${type}News${validPage}`,
    () => getNewsArticles(type, validPage),
    { keepPreviousData: true }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const News = () => {
  const classes = useStyles();
  const router = useRouter();

  //TODO - Scroll to top not working
  // useEffect(() => {
  //   Router.events.on('routeChangeComplete', () => {
  //     window.scroll({
  //       top: 0,
  //       left: 0,
  //       behavior: 'smooth',
  //     });
  //   });
  // }, []);

  const { type, page } = router.query;

  const { data, isLoading, isError, error } = useQuery(
    `${type}News${page}`,
    () => getNewsArticles(type, page),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SkeletonArticle />
        </Grid>
        <Grid item xs={12}>
          <SkeletonArticle />
        </Grid>
      </Grid>
    );
  }

  if (isError) {
    console.log(error);
  }

  const handlePrev = () => {
    if (page === '0' || parseInt(page) < 0) return;
    router.push({
      pathname: '/news/[type]/[page]',
      query: { type: type, page: parseInt(page) - 1 },
    });
  };

  const handleNext = () => {
    router.push({
      pathname: '/news/[type]/[page]',
      query: { type: type, page: parseInt(page) + 1 },
    });
  };

  const seoTitle = {
    latimes: 'LA Times',
    nytimes: 'NY Times',
    cnn: 'CNN',
    all: '',
  };

  const seoDescription = {
    latimes: 'Los Angeles Times',
    nytimes: 'New York Times',
    cnn: 'CNN',
    all: 'popular news sources like LA Times, NY Times, CNN',
  };

  return (
    <main>
      <Head>
        <title>{`${seoTitle[type]} News Articles`}</title>
        <meta
          name="description"
          content={`Covid-19 related news articles from ${seoDescription[type]}`}
        />
      </Head>
      <Grid container spacing={3}>
        {data.map((val, index, articles) => {
          const currentArticle = articles[articles.length - index - 1];
          return (
            <Grid item xs={12} key={currentArticle.id}>
              <Article data={currentArticle} />
            </Grid>
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <Divider />
        <div className={classes.bottomNav}>
          <Button
            onClick={handlePrev}
            startIcon={<ArrowBackIosIcon />}
            size="large"
          >
            Prev
          </Button>
          <Button
            onClick={handleNext}
            endIcon={<ArrowForwardIosIcon />}
            size="large"
            disabled={data.length < 10}
          >
            Next
          </Button>
        </div>
      </Grid>
    </main>
  );
};

export default News;
