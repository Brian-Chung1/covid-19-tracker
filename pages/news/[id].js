import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { useQuery, QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { dehydrate } from 'react-query/hydration';

import { getNewsArticles } from '../../hooks/useNewsData';

import { Article, SkeletonArticle } from '../../components/Article';

const useStyles = makeStyles((theme) => ({}));

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(`${context.params.id}News`, () =>
    getNewsArticles(context.params.id)
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

  const { data, isLoading, isError, error } = useQuery(
    `${router.query.id}News`,
    () => getNewsArticles(router.query.id)
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
