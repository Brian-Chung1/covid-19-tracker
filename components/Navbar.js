import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import ThemeToggle from './ThemeToggle';
import Icon from '@material-ui/core/Icon';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 0, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: `calc(100% - 56px)`, //theme.spacing(7) == 56px
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  imageIcon: {
    display: 'flex',
    height: 'inherit',
    width: 'inherit',
  },
  icon: {
    display: 'flex',
  },
}));

const MainIcon = () => {
  const classes = useStyles();
  return (
    <div className={classes.icon}>
      <Icon>
        <img src={'/icon.svg'} className={classes.imageIcon} />
      </Icon>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        style={{ paddingLeft: 10 }}
      >
        Covid-19 Tracker
      </Typography>
    </div>
  );
};

const Navbar = ({ open }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
      color="inherit"
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <MainIcon />
        </div>
        <ThemeToggle />
        <IconButton color="inherit" onClick={() => router.push('/about')}>
          <InfoIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
