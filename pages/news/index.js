import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head';

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
    <main>
      <Head>
        <title>Covid-19 News Articles</title>
        <meta
          name="description"
          content="Covid-19 related news articles from popular news sources like LA Times, NY Times, CNN"
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
    </main>
  );
};

export default News;
