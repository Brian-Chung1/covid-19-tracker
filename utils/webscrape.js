const axios = require('axios');
const cheerio = require('cheerio');

const keywords = [
  'covid-19',
  'covid',
  'coronavirus',
  'vaccine',
  'pandemic',
  'herd immunity',
  'epidemic',
  'social distancing',
  'novel strain',
  'quarantine',
  'vaccination',
  'vaccinated',
];

const containsKeyword = (str, keywords) => {
  return keywords.some((w) => str.toLowerCase().includes(w));
};

const containsArticle = (title, articles) => {
  for (let i = 0; i < articles.length; i++) {
    const currentArticle = articles[i];
    if (currentArticle.title === title) {
      return true;
    }
  }
  return false;
};

const isNum = (val) => {
  return /^\d+$/.test(val);
};

const getDateFromLink = (link) => {
  const split = link.split('/');
  let index = 1;
  const year = split[index];
  if (!isNum(year)) {
    index++;
  }
  const date = `${split[index]}/${split[index + 1]}/${split[index + 2]}`;
  return date;
};

const setNYTimesLink = (href) => {
  const baseUrl = 'https://www.nytimes.com';
  return baseUrl + href;
};

const getNYTimesArticles = async (searchKeyword) => {
  const url = `https://www.nytimes.com/search?query=${searchKeyword}`;
  const response = await axios.get(url);

  const articles = [];
  const $ = cheerio.load(response.data);

  $('[data-testid="search-results"]')
    .children()
    .each((index, element) => {
      const title = $(element).find('h4').text();
      if (title !== '' && containsKeyword(title, keywords)) {
        const category = $(element).find('p:nth-child(1)').text();
        const description = $(element).find('a > p').eq(0).text();
        const author = $(element).find('a > p').eq(1).text();
        const link = $(element).find('a').attr('href');
        const date = getDateFromLink(link);
        const image = $(element).find('img').attr('src');
        const alt = $(element).find('img').attr('alt');
        articles.push({
          type: 'nytimes',
          title,
          description,
          category,
          author,
          link: setNYTimesLink(link),
          date,
          image,
          alt: !alt ? '' : alt,
        });
      }
    });

  return articles;
};

const fetchNYTimes = async () => {
  const searchKeyword = ['COVID-19', 'Coronavirus'];
  const allArticles = [];

  for (let keyword of searchKeyword) {
    const articles = await getNYTimesArticles(keyword);
    for (let i = 0; i < articles.length; i++) {
      allArticles.push(articles[i]);
    }
  }

  return allArticles;
};

const getLATimesArticles = async (searchKeyword) => {
  const url = `https://www.latimes.com/search?q=${searchKeyword}&s=0`;
  const response = await axios.get(url);

  const articles = [];
  const $ = cheerio.load(response.data);

  //Indexes of valid articles
  const validArticleIndexes = [];

  //Check if Articles contain Keyword and get their indexes
  $('.promo-title-container-dupe').each((index, element) => {
    const title = $(element).children('p:nth-child(2)').find('a').text();
    if (containsKeyword(title, keywords) && !containsArticle(title, articles)) {
      validArticleIndexes.push(index);
    }
  });

  //Get Article data on valid articles
  $('.promo-wrapper').each((index, element) => {
    if (validArticleIndexes.includes(index)) {
      const media = $(element).children('div:nth-child(2)');
      const content = $(element).children('div:nth-child(3)');

      const link = media.find('a').attr('href');
      const image = media.children().find('img').attr('data-src');
      const alt = media.children().find('img').attr('alt');

      const title = content.children('div').find('p').text().trim();
      const description = content.find('.promo-description').text();
      const date = content.find('.promo-timestamp').attr('data-date');

      articles.push({
        title,
        type: 'latimes',
        description,
        date,
        image,
        link,
        alt: !alt ? '' : alt,
      });
    }
  });

  return articles;
};

const fetchLATimes = async () => {
  const searchKeyword = ['COVID-19', 'Coronavirus'];
  const allArticles = [];

  for (let keyword of searchKeyword) {
    const articles = await getLATimesArticles(keyword);
    for (let i = 0; i < articles.length; i++) {
      allArticles.push(articles[i]);
    }
  }

  return allArticles;
};

const setCNNLink = (href) => {
  const baseUrl = 'http://lite.cnn.com';
  return baseUrl + href;
};

const getCNNArticles = async () => {
  const url = `http://lite.cnn.com/en`;

  const response = await axios.get(url);

  const articles = [];
  const $ = cheerio.load(response.data);

  $('li').each((index, element) => {
    const title = $(element).text();
    const link = $(element).find('a').attr('href');
    if (containsKeyword(title, keywords)) {
      articles.push({ title, type: 'cnn', link: setCNNLink(link) });
    }
  });

  return articles;
};

const fetchCNN = async () => {
  const articles = await getCNNArticles();
  return articles;
};

export { fetchNYTimes, fetchLATimes, fetchCNN };
