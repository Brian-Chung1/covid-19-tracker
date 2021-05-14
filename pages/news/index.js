import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { getAllNewsArticles } from '../../hooks/useNewsData';

import { Article, SkeletonArticle } from '../../components/Article';

const useStyles = makeStyles((theme) => ({}));

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('allNews', getAllNewsArticles);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const News = () => {
  const classes = useStyles();

  const { data, isLoading, isError, error } = useQuery(
    'allNews',
    getAllNewsArticles
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

  return (
    <Grid container spacing={3}>
      {data.map((article) => {
        return (
          <Grid item xs={12} key={article.id}>
            <Article data={article} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default News;
