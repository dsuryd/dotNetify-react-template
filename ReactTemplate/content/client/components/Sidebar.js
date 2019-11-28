import React from 'react';
import PropTypes from 'prop-types';
import { RouteLink } from 'dotnetify';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { blue, grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
  drawerPaper: {
    backgroundColor: '#333'
  },
  logo: {
    cursor: 'pointer',
    fontSize: 22,
    color: '#fff',
    lineHeight: `64px`,
    fontWeight: 'lighter',
    backgroundImage: 'url(https://dotnetify.net/content/images/dotnetify-logo-small.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 18,
    backgroundPositionY: 7,
    backgroundColor: blue[600],
    paddingLeft: 70,
    height: 56,
    width: 160
  },
  menuItem: {
    color: grey[200],
    fontSize: 14
  },
  itemIcon: {
    color: grey[400]
  },

  avatarDiv: {
    padding: '15px 0 20px 15px',
    backgroundImage: 'url(' + require('../images/material_bg.png') + ')',
    height: 45
  },
  avatarIcon: {
    float: 'left',
    display: 'block',
    marginRight: 15,
    boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
  },
  avatarSpan: {
    paddingTop: 12,
    display: 'block',
    color: 'white',
    fontWeight: 300,
    textShadow: '1px 1px #444'
  }
});

const Sidebar = props => {
  let { vm, logoTitle, open, userAvatarUrl, menus } = props;

  const classes = useStyles();
  return (
    <Drawer
      variant="persistent"
      className={classes.drawer}
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.logo}>{logoTitle}</div>
      <div className={classes.avatarDiv}>
        <Avatar src={userAvatarUrl} size={50} className={classes.avatarIcon} />
        <span className={classes.avatarSpan}>{props.username}</span>
      </div>
      <List>
        {menus.map((menu, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <Icon className={classes.itemIcon}>{menu.Icon}</Icon>
            </ListItemIcon>
            <RouteLink vm={vm} route={menu.Route} className={classes.menuItem}>
              <ListItemText primary={menu.Title} />
            </RouteLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
  userAvatarUrl: PropTypes.string
};

export default Sidebar;
