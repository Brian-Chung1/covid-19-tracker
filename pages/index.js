import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Map from '../components/Map';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>COVID-19 Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>COVID-19 Tracker</h1>

        <p className={styles.description}>United States Statistics</p>

        {/* Stat Cards */}
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3> Total Cases </h3>
            <p>1234</p>
          </div>

          <div className={styles.card}>
            <h3> Total Vaccinations </h3>
            <p>1234</p>
          </div>

          <div className={styles.card}>
            <h3> Total Recovered </h3>
            <p>1234</p>
          </div>

          <div className={styles.card}>
            <h3> Total Deaths </h3>
            <p>1234</p>
          </div>
        </div>
      </main>

      <div className={styles.map}>
        <Map />
      </div>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
