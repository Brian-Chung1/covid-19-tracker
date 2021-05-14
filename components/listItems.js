import React from 'react';
import Link from 'next/link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoIcon from '@material-ui/icons/Info';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import ColorizeIcon from '@material-ui/icons/Colorize';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

export const mainListItems = (
  <div>
    {/* Dashboard / Home */}
    <Link href="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="US Dashboard" />
      </ListItem>
    </Link>
    {/* States */}
    <Link href="/state">
      <ListItem button>
        <ListItemIcon>
          <LocationCityIcon />
        </ListItemIcon>
        <ListItemText primary="US States Data" />
      </ListItem>
    </Link>
    {/* Vaccines */}
    <Link href="/vaccine">
      <ListItem button>
        <ListItemIcon>
          <ColorizeIcon />
        </ListItemIcon>
        <ListItemText primary="US Vaccine Data" />
      </ListItem>
    </Link>
    {/* Global */}
    <Link href="/global">
      <ListItem button>
        <ListItemIcon>
          <PublicIcon />
        </ListItemIcon>
        <ListItemText primary="Global Data" />
      </ListItem>
    </Link>
    <Link href="/about">
      <ListItem button>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader>News Headlines</ListSubheader>
    <Link href="/news">
      <ListItem button>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="All News" />
      </ListItem>
    </Link>
    <Link href="/news/latimes">
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="LA Times" />
      </ListItem>
    </Link>
    <Link href="/news/nytimes">
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="NY Times" />
      </ListItem>
    </Link>
    <Link href="/news/cnn">
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="CNN" />
      </ListItem>
    </Link>
  </div>
);
