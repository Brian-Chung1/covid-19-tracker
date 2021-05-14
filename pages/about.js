import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

//TO-DO Info
//The News Headline section shows the latest Covid-19 or Vaccine related news articles.
//The news articles are web scraped from popular news sites such as Fox News, CNN, LA Times, NY Times, and more

const useStyles = makeStyles((theme) => ({
  infoCardTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contact: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeight: {
    height: '100%',
  },
}));

const Contact = () => {
  const classes = useStyles();

  return (
    <div className={classes.contact}>
      <a
        href={'https://github.com/Brian-Chung1/covid-19-tracker'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton>
          <GitHubIcon />
        </IconButton>
      </a>
      <a
        href={'https://www.linkedin.com/in/brian-chung1/'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton>
          <LinkedInIcon />
        </IconButton>
      </a>
      <a
        href={'mailto:brian.chung.cs@gmail.com'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton>
          <EmailIcon />
        </IconButton>
      </a>
    </div>
  );
};

const InfoCard = ({ title, content, source }) => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  return (
    <Card className={classes.cardHeight}>
      <CardContent>
        <div className={classes.infoCardTitle}>
          <Typography
            variant={'h4'}
            gutterBottom
            color="inherit"
            noWrap
            style={{ flex: '1' }}
          >
            {title}
          </Typography>
          {source && (
            <Typography>
              <a href={source} target="_blank" rel="noopener">
                Source
              </a>
            </Typography>
          )}
        </div>
        <Typography variant="subtitle1">{content}</Typography>
      </CardContent>
    </Card>
  );
};

const About = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={10}>
          <Card className={classes.cardHeight}>
            <CardContent>
              <div className={classes.infoCardTitle}>
                <Typography
                  variant={'h4'}
                  gutterBottom
                  color="inherit"
                  noWrap
                  style={{ flex: '1' }}
                >
                  About
                </Typography>
              </div>
              <Typography variant="subtitle1">
                Covid Tracker is a dashboard for tracking the latest Coronavirus
                updates. It currently provides statistics on both United States
                and Countries around the world.
                <div>
                  Current data sources are
                  <ul>
                    <li>https://disease.sh/</li>
                    <li>https://github.com/govex/COVID-19</li>
                    <li>https://covid19api.com/</li>
                  </ul>
                </div>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={2}>
          <Card className={classes.cardHeight}>
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant={'h6'}
                gutterBottom
                color="inherit"
                noWrap
                className={classes.contact}
                style={{ marginBottom: '30px' }}
              >
                Contact
              </Typography>
              <Contact />
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <InfoCard
            title={'Covid-19 FAQ'}
            content={`COVID-19 is a new disease, caused by a novel (or new) coronavirus that has not previously been seen in humans. 
          Because it is a new virus, scientists are learning more each day. 
          Although most people who have COVID-19 have mild symptoms, COVID-19 can also cause severe illness and even death. 
          Some groups, including older adults and people who have certain underlying medical conditions, are at increased risk of severe illness.`}
            source={'https://www.cdc.gov/coronavirus/2019-ncov/faq.html#Basics'}
          />
        </Grid>
        <Grid item>
          <InfoCard
            title={'How does it spread'}
            content={`COVID-19 is thought to spread mainly through close contact from person to person, including between people who are physically near each other (within about 6 feet). People who are infected but do not show symptoms can also spread the virus to others. Cases of reinfection with COVID-19  have been reported but are rare. We are still learning about how the virus spreads and the severity of illness it causes.

            COVID-19 spreads very easily from person to person. How easily a virus spreads from person to person can vary. The virus that causes COVID-19 appears to spread more efficiently than influenza but not as efficiently as measles, which is among the most contagious viruses known to affect people.`}
            source={
              'https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-covid-spreads.html'
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
