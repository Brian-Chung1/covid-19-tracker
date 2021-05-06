import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import '../styles/globals.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../components/Layout';
import { MyThemeProvider } from '../hooks/useTheme';

function MyApp({ Component, pageProps }) {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    });
  }

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Covid-19 Tracker</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <MyThemeProvider>
          <CssBaseline />
          <Layout>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </Layout>
        </MyThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
