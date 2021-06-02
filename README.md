<br />
<p align="center">
  <img src="https://user-images.githubusercontent.com/65573413/120561343-3924a100-c3b9-11eb-9c5c-913399a9771d.png" alt="Logo" width="95" height="95">

  <h1 align="center">Covid 19 Tracker</h1>

  <p align="center">
    Covid-19 / Vaccine Dashboard
    <br />
      <a href="https://covid-19-tracker-one-lyart.vercel.app/">
        <strong>View Live Site »</strong>
      </a>
    <br />
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About The Project

![bloggerdemo](https://user-images.githubusercontent.com/65573413/120565262-87d63900-c3c1-11eb-8b3a-0acb303dad60.gif)

Covid-19 Dashboard which shows the latest coronavirus and vaccine statistics for USA and other global countries. Generated choropleth geographical maps and line charts using D3 based libraries. Created a REST API and an interface that displays the latest coronavirus related articles by efficiently webscraping popular news sites. A cron job is run every week to web scrape and store news articles in a PostgreSQL database. Application is deployed on Vercel and database is hosted on Heroku.

### Built With

Project is built with Next.js (React, Node, PostgreSQL) \
Other libraries used

- [React Query](https://github.com/tannerlinsley/react-query) & [Axios](https://github.com/axios/axios) - Data fetching & SSR
- [Visx](https://github.com/airbnb/visx) & [React Simple Maps](https://github.com/zcreativelabs/react-simple-maps) - Data Visualization (D3)
- [Material UI](https://github.com/mui-org/material-ui) - UI Library
- [Prisma](https://github.com/prisma/prisma) - ORM
- [Cheerio](https://github.com/cheeriojs/cheerio) - Web Scraping

<!-- GETTING STARTED -->

## Cloning the Repo

### Prerequisites

The Covid-19 news article interface is not supported on cloning the repo

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/Brian-Chung1/covid-19-tracker.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  To run locally

    ```sh
    npm run dev
    ```

    <!-- CONTACT -->

## Contact

Brian Chung - brian.chung.cs@gmail.com \
Project Link: https://covid-19-tracker-one-lyart.vercel.app/
